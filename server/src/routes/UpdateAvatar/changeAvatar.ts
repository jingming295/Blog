import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, UserData as UD } from "../../Return To Client/interface";
import fs from 'fs';
import path from "path";
import { DBSelect } from "../../SQL/dbSelect";
import crypto from 'crypto';
import { DBUpdate } from "../../SQL/dbUpdate";
import { DBInsert } from "../../SQL/dbInsert";


export class ChangeAvatar
{
    returnData = new ReturnData();
    async changeAvatar(data: { UserData: LD, avatarFile: Express.Multer.File; })
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData))
            {
                const dbSelect = new DBSelect();
                const sha256 = await this.getSHA256(data.avatarFile.path);
                const avatar_name = await dbSelect.selectSHA256(sha256);
                if (avatar_name.length > 0)
                {
                    const dbUpdate = new DBUpdate();
                    const updateResult = await dbUpdate.updateAvatar(userData.id, avatar_name[0].avatar_name);
                    if (updateResult.affectedRows > 0)
                    {
                        fs.unlink(data.avatarFile.path, (err) =>
                        {
                            if (err)
                            {
                                console.error('Error:', err);
                                throw err;
                            }
                        });
                        const LoginData = await this.generateUserData(userData.id);
                        const returnData = this.returnData.returnClientData(0, 'Success', LoginData);
                        return returnData;
                    } else
                    {
                        const returnData = this.returnData.returnClientData(-400, 'Error');
                        return returnData;
                    }
                } else
                {
                    const dbinsert = new DBInsert();
                    const insertResult = await dbinsert.insertAvatar(data.avatarFile.filename, sha256);
                    if(!insertResult.warningStatus && insertResult.insertId){
                        const dbUpdate = new DBUpdate();
                        const updateResult = await dbUpdate.updateAvatar(userData.id, data.avatarFile.filename);
                        if (updateResult.affectedRows > 0)
                        {
                            const LoginData = await this.generateUserData(userData.id);
                            const returnData = this.returnData.returnClientData(0, 'Success', LoginData);
                            return returnData;
                        } else
                        {
                            const returnData = this.returnData.returnClientData(-400, 'Error');
                            return returnData;
                        }
                    }
                }

            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'User data not match');
                return returnData;
            }
        } catch (error)
        {
            // invalid iv
            if (error instanceof Error && error.message.includes('Unsupported state or unable to authenticate data'))
            {
                const returnData = this.returnData.returnClientData(-102, 'Invalid IV or Auth Tag');
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-400, 'Error');
                console.log(error);
                return returnData;
            }
        }
    }


    getFileName(originalPath: string, targetDir: string, filename: string, extension: string, index = 1): string
    {
        // 生成新的文件名
        let newFilename = path.join(`${index > 0 ? index : ''}${extension}`);
        let newFilepath = path.join(targetDir, newFilename);
        // 检查文件是否存在
        if (fs.existsSync(newFilepath))
        {
            // 如果文件已存在，递归调用自身并增加索引
            return (this.getFileName(originalPath, targetDir, filename, extension, index + 1));
        } else
        {
            return newFilename;
        }
    }

    private getSHA256(filename: string): Promise<string>
    {
        return new Promise((resolve, reject) =>
        {
            let hash = crypto.createHash('sha256');
            let stream = fs.createReadStream(filename);

            stream.on('data', (data) =>
            {
                hash.update(data);
            });

            stream.on('end', () =>
            {
                resolve(hash.digest('hex'));
            });

            stream.on('error', (err) =>
            {
                reject(err);
            });
        });
    }

    private decryptUserData(encUserData: AES_256_GCMEncrypted, key: string)
    {
        const aes_256_GCM = new AES_256_GCM();
        const decUserData: UD = JSON.parse(aes_256_GCM.decrypt(encUserData.encryptedData, encUserData.iv, encUserData.tag, key));
        return decUserData;
    }

    private async generateUserData(userID:number){
        const aes_256_GCM = new AES_256_GCM();
        const dbSelect = new DBSelect();
        const userResult = await dbSelect.selectUserProfile(userID);
        const userData: UD = {
            id: userResult[0].u_id,
            name: userResult[0].u_name,
            email: userResult[0].u_email,
            class: userResult[0].u_class,
            gender: userResult[0].u_gender,
            userDesc: userResult[0].u_desc,
            avatar: userResult[0].avatar_name
        }
        const encryptedData = aes_256_GCM.encrypt(JSON.stringify(userData), userID.toString());
        const loginData:LD = {
            userData:userData,
            encUserData:encryptedData
        }
        return loginData;
    }
}