export interface AES_256_GCMEncrypted{
    encryptedData:Buffer
    iv:Buffer
    tag:Buffer
}