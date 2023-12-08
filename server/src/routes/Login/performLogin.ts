import { LoginRequest as LR } from './interface';
import { EncUserData as EUD, LoginData as LD, ReturnClientData as RCD, UserData as UD } from '../../Return To Client/interface';

import { Salt } from '../../Crypto/salt';
import { SHA256 } from '../../Crypto/sha256';
import { DBSelect } from '../../SQL/dbSelect';
import { ReturnData } from '../../Return To Client';
import { InputControl, ValidationError } from '../../Validators/inputControl';
import { AES_256_GCM } from '../../Crypto/AES-256-GCM';



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
            const salt = new Salt();
            const sha256 = new SHA256();
            const dbSelect = new DBSelect();
            const password = loginRequest.password;
            const email = loginRequest.email;
            const saltedPassword = password + salt;
            const hashedPassword = await sha256.hashPassword(saltedPassword);
            const userResult = await dbSelect.login(email, hashedPassword);
            if (!userResult.length)
            {
                const returnData = this.returnData.returnClientData(-101, 'Username and password not match');
                return returnData;
            }

            const userData:UD = {
                id: userResult[0].u_id,
                name: userResult[0].u_name,
                email: loginRequest.email,
                class: userResult[0].u_class,
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
        const data = aes_256_GCM.decrypt(EncryptedData.encryptedData,EncryptedData.iv, EncryptedData.tag, keyid.toString())
        const UD:UD = JSON.parse(data)
        // console.log(UD)
        return EncryptedData;
    }
    
}