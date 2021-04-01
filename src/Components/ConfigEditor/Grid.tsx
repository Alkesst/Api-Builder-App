import React from 'react';
import { IEntity } from 'api-builder-types';
import Entity from './MinorComponents/Entity';

interface IGridProps {
    expanded: boolean;
    projectEntities: IEntity[];
    loaded: boolean;
}

const Grid : React.FC<IGridProps> = ({ expanded, projectEntities, loaded }: IGridProps) => (
    <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
        Ey
        {loaded && projectEntities.map((element: IEntity) => (
            <Entity
                key={element.Identifier.toString()}
                Identifier={element.Identifier}
                Name={element.Name}
                Relationships={element.Relationships}
                Attributes={element.Attributes}
                Coordinates={element.Coordinates}
                Constraints={element.Constraints}
            />
        ))}
    </div>
);

export default Grid;
