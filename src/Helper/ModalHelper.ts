import { AttributeType, IAttribute } from 'api-builder-types';
import { ModalInputRow } from '../Types/ViewTypes';

export const fromAttributeToModalInputRow = (
    attributeRow: IAttribute,
): ModalInputRow => ({
    id: attributeRow.Identifier,
    inputType: attributeRow.Type,
    label: attributeRow.Name,
    // inputOnChangeHandler: attributeRow.onChangeHandler,
    // typeOnChangeHandler: attributeRow.typeOnChangeHandler,
    dropdownValue: AttributeType[attributeRow.Type],
});

export const fromAttributesToModalInputRows = (
    entries: IAttribute[],
) => entries.map((element) => fromAttributeToModalInputRow(element));
