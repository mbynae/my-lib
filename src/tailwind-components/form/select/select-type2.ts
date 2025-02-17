import { DetailedHTMLProps, HTMLAttributes, HTMLProps, JSX, ReactElement, Ref } from 'react';
import { IconProps } from '../../icon/icon-type';

interface BaseSelectGroupProps<T extends SelectUIType> extends HTMLProps<HTMLDivElement> {
    children: ReactElement<SelectOptionProps<T>>[] | ReactElement<SelectOptionProps<T>>;
    state: string;
    UIType?: T;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: {
        wrap?: HTMLProps<HTMLDivElement>;
        text?: HTMLProps<HTMLSpanElement>;
        arrow?: Partial<IconProps>;
        optionBox?: HTMLProps<HTMLDivElement>;
        option?: HTMLProps<HTMLLabelElement>;
        input?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    };
}

export interface SelectProps<T extends SelectUIType> extends HTMLProps<HTMLDivElement> {
    children: ReactElement<SelectOptionProps<T>>[] | ReactElement<SelectOptionProps<T>>;
    state: string;
    name?: string;
    ref?: Ref<HTMLDivElement>;
    active: boolean;
    setActive: (e: React.MouseEvent<HTMLElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: {
        wrap?: HTMLProps<HTMLDivElement>;
        text?: HTMLProps<HTMLSpanElement>;
        arrow?: Partial<IconProps>;
        optionBox?: HTMLProps<HTMLDivElement>;
        option?: HTMLProps<HTMLLabelElement>;
    };
}

interface BaseSelectOptionProps extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    value: string;
    // name?: string;
    // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // optionProps?: {
    //     option?: HTMLProps<HTMLLabelElement>;
    //     text?: HTMLProps<HTMLSpanElement>;
    // };
}

interface BaseSelectContextType<T extends SelectUIType> {
    Component?: ({ children, value, ...props }: SelectOptionProps<T>) => JSX.Element;
    props?: { name: string; state: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void };
    optionProps?: {
        option?: HTMLProps<HTMLLabelElement>;
        input?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        text?: HTMLProps<HTMLSpanElement>;
    };
}

export type SelectGroupProps<T extends SelectUIType = 'default'> = T extends 'line'
    ? BaseSelectGroupProps<T> & OptionProps['line']
    : BaseSelectGroupProps<T>;

export type SelectOptionProps<T extends SelectUIType = 'default'> = T extends 'line'
    ? BaseSelectOptionProps & OptionProps['line']
    : BaseSelectOptionProps;

export type SelectContextType<T extends SelectUIType = 'default'> = T extends 'line'
    ? BaseSelectContextType<T> & OptionProps['line']
    : BaseSelectContextType<T>;

export type SelectOptionChildren = React.ReactElement<{ value: string; children: React.ReactNode }>;

// 추가 타입
export type SelectUIType = 'default' | 'line';

interface OptionProps {
    line: { optionProps?: { line?: HTMLProps<HTMLSpanElement> } };
}
