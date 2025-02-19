import { classNames } from '../../../function/className';

import * as Combos from './UI';
import './UI/Combo-tailwind.css';

import type { ComboGroupProps, ComboOptionProps, ComboOptionConfig } from './combo-type';

function RadioGroup<T extends keyof ComboOptionConfig>({
    UIType = 'default' as T,
    children,
    state,
    optionProps,
    ...props
}: ComboGroupProps<'radio', T>) {
    const arrayChild = Array.isArray(children) ? children : [children];
    const groupProps = optionProps?.group;

    return (
        <div {...groupProps} role="radiogroup" aria-labelledby="라디오 그룹" className={classNames('combo-common', groupProps?.className)}>
            {arrayChild.map((child) => (
                <Radio
                    {...props}
                    {...child.props}
                    key={child.props.value}
                    UIType={UIType}
                    checked={state !== undefined ? state === child.props.value : undefined}
                    optionProps={optionProps}
                >
                    {child.props.children}
                </Radio>
            ))}
        </div>
    );
}

export function Radio<T extends keyof ComboOptionConfig>({ UIType = 'default' as T, children, ...props }: ComboOptionProps<'radio', T>) {
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
