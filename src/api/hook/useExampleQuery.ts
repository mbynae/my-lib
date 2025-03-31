import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { BaseResponse, ExampleApi } from '../type/example.type';
import { fetchGetExample, fetchPostExample } from '../fetch/example-api-fetch';
import { UseMutationOption, UseQueryOption } from '../type/common-query-type';

export const callExampleQuery = (params: ExampleApi['params']) => {
    return queryOptions({
        queryKey: ['example', { ...params }],
        queryFn: () => fetchGetExample(params),
    });
};

export const useCallExampleQuery = <T = BaseResponse & ExampleApi['result']>(
    params: ExampleApi['params'],
    options?: UseQueryOption<ExampleApi['result'], T>,
) => {
    return useQuery({
        queryKey: ['example', { ...params }],
        queryFn: () => fetchGetExample(params),
        ...options,
    });
};

export const useExampleMutate = (options?: UseMutationOption<ExampleApi['result'], ExampleApi['params']>) => {
    return useMutation({
        mutationFn: (data) => fetchPostExample(data),
        ...options,
    });
};
