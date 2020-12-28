import React, { useState } from 'react';
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
        <div
            className="Entity"
            style={{
                position: 'relative',
                right: coordinates.x,
                top: coordinates.y,
            }}
        >
            {name}
            <button onClick={expandHandler} type="button">
                Expand
            </button>
        </div>
    );
};

export default Entity;
