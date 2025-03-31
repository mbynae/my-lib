import Axios from '../instance';
import { ExampleApi } from '../type/example.type';

export const fetchGetExample = async (params: ExampleApi['params']) => {
    const result = await Axios.GET2<ExampleApi['result']>('http://localhost:3000/api/example', { params: params });
    return result;
};

export const fetchPostExample = async (data: ExampleApi['params']) => {
    const result = await Axios.POST2<ExampleApi['result']>('http://localhost:3000/api/post', data);
    return result;
};

export const fetchGetExample2 = async (params: ExampleApi['params']) => {
    const result = await Axios.GET2<ExampleApi['result']>('http://localhost:3000/api/example', { params: params });
    return result;
};
