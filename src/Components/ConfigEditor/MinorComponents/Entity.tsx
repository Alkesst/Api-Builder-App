import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import 'Styles/ConfigEditor/Entity.scss';
import { IEntity } from 'api-builder-types/entity';
import Attribute from './Attribute';

interface IEntityProps extends IEntity {
}

const Entity : React.FC<IEntityProps> = ({ Name, Coordinates, Attributes }: IEntityProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => { }, [expanded]);

    const expandHandler = () => {
        setExpanded(!expanded);
    };

    const computeAttributes = () => (
        Attributes.map((item) => (
            <Attribute
                Name={item.Name}
                Type={item.Type}
                Identifier={item.Identifier}
                DefaultValue={null}
                Precision={null}
                IsNullable
                Value={null}
            />
        ))
    );

    return (
        <Draggable
            defaultClassName="Entity"
            defaultPosition={{ x: Coordinates.X, y: Coordinates.Y }}
        >
            <div>
                {Name}
                <button onClick={expandHandler} type="button">
                    Expand
                </button>
                {(expanded) ? <button type="button">Edit</button> : <> </>}
                {(expanded) ? computeAttributes() : <> </>}
            </div>
        </Draggable>
    );
};

export default Entity;
