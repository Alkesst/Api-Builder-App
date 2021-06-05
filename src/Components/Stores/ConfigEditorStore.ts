import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { IAttribute, IEntity, IProjectConfig } from 'api-builder-types';
import { StateSetterCallback } from '../../Types/ViewTypes';
import { getProject } from '../../Helper/Retriever';

interface ConfigurationEditorStore {
    projectConfig?: IProjectConfig,
    fetchProjectConfig: StateSetterCallback;
    loading: boolean;
    setLoading: StateSetterCallback;
}

interface EntityStore {
    entities: IEntity[],
    setEntities: StateSetterCallback;
}

interface AttributeStore {
    attributesMatrix: AttributesStoreStructure[];
    appendAttributes: (entityId: string, attributes: IAttribute[]) => void;
}

export interface AttributesStoreStructure {
    entityId: string;
    attributes: IAttribute[];
    saving: boolean;
}

export const useAttributeStore = create<AttributeStore>(devtools(
    (set) => ({
        attributesMatrix: [],
        appendAttributes: (entityId, attributes) => set((state) => ({
            attributesMatrix: [...state.attributesMatrix,
                { entityId, attributes, saving: false }],
        })),
    }),
));

export const useEntityStore = create<EntityStore>(devtools(
    (set) => ({
        entities: [],
        setEntities: (newValue: IEntity[]) => {
            set({ entities: newValue });
            newValue
                .forEach((entity) => useAttributeStore.getState().appendAttributes(
                    entity.Identifier,
                    entity.Attributes,
                ));
        },
    }),
));

export const useConfigurationEditorStore = create<ConfigurationEditorStore>(devtools(
    (set, get) => ({
        projectConfig: undefined,
        loading: true,
        setLoading: (newValue: boolean) => set({ loading: newValue }),
        fetchProjectConfig: async (id: string) => {
            const response = await getProject(id);
            set({ projectConfig: response });
            useEntityStore.getState().setEntities(response.Entities);
            get().setLoading(false);
        },
    }),
));
