import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { BaseError, BaseResponse } from './type/example.type';

export const Instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
});

//GET
const GET = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const response = await Instance.get<T>(url, config);
    return response;
};

//POST
//eslint-disable-next-line @typescript-eslint/no-explicit-any
const POST = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const response = await Instance.post<T>(url, data, config);
    return response;
};

export const Instance2: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
});

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError<BaseError>;
    }
}

Instance2.interceptors.response.use(
    (response: AxiosResponse) => {
        if (
            (response.data && typeof response.data === 'object' && 'status' in response.data && response.data.status < 200) ||
            response.data.status >= 300
        ) {
            const errorResponse = {
                ...response,
                data: response.data as BaseError,
            };

            return Promise.reject({
                isAxiosError: true,
                code: 'ERR_BAD_REQUEST',
                config: response.config,
                message: `Request failed with status code ${errorResponse.data.status}`,
                name: 'AxiosError',
                response: errorResponse,
                request: response.request,
                status: errorResponse.data.status,
            });
        }

        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            return Promise.reject(error);
        }
        const networkError = {
            ...error,
            response: {
                status: 0,
                statusText: 'Error',
                headers: {},
                config: error.config || {},
                data: {
                    msg: '네트워크 오류가 발생했습니다',
                    msgcode: null,
                    path: error.config?.url || '',
                    createtime: new Date().toISOString(),
                    status: 400,
                    responsetype: 'error',
                    errorslist: [],
                    mainerror: {
                        msg: error.message || '네트워크 연결 실패',
                        errorcode: error.code || 'NETWORK_ERROR',
                    },
                } as BaseError,
            },
        };

        return Promise.reject(networkError);
    },
);

const GET2 = async <T>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse & T> => {
    const response = await Instance.get<BaseResponse & T>(url, config);
    return response.data;
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const POST2 = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse & T> => {
    const response = await Instance2.post<BaseResponse & T>(url, data, config);

    return response.data;
};

const Axios = { GET, POST, GET2, POST2 };
export default Axios;
