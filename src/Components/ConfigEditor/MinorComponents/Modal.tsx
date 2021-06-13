import React, { useMemo } from 'react';
import { AttributeType, IAttribute } from 'api-builder-types';
import { useAttributeStore } from '../../Stores/ConfigEditorStore';

interface ModalProps {
    showing: boolean;
    setShowing: (newValue: boolean) => void;
    entityId: string;
}

const Modal: React.FC<ModalProps> = ({ showing, setShowing, entityId } : ModalProps) => {
    const { update, getAttributesByEntityId } = useAttributeStore();
    const modalRows = getAttributesByEntityId(entityId);
    const closeHandler = () => {
        setShowing(false);
    };

    const computeModalRows = useMemo(() => modalRows.map((row: IAttribute) => (
        <div key={`modal-row-${row.Identifier}`}>
            <label htmlFor={`input-${row.Identifier}`}>
                <input
                    id={`input-name-${row.Identifier}`}
                    value={row.Name}
                    onChange={(event) => update(entityId, row.Identifier)('Name', event.target.value)}
                />
                <input
                    id={`input-type-${row.Identifier}`}
                    value={AttributeType[row.Type]}
                    onChange={(event) => update(entityId, row.Identifier)('Type', event.target.value)}
                />
            </label>
        </div>
    )), [update, modalRows, entityId]);

    return (
        <div className={`modal-edit display-${showing ? 'block' : 'none'}`}>
            <div className="modal-container">
                <button type="button" onClick={closeHandler}>Close!</button>
                {computeModalRows}
            </div>
        </div>
    );
};

export default Modal;
