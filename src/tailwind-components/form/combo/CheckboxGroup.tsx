import { createContext, memo, useContext, useMemo } from 'react';
import { Eq } from '../../../function/eq';

import * as Combos from './UI';
import './UI/Combo-tailwind.css';

import { ComboUIType, type ComboContextType, type ComboGroupProps, type ComboOptionProps } from './combo-type';

const Context = createContext<ComboContextType<'checkbox', ComboUIType>>({
    UIType: undefined,
    state: undefined,
    onChange: undefined,
    name: undefined,
    optionProps: undefined,
});

function CheckboxGroup<T extends ComboUIType = 'default'>({
    UIType = 'default',
    state,
    name,
    onChange,
    children,
    className,
    optionProps,
    ...props
}: ComboGroupProps<'checkbox', T>) {
    return (
        <Context.Provider
            value={{
                UIType: UIType,
                state: state,
                name: name,
                onChange: onChange,
                optionProps: optionProps,
            }}
        >
            <div {...props} aria-labelledby="체크박스 그룹" role="checkbox" className={`combo-common ${className}`}>
                {children}
            </div>
        </Context.Provider>
    );
}

export function Checkbox<T extends ComboUIType = 'default'>({
    UIType = 'default',
    value,
    name,
    onChange,
    checked,
    children,
    ...props
}: ComboOptionProps<'checkbox', T>) {
    const { UIType: GroupUIType, state, optionProps, ...group } = useContext(Context);

    const UIKey = GroupUIType ?? UIType;

    const PropsData = {
        ...optionProps?.input,
        ...props,
        value: value,
        name: group.name ?? name,
        onChange: group.onChange ?? onChange,
        checked: state !== undefined ? Eq.arrElem(state, value) : checked,
        children: children,
        optionProps: { ...optionProps },
        type: 'checkbox' as const,
    };

    const key = UIKey.charAt(0).toUpperCase() + UIKey.slice(1);

    const Component = Combos[key as keyof typeof Combos];
    return Component && <Component {...PropsData}>{children}</Component>;
}

export default memo(CheckboxGroup);
