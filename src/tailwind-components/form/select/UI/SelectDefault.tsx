import React from 'react';

import Icon from '../../../icon/Icon';
// import styles from './SelectDefault.module.css';
import './select-tailwind.css';
import { SelectOptionProps, SelectProps } from '../select-type';

export default function SelectDefault({ state, name, ref, active, setActive, innerText, onChange, children, ...props }: SelectProps) {
    return (
        <div {...props} className={styles.label} onClick={setActive} ref={ref}>
            <input type="text" value={state} readOnly name={name} className={styles.input} />
            <span>{innerText}</span>
            <Icon icon="arrow" width="0.9rem" className={styles.arrow} />
            {children && active && (
                <div className={styles.optionBox} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            )}
        </div>
    );
}

SelectDefault.Option = Option;

function Option({ children, value, name, onChange, optionProps, ...props }: SelectOptionProps) {
    const labelProps = optionProps?.label;

    return (
        <label {...labelProps} className={styles.option}>
            <input
                {...props}
                type="radio"
                value={value}
                name={name}
                onClick={onChange as unknown as (e: React.MouseEvent<HTMLInputElement>) => void}
                data-children={children}
                className={styles.input}
            />
            <span>{children}</span>
        </label>
    );
}
