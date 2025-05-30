import { classNames } from '../../../../function/className';

import './textField-tailwind.css';
import type { TextFieldProps } from '../textField-type';

export default function TextDefault({ value, onChange, type = 'text', className, ...props }: Omit<TextFieldProps<'default'>, 'UIType'>) {
    return <input {...props} type={type} value={value} onChange={onChange} className={classNames('textField-default', className)} />;
}
