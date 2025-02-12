import { DetailedHTMLProps } from 'react';

//text
export interface TextInputProps extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    UIType?: UIType;
}

//추가 타입
type UIType = 'default' | 'text';
