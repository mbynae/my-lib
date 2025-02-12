import { memo } from 'react';
import * as Btns from './UI';
import type { ButtonProps, ButtonUIType } from './button-type';

interface Props extends ButtonProps {
    UIType?: ButtonUIType;
}

const Button = ({ UIType = 'default', children, ...props }: Props) => {
    const name = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = Btns[name as keyof typeof Btns];

    return (
        Component && (
            <Component UIType={UIType} {...props}>
                {children}
            </Component>
        )
    );
};

export default memo(Button);
