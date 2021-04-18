import React, { useMemo } from 'react';
import { IEntity } from 'api-builder-types';
import { IRelationship } from 'api-builder-types/relationship';
import Entity from './MinorComponents/Entity';
import { hasRelationships, getEntityReference } from '../../Helper/RelationshipHelper';
import { EntityReference } from '../../Types/ViewTypes';

interface IGridProps {
    expanded: boolean;
    projectEntities: IEntity[];
    loaded: boolean;
}

const Grid : React.FC<IGridProps> = ({ expanded, projectEntities, loaded }: IGridProps) => {
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
        const entityRef = getEntityReference(references, entity.Identifier.toString());
        return (
            <div ref={entityRef} key={`div-${entity.Identifier.toString()}`}>
                <Entity
                    key={entity.Identifier.toString()}
                    Identifier={entity.Identifier}
                    Name={entity.Name}
                    Relationships={entity.Relationships}
                    Attributes={entity.Attributes}
                    Coordinates={entity.Coordinates}
                    Constraints={entity.Constraints}
                />
            </div>
        );
    }), [projectEntities, references]);

    /*
    * const recalculateRelationship = () => setRelationships(Relationships.map((item) => (
        <Relationship
            key={item.Identifier.toString()}
            LeftSide={item.LeftSide}
            RightSide={item.RightSide}
            Identifier={item.Identifier}
        />
    )));
    * */
    return (
        <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
            Ey
            {loaded && generateEntities}
        </div>
    );
};

export default Grid;
