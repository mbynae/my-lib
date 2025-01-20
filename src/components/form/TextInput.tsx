import TextDefault from './text/TextDefault';

import type { TextInputProps } from './form-type';

export default function TextInput({ UIType = 'default', ...props }: TextInputProps) {
    if (UIType !== 'default') return <div></div>;

    return <TextDefault {...props} />;
}
