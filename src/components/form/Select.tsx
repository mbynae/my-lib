import { createContext, DetailedHTMLProps, HTMLProps, OptionHTMLAttributes, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useBooleanHandler } from '../../hooks/useInputHandler';
import { useCloseDropdown } from '../../hooks/useSideEffect';

import styles from './Select.module.css';

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
    children: React.ReactNode;
    text?: string;
    state?: string;
    name?: string;
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;

    className?: string;
}

const Context = createContext<{
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}>({
    onClick: () => {},
    onChange: () => {},
});

export default function Select({ state, onChange, children, className, name }: Props) {
    //ref
    const ref = useRef<HTMLDivElement>(null);

    //state
    const [active, setActive] = useBooleanHandler(false);
    const [view, setView] = useState<React.ReactNode>('');

    //event handler
    const optionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        const { value, innerHTML } = e.currentTarget;

        setView(innerHTML);
        setActive();

        if (onChange) {
            // @ts-expect-error 콜백함수용 분기처리
            onChange(prev => {
                if (typeof prev === 'string') return value;
                if (name) return { ...prev, [name]: value };
                return prev;
            });
        }
    };

    //data processing value
    const labelStyle = useMemo(() => [styles.label, className].join(' '), [className]);

    //side effect
    useCloseDropdown(active, ref, setActive);

    useEffect(() => {
        if (Array.isArray(children)) {
            const initChild = children.find(node => node.props.value === state);
            if (initChild) setView(initChild.props.children);
            return;
        }
        if (children) {
            setView((children as React.ReactElement).props.children);
        }
    }, []);

    return (
        <Context.Provider value={{ onClick: optionHandler, onChange: onChange }}>
            <label className={labelStyle} onClick={e => e.stopPropagation()} aria-labelledby="셀렉트 박스">
                <input type="checkbox" checked={active} onChange={setActive} className={styles.input} readOnly />
                <input type="text" value={state} name={name} className={styles.input} readOnly />
                <span>{view}</span>
                <div className={styles.arrow} />
                {children && active && (
                    <div className={styles.optionBox} role="combobox" ref={ref}>
                        {children}
                    </div>
                )}
            </label>
        </Context.Provider>
    );
}

Select.Option = Option;
Select.Option2 = Option2;

interface OptionProps extends DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> {
    children: React.ReactNode;
    value: string;
}

function Option({ value, children }: OptionProps) {
    const context = useContext(Context);

    return (
        <button className={styles.option} value={value} onClick={context.onClick} aria-label="셀렉트 박스 옵션">
            {children}
        </button>
    );
}

function Option2({ value, children }: OptionProps) {
    const context = useContext(Context);

    return (
        <label className={styles.option}>
            <input type="raio" value={value} onChange={context.onChange} className={styles.input} />
            <span>{children}</span>
        </label>
    );
}
