// import React, { useRef } from 'react';
// import { classNames } from '../../../../function/className';

// import Icon from '../../../icon/Icon';
// import './select-tailwind.css';

// import type { SelectOptionProps, SelectProps } from '../select-type';

// export default function SelectDefault({
//     state,
//     name,
//     ref,
//     active,
//     setActive,
//     innerText,
//     onChange,
//     children,
//     optionProp,
//     ...props
// }: SelectProps) {
//     const wrapProps = optionProp?.wrap;
//     const textProps = optionProp?.text;
//     const arrowProps = optionProp?.arrow;
//     const optionBox = optionProp?.optionBox;

//     return (
//         <div {...wrapProps} className={classNames('select-default', wrapProps?.className)} onClick={setActive} ref={ref}>
//             <input {...props} type="text" value={state} readOnly name={name} className="input" data-children={innerText} />
//             <span {...textProps}>{innerText}</span>
//             <Icon icon="arrow" width="0.9rem" {...arrowProps} className={classNames('arrow', arrowProps?.className)} />
//             {children && active && (
//                 <div {...optionBox} className={classNames('optionBox', optionBox?.className)} onClick={(e) => e.stopPropagation()}>
//                     {children}
//                 </div>
//             )}
//         </div>
//     );
// }

// SelectDefault.Option = Option;

// function Option({ children, value, name, onChange, optionProps, ...props }: SelectOptionProps) {
//     const labelProps = optionProps?.option;
//     const textProps = optionProps?.text;

//     return (
//         <label {...labelProps} className={classNames('option', labelProps?.className)}>
//             <input
//                 onChange={() => {}}
//                 {...props}
//                 type="radio"
//                 value={value}
//                 name={name}
//                 checked={props?.checked}
//                 onClick={onChange as unknown as (e: React.MouseEvent<HTMLInputElement>) => void}
//                 data-children={children}
//                 className="input"
//             />
//             <span {...textProps}>{children}</span>
//         </label>
//     );
// }

/////////////////
import React, { useState } from 'react';
import { classNames } from '../../../../function/className';

import Icon from '../../../icon/Icon';
import './select-tailwind.css';

import type { SelectOptionProps, SelectProps } from '../select-type2';

export default function SelectDefault({
    state,
    name,
    ref,
    active,
    setActive,
    onChange,
    children,
    optionProps,
    ...props
}: SelectProps<'default'>) {
    const [innerText, setInnerText] = useState('');

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);
        setInnerText(e.target.innerText);
    };

    const arrayChild = Array.isArray(children) ? children : [children];

    const wrapProps = optionProps?.wrap;
    const textProps = optionProps?.text;
    const arrowProps = optionProps?.arrow;
    const optionBox = optionProps?.optionBox;
    const labelProps = optionProps?.option;

    return (
        <div {...wrapProps} className={classNames('select-default', wrapProps?.className)} onClick={setActive} ref={ref}>
            <input {...props} type="text" value={state} readOnly name={name} className="input" data-children={innerText} />
            <span {...textProps}>{innerText}</span>
            <Icon icon="arrow" width="0.9rem" {...arrowProps} className={classNames('arrow', arrowProps?.className)} />
            {children && active && (
                <div {...optionBox} className={classNames('optionBox', optionBox?.className)} onClick={(e) => e.stopPropagation()}>
                    {arrayChild.map((child) => (
                        <label key={child.props.value} {...labelProps} className={classNames('option', labelProps?.className)}>
                            <input
                                onChange={() => {}}
                                {...props}
                                type="radio"
                                value={child.props.value}
                                name={name}
                                onClick={onChangeHandler as unknown as (e: React.MouseEvent<HTMLInputElement>) => void}
                                data-children={children}
                                className="input"
                            />
                            <span {...textProps}>{child.props.children}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

SelectDefault.Option = Option;

function Option(props: SelectOptionProps) {
    return null;
}
