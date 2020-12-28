import React from 'react';

interface IGridProps {
    expanded: boolean;
}

const Grid : React.FC<IGridProps> = ({ expanded }: IGridProps) => (
    <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
        Ey
    </div>
);

export default Grid;
