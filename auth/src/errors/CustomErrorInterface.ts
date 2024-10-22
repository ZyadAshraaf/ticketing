export interface CustomError extends Error{
    statusCode : number,
    serializeErrors() : {message : string; field?: string}[]
}