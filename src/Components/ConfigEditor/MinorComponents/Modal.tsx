import React from 'react';
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

    const computeModalRows = () => {
        modalRows.map((row: ModalInputRow) => (
            <div key={`modal-row-${row.id}`}>
                <label htmlFor={`input-${row.id}`}>
                    {row.label}
                    <input id={`input-${row.id}`} />
                </label>
            </div>
        ));
    };

    return (
        <div className={`modal-edit display-${showing ? 'block' : 'none'}`}>
            <div className="modal-container">
                <button type="button" onClick={closeHandler}>Close!</button>
                {computeModalRows()}
            </div>
        </div>
    );
};

export default Modal;
