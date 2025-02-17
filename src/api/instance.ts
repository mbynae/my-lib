import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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

const Axios = { GET, POST };
export default Axios;
