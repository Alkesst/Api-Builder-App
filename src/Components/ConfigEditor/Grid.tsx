import React, {
    useCallback, useEffect,
    useMemo, useState,
} from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IEntity } from 'api-builder-types';
import { IRelationship } from 'api-builder-types/relationship';
import Entity from './MinorComponents/Entity';
import { hasRelationships, getEntityReference } from '../../Helper/RelationshipHelper';
import { EntityReference } from '../../Types/ViewTypes';
import Relationship from './MinorComponents/Relationship';
import 'Styles/ConfigEditor/Modal.scss';
import { useEntityStore } from '../Stores/ConfigEditorStore';

interface IGridProps {
    expanded: boolean;
    loading: boolean;
    projectType: string;
    setEntityId: (newValue: string) => void;
    setEdit: (value: boolean) => void;
}

const Grid : React.FC<IGridProps> = (
    {
        expanded, loading, projectType, setEntityId, setEdit,
    }
    : IGridProps,
) => {
    const [,setEntityBeingDragged] = useState<boolean>(false);
    const [projectEntities, setProjectEntities] = useState<IEntity[]>([]);
    const { addEmptyNewEntity, entities } = useEntityStore();

    const onEditHandler = useCallback((selectedEntityId: string) => {
        setEdit(true);
        setEntityId(selectedEntityId);
    }, [setEdit, setEntityId]);

    const entityRelationships = projectEntities.map((entity: IEntity) => (
        entity.Relationships.map((relationship: IRelationship) => (
            <Relationship
                key={relationship.Identifier.toString()}
                Entity={entity.Identifier}
                RightSide={relationship.RightSide}
                Identifier={relationship.Identifier}
            />
        ))
    ));

    const onDragHandler = useCallback((dragging: boolean) => {
        if (dragging) {
            setEntityBeingDragged(!dragging);
        }
        setEntityBeingDragged(dragging);
    }, []);

    const references: EntityReference[] = useMemo(() => {
        const tempRefObject: EntityReference[] = [];
        if (projectEntities && projectEntities.length > 0) {
            projectEntities.forEach((element: IEntity) => {
                if (hasRelationships(element)) {
                    element.Relationships.forEach((relation: IRelationship) => {
                        tempRefObject.push({
                            entityId: relation.RightSide.Entity.toString(),
                            reference: React.createRef(),
                        });
                    });
                }
            });
        }
        return tempRefObject;
    }, [projectEntities]);

    const newEntityCallback = () => {
        addEmptyNewEntity();
    };

    const generateEntities = useMemo(() => projectEntities.map((entity: IEntity) => {
        const entityRef = getEntityReference(references, entity.Identifier);
        return (
            <div ref={entityRef} key={`div-${entity.Identifier}`}>
                <Entity
                    key={entity.Identifier}
                    Identifier={entity.Identifier}
                    onDragHandler={onDragHandler}
                    onEditHandler={onEditHandler}
                />
            </div>
        );
    }), [onDragHandler, projectEntities, references, onEditHandler]);

    useEffect(() => {
        setProjectEntities(entities);
    }, [entities]);

    return (
        <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
            <div className="flex align-items-center padding-top-10 padding-left-10">
                {projectType}
                <div className="padding-left-10">
                    <button type="button"className="btn square btn-outline-light" onClick={newEntityCallback}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            {!loading && generateEntities}
            {entityRelationships}
        </div>
    );
};

export default Grid;
