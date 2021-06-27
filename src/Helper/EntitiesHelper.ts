export const isAttributePK =  (entityPKS: string[], identifier: string): boolean => {
    return entityPKS.findIndex((atr) => atr === identifier) !== -1;
}
