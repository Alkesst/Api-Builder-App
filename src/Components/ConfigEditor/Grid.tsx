import React, {
    useCallback,
    useMemo, useState,
} from 'react';
import { IEntity } from 'api-builder-types';
import { IRelationship } from 'api-builder-types/relationship';
import Entity from './MinorComponents/Entity';
import { hasRelationships, getEntityReference } from '../../Helper/RelationshipHelper';
import { EntityReference, ModalInputRow } from '../../Types/ViewTypes';
import Relationship from './MinorComponents/Relationship';
import 'Styles/ConfigEditor/Modal.scss';
import Modal from './MinorComponents/Modal';
import { fromAttributesToModalInputRows } from '../../Helper/ModalHelper';
import { useEntityStore } from '../Stores/ConfigEditorStore';
// import { fromAttributesToModalInputRows } from '../../Helper/ModalHelper';

interface IGridProps {
    expanded: boolean;
    projectEntities: IEntity[];
    loading: boolean;
    projectType: string;
}

const Grid : React.FC<IGridProps> = (
    {
        expanded, projectEntities, loading, projectType,
    }
    : IGridProps,
) => {
    const { entities } = useEntityStore();
    const [,setEntityBeingDragged] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [modalRows, setModalRows] = useState<ModalInputRow[]>([]);

    const onEditHandler = useCallback((entityId: string) => {
        const currentEntity = entities.find((entity) => entity.Identifier === entityId);
        const modalRowsTemp = fromAttributesToModalInputRows(currentEntity?.Attributes!!);
        setModalRows(modalRowsTemp);
        setEdit(true);
    }, [entities]);

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
                    Name={entity.Name}
                    Relationships={entity.Relationships}
                    onDragHandler={onDragHandler}
                    Attributes={entity.Attributes}
                    Coordinates={entity.Coordinates}
                    Constraints={entity.Constraints}
                    onEditHandler={onEditHandler}
                />
            </div>
        );
    }), [onDragHandler, projectEntities, references, onEditHandler]);

    return (
        <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
            {projectType}
            <Modal showing={edit} setShowing={setEdit} modalRows={modalRows} />
            {!loading && generateEntities}
            {entityRelationships}
        </div>
    );
};

export default Grid;
