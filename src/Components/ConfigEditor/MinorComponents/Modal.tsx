import React, { useMemo } from 'react';
import { AttributeType, IAttribute } from 'api-builder-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAttributeStore, useEntityStore } from '../../Stores/ConfigEditorStore';

interface ModalProps {
    showing: boolean;
    setShowing: (newValue: boolean) => void;
    entityId: string;
}

const Modal: React.FC<ModalProps> = ({ showing, setShowing, entityId } : ModalProps) => {
    const { update, getAttributesByEntityId } = useAttributeStore();
    const { getEntity } = useEntityStore();
    const entityName = getEntity(entityId)!!.Name;
    const modalRows = getAttributesByEntityId(entityId);
    const closeHandler = () => {
        setShowing(false);
    };

    const computeAttributeTypeElements = useMemo(() => (
        Object.keys(AttributeType).filter((el) => Number.isNaN(+el)).map((key) => (
            <option key={key} value={AttributeType[key as any]}>
                {key}
            </option>
        ))
    ), []);

    const computeModalRows = useMemo(() => modalRows?.map((row: IAttribute) => (
        <div key={`modal-row-${row.Identifier}`} className="flex justify-content-between align-items-center">
            <label htmlFor={`input-${row.Identifier}`}>
                <input
                    id={`input-name-${row.Identifier}`}
                    value={row.Name}
                    onChange={(event) => update(entityId, row.Identifier)('Name', event.target.value)}
                />
            </label>
            <select
                id={`input-type-${row.Identifier}`}
                value={row.Type}
                onChange={(event) => update(entityId, row.Identifier)('Type', +event.target.value)}
            >
                {computeAttributeTypeElements}
            </select>
        </div>
    )), [update, modalRows, entityId, computeAttributeTypeElements]);

    return (
        <div className={`modal-edit display-${showing ? 'block' : 'none'}`}>
            <div className="modal-container">
                <div className="flex justify-content-between padding-bot-5">
                    <h3 className="text-white">
                        {entityName}
                    </h3>
                    <button type="button" className="btn btn-outline-light" onClick={closeHandler}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                {computeModalRows}
            </div>
        </div>
    );
};

export default Modal;
