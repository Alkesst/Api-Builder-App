import React from 'react';
import Xarrow from 'react-xarrows';
import { IRelationship } from 'api-builder-types/relationship';

interface IRelationshipProps extends IRelationship {
    Entity: string;
}

const Relationship : React.FC<IRelationshipProps> = (
    { Entity, RightSide }: IRelationshipProps,
) => (
    <Xarrow start={Entity.toString()} end={RightSide.Entity.toString()} />
);

export default Relationship;
