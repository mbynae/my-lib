import { DetailedHTMLProps, HTMLAttributes, HTMLProps, JSX, Ref } from 'react';

interface BaseSelectGroupProps extends HTMLProps<HTMLDivElement> {
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

interface BaseSelectProps extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    state: string;
    name?: string;
    ref?: Ref<HTMLDivElement>;
    active: boolean;
    setActive: (e: React.MouseEvent<HTMLElement>) => void;
    innerText: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface BaseOptionProps extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    value: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: {
        label?: HTMLProps<HTMLLabelElement>;
    };
}

type SelectOptionChildren = React.ReactElement<{ value: string; children: React.ReactNode }>;

interface SelectContextType {
    Component?: ({ children, value, ...props }: BaseOptionProps) => JSX.Element;
    props?: { name: string; state: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void };
    optionProps?: {
        label?: HTMLProps<HTMLLabelElement>;
        input?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    };
}

export type SelectUIType = 'default' | 'line';
