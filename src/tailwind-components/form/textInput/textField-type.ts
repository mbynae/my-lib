import { ComponentProps } from 'react';

interface BaseProps<T extends keyof TextFieldConfig> extends ComponentProps<'input'> {
    UIType?: T;
}
export type TextFieldProps<T extends keyof TextFieldConfig> = TextFieldConfig[T] extends never
    ? BaseProps<T>
    : BaseProps<T> & { optionProps?: TextFieldConfig[T] };

//추가 타입
export type TextFieldConfig = {
    default: never;
    text: { text?: string };
};
