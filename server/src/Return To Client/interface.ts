import { AES_256_GCMEncrypted } from "../Crypto/interface";
import { ArticleArea } from "../routes/GetAllArticleArea/interface";
import { AllArticleBigArea } from "../routes/GetAllArticleBigArea/interface";
import { ReformColorSchemeData } from "../routes/GetAllColorScheme/interface";
import { RetArticleCardData, author } from "../routes/GetArticleCardData/interface";
import { Article, colorScheme } from "../routes/GetArticleContent/interface";
import { ManageArticleData } from "../routes/GetArticleDataByAuthor/interface";

export interface ReturnClientData
{
  code: number;
  message: string;
  data: Data | null | RetArticleCardData[] | ManageArticleData[] | ArticleArea[] | ReformColorSchemeData[] | AllArticleBigArea[]; // TODO should declare interface
}

export interface Data{
  id?:number
  userData?: UserData
  encUserData?: AES_256_GCMEncrypted
  article?: Article;
  author?: author;
  colorScheme?: colorScheme;
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
  gender: number
  userDesc:string
  avatar: string
}

export interface LoginDataFromClient{
  userData: UserData
  encUserData: {
    encryptedData: {
      type: 'Buffer'
      data: number[]
    }
    iv: {
      type: 'Buffer'
      data: number[]
    }
    tag: {
      type: 'Buffer'
      data: number[]
    }
  }
}