import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { AES_256_GCMEncrypted } from './interface';

// Define the structure for cached keys


// AES_256_GCM class for encryption and decryption
export class AES_256_GCM
{
    private readonly algorithm: crypto.CipherGCMTypes = 'aes-256-gcm';

    // Generate a random key of 32 bytes
    private generateKey(): Buffer
    {
        return crypto.randomBytes(32);
    }

    /**
     * Get a cached key if available, otherwise generate a new key and cache it.
     * @param key An identifier that distinguishes different keys
     * @returns The actual key to be used for encryption or decryption
     */
    private getCachedKey(key: string): Buffer
    {
        const filePath = path.join(__dirname, `${key}.json`);
        let actualKey: Buffer;

        // Check if the key file exists
        if (fs.existsSync(filePath))
        {
            // Read the key from the file
            const keyData = fs.readFileSync(filePath);
            actualKey = Buffer.from(JSON.parse(keyData.toString()).key.data);
        } else
        {
            // Generate a new key, write it to the file, and return
            actualKey = this.generateKey();
            const keyData = JSON.stringify({ key: actualKey });
            fs.writeFileSync(filePath, keyData);
        }

        return actualKey;
    }

    /**
     * Encrypt data using AES-256-GCM algorithm.
     * @param data The data to be encrypted
     * @param key An identifier that distinguishes different keys
     * @returns An object containing the encrypted data, initialization vector (IV), and authentication tag
     */
    encrypt(data: string, key: string): AES_256_GCMEncrypted
    {
        const actualKey = this.getCachedKey(key);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, actualKey, iv);
        const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();

        // Return an object with encrypted data, IV, and authentication tag
        const aes_256_GCMEncrypted: AES_256_GCMEncrypted = {
            encryptedData: encryptedData,
            iv: iv,
            tag: tag
        };
        // console.log(this.decrypt(aes_256_GCMEncrypted.encryptedData, aes_256_GCMEncrypted.iv, aes_256_GCMEncrypted.tag, key))
        return aes_256_GCMEncrypted;
    }

    /**
     * Decrypt data using AES-256-GCM algorithm.
     * @param encryptedData The encrypted data to be decrypted
     * @param iv The initialization vector used in encryption
     * @param tag The authentication tag used in encryption
     * @param key An identifier that distinguishes different keys
     * @returns The decrypted data as a UTF-8 string
     */
    decrypt(encryptedData: Buffer, iv: Buffer, tag: Buffer, key: string): string
    {
        const actualKey = this.getCachedKey(key);
        const decipher = crypto.createDecipheriv(this.algorithm, actualKey, iv);
        decipher.setAuthTag(tag);
        const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

        // Convert the decrypted data to a UTF-8 string and return
        const decryptedText = decryptedData.toString('utf8');
        return decryptedText;
    }
}
