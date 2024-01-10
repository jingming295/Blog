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
        const format: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        const maxLength = 254; // RFC 5322 Official Standard

        if (!format.test(email) || email.length > maxLength)
        {
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

    validateCommonSwitch(value: number)
    {
        if (![0, 1].includes(value))
        {
            throw new ValidationError(-400, 'Please input a correct value');
        }
    }

    validateDomainname(domainname: string): void
    {
        const domainRegex = /^(?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,61})?[a-zA-Z0-9]\.)+[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]$/;

        if (domainname.length > 254)
        {
            throw new ValidationError(-400, 'Domain name is too long');
        } else if (!domainRegex.test(domainname))
        {
            throw new ValidationError(-400, 'Domain name is invalid');
        }
    }

    validateSMTPPassword(password: string): void
    {
        if (password.length > 200)
        {
            throw new ValidationError(-400, 'SMTP password is too long');
        }
    }

    validatePort(port: number): void
    {
        if (!Number.isInteger(port))
        {
            throw new ValidationError(-400, 'Port number is invalid');
        } else if (port < 1 || port > 65535)
        {
            throw new ValidationError(-400, 'Port number is invalid');
        }
    }

    validateCommonSQLID(id: number): void
    {
        if (id < 1 || id > 2147483647)
        {
            throw new ValidationError(-400, 'Please input a correct id');
        }
    }

    verifyToken(token: string): void
    {
        if (token.length !== 64)
        {
            throw new ValidationError(-400, 'Please input a correct token');
        }
    }

}
