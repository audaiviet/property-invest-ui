interface IError {
    code: number;
    message: string;
    field: string;
}

export interface IApiResponse {

    type: string;
    title: string;
    detail: string;
    instance?: string;
    status: number;

    success: boolean;
    data?: any;
    errors?: IError[];
}

export function newApiError(httpStatus: number, appErrorCode: string, errorClass: string = '') {
    const error:IApiResponse = {
        success: false,
        type: `${process.env.NEXTAUTH_URL}/${appErrorCode}`,
        detail: errorCodes.get(appErrorCode),
        status: httpStatus,
        title: errorClass,
    }
    return error
}

export function getErrorMessage(error: IApiResponse): string {
    if (!error) {
        throw new Error('Invalid parameter!')
    }
    return error.detail
}

const errorCodes: Map<string,string> = new Map<string,string>([
    ['000001', 'Project already exists.'],
    ['000002', 'Project name is required.'],
])