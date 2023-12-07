import { ReturnClientData as RCD } from '../../Return To Client/interface';
import { RegisterRequest as RR } from './interface';

import { Salt } from '../../Crypto/salt';
import { SHA256 } from '../../Crypto/sha256';
import { DBSelect } from '../../SQL/dbSelect';
import { ReturnData } from '../../Return To Client';
import { InputControl, ValidationError } from '../../Validators/inputControl';

import { DBInsert } from '../../SQL/dbInsert';

export class Register
{
    private returnData: ReturnData;

    constructor()
    {
        this.returnData = new ReturnData();
    }
    async performRegister(registerRequest: RR): Promise<RCD>
    {
        try
        {
            this.validation(registerRequest);
            const salt = new Salt();
            const sha256 = new SHA256();
            const dbSelect = new DBSelect();
            const dbInsert = new DBInsert();
            const username = registerRequest.username;
            const email = registerRequest.email;
            const password = registerRequest.password;
            const saltedPassword = password + salt;
            const hashedPassword = await sha256.hashPassword(saltedPassword);

            const idResult = await dbSelect.selectEmail(email);
            if (idResult.length)
            {
                const returnData = this.returnData.returnClientData(-201, 'The email already register');
                return returnData;
            }

            const ResultSetHeader = await dbInsert.Register(username, email, hashedPassword);
            if (!ResultSetHeader.warningStatus && ResultSetHeader.insertId)
            {
                const returnData = this.returnData.returnClientData(0, 'Register Sucessful');
                return returnData;
            } else
            {
                throw new Error(ResultSetHeader.info);
            }


        } catch (error)
        {
            if (error instanceof ValidationError)
            {
                // handle ValidationError
                const returnData = this.returnData.returnClientData(error.code, error.message, []);
                return returnData;
            } else
            {
                // handle common error
                const returnData = this.returnData.returnClientData(-400, 'Error', []);
                console.log(error);
                return returnData;
            }
        }

    }

    /**
     * Validate the input
     * @param loginRequest 
     */
    validation(loginRequest: RR): void
    {
        if (!loginRequest.email || !loginRequest.password)
        {
            throw new ValidationError(-400, 'Post Data Error');
        } else
        {
            const inputControl = new InputControl();
            // validate the format of user input
            inputControl.validateUsername(loginRequest.username);
            inputControl.validateEmail(loginRequest.email);
            inputControl.validatePassword(loginRequest.password);
        }


    }
}

