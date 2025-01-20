import { HTMLProps } from 'react';

import ModalDefaultUI from './UI/ModalDefaultUI';
import BackgroundOverlay from './BackgroundOvelray';
import ModalContainer from './ModalContainer';
// import Notice from './Notice';
// import Download from './Download';

interface Props extends HTMLProps<HTMLDivElement> {
    isOpen: boolean;
    children: React.ReactNode;
    type?: 'default' | 'notice' | 'download';
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    bgClickActive?: boolean;
    isShowBg?: boolean;
    title?: string;
    buttonText?: string;
    buttonClassName?: string;
}

type MouseEvent = (e: React.MouseEvent<HTMLElement>) => void;

function Modal({ isOpen, isShowBg, children, type = 'default', onClose, onClick, bgClickActive, ...props }: Props) {
    return (
        <ModalContainer isOpen={isOpen}>
            <BackgroundOverlay onClick={onClose as unknown as MouseEvent} isOpen={isShowBg} clickActive={bgClickActive} name={props.name}>
                {type === 'default' && (
                    <ModalDefaultUI onClose={onClose} onClick={onClick} {...props}>
                        {children}
                    </ModalDefaultUI>
                )}
                {/* 
                {type === 'notice' && (
                    <Notice onClose={onClose} onClick={onClick} {...props}>
                        {children}
                    </Notice>
                )}

                {type === 'download' && (
                    <Download onClose={onClose} onClick={onClick} {...props}>
                        {children}
                    </Download>
                )} */}
            </BackgroundOverlay>
        </ModalContainer>
    );
}

export default Modal;
