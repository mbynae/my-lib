// input 이벤트 핸들러
import { useCallback, useMemo, useState } from 'react';
import { Eq } from '../function/eq';

type InputState<T extends string | number | object> = T extends string ? string : T extends number ? number : Extract<T, object>;
export const useInputHandler = <T extends string | number | object>(initialState: InputState<T>) => {
    const [state, setState] = useState(initialState);
    const initNameKeys = useMemo(() => (typeof initialState === 'object' ? Object.keys(initialState) : null), [initialState]);

    const onChange = useCallback(
        (
            event?:
                | typeof initialState
                | ((prev: typeof state) => typeof state)
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
                | React.ChangeEvent<HTMLSelectElement>,
        ) => {
            if (typeof event === 'undefined') {
                return setState(initialState);
            }

            if (typeof event === 'object' && 'target' in event && typeof event.target === 'object') {
                if (typeof initialState === 'string') {
                    return setState(event.target.value as typeof initialState);
                }

                if (typeof initialState === 'number') {
                    if (isNaN(Number(event.target.value))) return;
                    return setState(Number(event.target.value) as typeof state);
                }

                if (typeof initialState === 'object') {
                    const name = event.target.name as keyof typeof state & string;
                    const value = event.target.value;

                    if (!initNameKeys!.find((key) => key === name))
                        throw Error(`initialState와 일치하는 input.name = ${name} 이 없습니다.`);
                    return setState((prev) => {
                        return { ...(prev as typeof initialState), [name]: value };
                    });
                }
            }

            setState(event as typeof initialState | ((prev: typeof state) => typeof state));
        },
        [initialState],
    );

    return [state, onChange] as const;
};

//boolean 이벤트 핸들러
type BooleanState<T extends boolean | object> = T extends boolean ? boolean : Extract<T, object>;
export const useBooleanHandler = <T extends boolean | object>(initialState: BooleanState<T>) => {
    const [state, setState] = useState(initialState);
    const initNameKeys = useMemo(() => (typeof initialState === 'object' ? Object.keys(initialState) : null), [initialState]);

    const onEventHandler = useCallback(
        (
            event?:
                | typeof initialState
                | ((prev: typeof state) => typeof state)
                | React.ChangeEvent<HTMLInputElement>
                | React.MouseEvent<HTMLElement>,
        ) => {
            if (typeof event === 'undefined') {
                return setState(initialState);
            }

            if (typeof event === 'object' && 'target' in event && typeof event.target === 'object') {
                const eventTarget = event.target as HTMLInputElement;

                if (typeof initialState === 'boolean') {
                    return setState((prev) => !prev as typeof initialState);
                }

                if (typeof initialState === 'object') {
                    const { name, dataset } = eventTarget;

                    const targetName = name ?? dataset.name;

                    if (!initNameKeys!.find((key) => key === targetName)) {
                        throw Error(`initialState와 일치하는 input.name = ${targetName} 이 없습니다.`);
                    }

                    return setState((prev) => ({
                        ...(prev as typeof state & object),
                        [targetName]: !(prev as Record<typeof targetName, boolean>)[targetName],
                    }));
                }
            }

            setState(event as typeof initialState | ((prev: typeof state) => typeof state));
        },
        [initialState],
    );

    return [state, onEventHandler] as const;
};

export const useCheckboxHandler = (initialState: string[]) => {
    const [state, setState] = useState(initialState);

    const onCheck = useCallback(
        (event?: typeof initialState | ((prev: typeof state) => typeof state) | React.ChangeEvent<HTMLInputElement>) => {
            if (typeof event === 'undefined') {
                return setState(initialState);
            }

            if (typeof event === 'object' && 'target' in event && typeof event.target === 'object') {
                const { value, checked } = event.target;

                if (checked) return setState((prev) => prev.concat(value));
                return setState((prev) => prev.filter((data) => data !== value));
            }

            setState(event as typeof initialState | ((prev: typeof state) => typeof state));
        },
        [initialState],
    ); //개별 체크박스 onChange 핸들러

    const onAllCheck = useCallback(
        (data: string[]) => {
            //전체 체크 상태일 시 전체 해제
            if (Eq.arrEqCheck(data, state)) {
                const setData = new Set(data);
                return setState((prev) => prev.filter((e) => !setData.has(e)));
            }

            //전체 체크상태가 아닐 시 전체 체크
            setState([...new Set([...state, ...data])]);
        },
        [state],
    ); //클릭 시 배열 데이터(data인자) 전체 체크 / 해제

    return [state, onCheck, onAllCheck] as const;
};
