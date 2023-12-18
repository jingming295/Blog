export interface userData{
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

  export interface UserData{
    userData:userData;
    encUserData:EncUserData;
  }

  export interface ArticleData{
    title:string;
    article:string;
    area:string;
    tag:string;
  }