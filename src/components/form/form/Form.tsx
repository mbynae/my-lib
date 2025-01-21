import { createContext, HTMLProps, useContext, useMemo } from 'react';
import styles from './Form.module.css';

interface Props extends HTMLProps<HTMLFormElement> {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    fieldsetProps?: HTMLProps<HTMLFieldSetElement>;
    legendProps?: HTMLProps<HTMLLegendElement>;
}

const Context = createContext<Pick<Props, 'fieldsetProps' | 'legendProps'>>({ fieldsetProps: undefined, legendProps: undefined });

export default function Form({ children, className, fieldsetProps, legendProps, ...props }: Props) {
    const formStyle = useMemo(() => [styles.form, className].join(' '), [className]);

    return (
        <Context.Provider value={{ fieldsetProps, legendProps }}>
            <form {...props} className={formStyle}>
                {children}
            </form>
        </Context.Provider>
    );
}

Form.Fieldset = Fieldset;
Form.Legend = Legend;

interface FieldsetProps extends HTMLProps<HTMLFieldSetElement> {
    children: React.ReactNode;
}
function Fieldset({ children, className, ...props }: FieldsetProps) {
    const { fieldsetProps } = useContext(Context);
    const fielsetStyle = useMemo(
        () => [styles.fieldset, fieldsetProps?.className, className].join(' '),
        [fieldsetProps?.className, className]
    );

    return (
        <fieldset {...fieldsetProps} {...props} className={fielsetStyle}>
            {children}
        </fieldset>
    );
}

interface LegendProps extends HTMLProps<HTMLLegendElement> {
    children: React.ReactNode;
}
function Legend({ children, className, ...props }: LegendProps) {
    const { legendProps } = useContext(Context);
    const legendStyle = useMemo(() => [styles.legend, legendProps?.className, className].join(' '), [legendProps?.className, className]);

    return (
        <legend {...legendProps} {...props} className={legendStyle}>
            {children}
        </legend>
    );
}
