import React, {
    useEffect, useRef, useState,
} from 'react';
import Draggable from 'react-draggable';
import 'Styles/ConfigEditor/Entity.scss';
import { IEntity } from 'api-builder-types/entity';
import Attribute from './Attribute';

interface IEntityProps extends IEntity {
}

const Entity : React.FC<IEntityProps> = (
    {
        Identifier, Name, Coordinates, Attributes,
    }: IEntityProps,
) => {
    const nodeRef = useRef(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
    }, [expanded]);

    const expandHandler = () => {
        setExpanded(!expanded);
    };

    const computeAttributes = () => (
        Attributes.map((item) => (
            <Attribute
                key={item.Identifier.toString()}
                Name={item.Name}
                Type={item.Type}
                Identifier={item.Identifier}
                DefaultValue={null}
                Precision={null}
                IsNullable
            />
        ))
    );

    return (
        <div>
            <Draggable
                nodeRef={nodeRef}
                defaultClassName="Entity"
                defaultPosition={{ x: +Coordinates.X, y: +Coordinates.Y }}
                // onDrag={recalculateRelationship}
            >
                <div ref={nodeRef} id={Identifier.toString()}>
                    {Name}
                    <button onClick={expandHandler} type="button">
                        Expand
                    </button>
                    {(expanded) ? <button type="button">Edit</button> : <> </>}
                    {(expanded) ? computeAttributes() : <> </>}
                </div>
            </Draggable>
        </div>
    );
};

export default Entity;
