import { HTMLProps } from 'react';

export interface IconProps extends HTMLProps<HTMLDivElement> {
    icon: IconType;
    color?: string;
    width?: number | string;
    height?: number | string;
}

export interface SvgProps {
    color?: string;
}

//svg 컴포넌트 이름과 동일하게 (앞글자 대소문자 구분없음)
type IconType = 'closeEye' | 'openEye';

export const iconAlt = {
    closeEye: '닫힌 눈 아이콘',
    openEye: '열린 눈 아이콘',
};
