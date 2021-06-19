import React from 'react';
import { AttributeType, IAttribute } from 'api-builder-types/attribute';
import '../../../Styles/ConfigEditor/Attributes.scss';

interface IAttributeProps extends IAttribute {
}

const Attribute : React.FC<IAttributeProps> = ({ Name, Type }: IAttributeProps) => (
    <div className="flex content-space-between padding-sides-5 padding-top-5 Attribute">
        <div>
            {Name}
        </div>
        <div>
            {AttributeType[Type]}
        </div>
    </div>
);

export default Attribute;
