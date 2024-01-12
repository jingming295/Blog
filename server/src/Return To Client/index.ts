import { ArticleArea } from "../routes/GetAllArticleArea/interface";
import { AllArticleBigArea } from "../routes/GetAllArticleBigArea/interface";
import { ReformColorSchemeData } from "../routes/GetAllColorScheme/interface";
import { RetArticleCardData } from "../routes/GetArticleCardData/interface";
import { ManageArticleData } from "../routes/GetArticleDataByAuthor/interface";
import { Data, ReturnClientData as RCD } from "./interface";
export class ReturnData
{
    returnClientData(
        code: number,
        message: string,
        data?: Data | null | RetArticleCardData[] | ManageArticleData[] | ArticleArea[] | ReformColorSchemeData[] | AllArticleBigArea[]
    )
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