import { createContext, JSX, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useBooleanHandler, useInputHandler } from '../../../hooks/useInputHandler';
import { useCloseDropdown } from '../../../hooks/useSideEffect';
import { compose } from '../../../function/compose';

import * as UI from './UI';
import type { SelectContextType, SelectGroupProps, SelectOptionChildren, SelectOptionProps, SelectUIType } from './select-type2';

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
    const arrayChild = Array.isArray(children) ? children : [children];

    //side effect
    useCloseDropdown(active, ref, setActive);

    // 아이콘 컴포넌트 찾기
    const UIName = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = UI[UIName as keyof typeof UI];

    return (
        // <Context.Provider
        //     value={{
        //         Component: Component.Option,
        //         props: { name: name ?? tempName, state: state, onChange: onChangeHandler },
        //         optionProps: optionProps,
        //     }}
        // >
        Component && (
            <Component
                state={state}
                name={name ?? tempName}
                ref={ref}
                active={active}
                setActive={setActive}
                onChange={onChangeHandler}
                optionProp={optionProps}
                {...props}
            >
                {arrayChild.map((child) => (
                    <Option key={child.props.value} {...child}>
                        {child.props.children}
                    </Option>
                ))}
            </Component>
        )
        // </Context.Provider>
    );
}

Select.Option = Option;

export default Select;

function Option(props: SelectOptionProps) {
    return OptionComponent && <OptionComponent {...propsData}>{children}</OptionComponent>;
}

//TODO1: 훨씬 간단한 방법으로 리팩토링
//TODO3: input text를 radio로 바꾸고 언컨트롤 테스트
//TODO4: innerText 쉽게 구현 방안 생각
