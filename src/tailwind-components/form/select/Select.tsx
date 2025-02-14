import React, { createContext, DetailedHTMLProps, HTMLAttributes, HTMLProps, JSX, useContext, useId, useMemo, useRef } from 'react';
import { useBooleanHandler } from '../../../hooks/useInputHandler';
import { useCloseDropdown } from '../../../hooks/useSideEffect';
import { compose } from '../../../function/compose';

import * as UI from './UI';
import type { SelectUIType } from './select-type';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    state: string;
    UIType?: SelectUIType;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: {
        label?: HTMLProps<HTMLLabelElement>;
        input?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    };
}

interface OptionProps extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    value: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: {
        label?: HTMLProps<HTMLLabelElement>;
    };
}

interface ContextOptionProps extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    value: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: {
        label?: HTMLProps<HTMLLabelElement>;
    };
}

type OptionChildren = React.ReactElement<{ value: string; children: React.ReactNode }>;

interface ContextType {
    Component?: ({ children, value, ...props }: ContextOptionProps) => JSX.Element;
    props?: { name: string; state: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void };
    optionProps?: {
        label?: HTMLProps<HTMLLabelElement>;
        input?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    };
}
const Context = createContext<ContextType>({ Component: undefined, props: undefined });

function Select<T extends SelectUIType = 'default'>({ UIType = 'default', children, name, state, onChange, optionProps, ...props }: Props) {
    //init
    const tempName = useId();

    //ref
    const ref = useRef<HTMLDivElement>(null);

    //state
    const [active, setActive] = useBooleanHandler(false);

    //side effect
    const onChangeHandler = compose(setActive, onChange ?? (() => {}));

    //data processing
    const innerText = useMemo(() => selectInnerText(children as OptionChildren, state), [children, state]);

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

function Option({ children, ...props }: OptionProps) {
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

function selectInnerText(children: OptionChildren, state?: string) {
    if (!children || typeof state === 'undefined') return;

    if (Array.isArray(children)) {
        if (typeof children[0].props?.value === 'undefined') return;

        return children.find((el) => el.props.value === state).props.children;
    }

    if (typeof children.props?.value === 'undefined') return;

    return children.props.children;
}
