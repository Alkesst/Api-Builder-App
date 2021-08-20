import React, { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IEntity } from 'api-builder-types';
import EntitySidePanel from './MinorComponents/EntitySidePanel';

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
    const [filteredEntities, setFilteredEntities] = useState<IEntity[]>([]);
    const [searching, setSearching] = useState<boolean>(false);

    useEffect(() => {
        setFilteredEntities(projectEntities);
        if (expanded === undefined) {
            setExpanded(true);
        }
        setButtonStyle((expanded) ? 'Expanded' : 'Hidden');
    }, [expanded, setExpanded, projectEntities, setFilteredEntities]);

    const handleFiltering = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === '' || !event.target.value) {
            setFilteredEntities(projectEntities); 
            return;
        }
        const a = filteredEntities?.filter((e: IEntity) => e.Name.toLowerCase().includes(event.target.value.toLocaleLowerCase()));
        setFilteredEntities(a);
    }

    return (
        <>
            <button className={`Grid-Expander Grid-Panel-${buttonStyle} btn btn-outline-light margin-bot-10`} type="button" onClick={expandHandler}>
                <FontAwesomeIcon icon={(expanded) ? faAngleLeft : faAngleRight} />
            </button>
            <div className={`Panel-Color ${(!expanded) ? 'Hidden' : ''}`}>
                <div className="Panel-Color Content padding-5">
                    <div className="flex justify-content-between align-items-center padding-right-15">
                        {!searching && <div>Project Entities:</div>}
                        <div className={`padding-right-5 ${(!expanded) ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faSearch} onClick={(e) => setSearching(!searching)} />
                            {searching && 
                                    <input className="margin-left-15 max-width" onChange={(e) => handleFiltering(e)} />
                            }
                        </div>
                        </div>
                        
                    {filteredEntities.map((el) => (
                        <EntitySidePanel
                            hidden={!expanded}
                            key={`side-panel-${el.Identifier}`}
                            entityId={el.Identifier}
                            setEntityId={setEntityId}
                            setEdit={setEdit}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EditorPanel;
