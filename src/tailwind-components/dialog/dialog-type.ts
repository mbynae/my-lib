import { ComponentProps, RefObject } from 'react';

export type DialogProps = ComponentProps<'dialog'> & {
    ref: RefObject<HTMLDialogElement | null>;
    title: string;
    children: React.ReactNode;
    bgClose?: boolean;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    formMathod?: ComponentProps<'form'>['method'];
    duration?: number;
    optionProps?: OptionsProps;
};

type OptionsProps = {
    form?: ComponentProps<'form'>;
    title?: ComponentProps<'h5'>;
    contents?: ComponentProps<'section'>;
};
