import React, {
    useEffect, useMemo, useRef, useState,
} from 'react';
import Draggable from 'react-draggable';
import 'Styles/ConfigEditor/Entity.scss';
import Attribute from './Attribute';
import { useAttributeStore, useEntityStore } from '../../Stores/ConfigEditorStore';

interface IEntityProps {
    Identifier: string;
    onDragHandler: (dragging: boolean) => void;
    onEditHandler: (entityId: string) => void;
}

const Entity : React.FC<IEntityProps> = (
    {
        Identifier, onDragHandler, onEditHandler,
    }: IEntityProps,
) => {
    const { getEntity } = useEntityStore();
    const { getAttributesByEntityId } = useAttributeStore();
    const { Name, Coordinates } = useMemo(() => getEntity(Identifier), [Identifier, getEntity])!!;
    const Attributes = getAttributesByEntityId(Identifier);
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
                key={item.Identifier}
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
                onDrag={() => onDragHandler(true)}
                onStop={() => onDragHandler(false)}
            >
                <div ref={nodeRef} id={Identifier} className="padding-10">
                    {Name}
                    <button onClick={expandHandler} type="button">
                        Expand
                    </button>
                    {(expanded) ? <button type="button" onClick={() => onEditHandler(Identifier)}>Edit</button> : <> </>}
                    {(expanded) ? computeAttributes() : <> </>}
                </div>
            </Draggable>
        </div>
    );
};

export default Entity;
