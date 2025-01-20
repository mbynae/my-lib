// //eslint-disable-next-line @typescript-eslint/no-explicit-any
// type ArgumentFn = (arg: any) => any;
// type PickFirstFn<T extends ArgumentFn[]> = T extends [...rest: infer U, firstFn: infer L] ? L : never;
// type FirstFnParameterType<T extends ArgumentFn[]> = Parameters<PickFirstFn<T>>[];
// type LastFnReturnType<T extends ArgumentFn[]> = ReturnType<T[0]>;

// export const compose =
//     <T extends ArgumentFn[]>(...funcs: T) =>
//     (initValue?: FirstFnParameterType<T>): LastFnReturnType<T> =>
//         funcs.reduceRight((value, func) => func(value), initValue) as LastFnReturnType<T>;

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgumentFn = (arg: any) => any;
//eslint-disable-next-line @typescript-eslint/no-explicit-any
type PickFirstFn<T extends any[]> = T extends [...rest: infer U, firstFn: infer L] ? L : never;
//eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirstFnParameterType<T extends any[]> = Parameters<PickFirstFn<T>>[any];
//eslint-disable-next-line @typescript-eslint/no-explicit-any
type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;

export const compose =
    <T extends ArgumentFn[]>(...funcs: T) =>
    (initValue?: FirstFnParameterType<T>): LastFnReturnType<T> =>
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        funcs.reduceRight((value: any, func: ArgumentFn) => func(value), initValue);
