import React, { useEffect } from 'react';
import { AttributeType, IAttribute } from 'api-builder-types/attribute';

interface IAttributeProps extends IAttribute {
    entityId: string;
}

const Attribute : React.FC<IAttributeProps> = ({ Name, Type, entityId }: IAttributeProps) => {
    useEffect(() => {
        console.log(entityId);
    }, []);

    return (
        <div className="flex content-space-between padding-sides-5">
            <div>
                {Name}
            </div>
            <div>
                {AttributeType[Type]}
            </div>
        </div>
    );
};

export default Attribute;
