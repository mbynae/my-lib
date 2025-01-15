import { HTMLProps } from 'react';

export interface ComboGroupProps<T extends 'checkbox' | 'radio'> extends OptionProps, HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    state: T extends 'radio' ? string : string[];
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    UIType?: UIType;
    className?: string;
    inputProps?: HTMLProps<HTMLInputElement>;
}

export interface ComboOptionProps extends OptionProps, HTMLProps<HTMLInputElement> {
    type: 'radio' | 'checkbox';
    value: string;
    name?: string;
    UIType?: UIType;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

type UIType = 'default' | 'button';

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

export function formComboProps(
    UIType: UIType,
    props: Omit<ComboGroupProps<'checkbox' | 'radio'>, 'UIType' | 'state' | 'name' | 'onChange' | 'children' | 'className'>
) {
    const { inputProps, labelProps, circleProps, childrenProps, ...rest } = props;
    const optionProps = { props: { inputProps, labelProps, childrenProps }, rest: { ...rest } };

    if (UIType === 'default') {
        Object.assign(optionProps.props, { circleProps });
    }

    return optionProps;
}
