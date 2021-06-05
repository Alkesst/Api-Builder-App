import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { IProjectConfig } from 'api-builder-types';
import { EntityAttribute, StateSetterCallback } from '../../Types/ViewTypes';
import { getProject } from '../../Helper/Retriever';

interface GridState {
    attributes: EntityAttribute[];
    pushNewAttribute: (attribute: EntityAttribute) => void;
}

export const useStoreGrid = create<GridState>(devtools((set) => ({
    attributes: [],
    pushNewAttribute:
        (attribute: EntityAttribute) => set((state) => (
            { attributes: [...state.attributes, attribute] }
        )),
})));

interface ConfigurationEditorStore {
    projectConfig?: IProjectConfig,
    fetchProjectConfig: StateSetterCallback;
    loading: boolean;
    setLoading: StateSetterCallback;
}

export const useConfigurationEditorStore = create<ConfigurationEditorStore>(devtools(
    (set, get) => ({
        projectConfig: undefined,
        loading: true,
        setLoading: (newValue: boolean) => set({ loading: newValue }),
        fetchProjectConfig: async (id: string) => {
            const response = await getProject(id);
            set({ projectConfig: response });
            get().setLoading(false);
        },
    }),
));
