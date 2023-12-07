import { LoginRequest as LR } from './interface';
import { ReturnClientData as RCD } from '../../Return To Client/interface';

import { Salt } from '../../Crypto/salt';
import { SHA256 } from '../../Crypto/sha256';
import { DBSelect } from '../../SQL/dbSelect';
import { ReturnData } from '../../Return To Client';
import { InputControl, ValidationError } from '../../Validators/inputControl';



export class Login
{
    private returnData: ReturnData;

    constructor()
    {
        this.returnData = new ReturnData();
    }
    async performLogin(loginRequest: LR):Promise<RCD>
    {
        try
        {
            this.validation(loginRequest);
            const salt = new Salt();
            const sha256 = new SHA256();
            const dbSelect = new DBSelect();
            const password = loginRequest.password;
            const email = loginRequest.email;
            const saltedPassword = password + salt;
            const hashedPassword = await sha256.hashPassword(saltedPassword);
            const userResult = await dbSelect.login(email, hashedPassword);
            if (userResult.length)
            {
                const returnData = this.returnData.returnClientData(0, 'sucessful', userResult);
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'Username and password not match');
                return returnData;
            }
        } catch (error)
        {
            if (error instanceof ValidationError)
            {
                // handle ValidationError
                const returnData = this.returnData.returnClientData(error.code, error.message);
                return returnData;
            } else
            {
                // handle common error
                const returnData = this.returnData.returnClientData(-400, 'Error');
                console.log(error);
                return returnData;
            }
        }

    }

    /**
     * Validate the input
     * @param loginRequest 
     */
    validation(loginRequest: LR): void
    {
        if (!loginRequest.email || !loginRequest.password)
        {
            throw new ValidationError(-400, 'Post Data Error');
        } else
        {
            const inputControl = new InputControl();
            // validate the format of user input
            inputControl.validateEmail(loginRequest.email);
            inputControl.validatePassword(loginRequest.password);
        }


    }
}