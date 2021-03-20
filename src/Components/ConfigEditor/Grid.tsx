import React from 'react';
import { Guid } from 'guid-typescript';
import { Entity } from 'Components';
import { AttributeType } from 'api-builder-types';

interface IGridProps {
    expanded: boolean;
}

const Grid : React.FC<IGridProps> = ({ expanded }: IGridProps) => (
    <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
        Ey
        <Entity
            Name="Entity1"
            Identifier={Guid.create()}
            Coordinates={{ X: 250, Y: 250 }}
            Attributes={[{
                Name: 'Jose', Identifier: Guid.create(), Type: AttributeType.Numeric, DefaultValue: null, IsNullable: true, Precision: null, Value: null,
            }]}
            Relationships={[]}
            Constraints={[]}
        />
    </div>
);

export default Grid;
