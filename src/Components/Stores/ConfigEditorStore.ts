import create from 'zustand';
import { devtools } from 'zustand/middleware';
import {
    IAttribute, IEntity, IProjectConfig, ProjectType,
} from 'api-builder-types';
import { StateSetterCallback } from '../../Types/ViewTypes';
import { getProject } from '../../Helper/Retriever';

interface ConfigurationEditorStore {
    projectConfig?: IProjectConfig,
    projectType?: string;
    fetchProjectConfig: StateSetterCallback;
    loading: boolean;
    setLoading: StateSetterCallback;
}

interface EntityStore {
    entities: IEntity[],
    setEntities: StateSetterCallback;
    getEntity: (entityId: string) => IEntity | undefined;
}

interface AttributeStore {
    attributes: { [key: string]: AttributesStoreStructure};
    appendAttributes: (entityId: string, attributes: IAttribute[]) => void;
    update: (
        entityId: string,
        attributeId: string
    ) => (fieldName: keyof IAttribute, newValue: string) => void;
    getAttributesByEntityId: (entityId: string) => IAttribute[];
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
            (fieldName: keyof IAttribute, newValue: string) => {
                const { attributes } = get().attributes[entityId];
                const attributeToUpdateIndex = attributes.findIndex(
                    (attribute) => attribute.Identifier === attributeId,
                );
                if (attributeToUpdateIndex === -1) return;
                const slice1 = attributes.slice(0, attributeToUpdateIndex);
                const slice2 = attributes.slice(attributeToUpdateIndex + 1);
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
            }
        ),
        getAttributesByEntityId: (entityId: string) => (
            get().attributes[entityId].attributes
        ),
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
    }),
));
