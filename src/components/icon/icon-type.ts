import { HTMLProps } from 'react';

export interface IconProps extends HTMLProps<HTMLDivElement> {
    icon: IconType;
    color?: string;
    width?: number | string;
    height?: number | string;
}

type IconType = 'closeEye' | 'openEye';

export const iconAlt = {
    closeEye: '닫힌 눈 아이콘',
    openEye: '열린 눈 아이콘',
};

export interface SvgProps {
    color?: string;
}
