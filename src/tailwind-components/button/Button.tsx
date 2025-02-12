import * as Btns from './UI';
import type { ButtonProps, ButtonUIType } from './button-type';

function Button<T extends ButtonUIType = 'default'>({ UIType = 'default', children, ...props }: ButtonProps<T>) {
    const name = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = Btns[name as keyof typeof Btns];

    return Component && <Component {...props}>{children}</Component>;
}

export default Button;
