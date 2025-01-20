import { HTMLProps, useMemo } from 'react';
import Button from '../../button/Button';
import styles from '../Modal.module.css';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    buttonText?: string;
    buttonClassName?: string;
}

type OnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;

export default function ModalDefaultUI({ children, onClose, buttonText = '확인', buttonClassName, className, name, ...props }: Props) {
    const boxStyle = useMemo(() => [styles.defaultBox, className].join(' '), [className]);

    return (
        <div {...props} className={boxStyle} onClick={e => e.stopPropagation()}>
            <div className={styles.defaultInner}>
                <div className={styles.closeButtonBox}>
                    <button type="button" className={styles.closeButton} onClick={onClose} name={name} />
                </div>
                <div className={styles.alertContents}>{children}</div>
            </div>
            <Button name={name} onClick={props.onClick ? (props.onClick as unknown as OnClick) : onClose} className={buttonClassName}>
                {buttonText}
            </Button>
        </div>
    );
}
