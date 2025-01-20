import { DetailedHTMLProps, HTMLProps } from 'react';

//고정 파트
//text
export interface TextInputProps extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    UIType?: UIType['text'];
}

//combo
export interface ComboGroupProps<T extends 'checkbox' | 'radio'> extends OptionProps, HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    state?: T extends 'radio' ? string : string[];
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    UIType?: UIType['combo'];
    className?: string;
    inputProps?: HTMLProps<HTMLInputElement>;
}

export interface ComboOptionProps extends OptionProps, HTMLProps<HTMLInputElement> {
    type: 'radio' | 'checkbox';
    value: string;
    name?: string;
    UIType?: UIType['combo'];
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
    props: OptionProps & { inputProps?: HTMLProps<HTMLInputElement> };
};

//추가 파트
interface UIType {
    text: 'default' | 'text';
    combo: 'default' | 'button';
    select: 'default';
}

//콤보 props 함수
export function formComboProps(
    props: Omit<ComboGroupProps<'checkbox' | 'radio'>, 'UIType' | 'state' | 'name' | 'onChange' | 'children' | 'className'>,
) {
    // // const itemProps = Object.keys(props).filter((e) => e.includes('Props'));

    // const { inputProps, labelProps, circleProps, childrenProps, ...rest } = props;
    // const optionProps = { props: { inputProps, labelProps, childrenProps, circleProps }, rest: { ...rest } };

    // const itemProps = {};
    // const rest = {};

    // Object.entries(props).forEach(([key, value]) => {
    //     (key.includes('Props') ? props : rest)[key] = value;
    // });

    // console.log(itemProps, rest);

    // return { props: itemProps, rest };

    const optionProps: { props: typeof props; rest: typeof props } = { props: {}, rest: {} };

    for (const key in props) {
        optionProps[key.includes('Props') ? 'props' : 'rest'][key as keyof typeof props] = props[key as keyof typeof props];
    }

    return optionProps;
}
