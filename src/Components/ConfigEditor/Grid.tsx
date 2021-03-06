import React from 'react';
import { Entity } from 'Components';

interface IGridProps {
    expanded: boolean;
}

const Grid : React.FC<IGridProps> = ({ expanded }: IGridProps) => (
    <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
        Ey
        <Entity name="Entity1" coordinates={{ x: 150, y: 150 }} />
    </div>
);

export default Grid;
