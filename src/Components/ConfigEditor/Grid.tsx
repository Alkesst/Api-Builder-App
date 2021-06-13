import React, {
    useCallback,
    useMemo, useState,
} from 'react';
import { IEntity } from 'api-builder-types';
import { IRelationship } from 'api-builder-types/relationship';
import Entity from './MinorComponents/Entity';
import { hasRelationships, getEntityReference } from '../../Helper/RelationshipHelper';
import { EntityReference } from '../../Types/ViewTypes';
import Relationship from './MinorComponents/Relationship';
import 'Styles/ConfigEditor/Modal.scss';

interface IGridProps {
    expanded: boolean;
    projectEntities: IEntity[];
    loading: boolean;
    projectType: string;
    setEntityId: (newValue: string) => void;
    setEdit: (value: boolean) => void;
}

const Grid : React.FC<IGridProps> = (
    {
        expanded, projectEntities, loading, projectType, setEntityId, setEdit,
    }
    : IGridProps,
) => {
    const [,setEntityBeingDragged] = useState<boolean>(false);
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

    return (
        <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
            {projectType}
            {!loading && generateEntities}
            {entityRelationships}
        </div>
    );
};

export default Grid;
