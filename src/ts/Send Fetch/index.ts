import { ArticleCard } from "../Manage Article Page/interface";
import { ChangePage } from "../Navigation Bar/changePage";
import { UserData as UD, ArticleData as AD } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { ProfileData } from "../User Profile/interface";
import { ArticleContent } from "./interface";

/**
 * 发送post的class
 */
export class SendPost
{
    handlePopMsg = new HandlePopMsg();
    private postWithUrlParams(api: string, params: Record<string, string | number | UD | AD>)
    {
        const url = `http://localhost:3000/${api}`;
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
            .then(response =>
            {
                if (!response.ok)
                {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseText => responseText)
            .catch(error =>
            {
                console.error('Error:', error);
                throw new Error('Backend Not Running');
            });
    }

    Login(email: string, password: string){
        
        const params = {
            email: email,
            password: password,
        };
        return this.postWithUrlParams('login', params)
            .then(async (response) =>
            {
                this.handlePopMsg.popMsg(response.message);
                if (response.code === 0)
                {
                    localStorage.setItem('UserData', JSON.stringify(response.data));
                    return true
                } else {
                    this.handlePopMsg.popMsg(response.message);
                    return false
                }
            })
            .catch((error) =>
            {
                this.handlePopMsg.popMsg(error);
                return false
            });
    }

    /**
     * Register Account
     * @param email 
     * @param username 
     * @param password 
     */
    Register(email: string, username: string, password: string){
        const params = {
            email: email,
            username: username,
            password: password
        };
        this.postWithUrlParams('register', params)
        .then((response) =>
        {
            this.handlePopMsg.popMsg(response.message);
        })
        .catch((error: any) =>
        {
            console.log(error);
        });
    }
    
    /**
     * Check if user has permission to edit article
     * @param articleID articleID
     */
    CheckPermission(articleID: number)
    {
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                ArticleID: articleID
            };
            this.postWithUrlParams('articlePermission', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        localStorage.clear();
                        const changePage = new ChangePage(true);
                        changePage.toIndex();
                        location.reload();
                    }
                })
                .catch((error) =>
                {
                    localStorage.clear();
                    const changePage = new ChangePage(true);
                    changePage.toIndex();
                    location.reload();
                });
        } else
        {
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
            location.reload();
        }


    }

    UploadArticle(title: string, article: string, area: string, tag: string)
    {
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const ArticleData: AD = {
                id: null,
                title: title,
                article: article,
                area: area,
                tag: tag
            };
            const params = {
                UserData: parseUserData,
                ArticleData: ArticleData
            };
            this.postWithUrlParams('uploadArticle', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                    }
                })
                .catch((error: any) =>
                {
                    console.log(error);
                });
        } else
        {
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
            location.reload();
        }
    }

    UpdateArticle(id: number, title: string, article: string, area: string, tag: string)
    {
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const ArticleData: AD = {
                id: id,
                title: title,
                article: article,
                area: area,
                tag: tag
            };
            const params = {
                UserData: parseUserData,
                ArticleData: ArticleData
            };
            this.postWithUrlParams('uploadArticle', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                    }
                })
                .catch((error: any) =>
                {
                    console.log(error);
                });
        } else
        {
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
            location.reload();
        }
    }

    async getArticleData(): Promise<{ articleTitle: string, articleAuthor: string, articleId: string; }[]>
    {
        const params = {};
        return await this.postWithUrlParams('getArticleCardData', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as { articleTitle: string, articleAuthor: string, articleId: string; }[];
            }
            this.handlePopMsg.popMsg(response.message);
            throw new Error(response.message);
        }).catch((error: any) =>
        {
            console.log(error);
            throw new Error(error);
        });
    }

    async getArticleDataByArea(area: string): Promise<{ articleTitle: string, articleAuthor: string, articleId: string; }[]>
    {
        const params = {
            area: area
        };
        return await this.postWithUrlParams('getArticleDataByArea', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as { articleTitle: string, articleAuthor: string, articleId: string; }[];
            } else {
                this.handlePopMsg.popMsg(response.message);
                const changePage = new ChangePage(true);
                changePage.to404Page();
                return []
            }

        }).catch((error: any) =>
        {
            console.log(error);
            throw new Error(error);
        });
    }

    async getUserProfile(id:number){
        const params = {
            id: id
        };
        return await this.postWithUrlParams('userprofile', params)
            .then(response =>
            {

                if (response.code === 0)
                {
                    
                    const profileData:ProfileData = response.data as ProfileData;
                    return profileData
                    
                } else {

                    return null;
                }
            })
            .catch(error =>
            {
                console.log(error);
                return null
            });
    }

    async getArticleContent(id: number)
    {
        const params = {
            articleId: id
        };
        return await this.postWithUrlParams('getArticleContent', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as ArticleContent;
            } else
            {
                this.handlePopMsg.popMsg(response.message);
                const changePage = new ChangePage(true);
                changePage.to404Page();
                return null
            }
        }).catch((error: any) =>
        {
            const changePage = new ChangePage(true);
            changePage.to404Page();
            return null
        });


    }

    async KeepLogin(parseUserData:UD){
        const params = {
            UserData: parseUserData,
        };
        return await this.postWithUrlParams('keeplogin', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    return true;
                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    localStorage.clear();
                    return false;
                }
            })
            .catch((error) =>
            {
                this.handlePopMsg.popMsg((error as Error).message);
                return false
            });
    }

    async getArticleDataByAuthor(parseUserData:UD){
        const params = {
            UserData: parseUserData,
        };
        return await this.postWithUrlParams('getArticleDataByAuthor', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    return response.data as ArticleCard[];
                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    return null;
                }
            })
            .catch((error) =>
            {
                this.handlePopMsg.popMsg((error as Error).message);
                const changePage = new ChangePage(true);
                changePage.toIndex();
            });
    }

    
    deleteArticle(articleID: number)
    {
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const params = {
                articleID: articleID,
                UserData: JSON.parse(UserData),
            };
    
            this.postWithUrlParams('deleteArticle', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        changePage.toManageArticle();
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        changePage.toIndex();
                    }
                })
                .catch((error) =>
                {
                    this.handlePopMsg.popMsg((error as Error).message);
                    const changePage = new ChangePage(true);
                    changePage.toIndex();
                });
        } else
        {
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
            location.reload();
        }

    }

}
