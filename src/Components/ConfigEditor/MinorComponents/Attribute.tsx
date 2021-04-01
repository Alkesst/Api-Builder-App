import React from 'react';
import { AttributeType, IAttribute } from 'api-builder-types/attribute';

interface IAttributeProps extends IAttribute {
}

const Attribute : React.FC<IAttributeProps> = ({ Name, Type }: IAttributeProps) => (
    <div>
        {Name}
        {AttributeType[Type]}
    </div>
);

export default Attribute;
