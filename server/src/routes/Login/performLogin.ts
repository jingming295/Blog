import { LoginRequest as LR } from './interface';
import { LoginData as LD, ReturnClientData as RCD, UserData as UD } from '../../Return To Client/interface';

import { SHA256 } from '../../Crypto/sha256';
import { DBSelect } from '../../SQL/dbSelect';
import { ReturnData } from '../../Return To Client';
import { InputControl, ValidationError } from '../../Validators/inputControl';
import { AES_256_GCM } from '../../Crypto/AES-256-GCM';
import { Mail } from '../../Mail';

import crypto from 'crypto';
import { DBUpdate } from '../../SQL/dbUpdate';



export class Login
{
    private returnData: ReturnData;

    constructor()
    {
        this.returnData = new ReturnData();
    }
    async performLogin(loginRequest: LR): Promise<RCD>
    {
        try
        {
            this.validation(loginRequest);
            // const salt = new Salt();
            const sha256 = new SHA256();
            const dbSelect = new DBSelect();
            const password = loginRequest.password;
            const email = loginRequest.email;
            const saltedPassword = password;
            const hashedPassword = await sha256.hashPassword(saltedPassword);
            const userResult = await dbSelect.login(email, hashedPassword);
            if (!userResult.length)
            {
                const returnData = this.returnData.returnClientData(-101, 'Username and password not match');
                return returnData;
            }

            if (userResult[0].u_active === 0)
            {
                const token = this.generateToken();
                const dbUpdate = new DBUpdate();

                const ResultSetHeader = await dbUpdate.updateUserToken(userResult[0].u_id, token);

                if(!ResultSetHeader.warningStatus && ResultSetHeader.affectedRows === 1){
                    const mail = new Mail()
                    mail.sendActivateAccountEmail(email, token)
                    const returnData = this.returnData.returnClientData(-102, 'Your account is not activated, an activation email has been sent to your email address, please check your email and activate your account.');
                    return returnData;
                }
                const returnData = this.returnData.returnClientData(-103, 'Your account is not activated, please contact the administrator.');
                return returnData;
            }

            const userData:UD = {
                id: userResult[0].u_id,
                name: userResult[0].u_name,
                email: loginRequest.email,
                class: userResult[0].u_class,
                gender: userResult[0].u_gender,
                userDesc: userResult[0].u_desc,
                avatar: userResult[0].avatar_name
            }

            const encryptedData = this.encryptUserData(userData);

            const loginData:LD = {
                userData:userData,
                encUserData:encryptedData
            }

            const returnData = this.returnData.returnClientData(0, 'sucessful', loginData);
            return returnData;


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

    encryptUserData(userData:UD){
        const keyid = userData.id
        const aes_256_GCM = new AES_256_GCM();
        const dataToEncrypt  = JSON.stringify(userData)
        const EncryptedData = aes_256_GCM.encrypt(dataToEncrypt, keyid.toString())
        return EncryptedData;
    }

    generateToken()
    {
        return crypto.randomBytes(32).toString('hex');
    }
    
}