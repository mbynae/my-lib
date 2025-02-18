import { classNames } from '../../../function/className';

import * as Combos from './UI';
import './UI/Combo-tailwind.css';

import type { ComboUIType, ComboGroupProps, ComboOptionProps } from './combo-type';

function RadioGroup<T extends ComboUIType = 'default'>({
    UIType = 'default',
    children,
    state,
    optionProps,
    ...props
}: ComboGroupProps<'radio', T>) {
    const arrayChild = Array.isArray(children) ? children : [children];

    const { group: groupProps, ...rest } = optionProps || {};

    return (
        <div {...groupProps} role="radiogroup" aria-labelledby="라디오 그룹" className={classNames('combo-common', groupProps?.className)}>
            {arrayChild.map((child) => (
                <Radio
                    key={child.props.value}
                    UIType={UIType}
                    checked={state === child.props.value}
                    optionProps={rest}
                    {...child.props}
                    {...props}
                >
                    {child.props.children}
                </Radio>
            ))}
        </div>
    );
}

export function Radio<T extends ComboUIType>({ UIType = 'default', children, ...props }: ComboOptionProps<'radio', T>) {
    const UI = UIType.charAt(0).toUpperCase() + UIType.slice(1);

    const Component = Combos[UI as keyof typeof Combos];

    return (
        Component && (
            <Component {...props} type="radio">
                {children}
            </Component>
        )
    );
}

export default RadioGroup;
// //TODO: Radio와 Checkbox 리팩토링
// //TODO: ICON 리팩토링
// //TODO: textInput 리팩토링
