import { Guid } from "guid-typescript"

export const newGuidString = () => {
    const guid = Guid.create();
    return guid.toString();
}