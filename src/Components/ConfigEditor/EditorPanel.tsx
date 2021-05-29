import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IEntity } from 'api-builder-types';

interface IEditorPanelProps {
    expanded: boolean,
    setExpanded: (newValue: boolean) => void;
    projectEntities: IEntity[];
}

const EditorPanel : React.FC<IEditorPanelProps> = ({
    expanded,
    setExpanded,
    projectEntities,
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
            <button className={`Grid-Expander Grid-Panel-${buttonStyle} btn btn-outline-light margin-bot-10`} type="button" onClick={expandHandler}>
                <FontAwesomeIcon icon={(expanded) ? faAngleLeft : faAngleRight} />
            </button>
            <div className={`Panel-Color ${(!expanded) ? 'Hidden' : ''}`}>
                <div className="Panel-Color Content padding-5">
                    Project Entities:
                    {projectEntities.map((el) => (
                        <div className="padding-5" key={`${el.Name}-panel-label`}>
                            {el.Name}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EditorPanel;
