//eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgumentFn = (arg: any) => any;
type PickFirstFn<T extends ArgumentFn[]> = T extends [...rest: infer U, firstFn: infer L] ? L : never;
type FirstFnParameterType<T extends ArgumentFn[]> = Parameters<PickFirstFn<T>>[0];
type LastFnReturnType<T extends ArgumentFn[]> = ReturnType<T[0]>;

export const compose =
    <T extends ArgumentFn[]>(...funcs: T) =>
    (initValue?: FirstFnParameterType<T>): LastFnReturnType<T> =>
        funcs.reduceRight((value, func) => func(value), initValue) as LastFnReturnType<T>;
