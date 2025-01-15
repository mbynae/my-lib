import ComboButton from './ComboButton';
import ComboDefault from './ComboDefault';

import type { ComboOptionProps } from '../formType';

const ComboboxUI = ({ UIType, children, ...props }: ComboOptionProps) => {
    if (UIType === 'button') {
        return <ComboButton {...props}>{children}</ComboButton>;
    }
    return <ComboDefault {...props}>{children}</ComboDefault>;
};

export default ComboboxUI;
