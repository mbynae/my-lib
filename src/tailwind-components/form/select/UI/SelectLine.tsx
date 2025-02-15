import React from 'react';

import Icon from '../../../icon/Icon';
import './select-tailwind.css';

import type { SelectOptionProps, SelectProps } from '../select-type';

export default function SelectLine({
    state,
    name,
    ref,
    active,
    setActive,
    innerText,
    onChange,
    children,
    optionProp,
    ...props
}: SelectProps) {
    const wrapProps = optionProp?.wrap;
    const textProps = optionProp?.text;
    const arrowProps = optionProp?.arrow;
    const optionBox = optionProp?.optionBox;

    return (
        <div {...wrapProps} className={`select-line ${wrapProps?.className}`} onClick={setActive} ref={ref}>
            <input type="text" value={state} readOnly name={name} className="input" />
            <span {...textProps}>{innerText}</span>
            <Icon icon="arrow" width="0.9rem" {...arrowProps} className={`arrow ${arrowProps?.className}`} />
            {children && active && (
                <div {...optionBox} className={`optionBox ${optionBox?.className}`} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            )}
        </div>
    );
}

SelectLine.Option = Option;

function Option({ children, value, name, onChange, optionProps, ...props }: SelectOptionProps) {
    const labelProps = optionProps?.option;
    const textProps = optionProps?.text;

    return (
        <label {...labelProps} className={`option ${labelProps}`}>
            <input
                {...props}
                type="radio"
                value={value}
                name={name}
                onClick={onChange as unknown as (e: React.MouseEvent<HTMLInputElement>) => void}
                data-children={children}
                className="input"
            />
            <span {...textProps}>{children}</span>
        </label>
    );
}
