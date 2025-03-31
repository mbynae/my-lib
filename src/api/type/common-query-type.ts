import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BaseError, BaseResponse } from './example.type';

export type UseQueryOption<T, U> = Omit<UseQueryOptions<T, AxiosError<BaseError>, U>, 'queryKey' | 'queryFn'>;

export type UseMutationOption<T, U = T> = Omit<UseMutationOptions<T, AxiosError<BaseError>, U>, 'mutationKey' | 'mutationFn'>;
