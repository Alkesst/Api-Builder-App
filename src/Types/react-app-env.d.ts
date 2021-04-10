/// <reference types="react-scripts" />
import { MutableRefObject } from 'react';

interface EntityReference {
    entityId: string;
    reference: MutableRefObject<any>
}
