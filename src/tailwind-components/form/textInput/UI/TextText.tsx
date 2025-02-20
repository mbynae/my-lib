import { classNames } from '../../../../function/className';

import './textField-tailwind.css';
import type { TextFieldProps } from '../textField-type';

export default function TextText({
    value,
    onChange,
    type = 'text',
    className,
    optionProps,
    ...props
}: Omit<TextFieldProps<'text'>, 'UIType'>) {
    return <input {...props} type={type} value={value} onChange={onChange} className={classNames('textField-text', className)} />;
}
