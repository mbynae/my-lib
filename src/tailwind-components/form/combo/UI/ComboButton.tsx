import { classNames } from '../../../../function/className';

import './Combo-tailwind.css';
import type { ComboOptionProps, ComboType } from '../combo-type';

function ComboButton<T extends ComboType>({ children, type, optionProps, ...props }: ComboOptionProps<T, 'button'>) {
    const labelProps = optionProps?.label;
    const childrenProps = optionProps?.children;

    return (
        <label
            aria-label={`${type === 'radio' ? '라디오 버튼' : '체크박스'} 옵션`}
            {...labelProps}
            className={classNames('combo-button', labelProps?.className)}
            onClick={(e) => e.stopPropagation()}
        >
            <input {...props} type={type} className={classNames('input', props.className)} />
            <span {...childrenProps} className={childrenProps?.className}>
                {children}
            </span>
        </label>
    );
}

export default ComboButton;
