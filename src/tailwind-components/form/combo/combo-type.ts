import { DetailedHTMLProps, HTMLProps, InputHTMLAttributes, ReactElement } from 'react';

//combo
interface BaseComboGroupProps<T extends ComboType, U extends ComboUIType, R = 'group'>
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    children: ReactElement<ComboOptionProps<T, U>>[] | ReactElement<ComboOptionProps<T, U>>;
    UIType?: U;
    state?: T extends 'radio' ? string : string[];
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    optionProps?: R extends 'group' ? BaseOptionProps : Omit<BaseOptionProps, 'group'>;
}

interface BaseComboOptionProps<T extends ComboType, U extends ComboUIType>
    extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    type?: T;
    value: string;
    name?: string;
    UIType?: U;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    // optionProps?: Omit<BaseOptionProps, 'group'>;
}

interface BaseOptionProps {
    group?: HTMLProps<HTMLDivElement>;
    label?: HTMLProps<HTMLLabelElement>;
    children?: HTMLProps<HTMLDivElement>;
}

export type ComboGroupProps<T extends ComboType, U extends ComboUIType = 'default', R = 'group'> = U extends 'default'
    ? BaseComboGroupProps<T, U, R> & OptionProps['default']
    : BaseComboGroupProps<T, U, R>;

export type ComboOptionProps<T extends ComboType, U extends ComboUIType = 'default', R = 'option'> = BaseComboOptionProps<T, U> &
    Pick<ComboGroupProps<T, U, R>, 'optionProps'>;

//추가 파트
export type ComboType = 'checkbox' | 'radio';
export type ComboUIType = 'default' | 'button';

interface OptionProps {
    default: { optionProps?: { circle?: HTMLProps<HTMLSpanElement> } };
}

////////////
// import { DetailedHTMLProps, HTMLProps, InputHTMLAttributes, ReactElement } from 'react';

// //combo
// interface BaseComboGroupProps<T extends ComboType, U extends ComboUIType>
//     extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
//     children: ReactElement<ComboOptionProps<T, U>>[] | ReactElement<ComboOptionProps<T, U>>;
//     UIType?: U;
//     state?: T extends 'radio' ? string : string[];
//     name?: string;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     optionProps?: U extends keyof OptionPropsMap ? OptionPropsMap[U] & { group?: HTMLProps<HTMLDivElement> } : never;
// }

// interface BaseComboOptionProps<T extends ComboType, U extends ComboUIType>
//     extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
//     type?: T;
//     value: string;
//     name?: string;
//     UIType?: U;
//     checked?: boolean;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     children?: React.ReactNode;
//     optionProps?: U extends keyof OptionPropsMap ? OptionPropsMap[U] : never;
// }

// // 먼저 UIType별 optionProps 타입을 정의
// interface OptionPropsMap {
//     default: {
//         label?: HTMLProps<HTMLLabelElement>;
//         children?: HTMLProps<HTMLDivElement>;
//         circle?: HTMLProps<HTMLSpanElement>;
//     };
//     button: {
//         label?: HTMLProps<HTMLLabelElement>;
//         children?: HTMLProps<HTMLDivElement>;
//     };
// }

// // ComboGroupProps도 UIType에 따른 타입을 적용
// export type ComboGroupProps<T extends ComboType, U extends ComboUIType = 'default'> = BaseComboGroupProps<T, U>;

// export type ComboOptionProps<T extends ComboType, U extends ComboUIType = 'default'> = BaseComboOptionProps<T, U>;

// //추가 파트
// export type ComboType = 'checkbox' | 'radio';
// export type ComboUIType = 'default' | 'button';
