import { ColorScheme } from "../Send Fetch/interface";

interface BigArea {
    bigareaID: number;
    bigAreaName: string;
}

export interface ArticleSubArea {
    subAreaID: number;
    subareaName: string;
    bigArea: BigArea;
    colorScheme: ColorScheme;
}