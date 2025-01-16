import BoxButtonUI from './UI/ButtonBoxUI';
import ButtonTextUI from './UI/ButtonTextUI';

import type { ButtonProps, ButtonUIType } from './button-type';

interface Props extends ButtonProps {
    UIType?: ButtonUIType;
}

export default function Button({ UIType = 'default', children, ...props }: Props) {
    if (UIType === 'text') {
        return <ButtonTextUI {...props}>{children}</ButtonTextUI>;
    }

    return (
        <BoxButtonUI UIType={UIType} {...props}>
            {children}
        </BoxButtonUI>
    );
}
