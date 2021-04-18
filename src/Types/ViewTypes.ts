/// <reference types="react-scripts" />
import { MutableRefObject } from 'react';

export interface EntityReference {
    entityId: string;
    reference: MutableRefObject<any>
}
