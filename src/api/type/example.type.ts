export interface ExampleApi {
    params: { id: string };
    result: { message: string };
}

export interface BaseResponse {
    msg: string;
    msgcode: number | null;
    path: string;
    createtime: string;
    status: number;
    responsetype: string;
    obj_data: unknown | null;
}

export interface BaseError {
    msg: string;
    msgcode: number | null;
    path: string;
    createtime: string;
    status: 400;
    responsetype: string;
    errorslist: unknown[];
    mainerror: {
        msg: string;
        errorcode: string;
    };
}
