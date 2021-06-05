/// <reference types="react-scripts" />
import { MutableRefObject } from 'react';
import { AttributeType, IAttribute } from 'api-builder-types';

export type StateSetterCallback = (newValue: any) => void;

export interface EntityReference {
    entityId: string;
    reference: MutableRefObject<any>
}

export interface ModalInputRow {
    label: string;
    inputType: AttributeType;
    inputOnChangeHandler: StateSetterCallback;
    dropdownValue: string;
    typeOnChangeHandler: StateSetterCallback;
    id: string;
}

export interface AttributeChangeHandlerRow {
    attribute: IAttribute;
    onChangeHandler: StateSetterCallback;
    typeOnChangeHandler: StateSetterCallback;
}

export interface EntityAttribute {
    entityId: string;
    attribute: IAttribute;
    onChangeHandler: StateSetterCallback;
    typeOnChangeHandler: StateSetterCallback;
}
