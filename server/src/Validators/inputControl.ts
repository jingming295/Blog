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

    validateEmail(email: string): void {
        // Regular expression for validating email addresses.
        const format: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    
        const maxLength = 254; // RFC 5322 Official Standard
    
        if (!format.test(email) || email.length > maxLength) {
            throw new ValidationError(-400, 'Please input a correct email');
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
    validateGender(gender: number): void
    {
        if (![0, 1, 2].includes(gender))
        {
            throw new ValidationError(-400, 'Please input a correct gender');
        }
    }
    validateUserDesc(userDesc: string): void
    {
        if (userDesc.length > 100)
        {
            throw new ValidationError(-400, 'Please input a correct user description, must be less than 100 characters.');
        }
    }
}
