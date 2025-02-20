import { HTMLProps } from 'react';
import { classNames } from '../../../function/className';

import Icon from '../../icon/Icon';
import TextField from './TextField';

import type { IconProps } from '../../icon/icon-type';
import type { TextFieldConfig, TextFieldProps } from './textField-type';

interface Props<T> {
    icon?: IconProps['icon'];
    iconDirection?: 'left' | 'right';
    optionProps?: {
        icon?: Partial<IconProps>;
        wrap?: HTMLProps<HTMLDivElement>;
    };
}

const TextFieldWithIcon = <T extends keyof TextFieldConfig = 'default'>({
    className,
    icon = 'search',
    iconDirection = 'left',
    optionProps,
    ...props
}: Props<T> & TextFieldProps<T>) => {
    const { wrap: wrapProps, icon: iconProps, ...rest } = optionProps ?? {};
    const nextProps = Object.keys(rest).length ? { ...props, optionProps: rest } : { ...props };

    return (
        <div {...wrapProps} className={classNames('relative', wrapProps?.className)}>
            {iconDirection === 'left' && (
                <Icon
                    icon={icon}
                    {...iconProps}
                    className={classNames(
                        'absolute top-[50%] left-[10px] w-[var(--text-font-size)] translate-y-[-50%]',
                        iconProps?.className,
                    )}
                />
            )}
            <TextField
                {...nextProps}
                className={classNames(
                    iconDirection === 'left' ? 'pl-[calc(20px+var(--text-font-size))]' : 'pr-[calc(20px+var(--text-font-size))]',
                    className,
                )}
            />
            {iconDirection === 'right' && (
                <Icon
                    icon={icon}
                    {...iconProps}
                    className={classNames(
                        'absolute top-[50%] right-[10px] w-[var(--text-font-size)] translate-y-[-50%]',
                        iconProps?.className,
                    )}
                />
            )}
        </div>
    );
};

export default TextFieldWithIcon;
