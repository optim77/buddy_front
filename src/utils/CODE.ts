export enum HTTP_CODE {
    OK = 200,
    CREATED = 201,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_FOUND = 405,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}

export enum MESSAGE_TYPE {
    ERROR = 'error',
    SUCCESS = 'success',
}

export enum MESSAGE_TYPE_ERROR {
    FAILED_TO_FETCH = 'Failed to fetch',
}
