import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { EntityAttribute } from '../../Types/ViewTypes';

interface GridState {
    attributes: EntityAttribute[];
    pushNewAttribute: (attribute: EntityAttribute) => void;
}

const useStoreGrid = create<GridState>(devtools((set) => ({
    attributes: [],
    pushNewAttribute:
        (attribute: EntityAttribute) => set((state) => (
            { attributes: [...state.attributes, attribute] }
        )),
})));

export default useStoreGrid;
