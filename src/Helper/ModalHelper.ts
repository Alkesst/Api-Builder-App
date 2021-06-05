import { AttributeChangeHandlerRow, ModalInputRow } from '../Types/ViewTypes';

export const fromAttributeToModalInputRow = (
    attributeRow: AttributeChangeHandlerRow,
): ModalInputRow => ({
    id: attributeRow.attribute.Identifier,
    inputType: attributeRow.attribute.Type,
    label: attributeRow.attribute.Name,
    inputOnChangeHandler: attributeRow.onChangeHandler,
    typeOnChangeHandler: attributeRow.typeOnChangeHandler,
});

export const fromAttributesToModalInputRows = (
    entries: AttributeChangeHandlerRow[],
) => entries.map((element) => fromAttributeToModalInputRow(element));
