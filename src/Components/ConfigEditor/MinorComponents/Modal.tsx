import React, { useMemo } from 'react';
import { ModalInputRow } from '../../../Types/ViewTypes';

interface ModalProps {
    showing: boolean;
    setShowing: (newValue: boolean) => void;
    modalRows: ModalInputRow[]
}

const Modal: React.FC<ModalProps> = ({ showing, setShowing, modalRows } : ModalProps) => {
    const closeHandler = () => {
        setShowing(false);
    };
    //  onChange={((event) => row.inputOnChangeHandler(event.target.value))} />
    const computeModalRows = useMemo(() => modalRows.map((row: ModalInputRow) => (
        <div key={`modal-row-${row.id}`}>
            <label htmlFor={`input-${row.id}`}>
                <input id={`input-name-${row.id}`} value={row.label} />
                <input id={`input-type-${row.id}`} value={row.dropdownValue} />
            </label>
        </div>
    )), [modalRows]);

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
