import React, { useEffect, useState } from 'react';
import '../../Styles/Grid.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Grid : React.FC = () => {
    const [expanded, setExpanded] = useState<boolean>();
    const [buttonStyle, setButtonStyle] = useState('Expanded');
    useEffect(() => {
        if (expanded === undefined) {
            setExpanded(true);
        }
        setButtonStyle((expanded) ? 'Expanded' : 'Hidden');
    }, [expanded]);

    const expandHandler = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="App-Background-Height Grid">
            <button className={`Grid-Expander Grid-Panel-${buttonStyle} btn btn-outline-light`} type="button" onClick={expandHandler}>
                <FontAwesomeIcon icon={(expanded) ? faAngleLeft : faAngleRight} />
            </button>
            <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''}`}>
                Ey
            </div>
            <div className={`Panel-Color ${(!expanded) ? 'Hidden' : ''}`}>
                <div className="Panel-Color Content">
                    Jose
                </div>
            </div>
        </div>
    );
};

export default Grid;
