import { ComponentProps } from 'react';

//추가할 옵션이 있으면 여기에 추가 후 옵션 값으로 넣기
export interface IconProps extends ComponentProps<'div'>, SvgProps {
    icon: IconType;
    width?: number | string;
    height?: number | string;
}

export interface SvgProps {
    color?: string;
    strokeWidth?: string | number;
}

//svg 컴포넌트 이름과 동일하게 (앞글자 대소문자 구분없음)
type IconType = 'arrow' | 'logout' | 'check' | 'home' | 'directionArrow' | 'transition' | 'carousel' | 'dialog' | 'popover';
