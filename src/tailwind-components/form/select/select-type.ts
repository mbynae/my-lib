import { DetailedHTMLProps, HTMLAttributes, HTMLProps, ReactElement, Ref } from 'react';
import { IconProps } from '../../icon/icon-type';

type BasicOption = {
    wrap?: HTMLProps<HTMLDivElement>;
    text?: HTMLProps<HTMLSpanElement>;
    optionBox?: HTMLProps<HTMLDivElement>;
    option?: HTMLProps<HTMLLabelElement>;
    input?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

type OptionProps<T extends keyof SelectOptionConfig> = SelectOptionConfig[T] extends never
    ? BasicOption
    : BasicOption & SelectOptionConfig[T];

export interface SelectGroupProps<T extends keyof SelectOptionConfig>
    extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    children: ReactElement<SelectOptionProps>[] | ReactElement<SelectOptionProps>;
    UIType?: T;
    state?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    optionProps?: OptionProps<T>;
}

export type SelectProps<T extends keyof SelectOptionConfig> = Omit<SelectGroupProps<T>, 'ref' | 'onChange'> & {
    innerText: React.ReactNode;
    ref: Ref<HTMLDivElement>;
    active: boolean;
    setActive: (e: React.MouseEvent<HTMLElement>) => void;
    onChange: (e: React.MouseEvent<HTMLInputElement>, text: React.ReactNode) => void;
};

export interface SelectOptionProps {
    children: React.ReactNode;
    value: string;
    defaultCheck?: boolean;
}

// 추가 타입
export interface SelectOptionConfig {
    default: { icon?: Partial<IconProps> };
    line: { icon?: Partial<IconProps>; line?: HTMLProps<HTMLSpanElement> };
}
