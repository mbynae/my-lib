import { useMemo } from 'react';
import styles from './ComboDefault.module.css';

import type { ComboOptionProps } from '../combo-type';

const ComboDefault = ({ children, type, ...props }: Omit<ComboOptionProps, 'UIType'>) => {
    const { labelProps, childrenProps, circleProps, ...inputProps } = props;

    const labelStyle = useMemo(() => [styles.defaultLabel, labelProps?.className].join(' '), [labelProps?.className]);
    const inputStyle = useMemo(() => [styles.defaultInput, props.className].join(' '), [props.className]);
    const circleStyle = useMemo(() => [styles.defaultCircle, circleProps?.className].join(' '), [circleProps?.className]);
    const textStyle = useMemo(() => [styles.defaultText, childrenProps?.className].join(' '), [childrenProps?.className]);

    return (
        <label
            aria-label={`${type === 'radio' ? '라디오 버튼' : '체크박스'} 옵션`}
            {...labelProps}
            className={labelStyle}
            onClick={e => e.stopPropagation()}
        >
            <span {...circleProps} className={circleStyle} />
            <input {...inputProps} type={type} className={inputStyle} />
            <span {...childrenProps} className={textStyle}>
                {children}
            </span>
        </label>
    );
};

export default ComboDefault;
