//compose 함수
type ArgumentFn = (arg: any) => any;
type PickFirstFn<T extends any[]> = T extends [...rest: infer U, firstFn: infer L] ? L : never;
type FirstFnParameterType<T extends any[]> = Parameters<PickFirstFn<T>>[any];
type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;

export const compose =
    <T extends ArgumentFn[]>(...funcs: T) =>
    (initValue?: FirstFnParameterType<T>): LastFnReturnType<T> =>
        funcs.reduceRight((value: any, func: ArgumentFn) => func(value), initValue);
