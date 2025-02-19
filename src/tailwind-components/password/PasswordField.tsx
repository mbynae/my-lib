import { useMemo } from 'react';
import { useBooleanHandler } from '../../hooks/useInputHandler';

import TextField from '../form/textInput/TextField';
import Icon from '../icon/Icon';
import styles from './PasswordField.module.css';

import type { TextFieldProps } from '../form/textInput/textField-type';

export default function PasswordField({ style, className, ...props }: Omit<TextFieldProps, 'type'>) {
    const [toggle, setToggle] = useBooleanHandler(false);

    const wrapStyle = useMemo(() => [styles.wrap, className].join(' '), [className]);

    return (
        <div className={wrapStyle} style={style}>
            <TextField type={toggle ? 'text' : 'password'} style={style} className={className} {...props} />
            <Icon icon={toggle ? 'openEye' : 'closeEye'} onClick={setToggle} className={styles.icon} />
        </div>
    );
}

//TODO: 오픈아이, 클로즈아이 아이콘 추가
//TODO: TextFieldWithIcon으로 리팩토링
