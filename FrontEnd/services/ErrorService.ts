interface IError {
    code: number;
    message: string;
    field?: string;
}

export interface IApiResponse {

    success: boolean;
    status: number;
    
    data?: any;

    type?: string;
    title?: string;
    detail?: string;
    instance?: string;
    errors?: (IError|any)[];
}

export function newApiError(httpStatus: number, appErrorCode: string, errorClass: string = '', error: any = undefined): IApiResponse {
    return {
        success: false,
        type: `${process.env.NEXTAUTH_URL}/${appErrorCode}`,
        detail: errorCodes.get(appErrorCode),
        status: httpStatus,
        title: errorClass,
        errors: [error]
    }
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
    ['000003', 'Method not implemented.'],
    ['000004', 'Could not get projects'],
    ['000005', 'Error deleting project'],
    ['000006', 'Could not create project'],
    ['000007', 'Could not update project'],
    ['100000', 'Server error'],
])