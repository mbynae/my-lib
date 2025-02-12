import { DetailedHTMLProps } from 'react';

export interface ButtonProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
}

export type ButtonUIType = 'default' | 'outline' | 'text';
