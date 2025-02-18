import { DetailedHTMLProps, HTMLProps, InputHTMLAttributes, ReactElement } from 'react';

//combo
interface BaseComboGroupProps<T extends ComboType, U extends ComboUIType>
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    children: ReactElement<ComboOptionProps<T, U>>[] | ReactElement<ComboOptionProps<T, U>>;
    UIType?: U;
    state?: T extends 'radio' ? string : string[];
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: BaseOptionProps;
}

interface BaseComboOptionProps<T extends ComboType, U extends ComboUIType>
    extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type?: T;
    value: string;
    name?: string;
    UIType?: U;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    optionProps?: Omit<BaseOptionProps, 'group'>;
}

interface BaseOptionProps {
    group?: HTMLProps<HTMLDivElement>;
    label?: HTMLProps<HTMLLabelElement>;
    children?: HTMLProps<HTMLDivElement>;
}

export type ComboGroupProps<T extends ComboType, U extends ComboUIType = 'default'> = U extends 'default'
    ? BaseComboGroupProps<T, U> & OptionProps['default']
    : BaseComboGroupProps<T, U>;

export type ComboOptionProps<T extends ComboType, U extends ComboUIType = 'default'> = U extends 'default'
    ? BaseComboOptionProps<T, U> & OptionProps['default']
    : BaseComboOptionProps<T, U>;

// export type ComboOptionProps<T extends ComboType, U extends ComboUIType> = BaseComboOptionProps<T, U> &
//     Pick<ComboGroupProps<T, U>, 'optionProps'>;

//추가 파트
export type ComboType = 'checkbox' | 'radio';
export type ComboUIType = 'default' | 'button';

interface OptionProps {
    default: { optionProps?: { circle?: HTMLProps<HTMLSpanElement> } };
}
