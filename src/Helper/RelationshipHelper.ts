import { IEntity } from 'api-builder-types';

const hasRelationships = (
    entity: IEntity,
) => entity.Relationships && entity.Relationships.length > 0;

export default {
    hasRelationships,
};
