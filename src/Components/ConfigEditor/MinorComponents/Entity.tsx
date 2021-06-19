import React, {
    useEffect, useMemo, useRef, useState,
} from 'react';
import Draggable from 'react-draggable';
import 'Styles/ConfigEditor/Entity.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/cjs/Button';
import Collapse from 'react-bootstrap/cjs/Collapse';
import { useAttributeStore, useEntityStore } from '../../Stores/ConfigEditorStore';
import Attribute from './Attribute';

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
        <Collapse in={expanded}>
            <div>
                {Attributes?.map((item) => (
                    <Attribute
                        key={item.Identifier}
                        Name={item.Name}
                        Type={item.Type}
                        Identifier={item.Identifier}
                        DefaultValue={null}
                        Precision={null}
                        IsNullable
                    />
                ))}
            </div>
        </Collapse>
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
                    <div className="flex justify-content-between align-items-center">
                        {Name}
                        <div className="btn-group">
                            <button
                                className="btn btn-outline-light"
                                type="button"
                                onClick={() => onEditHandler(Identifier)}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                            <Button
                                onClick={expandHandler}
                                aria-controls="example-collapse-text"
                                aria-expanded={expanded}
                                className="btn btn-outline-light"
                            >
                                <FontAwesomeIcon icon={(!expanded) ? faAngleDown : faAngleUp} />
                            </Button>
                        </div>
                    </div>
                    {computeAttributes()}
                </div>
            </Draggable>
        </div>
    );
};

export default Entity;
