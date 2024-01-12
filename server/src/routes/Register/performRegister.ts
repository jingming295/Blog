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
    async performRegister(registerRequest: RR): Promise<RCD> {
        try {
            this.validation(registerRequest);
            const sha256 = new SHA256();
            const dbSelect = new DBSelect();
            const dbInsert = new DBInsert();
            const { username, email, password } = registerRequest;
            const saltedPassword = password;
            const hashedPassword = await sha256.hashPassword(saltedPassword);
    
            const idResult = await dbSelect.selectEmail(email);
    
            if (idResult.length) {
                const { u_id } = idResult[0];
                const activeResult = await dbSelect.selectUserActiveStatusByID(u_id);
    
                if (activeResult.length && activeResult[0].u_active === 0) {
                    const token = this.generateToken();
                    const dbUpdate = new DBUpdate();
                    const { warningStatus, affectedRows } = await dbUpdate.updateUserToken(u_id, token);
    
                    if (!warningStatus && affectedRows) {
                        const mail = new Mail();
                        mail.sendActivateAccountEmail(email, token);
                        return this.returnData.returnClientData(0, 'Your account is not activated, a new activation email has been sent to your email');
                    } else {
                        throw new Error('Error updating user token: ' + warningStatus);
                    }
                }
    
                return this.returnData.returnClientData(-201, 'The email already registered');
            }
    
            const loginAndRegisterSettings = await dbSelect.selectSettingLoginAndRegister();
    
            if (loginAndRegisterSettings.length) {
                const { s_LNR_allowUserRegis, s_LNR_emailVerification } = loginAndRegisterSettings[0];
    
                if (!s_LNR_allowUserRegis) {
                    return this.returnData.returnClientData(-201, 'Register is not allowed');
                }
    
                const token = s_LNR_emailVerification ? this.generateToken() : undefined;
                const { warningStatus, insertId } = await dbInsert.Register(username, email, hashedPassword, token);
    
                if (!warningStatus && insertId) {
                    const mail = new Mail();
                    if (s_LNR_emailVerification) {
                        mail.sendActivateAccountEmail(email, token!);
                        return this.returnData.returnClientData(0, 'Register successful, please check your email to activate your account');
                    } else {
                        return this.returnData.returnClientData(0, 'Register successful');
                    }
                } else {
                    throw new Error('Error inserting user: ' + warningStatus);
                }
            } else {
                throw new Error('Login and Register settings not found');
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                return this.returnData.returnClientData(error.code, error.message);
            } else {
                console.error(error);
                return this.returnData.returnClientData(-400, 'Error');
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

