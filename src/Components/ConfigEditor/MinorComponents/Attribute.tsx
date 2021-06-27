import React from 'react';
import { AttributeType, IAttribute } from 'api-builder-types/attribute';
import '../../../Styles/ConfigEditor/Attributes.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

interface IAttributeProps extends IAttribute {
    isPK?: boolean;
}

const Attribute : React.FC<IAttributeProps> = ({ Name, Type, isPK }: IAttributeProps) => (
    <div className="flex content-space-between padding-sides-5 padding-top-5 Attribute">
        <div className="attribute-name">
            {Name}
            {isPK && <FontAwesomeIcon icon={faKey} />}
        </div>
        <div>
            {AttributeType[Type]}
        </div>
    </div>
);

export default Attribute;
