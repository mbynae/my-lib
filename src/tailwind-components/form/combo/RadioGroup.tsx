import { createContext, useContext } from 'react';

import * as Combos from './UI';
import './UI/Combo-tailwind.css';

import { ComboUIType, type ComboContextType, type ComboGroupProps, type ComboOptionProps } from './combo-type';

const Context = createContext<ComboContextType<'radio', ComboUIType>>({
    UIType: 'default',
    state: undefined,
    onChange: undefined,
    name: undefined,
    optionProps: undefined,
});

function RadioGroup<T extends ComboUIType = 'default'>({
    UIType = 'default',
    state,
    name,
    onChange,
    children,
    className,
    optionProps,
    ...props
}: ComboGroupProps<'radio', T>) {
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
            <div {...props} role="radiogroup" aria-labelledby="라디오 그룹" className={`combo-common ${className}`}>
                {children}
            </div>
        </Context.Provider>
    );
}

export function RadioOption<T extends ComboUIType = 'default'>({
    UIType = 'default',
    value,
    name,
    onChange,
    checked,
    children,
    ...props
}: ComboOptionProps<'radio', T>) {
    const { UIType: GroupUIType, state, optionProps, ...group } = useContext(Context);

    const UIKey = GroupUIType ?? UIType;

    const PropsData = {
        ...optionProps?.input,
        ...props,
        value: value,
        name: group.name ?? name,
        onChange: group.onChange ?? onChange,
        checked: state !== undefined ? state === value : checked,
        children: children,
        optionProps: { ...optionProps },
        type: 'radio' as const,
    };

    const key = UIKey.charAt(0).toUpperCase() + UIKey.slice(1);

    const Component = Combos[key as keyof typeof Combos];
    return Component && <Component {...PropsData}>{children}</Component>;
}

export default RadioGroup;

//TODO: Radio와 Checkbox 리팩토링
//TODO: ICON 리팩토링
//TODO: textInput 리팩토링
