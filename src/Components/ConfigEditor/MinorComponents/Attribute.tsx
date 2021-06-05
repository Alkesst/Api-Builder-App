import React, { useEffect, useState } from 'react';
import { AttributeType, IAttribute } from 'api-builder-types/attribute';
// import useStoreGrid from '../../Stores/GridStore';

interface IAttributeProps extends IAttribute {
    // entityId: string;
}
/* const buildAttributeFromProps = (props: IAttributeProps) : IAttribute => {
    const {
        Name, Identifier, Type, IsNullable, Precision, DefaultValue,
    } = props;
    return {
        Name, Identifier, Type, IsNullable, Precision, DefaultValue,
    };
}; */

const Attribute : React.FC<IAttributeProps> = ({ Name, Type }: IAttributeProps) => {
    // const pushNewAttribute = useStoreGrid((state) => state.pushNewAttribute);
    const [needsInit, setNeedsInit] = useState<boolean>(true);

    useEffect(() => {
        if (needsInit) {
            setNeedsInit(false);
        }
    }, [needsInit]);

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
