import React, { useState } from 'react';
import Draggable from 'react-draggable';
import 'Styles/ConfigEditor/Entity.scss';

interface IEntityProps {
    name: string;
    coordinates: {x: number, y: number}
}

const Entity : React.FC<IEntityProps> = ({ name, coordinates }: IEntityProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const expandHandler = () => {
        setExpanded(!expanded);
    };

    return (
        <Draggable
            defaultClassName="Entity"
            defaultPosition={{ x: coordinates.x, y: coordinates.y }}
        >
            <div>
                {name}
                <button onClick={expandHandler} type="button">
                    Expand
                </button>
            </div>
        </Draggable>
    );
};

export default Entity;
