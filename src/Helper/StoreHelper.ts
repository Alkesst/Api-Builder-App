import { AttributeType, IAttribute, IEntity } from "api-builder-types";
import { newGuidString } from "./GuidHelper";

export const createEmptyAttribute = (): IAttribute => (
    {
        Identifier: newGuidString(),
        Name: 'New Attribute',
        IsMandatory: false,
        Type: AttributeType.String,
    }
)

export const createEmptyEntity = (entitiesLength: number): IEntity => (
    {
        Name: `New Entity ${entitiesLength}`,
        Relationships: [],
        Constraints: [],
        Coordinates: { X: 0, Y: 0 },
        Identifier: newGuidString(),
        Attributes: [],
        PK: []
    }
)

export const sliceAttributesArray = (attributes: IAttribute[], attributeId: string) => {
    const attributeToUpdateIndex = attributes.findIndex(
        (attribute) => attribute.Identifier === attributeId,
    );
    if (attributeToUpdateIndex === -1) return {slice1: [], slice2: [], attributeToUpdateIndex: -1};
    const slice1 = attributes.slice(0, attributeToUpdateIndex);
    const slice2 = attributes.slice(attributeToUpdateIndex + 1);
    return {slice1, slice2, attributeToUpdateIndex};
}