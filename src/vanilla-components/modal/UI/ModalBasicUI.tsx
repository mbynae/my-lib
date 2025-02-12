import { HTMLProps, useMemo } from 'react';
import styles from './ModalBasicUI.module.css';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ModalBasicUI({
    children,
    onClose,
    className, //wrap div className
    name,
    ...props
}: Props) {
    const boxStyle = useMemo(() => [styles.wrap, className].join(' '), [className]);

    return (
        <div {...props} className={boxStyle} onClick={e => e.stopPropagation()}>
            <div className={styles.defaultContents}>{children}</div>
        </div>
    );
}
