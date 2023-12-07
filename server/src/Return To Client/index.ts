import { ReturnClientData as RCD } from "./interface";
export class ReturnData
{
    returnClientData(code: number, message: string, data?: any | null)
    {
        if (data === undefined)
        {
            data = null;
        }
        const returnData: RCD = {
            code: code,
            message: message,
            data: data
        };
        return returnData;
    }
}