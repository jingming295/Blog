import { DatabaseInit } from "./databaseInit";

export class Init{
    init(){
        const databaseInit = new DatabaseInit()
        databaseInit.LoginAndRegisterInit();
    }
}