import { IEntity } from 'api-builder-types';
import { EntityReference } from '../Types/ViewTypes';

export const hasRelationships = (
    entity: IEntity,
) => entity.Relationships && entity.Relationships.length > 0;

export const getEntityReference = (entityRefs: EntityReference[], entityId: string) => {
    const findResult = entityRefs.find(
        (entityRef: EntityReference) => entityRef.entityId === entityId,
    );
    if (findResult) return findResult.reference;
    return undefined;
};
