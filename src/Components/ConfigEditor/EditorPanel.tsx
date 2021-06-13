import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IEntity } from 'api-builder-types';

interface IEditorPanelProps {
    expanded: boolean,
    setExpanded: (newValue: boolean) => void;
    projectEntities: IEntity[];
    setEntityId: (newValue: string) => void;
    setEdit: (value: boolean) => void;
}

const EditorPanel : React.FC<IEditorPanelProps> = ({
    expanded,
    setExpanded,
    projectEntities,
    setEntityId,
    setEdit,
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

    const handleClickEntity = (entityId: string) => {
        setEntityId(entityId);
        setEdit(true);
    };

    return (
        <>
            <button className={`Grid-Expander Grid-Panel-${buttonStyle} btn btn-outline-light margin-bot-10`} type="button" onClick={expandHandler}>
                <FontAwesomeIcon icon={(expanded) ? faAngleLeft : faAngleRight} />
            </button>
            <div className={`Panel-Color ${(!expanded) ? 'Hidden' : ''}`}>
                <div className="Panel-Color Content padding-5">
                    Project Entities:
                    {projectEntities.map((el) => (
                        <button
                            type="button"
                            className="padding-5"
                            key={`${el.Name}-panel-label`}
                            onClick={() => handleClickEntity(el.Identifier)}
                        >
                            {el.Name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EditorPanel;
