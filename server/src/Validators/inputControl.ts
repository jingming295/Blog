export class ValidationError extends Error
{
    code: number;

    constructor(code: number, message: string)
    {
        super(message);
        this.code = code;
    }
}

export class InputControl
{
    validateUsername(username: string): void
    {
        // Valid characters: letters, numbers, symbols, and Chinese characters. Length: 1 to 20.
        const format: RegExp = /^[a-zA-Z0-9!@#$%^&*()-_=+\u4e00-\u9fa5]{1,20}$/;

        if (!format.test(username))
        {
            throw new ValidationError(400, 'Please input a correct username, must be between 1 and 20 characters.');
        }
    }

    validateEmail(email: string): void
    {
        // Regular expression for validating email addresses.
        const Format: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (!Format.test(email))
        {
            throw new ValidationError(-400, 'Please input correct email');
        }
    }

    validatePassword(password: string): void
    {
        // a-z, 0-9, symbol, sha256 length
        const Format: RegExp = /^[a-zA-Z0-9~!@#$%^&*()-_+=[\]{}|;:'",./?<>\\s]{64}$/;
        if (!Format.test(password))
        {
            throw new ValidationError(-400, 'Please input a correct password');
        }
    }
}
