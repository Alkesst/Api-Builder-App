import React, { useEffect, useState } from 'react';
import { AttributeType, IAttribute } from 'api-builder-types/attribute';
import useStoreGrid from '../../Stores/GridStore';

interface IAttributeProps extends IAttribute {
    entityId: string;
}
const buildAttributeFromProps = (props: IAttributeProps) : IAttribute => {
    const {
        Name, Identifier, Type, IsNullable, Precision, DefaultValue,
    } = props;
    return {
        Name, Identifier, Type, IsNullable, Precision, DefaultValue,
    };
};

const Attribute : React.FC<IAttributeProps> = (props: IAttributeProps) => {
    const { Name, Type } = props;
    const pushNewAttribute = useStoreGrid((state) => state.pushNewAttribute);
    const [name, setName] = useState<string>(Name);
    const [type, setType] = useState<AttributeType>(Type);

    useEffect(() => {
        pushNewAttribute({
            attribute: buildAttributeFromProps(props),
            entityId: props.entityId,
            onChangeHandler: setName,
            typeOnChangeHandler: setType,
        });
    }, [pushNewAttribute, setName, setType, props]);

    return (
        <div className="flex content-space-between padding-sides-5">
            <div>
                {name}
            </div>
            <div>
                {type}
            </div>
        </div>
    );
};

export default Attribute;
