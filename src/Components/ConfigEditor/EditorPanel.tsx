import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface IEditorPanelProps {
    expanded: boolean,
    setExpanded: any;
}

const EditorPanel : React.FC<IEditorPanelProps> = ({
    expanded,
    setExpanded,
}: IEditorPanelProps) => {
    const expandHandler = () => {
        setExpanded(!expanded);
    };

    const [buttonStyle, setButtonStyle] = useState('Expanded');

    useEffect(() => {
        if (expanded === undefined) {
            setExpanded(true);
        }
        setButtonStyle((expanded) ? 'Expanded' : 'Hidden');
    }, [expanded, setExpanded]);

    return (
        <>
            <button className={`Grid-Expander Grid-Panel-${buttonStyle} btn btn-outline-light`} type="button" onClick={expandHandler}>
                <FontAwesomeIcon icon={(expanded) ? faAngleLeft : faAngleRight} />
            </button>
            <div className={`Panel-Color ${(!expanded) ? 'Hidden' : ''}`}>
                <div className="Panel-Color Content">
                    Jose
                </div>
            </div>
        </>
    );
};

export default EditorPanel;
