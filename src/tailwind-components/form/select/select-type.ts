import { ComponentProps, ReactElement, Ref } from 'react';
import { IconProps } from '../../icon/icon-type';

type BasicOption = {
    wrap?: ComponentProps<'div'>;
    text?: ComponentProps<'span'>;
    optionBox?: ComponentProps<'div'>;
    option?: ComponentProps<'label'>;
    input?: ComponentProps<'input'>;
};

type OptionProps<T extends keyof SelectOptionConfig> = SelectOptionConfig[T] extends never
    ? BasicOption
    : BasicOption & SelectOptionConfig[T];

export interface SelectGroupProps<T extends keyof SelectOptionConfig> extends ComponentProps<'input'> {
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
    line: { icon?: Partial<IconProps>; line?: ComponentProps<'span'> };
}
