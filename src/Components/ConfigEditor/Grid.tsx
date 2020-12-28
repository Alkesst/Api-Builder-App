import React, { useEffect, useState } from 'react';
import '../../Styles/Grid.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Grid : React.FC = () => {
    const [expanded, setExpanded] = useState<boolean>();
    const [availableColumns, setAvailableColumns] = useState(12);
    const [buttonStyle, setButtonStyle] = useState('Expanded');
    useEffect(() => {
        if (expanded === undefined) {
            setExpanded(true);
        }
        setButtonStyle((expanded) ? 'Expanded' : 'Hidden');
        setAvailableColumns((expanded) ? 10 : 12);
    }, [expanded, availableColumns]);

    const expandHandler = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="App-Background-Height Grid">
            <button className={`Grid-Expander Grid-Panel-${buttonStyle} btn btn-outline-light`} type="button" onClick={expandHandler}>
                <FontAwesomeIcon icon={(expanded) ? faAngleLeft : faAngleRight} />
            </button>
            <div className={`Grid-Color ${(expanded) ? 'Expanded' : ''} col-${availableColumns}`}>
                Ey
            </div>
            <div className={`Panel-Color ${(!expanded) ? 'Hidden' : ''} col-2`}>
                Josep
            </div>
        </div>
    );
};

export default Grid;
