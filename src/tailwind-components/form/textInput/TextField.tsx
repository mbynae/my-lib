import * as UI from './UI';
import type { TextFieldConfig, TextFieldProps } from './textField-type';

export default function TextField<T extends keyof TextFieldConfig = 'default'>({ UIType = 'default' as T, ...props }: TextFieldProps<T>) {
    // 아이콘 컴포넌트 찾기
    const UIName = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = UI[UIName as keyof typeof UI];

    return Component && <Component {...props} />;
}
