import React, { useRef } from 'react';
import { classNames } from '../../../../function/className';

import Icon from '../../../icon/Icon';
import './select-tailwind.css';

import type { SelectOptionProps, SelectProps } from '../select-type';

export default function SelectDefault({
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
        <div {...wrapProps} className={classNames('select-default', wrapProps?.className)} onClick={setActive} ref={ref}>
            <input {...props} type="text" value={state} readOnly name={name} className="input" data-children={innerText} />
            <span {...textProps}>{innerText}</span>
            <Icon icon="arrow" width="0.9rem" {...arrowProps} className={classNames('arrow', arrowProps?.className)} />
            {children && active && (
                <div {...optionBox} className={classNames('optionBox', optionBox?.className)} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            )}
        </div>
    );
}

SelectDefault.Option = Option;

function Option({ children, value, name, onChange, optionProps, ...props }: SelectOptionProps) {
    const labelProps = optionProps?.option;
    const textProps = optionProps?.text;

    return (
        <label {...labelProps} className={classNames('option', labelProps?.className)}>
            <input
                onChange={() => {}}
                {...props}
                type="radio"
                value={value}
                name={name}
                checked={props?.checked}
                onClick={onChange as unknown as (e: React.MouseEvent<HTMLInputElement>) => void}
                data-children={children}
                className="input"
            />
            <span {...textProps}>{children}</span>
        </label>
    );
}
