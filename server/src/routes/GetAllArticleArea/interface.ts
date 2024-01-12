export interface Subarea {
    subAreaID: number | null;
    subareaName: string | null;
    colorscheme: ColorScheme | null;
}

export interface ArticleArea {
    bigareaID: number;
    bigAreaName:string;
    subarea: Subarea[];
}

interface ColorScheme {
    id: number;
    textColor: string;
    backgroundColor: string;
}