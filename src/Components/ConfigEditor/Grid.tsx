import React, { useState } from 'react';
import { IEntity } from 'api-builder-types';
import { IRelationship } from 'api-builder-types/relationship';
import Entity from './MinorComponents/Entity';
import { hasRelationships, getEntityReference } from '../../Helper/RelationshipHelper';
import { EntityReference } from '../../Types/react-app-env';

interface IGridProps {
    expanded: boolean;
    projectEntities: IEntity[];
    loaded: boolean;
}

const Grid : React.FC<IGridProps> = ({ expanded, projectEntities, loaded }: IGridProps) => {
    const [entityReferences, setEntityReferences] = useState<EntityReference[]>([]);
    const [entities, setEntities] = useState();

    const generateReferences = () => {
        const tempRefObject: EntityReference[] = [];
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
        setEntityReferences(tempRefObject);
    };

    const generateEntities = () => {
        generateReferences();
        return projectEntities.map((entity: IEntity) => {
            const entityRef = getEntityReference(entityReferences, entity.Identifier.toString());
            return (
                <div ref={entityRef}>
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
        });
    };
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
            {loaded && generateEntities()}
        </div>
    );
};

export default Grid;
