interface RequestResponseErrorModel {
    code: string;
    message: string;
}

interface RequestResponsePagingModel {
    page: number;
    limit: number;
}

export interface RequestResponse<T> {
    data: T;
    error?: RequestResponseErrorModel;
    paging?: RequestResponsePagingModel;
}