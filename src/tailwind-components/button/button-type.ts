import { DetailedHTMLProps } from 'react';

interface BaseButtonProps<T extends ButtonUIType>
    extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    UIType?: T;
    children?: React.ReactNode;
}

export type ButtonProps<T extends ButtonUIType = 'default'> = T extends 'default' ? BaseButtonProps<T> : BaseButtonProps<T>;

export type ButtonUIType = 'default' | 'outline' | 'text';
