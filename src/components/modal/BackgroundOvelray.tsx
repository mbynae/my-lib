import { useEffect, useRef } from 'react';
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
    const bg = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            bg.current?.previousElementSibling?.classList.remove(styles.background);
            document.getElementById('body')!.style.overflow = 'hidden';
        }

        return () => {
            document.getElementById('modal')!.lastElementChild?.classList.add(styles.background);
            document.getElementById('body')!.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div className={styles.background} onClick={isOpen && clickActive ? onClick : () => {}} data-name={name} ref={bg}>
            {children}
        </div>
    );
};

export default BackgroundOverlay;
