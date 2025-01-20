import { DetailedHTMLProps, DetailsHTMLAttributes, HTMLProps, useMemo } from 'react';
import Button from '../../button/Button';
import styles from '../Modal.module.css';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    buttonText?: string;
    buttonClassName?: string;
    center?: boolean;
    closeBtnProps?: DetailedHTMLProps<DetailsHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    btnProps?: DetailedHTMLProps<DetailsHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

type OnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;

export default function ModalDefaultUI({
    children,
    onClose,
    buttonText = '확인',
    center = false,
    buttonClassName,
    className, //wrap div className
    name,
    closeBtnProps: cbProps, //closeBtn Props
    btnProps: bProps, // bottom btn props,
    ...props
}: Props) {
    const boxStyle = useMemo(() => [styles.defaultBox, className].join(' '), [className]);
    const closeBtn = useMemo(() => [styles.closeButton, cbProps?.className].join(' '), [cbProps?.className]);

    const contentsStyle = useMemo(() => [styles.defaultContents, styles[center ? 'center' : '']].join(' '), [center]);

    return (
        <div {...props} className={boxStyle} onClick={(e) => e.stopPropagation()}>
            <div className={styles.topArea}>
                <div className={styles.closeButtonBox}>
                    <button {...cbProps} type="button" className={closeBtn} onClick={onClose} name={name} />
                </div>
                <div className={contentsStyle}>{children}</div>
            </div>
            <Button
                name={name}
                onClick={props.onClick ? (props.onClick as unknown as OnClick) : onClose}
                className={buttonClassName}
                {...bProps}
            >
                {buttonText}
            </Button>
        </div>
    );
}
