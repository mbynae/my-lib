import { createContext, memo, useContext, useMemo } from 'react';

import ComboboxUI from './combo/ComboBoxUI';
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
    const { props: optionProps, rest } = formComboProps(UIType, props);

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
        ...group
    } = useContext(Context);

    const PropsData = {
        ...group,
        ...restProps,
        ...inputProps,
        ...props,
        value: value,
        name: group.name ?? name,
        UIType: group.UIType ?? UIType,
        onChange: group.onChange ?? onChange,
        checked: group.state ? group.state === value : checked,
        children: children,
        type: 'radio' as const,
    };

    return <ComboboxUI {...PropsData} />;
};

export default memo(RadioGroup);
