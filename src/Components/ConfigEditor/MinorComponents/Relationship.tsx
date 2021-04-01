import React from 'react';
import Xarrow from 'react-xarrows';
import { IRelationship } from 'api-builder-types/relationship';

interface IRelationshipProps extends IRelationship {
}

const Relationship : React.FC<IRelationshipProps> = (
    { LeftSide, RightSide }: IRelationshipProps,
) => (
    <Xarrow start={RightSide.Entity.toString()} end={LeftSide.Entity.toString()} />
);

export default Relationship;
