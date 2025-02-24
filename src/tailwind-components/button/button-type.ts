import { ComponentProps } from 'react';

interface BaseButtonProps<T extends ButtonUIType> extends ComponentProps<'button'> {
    UIType?: T;
    children?: React.ReactNode;
}

export type ButtonProps<T extends ButtonUIType = 'default'> = T extends 'default' ? BaseButtonProps<T> : BaseButtonProps<T>;

export type ButtonUIType = 'default' | 'outline' | 'text';
