import { useMemo } from 'react';
import { useBooleanHandler } from '../../hooks/useInputHandler';

import TextInput from '../form/textInput/TextInput';
import Icon from '../icon/Icon';
import styles from './PasswordInput.module.css';

import type { TextInputProps } from '../form/textInput/textInput-type';

export default function PasswordInput({ style, className, ...props }: Omit<TextInputProps, 'type'>) {
    const [toggle, setToggle] = useBooleanHandler(false);

    const wrapStyle = useMemo(() => [styles.wrap, className].join(' '), [className]);

    return (
        <div className={wrapStyle} style={style}>
            <TextInput type={toggle ? 'text' : 'password'} style={style} className={className} {...props} />
            <Icon icon={toggle ? 'openEye' : 'closeEye'} onClick={setToggle} className={styles.icon} />
        </div>
    );
}
