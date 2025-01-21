import { DetailedHTMLProps, HTMLProps } from 'react';

//combo
export interface ComboGroupProps<T extends 'checkbox' | 'radio'> extends OptionProps, HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    state?: T extends 'radio' ? string : string[];
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    UIType?: UIType;
    className?: string;
    inputProps?: HTMLProps<HTMLInputElement>;
}

export interface ComboOptionProps extends OptionProps, DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type: 'radio' | 'checkbox';
    value: string;
    name?: string;
    UIType?: UIType;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

interface OptionProps {
    labelProps?: HTMLProps<HTMLLabelElement>;
    childrenProps?: HTMLProps<HTMLSpanElement>;
    circleProps?: HTMLProps<HTMLSpanElement>;
}

export type ComboContextType<T extends 'checkbox' | 'radio'> = Partial<
    Pick<ComboGroupProps<T>, 'UIType' | 'state' | 'onChange' | 'name'>
> & {
    props: OptionProps & { inputProps?: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> };
};

//추가 파트
type UIType = 'default' | 'button';

//콤보 props 함수
export function formComboProps(
    props: Omit<ComboGroupProps<'checkbox' | 'radio'>, 'UIType' | 'state' | 'name' | 'onChange' | 'children' | 'className'>
) {
    const optionProps: { props: typeof props; rest: typeof props } = { props: {}, rest: {} };

    for (const key in props) {
        optionProps[key.includes('Props') ? 'props' : 'rest'][key as keyof typeof props] = props[key as keyof typeof props];
    }

    return optionProps;
}
