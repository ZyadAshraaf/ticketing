import { CustomError } from "./custom-error";

export class NotAuthError extends CustomError {
    statusCode = 400;
    reason  :string = 'Unauthorized';
    constructor(message: string) {
        super('Unauthorized');
        Object.setPrototypeOf(this, NotAuthError.prototype);
    }

    serializeErrors= ()=>{
        return [
            {message: this.reason}
        ]
    }
}
