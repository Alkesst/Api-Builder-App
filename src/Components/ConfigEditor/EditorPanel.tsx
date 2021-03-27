import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Guid } from 'guid-typescript';
import { IProjectConfig } from 'api-builder-types/project-config';
import { retrieveProjectConfig } from '../../Helper/Retriever';

interface IEditorPanelProps {
    expanded: boolean,
    setExpanded: any;
    configId?: Guid;
}

const defaultProps = {
    configId: undefined,
};

const EditorPanel : React.FC<IEditorPanelProps> = ({
    expanded,
    setExpanded,
    configId,
}: IEditorPanelProps) => {
    const expandHandler = () => {
        setExpanded(!expanded);
    };

    const [buttonStyle, setButtonStyle] = useState('Expanded');
    const [config, setConfig] = useState<IProjectConfig>();

    useEffect(() => {
        if (expanded === undefined) {
            setExpanded(true);
        }
        setButtonStyle((expanded) ? 'Expanded' : 'Hidden');
        if (config === undefined && configId) {
            retrieveProjectConfig()
                .then((result: IProjectConfig) => setConfig(result));
        }
    }, [expanded, setExpanded, config, configId]);

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

EditorPanel.defaultProps = defaultProps;

export default EditorPanel;
