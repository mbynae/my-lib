import { classNames } from '../../../../function/className';

import Icon from '../../../icon/Icon';
import './select-tailwind.css';

import type { SelectProps } from '../select-type';

export default function SelectLine({
    state,
    name,
    ref,
    active,
    innerText,
    setActive,
    onChange,
    children,
    optionProps,
    ...props
}: SelectProps<'line'>) {
    const arrayChild = Array.isArray(children) ? children : [children];

    const wrapProps = optionProps?.wrap;
    const textProps = optionProps?.text;
    const arrowProps = optionProps?.icon;
    const optionBoxProps = optionProps?.optionBox;
    const labelProps = optionProps?.option;
    const lineProps = optionProps?.line;

    return (
        <div {...wrapProps} className={classNames('select-line', wrapProps?.className)} onClick={setActive} ref={ref}>
            <input {...props} type="text" value={state} readOnly name={name} className="input" data-children={innerText} />
            <span {...textProps}>{innerText}</span>
            <Icon icon="arrow" width="0.9rem" {...arrowProps} className={classNames('arrow', arrowProps?.className)} />
            {children && active && (
                <div
                    {...optionBoxProps}
                    className={classNames('optionBox', optionBoxProps?.className)}
                    onClick={(e) => e.stopPropagation()}
                >
                    {arrayChild.map((child) => (
                        <label key={child.props.value} {...labelProps} className={classNames('option', labelProps?.className)}>
                            <input
                                onChange={() => {}}
                                {...props}
                                type="radio"
                                value={child.props.value}
                                name={name}
                                onClick={(e) => onChange(e, child.props.children)}
                                data-children={children}
                                defaultChecked={child.props.defaultCheck}
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
