import { createContext, useContext, useId, useMemo, useRef } from 'react';
import { useBooleanHandler } from '../../../hooks/useInputHandler';
import { useCloseDropdown } from '../../../hooks/useSideEffect';
import { compose } from '../../../function/compose';

import * as UI from './UI';
import type { SelectContextType, SelectGroupProps, SelectOptionChildren, SelectOptionProps, SelectUIType } from './select-type';

const Context = createContext<SelectContextType>({ Component: undefined, props: undefined });

function Select<T extends SelectUIType = 'default'>({
    UIType = 'default',
    children,
    name,
    state,
    onChange,
    optionProps,
    ...props
}: SelectGroupProps<T>) {
    //init
    const tempName = useId();

    //ref
    const ref = useRef<HTMLDivElement>(null);

    //state
    const [active, setActive] = useBooleanHandler(false);

    //side effect
    const onChangeHandler = compose(setActive, onChange ?? (() => {}));

    //data processing
    const innerText = useMemo(() => selectInnerText(children as SelectOptionChildren, state), [children, state]);

    //side effect
    useCloseDropdown(active, ref, setActive);

    // 아이콘 컴포넌트 찾기
    const UIName = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = UI[UIName as keyof typeof UI];

    return (
        <Context.Provider
            value={{
                Component: Component.Option,
                props: { name: name ?? tempName, state: state, onChange: onChangeHandler },
                optionProps: optionProps,
            }}
        >
            {Component && (
                <Component
                    state={state}
                    name={name ?? tempName}
                    ref={ref}
                    active={active}
                    setActive={setActive}
                    innerText={innerText}
                    onChange={onChangeHandler}
                    optionProp={optionProps}
                    {...props}
                >
                    {children}
                </Component>
            )}
        </Context.Provider>
    );
}

Select.Option = Option;

export default Select;

function Option({ children, ...props }: SelectOptionProps) {
    const { Component, props: contextProps, optionProps } = useContext(Context);
    const OptionComponent = Component;

    const propsData = {
        ...optionProps?.input,
        ...props,
        ...contextProps,
        name: contextProps!.name,
        optionProps: { ...optionProps },
    };

    return OptionComponent && <OptionComponent {...propsData}>{children}</OptionComponent>;
}

function selectInnerText(children: SelectOptionChildren, state?: string) {
    if (!children || typeof state === 'undefined') return;

    if (Array.isArray(children)) {
        if (typeof children[0].props?.value === 'undefined') return;

        return children.find((el) => el.props.value === state).props.children;
    }

    if (typeof children.props?.value === 'undefined') return;

    return children.props.children;
}

//TODO3: input text를 radio로 바꾸고 언컨트롤 테스트
//TODO4: innerText 쉽게 구현 방안 생각
