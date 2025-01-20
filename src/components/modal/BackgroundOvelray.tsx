import { useEffect } from 'react';
import styles from './BackgroundOveray.module.css';

interface Props {
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: boolean;
    clickActive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    name?: string;
}

const BackgroundOverlay = ({ children, isOpen = true, clickActive = true, onClick, name }: Props) => {
    useEffect(() => {
        if (isOpen) {
            (document.getElementById('body') as HTMLBodyElement).style.overflow = 'hidden';
        }

        return () => {
            (document.getElementById('body') as HTMLBodyElement).style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div
            className={isOpen ? styles.background : styles.offBackground}
            onClick={isOpen && clickActive ? onClick : () => {}}
            data-name={name}
        >
            {children}
        </div>
    );
};

export default BackgroundOverlay;
