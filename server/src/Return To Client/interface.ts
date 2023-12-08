import { AES_256_GCMEncrypted } from "../Crypto/interface";

export interface ReturnClientData
{
  code: number;
  message: string;
  data: any[] | null; // TODO should declare interface
}

export interface LoginData{
  userData: UserData,
  encUserData: AES_256_GCMEncrypted

}

export interface UserData{
  id: number
  name: string
  email: string
  class: number
  avatar: string
}

export interface EncUserData{
  s:string,
  encryptData:string
}