import { createContext, memo, useContext, useMemo } from 'react';
import { Eq } from '../../function/eq';

import ComboboxUI from './combo/ComboBoxUI';
import styles from './comboEvent.module.css';

import { formComboProps, type ComboContextType, type ComboGroupProps, type ComboOptionProps } from './form-type';

const Context = createContext<ComboContextType<'checkbox'>>({
    UIType: undefined,
    state: undefined,
    onChange: undefined,
    name: undefined,
    props: { inputProps: undefined, labelProps: undefined, childrenProps: undefined },
});

function CheckboxGroup({ UIType = 'default', state, name, onChange, children, className, ...props }: ComboGroupProps<'checkbox'>) {
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
        checked: group.state ? Eq.arrElem(group.state, value) : checked,
        children: children,
        type: 'checkbox' as const,
    };

    return <ComboboxUI {...PropsData} />;
};

export default memo(CheckboxGroup);
