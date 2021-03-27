import React, { useRef } from 'react';
import Xarrow from 'react-xarrows';

interface IRelationshipProps {
    entityId: string;
}

const Relationship : React.FC<IRelationshipProps> = ({ entityId }: IRelationshipProps) => {
    const box1Ref = useRef(null);
    return (
        <Xarrow start={box1Ref} end={entityId} />
    );
};

export default Relationship;
