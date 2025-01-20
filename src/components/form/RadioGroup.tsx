import { createContext, memo, useContext, useMemo } from 'react';

import * as Combos from './combo';
import styles from './comboEvent.module.css';

import { formComboProps, type ComboContextType, type ComboGroupProps, type ComboOptionProps } from './form-type';

const Context = createContext<ComboContextType<'radio'>>({
    UIType: undefined,
    state: undefined,
    onChange: undefined,
    name: undefined,
    props: { inputProps: undefined, labelProps: undefined, childrenProps: undefined },
});

function RadioGroup({ UIType = 'default', state, name, onChange, children, className, ...props }: ComboGroupProps<'radio'>) {
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
            <div {...rest} className={groupStyle} role="radiogroup" aria-labelledby="라디오 그룹">
                {children}
            </div>
        </Context.Provider>
    );
}

export const RadioOption = ({ UIType = 'default', value, name, onChange, checked, children, ...props }: Omit<ComboOptionProps, 'type'>) => {
    const {
        props: { inputProps, ...restProps },
        UIType: GroupUIType,
        ...group
    } = useContext(Context);

    const UIKey = GroupUIType ?? UIType;

    const PropsData = {
        ...group,
        ...restProps,
        ...inputProps,
        ...props,
        value: value,
        name: group.name ?? name,
        onChange: group.onChange ?? onChange,
        checked: group.state ? group.state === value : checked,
        children: children,
        type: 'radio' as const,
    };

    const key = UIKey.charAt(0).toUpperCase() + UIKey.slice(1);

    const Component = Combos[key as keyof typeof Combos];
    return Component && <Component {...PropsData}>{children}</Component>;
};

export default memo(RadioGroup);
