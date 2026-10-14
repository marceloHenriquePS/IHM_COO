import type React from 'react';
import logo from "@/shared/assets/logo-coo.png"
import './Modal.css'
import { Button } from '../Button/Button';

type ModalProps = {
    icon: React.ReactNode;
    children: React.ReactNode;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
};

export function Modal({icon, children, onClose, onNext, onPrevious} : ModalProps) {
    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal__header'>
                    <img src={logo} alt="Logo COO" className="modal__header-logo" />
                    <span className='modal__header-title'>COO - Cidade Orientada a Objetos</span>
                    <button className='modal__close-button' onClick={onClose}>X</button>
                </div>

                <div className='modal__body'>
                    <div className='modal__icon'>{icon}</div>
                    <p className='modal__text'>{children}</p>
                </div>

                <div className='modal__footer'>
                    <Button className='modal__nav-button' label='ANTERIOR' onClick={onPrevious}></Button>
                    <Button className='modal__nav-button' label='PRÓXIMO' onClick={onNext}></Button>
                </div>
            </div>
        </div>
    );
}