import React from 'react';
import { IAttribute } from 'api-builder-types/attribute';

interface IAttributeProps extends IAttribute {
}

const Attribute : React.FC<IAttributeProps> = ({ Name, Type }: IAttributeProps) => (
    <div>
        {Name}
        {Type}
    </div>
);

export default Attribute;
