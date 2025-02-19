import { Eq } from '../../../function/eq';

import * as UI from './UI';
import './UI/Combo-tailwind.css';

import type { ComboUIType, ComboGroupProps, ComboOptionProps } from './combo-type';

function CheckboxGroup<T extends ComboUIType = 'default'>({
    UIType = 'default' as T,
    children,
    state,
    optionProps,
    ...props
}: ComboGroupProps<'checkbox', T>) {
    const arrayChild = Array.isArray(children) ? children : [children];

    const { group: groupProps, ...rest } = optionProps || {};

    return (
        <div {...groupProps} aria-labelledby="체크박스 그룹" role="checkbox" className={`combo-common ${groupProps?.className}`}>
            {arrayChild.map((child) => (
                <Checkbox
                    key={child.props.value}
                    UIType={UIType}
                    checked={state !== undefined ? Eq.arrElem(state, child.props.value) : undefined}
                    {...child.props}
                    optionProps={rest}
                    {...props}
                >
                    {child.props.children}
                </Checkbox>
            ))}
        </div>
    );
}

export function Checkbox<T extends ComboUIType>({ UIType = 'default' as T, children, ...props }: ComboOptionProps<'checkbox', T>) {
    const key = UIType.charAt(0).toUpperCase() + UIType.slice(1);

    const Component = UI[key as keyof typeof UI];
    return (
        Component && (
            <Component {...props} type="checkbox">
                {children}
            </Component>
        )
    );
}

export default CheckboxGroup;
