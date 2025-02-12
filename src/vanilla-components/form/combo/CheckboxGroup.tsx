import { createContext, memo, useContext, useMemo } from 'react';
import { Eq } from '../../../function/eq';

import * as Combos from './UI';
import styles from './comboEvent.module.css';

import { formComboProps, type ComboContextType, type ComboGroupProps, type ComboOptionProps } from './combo-type';

const Context = createContext<ComboContextType<'checkbox'>>({
    UIType: undefined,
    state: undefined,
    onChange: undefined,
    name: undefined,
    props: { inputProps: undefined, labelProps: undefined, childrenProps: undefined },
});

function CheckboxGroup({ UIType = 'default', state, name, onChange, children, className, ...props }: ComboGroupProps<'checkbox'>) {
    const groupStyle = useMemo(() => [styles.group, className].join(' '), [className]);
    const { props: optionProps, rest } = formComboProps(props);

    return (
        <Context.Provider
            value={{
                UIType: UIType,
                state: state,
                name: name,
                onChange: onChange,
                props: { ...optionProps },
            }}
        >
            <div aria-labelledby="체크박스 그룹" {...rest} className={groupStyle} role="checkbox">
                {children}
            </div>
        </Context.Provider>
    );
}

export const CheckboxOption = ({
    UIType = 'default',
    value,
    name,
    onChange,
    checked,
    children,
    ...props
}: Omit<ComboOptionProps, 'type'>) => {
    const {
        props: { inputProps, ...restProps },
        UIType: groupUIType,
        ...group
    } = useContext(Context);

    const UIKey = groupUIType ?? UIType;

    const PropsData = {
        ...group,
        ...restProps,
        ...inputProps,
        ...props,
        value: value,
        name: group.name ?? name,
        onChange: group.onChange ?? onChange,
        checked: group.state ? Eq.arrElem(group.state, value) : checked,
        children: children,
        type: 'checkbox' as const,
    };

    const key = UIKey.charAt(0).toUpperCase() + UIKey.slice(1);

    const Component = Combos[key as keyof typeof Combos];
    return Component && <Component {...PropsData}>{children}</Component>;
};

export default memo(CheckboxGroup);
