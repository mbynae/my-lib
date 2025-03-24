import { HTMLProps, memo } from 'react';

import BackgroundOverlay from './BackgroundOvelray';
import ModalContainer from './ModalContainer';
import * as UI from './UI';
import { ModalOptionConfig, ModalProps } from './modal-type';

// interface Props extends HTMLProps<HTMLDivElement> {
//     isOpen: boolean;
//     children: React.ReactNode;
//     UIType?: 'default' | 'basic';
//     onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
//     onClick?: (e: React.MouseEvent<HTMLElement>) => void;
//     bgClickActive?: boolean;
//     isShowBg?: boolean;
//     title?: string;
//     buttonText?: string;
//     buttonClassName?: string;
//     center?: boolean;
// }

function Modal<T extends keyof ModalOptionConfig>({
    UIType = 'default' as T,
    isOpen,
    isShowBg,
    children,
    onClose,
    onClick,
    bgClickActive,
    ...props
}: ModalProps<T>) {
    const UIName = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = UI[UIName as keyof typeof UI];

    return (
        <ModalContainer isOpen={isOpen}>
            <BackgroundOverlay onClose={onClose} isShowBg={isShowBg} bgClickActive={bgClickActive} name={props.name}>
                {Component && (
                    <Component onClose={onClose} onClick={onClick} {...props}>
                        {children}
                    </Component>
                )}
            </BackgroundOverlay>
        </ModalContainer>
    );
}

export default memo(Modal);
