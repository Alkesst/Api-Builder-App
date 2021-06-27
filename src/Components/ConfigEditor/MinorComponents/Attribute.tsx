import React from 'react';
import { AttributeType, IAttribute } from 'api-builder-types/attribute';
import '../../../Styles/ConfigEditor/Attributes.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAsterisk } from '@fortawesome/free-solid-svg-icons';

interface IAttributeProps extends IAttribute {
    isPK?: boolean;
}

const Attribute : React.FC<IAttributeProps> = ({ Name, Type, isPK, IsMandatory }: IAttributeProps) => (
    <div className="flex content-space-between padding-sides-5 padding-top-5 Attribute">
        <div className="attribute-name">
            {Name}
            {isPK && <FontAwesomeIcon icon={faKey} title="Primary Key" />}
        </div>
        <div className="attribute-type">
            {IsMandatory && <FontAwesomeIcon icon={faAsterisk} title="Mandatory"/>}
            {AttributeType[Type]}
        </div>
    </div>
);

export default Attribute;
