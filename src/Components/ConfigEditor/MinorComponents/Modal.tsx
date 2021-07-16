import React, { useCallback, useMemo } from 'react';
import { AttributeType, IAttribute } from 'api-builder-types';
import { faTimes, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAttributeStore, useEntityStore } from '../../Stores/ConfigEditorStore';
import '../../../Styles/layout.scss';
import { isAttributePK } from 'Helper/EntitiesHelper';
import { saveEntity } from 'Helper/Retriever';

interface ModalProps {
    showing: boolean;
    setShowing: (newValue: boolean) => void;
    entityId: string;
    setDeleted: () => void;
}

const Modal: React.FC<ModalProps> = ({ showing, setShowing, entityId, setDeleted } : ModalProps) => {
    const { update, getAttributesByEntityId, deleteAttribute, addEmptyNewAttribute } = useAttributeStore();
    const { getEntity, setAttributePK, update: updateEntity } = useEntityStore();
    const entity = getEntity(entityId)!!;
    const entityName = entity.Name;
    const modalRows = getAttributesByEntityId(entityId);
    const closeHandler = () => {
        setShowing(false);
    };

    const deleteHandler = () => {
        setDeleted();
        setShowing(false);
    }

    const save = () => {
        saveEntity(entity);
    }

    const computeAttributeTypeElements = useMemo(() => (
        Object.keys(AttributeType).filter((el) => Number.isNaN(+el)).map((key) => (
            <option key={key} value={AttributeType[key as any]}>
                {key}
            </option>
        ))
    ), []);

    const isAttributePKCallback = useCallback((identifier: string) => isAttributePK(entity.PK, identifier), [entity.PK]);

    const computeModalRows = useMemo(() => modalRows?.map((row: IAttribute) => (
        <div key={`modal-row-${row.Identifier}`} className="flex justify-content-between align-items-center padding-5-top-bot">
            <label htmlFor={`input-${row.Identifier}`}>
                <input
                    title={`${row.Name} input`}
                    id={`input-name-${row.Identifier}`}
                    value={row.Name}
                    onChange={(event) => update(entityId, row.Identifier)('Name', event.target.value)}
                />
            </label>
            <div className="text-white">   
                Is Primary Key? <input type="checkbox" checked={isAttributePKCallback(row.Identifier)} onChange={(e) => setAttributePK(row.Identifier, entityId, e.target.checked)}/>
            </div>
            <div className="text-white">   
                Is Mandatory? <input type="checkbox" checked={row.IsMandatory} onChange={(e) => update(entityId, row.Identifier)('IsMandatory', e.target.checked)}/>
            </div>
            <div className="flex select-btn-group btn-group">
                <select
                    id={`input-type-${row.Identifier}`}
                    value={row.Type}
                    onChange={(event) => update(entityId, row.Identifier)('Type', +event.target.value)}
                >
                    {computeAttributeTypeElements}
                </select>
                <button type="button" className="btn btn-outline-danger" onClick={() => deleteAttribute(entityId, row.Identifier)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    )), [update, deleteAttribute, modalRows, entityId, computeAttributeTypeElements, isAttributePKCallback, setAttributePK]);

    return (
        <div className={`modal-edit display-${showing ? 'block' : 'none'}`}>
            <div className="modal-container">
                <div className="flex justify-content-between padding-bot-1rem">
                    <h3 className="text-white">
                        <div>
                            <input 
                                title="Entity Name input"
                                placeholder="Entity Name"
                                className="margin-bot-10"
                                value={entityName}
                                onChange={(event) => updateEntity(entityId)('Name', event.target.value)}
                            />
                        </div>
                    </h3>
                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-danger" onClick={deleteHandler}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <button type="button" className="btn btn-outline-light" onClick={closeHandler}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
                <div>
                <button type="button" className="btn btn-outline-light add" onClick={() => addEmptyNewAttribute(entityId)}>
                        <FontAwesomeIcon icon={faPlus} />
                        Attribute
                    </button>
                </div>
                <div className="rows-container">
                    {computeModalRows}
                </div>
                <button onClick={save}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default Modal;
