import { classNames } from '../../../../function/className';

import './Combo-tailwind.css';
import type { ComboOptionProps, ComboType } from '../combo-type';

function ComboDefault<T extends ComboType>({ children, type, optionProps, ...props }: ComboOptionProps<T, 'default'>) {
    const { label: labelProps, circle: circleProps, children: childrenProps } = optionProps || {};

    return (
        <label
            aria-label={`${type === 'radio' ? '라디오 버튼' : '체크박스'} 옵션`}
            {...labelProps}
            className={classNames('combo-default', labelProps?.className)}
            onClick={(e) => e.stopPropagation()}
        >
            <input {...props} type={type} className={classNames('input', props.className)} />
            <span {...circleProps} className={classNames('circle', circleProps?.className)} />
            <span {...childrenProps} className={childrenProps?.className}>
                {children}
            </span>
        </label>
    );
}

export default ComboDefault;
