import { useMemo } from 'react';

import styles from '../button.module.css';
import type { ButtonProps, ButtonUIType } from '../button-type';

interface Props extends ButtonProps {
    UIType: ButtonUIType;
}

export default function ButtonBoxUI({ UIType, children, className, ...props }: Props) {
    const buttonStyle = useMemo(() => [styles[`${UIType}Type`], className].join(' '), [UIType, className]);

    return (
        <button {...props} className={buttonStyle}>
            {children}
        </button>
    );
}
