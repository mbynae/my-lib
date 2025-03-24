import { ComponentProps } from 'react';

type BasicOption = {
    wrap?: ComponentProps<'div'>;
    closeBtn?: ComponentProps<'button'>;
    contents?: ComponentProps<'div'> & { center?: boolean };
};

type OptionProps<T extends keyof ModalOptionConfig> = ModalOptionConfig[T] extends never ? BasicOption : BasicOption & ModalOptionConfig[T];

export interface ModalProps<T extends keyof ModalOptionConfig> {
    isOpen: boolean;
    children: React.ReactNode;
    UIType?: T;
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    bgClickActive?: boolean;
    isShowBg?: boolean;
    title?: string;
    name?: string;
    optionProps?: OptionProps<T>;
}

export type BackgroundOverayProps<T extends keyof ModalOptionConfig = 'default'> = Pick<
    ModalProps<T>,
    'children' | 'isShowBg' | 'onClose' | 'bgClickActive' | 'name' | 'onClose'
>;

export type ModalContentsProps<T extends keyof ModalOptionConfig> = Omit<ModalProps<T>, 'isOpen' | 'UIType' | 'bgClickActive' | 'isShowBg'>;

//추가 파트
export type ModalOptionConfig = {
    default: { button?: ComponentProps<'button'>; buttonText?: string };
    basic: never;
};
