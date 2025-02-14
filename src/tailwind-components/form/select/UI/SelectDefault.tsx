import React, { HTMLProps, Ref } from 'react';

import Icon from '../../../icon/Icon';
import styles from './SelectDefault.module.css';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    state: string;
    name: string;
    ref?: Ref<HTMLDivElement>;
    active: boolean;
    setActive: (e: React.MouseEvent<HTMLElement>) => void;
    innerText: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface OptionProps extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    value: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: {
        label?: HTMLProps<HTMLLabelElement>;
    };
}

export default function SelectDefault({ state, name, ref, active, setActive, innerText, onChange, children, ...props }: Props) {
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

function Option({ children, value, name, onChange, optionProps, ...props }: OptionProps) {
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
