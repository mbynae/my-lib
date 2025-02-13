import React, { createContext, HTMLProps, useContext, useId, useMemo, useRef } from 'react';
import { compose } from '../../../../function/compose';
import { useBooleanHandler } from '../../../../hooks/useInputHandler';
import { useCloseDropdown } from '../../../../hooks/useSideEffect';

import Icon from '../../../icon/Icon';
import styles from './SelectLine.module.css';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    state?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface OptionProps extends HTMLProps<HTMLLabelElement> {
    children: React.ReactNode;
    value: string;
}

type OptionChildren = React.ReactElement<{ value: string; children: React.ReactNode }>;

interface ContextType {
    name: string;
    state?: string;
    onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}
const Context = createContext<ContextType>({ name: '', state: undefined, onChange: undefined });

export default function SelectLine({ state, name, onChange, children, ...props }: Props) {
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

    return (
        <Context.Provider value={{ name: name ?? tempName, state, onChange: onChangeHandler }}>
            <div {...props} className={styles.label} onClick={setActive} ref={ref}>
                <input type="text" value={state} readOnly name={name} className={styles.input} />
                <span>{innerText}</span>
                <Icon icon="arrow" width="0.9rem" className={styles.arrow} />
                {children && active && (
                    <div className={styles.optionBox} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                )}
            </div>
        </Context.Provider>
    );
}

SelectLine.Option = Option;

function Option({ children, value, ...props }: OptionProps) {
    const context = useContext(Context);

    return (
        <label {...props} className={styles.option}>
            <input
                type="radio"
                value={value}
                name={context.name}
                onClick={context.onChange as unknown as (e: React.MouseEvent<HTMLInputElement>) => void}
                data-children={children}
                className={styles.input}
            />
            <span>{children}</span>
        </label>
    );
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
