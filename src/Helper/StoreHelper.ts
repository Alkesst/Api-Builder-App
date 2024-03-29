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
    const [slice1, slice2] = sliceArray<IAttribute>(attributes, attributeToUpdateIndex)
    return {slice1, slice2, attributeToUpdateIndex};
}

export const sliceArray = <T>(arrayToSplit: T[], index: number): [T[], T[]] => {
    const slice1 = arrayToSplit.slice(0, index);
    const slice2 = arrayToSplit.slice(index + 1);
    return [slice1, slice2];
}