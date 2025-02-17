import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type UseQueryOption<T, U> = Omit<UseQueryOptions<T, Error, U>, 'queryKey' | 'queryFn'>;

export type UseMutationOption<T, U = T> = Omit<UseMutationOptions<T, Error, U>, 'mutationKey' | 'mutationFn'>;
