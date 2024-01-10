import { ReturnClientData as RCD } from '../../Return To Client/interface';
import { RegisterRequest as RR } from './interface';

import { SHA256 } from '../../Crypto/sha256';
import { DBSelect } from '../../SQL/dbSelect';
import { ReturnData } from '../../Return To Client';
import { InputControl, ValidationError } from '../../Validators/inputControl';

import { DBInsert } from '../../SQL/dbInsert';

import crypto from 'crypto';
import { Mail } from '../../Mail';
import { DBUpdate } from '../../SQL/dbUpdate';


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
            const sha256 = new SHA256();
            const dbSelect = new DBSelect();
            const dbInsert = new DBInsert();
            const username = registerRequest.username;
            const email = registerRequest.email;
            const password = registerRequest.password;
            const saltedPassword = password;
            const hashedPassword = await sha256.hashPassword(saltedPassword);

            const idResult = await dbSelect.selectEmail(email);

            if (idResult.length)
            {
                const activeResult = await dbSelect.selectUserActiveStatusByID(idResult[0].u_id);
                if(activeResult.length && activeResult[0].u_active === 0){
                    const token = this.generateToken();
                    const dbUpdate = new DBUpdate();
                    const ResultSetHeader = await dbUpdate.updateUserToken(idResult[0].u_id, token);
                    if (!ResultSetHeader.warningStatus && ResultSetHeader.affectedRows)
                    {
                        const mail = new Mail();
                        mail.sendActivateAccountEmail(email, token);
                        const returnData = this.returnData.returnClientData(0, 'Your account is not activated, a new activation email has been sent to your email');
                        return returnData;
                    } else
                    {
                        throw new Error(ResultSetHeader.info);
                    }
                }
                const returnData = this.returnData.returnClientData(-201, 'The email already register');
                return returnData;
            }

            const LoginAndRegisterSettings = await dbSelect.selectSettingLoginAndRegister();

            if (LoginAndRegisterSettings.length)
            {
                const LoginAndRegisterSetting = LoginAndRegisterSettings[0];
                if (!LoginAndRegisterSetting.s_LNR_allowUserRegis)
                {
                    const returnData = this.returnData.returnClientData(-201, 'Register is not allowed');
                    return returnData;
                }
                if (LoginAndRegisterSetting.s_LNR_emailVerification)
                {
                    const token = this.generateToken();
                    const ResultSetHeader = await dbInsert.Register(username, email, hashedPassword, token);
                    if (!ResultSetHeader.warningStatus && ResultSetHeader.insertId)
                    {
                        const mail = new Mail();
                        mail.sendActivateAccountEmail(email, token);
                        const returnData = this.returnData.returnClientData(0, 'Register sucessful, please check your email to activate your account');
                        return returnData;
                    } else
                    {
                        throw new Error(ResultSetHeader.info);
                    }
                } else {
                    const ResultSetHeader = await dbInsert.Register(username, email, hashedPassword);
                    if (!ResultSetHeader.warningStatus && ResultSetHeader.insertId)
                    {
                        const returnData = this.returnData.returnClientData(0, 'Register Sucessful');
                        return returnData;
                    } else
                    {
                        throw new Error(ResultSetHeader.info);
                    }
                }
            } else
            {
                const ResultSetHeader = await dbInsert.Register(username, email, hashedPassword);
                if (!ResultSetHeader.warningStatus && ResultSetHeader.insertId)
                {
                    const returnData = this.returnData.returnClientData(0, 'Register Sucessful');
                    return returnData;
                } else
                {
                    throw new Error(ResultSetHeader.info);
                }
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

    generateToken()
    {
        return crypto.randomBytes(32).toString('hex');
    }

}

