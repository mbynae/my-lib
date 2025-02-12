import * as UI from './UI';
import type { TextInputProps } from './textInput-type';

export default function TextInput({ UIType = 'default', ...props }: TextInputProps) {
    // 아이콘 컴포넌트 찾기
    const UIName = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = UI[UIName as keyof typeof UI];

    return Component && <Component {...props} />;
}
