import { DetailedHTMLProps, HTMLAttributes, HTMLProps, ReactElement, Ref } from 'react';
import { IconProps } from '../../icon/icon-type';

interface BaseSelectGroupProps<T extends SelectUIType>
    extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    children: ReactElement<SelectOptionProps>[] | ReactElement<SelectOptionProps>;
    UIType?: T;
    state?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    optionProps?: {
        wrap?: HTMLProps<HTMLDivElement>;
        text?: HTMLProps<HTMLSpanElement>;
        optionBox?: HTMLProps<HTMLDivElement>;
        option?: HTMLProps<HTMLLabelElement>;
        input?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    };
}

export type SelectGroupProps<T extends SelectUIType = 'default'> = T extends 'default'
    ? BaseSelectGroupProps<T> & OptionProps['default']
    : T extends 'line'
      ? BaseSelectGroupProps<T> & OptionProps['line']
      : BaseSelectGroupProps<T>;

export type SelectProps<T extends SelectUIType> = Omit<SelectGroupProps<T>, 'ref' | 'onChange'> & {
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
export type SelectUIType = 'default' | 'line';

interface OptionProps {
    default: { optionProps?: { icon?: Partial<IconProps> } };
    line: { optionProps?: { icon?: Partial<IconProps>; line?: HTMLProps<HTMLSpanElement> } };
}
