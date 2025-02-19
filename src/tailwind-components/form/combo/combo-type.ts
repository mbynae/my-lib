import { DetailedHTMLProps, HTMLProps, InputHTMLAttributes, ReactElement } from 'react';

type Common = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'value'>;

type BasicOption = {
    group?: HTMLProps<HTMLDivElement>;
    label?: HTMLProps<HTMLLabelElement>;
    children?: HTMLProps<HTMLDivElement>;
};

type OptionProps<T extends keyof ComboOptionConfig> = ComboOptionConfig[T] extends never ? BasicOption : BasicOption & ComboOptionConfig[T];

export type ComboType = 'checkbox' | 'radio';

export interface ComboGroupProps<T extends ComboType, U extends keyof ComboOptionConfig> extends Common {
    children: ReactElement<ComboOptionProps<T, U>>[] | ReactElement<ComboOptionProps<T, U>>;
    UIType?: U;
    state?: T extends 'radio' ? string : string[];
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: OptionProps<U>;
}

export interface ComboOptionProps<T extends ComboType, U extends keyof ComboOptionConfig> extends Common {
    value: string;
    type?: T;
    name?: string;
    UIType?: U;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    optionProps?: Omit<OptionProps<U>, 'group'>;
}

//추가 파트
export type ComboOptionConfig = {
    default: { circle?: HTMLProps<HTMLSpanElement> };
    button: never;
};
