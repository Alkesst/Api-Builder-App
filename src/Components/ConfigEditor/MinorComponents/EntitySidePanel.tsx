import React, { useEffect, useMemo, useState } from 'react';
import { IEntity } from 'api-builder-types';
import Button from 'react-bootstrap/cjs/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Collapse from 'react-bootstrap/cjs/Collapse';
import Attribute from './Attribute';
import { useEntityStore } from '../../Stores/ConfigEditorStore';

interface EntitySidePanelProps {
    entityId: string;
    setEntityId: (newValue: string) => void;
    setEdit: (value: boolean) => void;
    hidden: boolean;
}

const EntitySidePanel: React.FC<EntitySidePanelProps> = (
    {
        entityId, setEntityId, setEdit, hidden,
    }: EntitySidePanelProps,
) => {
    const { getEntity } = useEntityStore();
    const [entity, setEntity] = useState<IEntity>();
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        if (!entity) setEntity((getEntity(entityId)));
    }, [getEntity, entityId, entity, setEntity]);

    const attributes = useMemo(() => (
        <Collapse in={expanded}>
            <div>
                {entity?.Attributes.map((attribute) => (
                    <Attribute
                        key={`side-panel-attr-${attribute.Identifier}`}
                        Identifier={attribute.Identifier}
                        Name={attribute.Name}
                        Type={attribute.Type}
                        IsNullable={attribute.IsNullable}
                    />
                ))}
            </div>
        </Collapse>
    ), [expanded, entity]);

    const setExpandedCallback = () => setExpanded(!expanded);
    const editCallback = () => {
        setEntityId(entityId);
        setEdit(true);
    };

    return (
        <div className={`padding-top-5 entity side-panel ${(hidden) ? 'hidden' : ''} padding-bot-10`}>
            {entity && (
                <div className="flex align-items-center justify-content-between padding-bot-5">
                    <div>
                        {entity.Name}
                    </div>
                    <div className="btn-group">
                        <button
                            className="btn btn-outline-light"
                            type="button"
                            onClick={editCallback}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <Button
                            onClick={setExpandedCallback}
                            aria-controls="example-collapse-text"
                            aria-expanded={expanded}
                            className="btn btn-outline-light"
                        >
                            <FontAwesomeIcon icon={(!expanded) ? faAngleDown : faAngleUp} />
                        </Button>
                    </div>
                </div>
            )}
            {entity && attributes}
        </div>
    );
};

export default EntitySidePanel;
