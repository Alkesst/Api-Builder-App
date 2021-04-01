import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import 'Styles/ConfigEditor/Entity.scss';
import { IEntity } from 'api-builder-types/entity';
import Attribute from './Attribute';
import Relationship from './Relationship';

interface IEntityProps extends IEntity {
}

const Entity : React.FC<IEntityProps> = (
    {
        Name, Coordinates, Attributes, Relationships,
    }: IEntityProps,
) => {
    const nodeRef = useRef(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => { }, [expanded]);

    const expandHandler = () => {
        setExpanded(!expanded);
    };

    const computeAttributes = () => (
        Attributes.map((item) => (
            <Attribute
                Name={item.Name}
                Type={item.Type}
                Identifier={item.Identifier}
                DefaultValue={null}
                Precision={null}
                IsNullable
            />
        ))
    );

    const computeRelationships = () => {
        Relationships.map((item) => (<Relationship entityId={item.Identifier.toString()} />));
    };

    return (
        <>
            <Draggable
                nodeRef={nodeRef}
                defaultClassName="Entity"
                defaultPosition={{ x: Coordinates.X, y: Coordinates.Y }}
            >
                <div ref={nodeRef}>
                    {Name}
                    <button onClick={expandHandler} type="button">
                        Expand
                    </button>
                    {(expanded) ? <button type="button">Edit</button> : <> </>}
                    {(expanded) ? computeAttributes() : <> </>}
                </div>
            </Draggable>
            {computeRelationships()}
        </>
    );
};

export default Entity;
