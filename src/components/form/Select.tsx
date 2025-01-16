import { createContext, DetailedHTMLProps, HTMLProps, memo, OptionHTMLAttributes, useContext, useMemo, useRef, useState } from 'react';
import { useBooleanHandler } from '../../hooks/useInputHandler';
import styles from './Select.module.css';

interface Props extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    text?: string;
    state?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Context = createContext<Pick<Props, 'state' | 'onChange'>>({ state: undefined, onChange: undefined });

export default function Select({ state, onChange, children, className }: Props) {
    //state
    const [active, setActive] = useState(false);

    //event handler
    const onActiveHandler = () => {
        setActive(prev => !prev);
    };

    //data processing value
    const labelStyle = useMemo(() => [styles.label, className].join(' '), [className]);

    return (
        <Context.Provider value={{ state, onChange }}>
            <label className={labelStyle} onClick={e => e.stopPropagation()}>
                <input type="checkbox" checked={active} onChange={onActiveHandler} className={styles.activeInput} />
                <input type="text" value={state} className={styles.input} readOnly />
                <div className={styles.arrow} />
                {active && (
                    <div className={styles.optionBox} onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                )}
            </label>
        </Context.Provider>
    );
}

Select.Option = Option;

interface OptionProps extends DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> {
    children: React.ReactNode;
    value: string;
}

function Option({ value, children }: OptionProps) {
    const context = useContext(Context);

    const onChange = (e: React.MouseEvent<HTMLOptionElement>) => {
        console.log('실행');
        context?.onChange && context.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };
    return (
        <option className={styles.option} value={value} onClick={onChange}>
            {children}
        </option>
    );
}
