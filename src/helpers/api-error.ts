export default class ApiError extends Error {
    constructor(public message: string, public status: number) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
