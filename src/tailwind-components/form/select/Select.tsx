import { ReactElement, useId, useMemo, useRef, useState } from 'react';
import { useBooleanHandler } from '../../../hooks/useInputHandler';
import { useCloseDropdown } from '../../../hooks/useSideEffect';

import * as UI from './UI';
import type { SelectGroupProps, SelectOptionProps, SelectUIType } from './select-type';

function Select<T extends SelectUIType = 'default'>({
    UIType = 'default',
    children,
    name,
    state,
    onChange,
    optionProps,
    ...props
}: SelectGroupProps<T>) {
    //init
    const tempName = useId();

    //ref
    const ref = useRef<HTMLDivElement>(null);

    const initState = useMemo(() => initSelectValue(children, state), []);

    //state
    const [active, setActive] = useBooleanHandler(false);
    const [unControl, setUnControl] = useState(initState.value);
    const [innerText, setInnerText] = useState<React.ReactNode>(initState.text);

    //event handler
    const onChangeHandler = (e: React.MouseEvent<HTMLInputElement>, text: React.ReactNode) => {
        if (onChange) onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        else setUnControl(e.currentTarget.value);
        setInnerText(text);
        setActive();
    };

    //side effect
    useCloseDropdown(active, ref, setActive);

    // 아이콘 컴포넌트 찾기
    const UIName = UIType.charAt(0).toUpperCase() + UIType.slice(1);
    const Component = UI[UIName as keyof typeof UI];

    return (
        Component && (
            <Component
                state={state ?? unControl}
                name={name ?? tempName}
                ref={ref}
                active={active}
                innerText={innerText}
                setActive={setActive}
                onChange={onChangeHandler}
                optionProps={optionProps}
                {...props}
            >
                {children}
            </Component>
        )
    );
}

Select.Option = Option;

function Option(props: SelectOptionProps) {
    return null;
}

export default Select;

function initSelectValue(children: ReactElement<SelectOptionProps>[] | ReactElement<SelectOptionProps>, state?: string) {
    if (!children) throw Error('Select.Option이 없습니다.');

    const arr = Array.isArray(children) ? children : [children];
    const initCheck = arr.findLast((child) => child.props?.defaultCheck);

    if (state === undefined && initCheck) {
        return { value: initCheck.props.value, text: initCheck.props.children };
    }

    if (state === undefined && !initCheck) {
        return { value: arr[0].props.value, text: arr[0].props.children };
    }

    const initState = arr.find((child) => child.props.value === state);
    return { value: initState?.props.value, text: initState?.props.children };
}
