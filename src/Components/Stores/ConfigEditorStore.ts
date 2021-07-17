import create from 'zustand';
import { devtools } from 'zustand/middleware';
import {
    IAttribute, IEntity, IProjectConfig, ProjectType,
} from 'api-builder-types';
import { StateSetterCallback } from '../../Types/ViewTypes';
import { getProject } from '../../Helper/Retriever';
import { createEmptyAttribute, createEmptyEntity, sliceArray, sliceAttributesArray } from 'Helper/StoreHelper';

interface ConfigurationEditorStore {
    projectConfig?: IProjectConfig,
    projectType?: string;
    fetchProjectConfig: StateSetterCallback;
    loading: boolean;
    setLoading: StateSetterCallback;
    getEntitiesByProject: () => IEntity[] | undefined;
}

interface EntityStore {
    entities: IEntity[],
    setEntities: StateSetterCallback;
    getEntity: (entityId: string) => IEntity | undefined;
    addEmptyNewEntity: () => void;
    setAttributePK: (attributeId: string, entityId: string, isAddition: boolean) => void;
    getEntityPKs: (entityId: string) => string[];
    update: (entityId: string) =>
        <T extends keyof IEntity>(fieldName: T, newValue: IEntity[T]) => void;
    deleteEntity: (entityId: string) => void;
}

interface AttributeStore {
    attributes: { [key: string]: AttributesStoreStructure };
    appendAttributes: (entityId: string, attributes: IAttribute[]) => void;
    update: (
        entityId: string,
        attributeId: string
    ) => <T extends keyof IAttribute>(fieldName: T, newValue: IAttribute[T]) => void;
    getAttributesByEntityId: (entityId: string) => IAttribute[];
    addEmptyNewAttribute: (entityId: string) => void;
    deleteAttribute: (entityId: string, attributeId: string) => void;
}

export interface AttributesStoreStructure {
    attributes: IAttribute[];
    saving: boolean;
}

export const useAttributeStore = create<AttributeStore>(devtools(
    (set, get) => ({
        attributes: {},
        appendAttributes: (entityId: string, attributes: IAttribute[]) => {
            set((state) => ({
                attributes: {
                    ...state.attributes,
                    [entityId]: {
                        attributes: [
                            ...(state.attributes[entityId]?.attributes || []), ...attributes,
                        ],
                        saving: false,
                    },
                },
            }));
        },
        update: (
            entityId: string,
            attributeId: string,
        ) => (
            <T extends keyof IAttribute>(fieldName: T, newValue: IAttribute[T]) => {
                const { attributes } = get().attributes[entityId];
                const { slice1, slice2, attributeToUpdateIndex } = sliceAttributesArray(attributes, attributeId);
                if (attributeToUpdateIndex === -1) return;
                const attributeToUpdate = {
                    ...attributes[attributeToUpdateIndex],
                    [fieldName]: newValue,
                };
                set((state) => ({
                    attributes: {
                        ...state.attributes,
                        [entityId]: {
                            attributes: [...slice1, attributeToUpdate, ...slice2],
                            saving: false,
                        },
                    },
                }));
                useEntityStore.getState().update(entityId)('Attributes', [...slice1, attributeToUpdate, ...slice2]);
            }
        ),
        getAttributesByEntityId: (entityId: string) => (
            get().attributes[entityId]?.attributes
        ),
        addEmptyNewAttribute: (entityId: string) => {
            const attributes = get().attributes?.[entityId];
            set((state) => ({
                attributes: {
                    ...state.attributes,
                    [entityId]: {
                        attributes: [...attributes?.attributes || [], ...[createEmptyAttribute()]],
                        saving: false,
                    },
                },
            }));
            useEntityStore.getState().update(entityId)('Attributes', [...attributes?.attributes || [], ...[createEmptyAttribute()]]);
        },
        deleteAttribute: (entityId: string, attributeId: string) => {
            const { attributes } = get().attributes[entityId];
            const { slice1, slice2, attributeToUpdateIndex } = sliceAttributesArray(attributes, attributeId);
            if (attributeToUpdateIndex === -1) return;
            set((state) => ({
                attributes: {
                    ...state.attributes,
                    [entityId]: {
                        attributes: [...slice1, ...slice2],
                        saving: false,
                    },
                },
            }));
            useEntityStore.getState().update(entityId)('Attributes', [...slice1, ...slice2]);
        }
    }),
));

export const useEntityStore = create<EntityStore>(devtools(
    (set, get) => ({
        entities: [],
        setEntities: (newValue: IEntity[]) => {
            set({ entities: newValue });
            newValue
                .forEach((entity) => useAttributeStore.getState().appendAttributes(
                    entity.Identifier,
                    entity.Attributes,
                ));
        },
        getEntity: (entityId: string) => (
            get().entities.find((entity) => entity.Identifier === entityId)
        ),
        addEmptyNewEntity: () => {
            set((state) => ({
                entities: [...state.entities, ...[createEmptyEntity(get().entities.length)]],
            }));
        },
        setAttributePK: (attributeId: string, entityId: string, isAddition: boolean) => {
            const entityIndex = get().entities.findIndex((el) => el.Identifier === entityId);
            const entity = get().entities[entityIndex];
            const entities1 = get().entities.slice(0, entityIndex);
            const entities2 = get().entities.slice(entityIndex + 1);
            if (isAddition) {
                set(() => ({
                    entities: [...entities1, { ...entity, PK: [...entity.PK, attributeId] }, ...entities2]
                }))
            } else {
                const indexAttr = entity.PK.findIndex((el) => el === attributeId);
                const slice1 = entity.PK.slice(0, indexAttr);
                const slice2 = entity.PK.slice(indexAttr + 1);
                set(() => ({
                    entities: [...entities1, { ...entity, PK: [...slice1, ...slice2] }, ...entities2]
                }))
            }
        },
        getEntityPKs: (entityId: string) => {
            const entity = get().getEntity(entityId);
            return entity?.PK || [];
        },
        update: (entityId: string) =>
            <T extends keyof IEntity>(fieldName: T, newValue: IEntity[T]) => {
                const entities = get().entities;
                const entityIndex = entities.findIndex((entity) => entity.Identifier === entityId);
                const entityUpdated = {
                    ...entities[entityIndex],
                    [fieldName]: newValue
                };
                const [slice1, slice2] = sliceArray<IEntity>(entities, entityIndex);
                set(() => ({
                    entities: [...slice1, entityUpdated, ...slice2]
                }));
            },
        deleteEntity: (entityId: string) => {
            const entities = get().entities;
            const entityIndex = entities.findIndex((entity) => entity.Identifier === entityId);
            const [slice1, slice2] = sliceArray<IEntity>(entities, entityIndex);
            set(() => ({
                entities: [...slice1, ...slice2]
            }));
        }
    }),
));

export const useConfigurationEditorStore = create<ConfigurationEditorStore>(devtools(
    (set, get) => ({
        projectConfig: undefined,
        loading: true,
        projectType: undefined,
        setLoading: (newValue: boolean) => set({ loading: newValue }),
        fetchProjectConfig: async (id: string) => {
            const response = await getProject(id);
            set({ projectConfig: response, projectType: ProjectType[response.Type] });
            useEntityStore.getState().setEntities(response.Entities);
            get().setLoading(false);
        },
        getEntitiesByProject: (() => get().projectConfig?.Entities),
    }),
));
