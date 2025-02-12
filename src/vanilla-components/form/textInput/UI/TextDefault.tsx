import { useMemo } from 'react';

import styles from './TextDefault.module.css';

import type { TextInputProps } from '../textInput-type';

export default function TextDefault({ value, onChange, type = 'text', className, ...props }: TextInputProps) {
    const inputStyle = useMemo(() => [styles.input, className].join(' '), [className]);

    return <input {...props} type={type} value={value} onChange={onChange} className={inputStyle} />;
}
