import { NavigationProgress } from "../Create Navigation Progress";
import { ArticleCard } from "../Manage Article Page/interface";
import { ChangePage } from "../Navigation Bar/changePage";
import { UserData as UD, ArticleData as AD } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { ProfileData } from "../User Profile/interface";
import { ArticleCardData, ArticleContent, RetArticleData, setting_loginandregister } from "./interface";
import { urlconfig } from "../Url Config/config";

/**
 * 发送post的class
 */
export class SendPost
{
    private navigationProgress = new NavigationProgress();
    constructor()
    {

    }
    handlePopMsg = new HandlePopMsg();
    private postWithUrlParams(api: string, params: Record<string, string | number | UD | AD | File>)
    {
        const url = `${urlconfig.serverUrl}${api}`;
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

    private postWithUrlFormData(api: string, params: FormData, progressDiv: HTMLDivElement | null): Promise<XMLHttpRequest["response"]>
    {
        const url = `${urlconfig.serverUrl}${api}`;


        return new Promise((resolve, reject) =>
        {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.upload.onprogress = function (event)
            {
                if (event.lengthComputable)
                {
                    let percentComplete = event.loaded / event.total * 100;
                    if (progressDiv)
                    {
                        progressDiv.classList.add('changeImgBtnHovered');
                        progressDiv.style.width = percentComplete.toFixed(0) + '%';
                        progressDiv.innerHTML = percentComplete.toFixed(0) + '%';
                        if (percentComplete.toFixed(0) === '100')
                        {
                            progressDiv.innerHTML = 'Done';
                            progressDiv.classList.remove('changeImgBtnHovered');
                            setTimeout(() =>
                            {
                                progressDiv.innerHTML = 'Change Image';
                            }, 300);
                        }
                    }
                }
            };
            xhr.onload = function ()
            {
                if (xhr.status === 200)
                {
                    resolve(JSON.parse(xhr.response));
                } else
                {
                    reject(new Error('Network response was not ok'));
                }
            };
            xhr.onerror = function ()
            {
                reject(new Error('Backend Not Running'));
            };
            xhr.send(params);
        });
    }


    Login(email: string, password: string)
    {

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
                    return true;
                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    return false;
                }
            })
            .catch((error) =>
            {
                this.handlePopMsg.popMsg(error);
                return false;
            });
    }

    /**
     * Register Account
     * @param email 
     * @param username 
     * @param password 
     */
    async Register(email: string, username: string, password: string)
    {
        const params = {
            email: email,
            username: username,
            password: password
        };
        return await this.postWithUrlParams('register', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    this.handlePopMsg.popMsg(response.message);
                    return 1;
                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    return null;
                }
            })
            .catch((error: any) =>
            {
                console.log(error);
                return null;
            });
    }

    /**
     * Check if user has permission to edit article
     * @param articleID articleID
     */
    async CheckPermission(articleID: number)
    {
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                ArticleID: articleID
            };
            await this.postWithUrlParams('articlePermission', params)
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
            this.handlePopMsg.popMsg('You has no permission to edit this article');
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
        }


    }

    UploadArticle(title: string, article: string, area: string, tag: string)
    {
        this.navigationProgress.start();
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
                        const changePage = new ChangePage(true);
                        changePage.toIndex();
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                    }
                })
                .catch((error: any) =>
                {
                    console.log(error);
                })
                .finally(() =>
                {
                    this.navigationProgress.end();
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
        this.navigationProgress.start();
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
                })
                .finally(() =>
                {
                    this.navigationProgress.end();
                });
        } else
        {
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
            location.reload();
        }
    }

    async getArticleCardData(): Promise<ArticleCardData[]>
    {
        this.navigationProgress.start();
        const params = {};
        return await this.postWithUrlParams('getArticleCardData', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as ArticleCardData[];
            }
            this.handlePopMsg.popMsg(response.message);
            throw new Error(response.message);
        }).catch((error: any) =>
        {
            console.log(error);
            throw new Error(error);
        })
            .finally(() =>
            {
                this.navigationProgress.end();
            });
    }

    async getArticleCardDataByArea(area: string): Promise<ArticleCardData[]>
    {
        this.navigationProgress.start();
        const params = {
            area: area
        };
        return await this.postWithUrlParams('getArticleCardData', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as ArticleCardData[];
            } else
            {
                this.handlePopMsg.popMsg(response.message);
                const changePage = new ChangePage(true);
                changePage.to404Page();
                return [];
            }

        }).catch((error: any) =>
        {
            console.log(error);
            throw new Error(error);
        })
            .finally(() =>
            {
                this.navigationProgress.end();
            });
    }

    async getArticleCardDataByKeyword(keyword: string): Promise<ArticleCardData[]>
    {
        this.navigationProgress.start();
        const params = {
            keyword: keyword
        };
        return await this.postWithUrlParams('getArticleCardData', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as ArticleCardData[];
            } else
            {
                this.handlePopMsg.popMsg(response.message);
                return [];
            }
        }).catch((error: any) =>
        {
            console.log(error);
            throw new Error(error);
        })
            .finally(() =>
            {
                this.navigationProgress.end();
            });
    }

    async getUserProfile(id: number)
    {
        this.navigationProgress.start();
        const params = {
            id: id
        };
        return await this.postWithUrlParams('getUserProfileData', params)
            .then(response =>
            {
                if (response.code === 0)
                {

                    const profileData: ProfileData = response.data as ProfileData;
                    return profileData;

                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    return null;
                }
            })
            .catch(error =>
            {
                console.log(error);
                return null;
            }).finally(() =>
            {
                this.navigationProgress.end();
            });
    }

    async getArticleContent(id: number)
    {
        this.navigationProgress.start();
        const params = {
            articleId: id
        };
        return await this.postWithUrlParams('getArticleContent', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as RetArticleData;
            } else
            {
                this.handlePopMsg.popMsg(response.message);
                const changePage = new ChangePage(true);
                changePage.to404Page();
                return null;
            }
        }).catch((error: any) =>
        {
            const changePage = new ChangePage(true);
            changePage.to404Page();
            return null;
        })
            .finally(() =>
            {
                this.navigationProgress.end();
            });


    }

    async KeepLogin(parseUserData: UD)
    {
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
                return false;
            });
    }

    async getArticleDataByAuthor(UserID: number)
    {
        const params = {
            UserID: UserID,
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
            })
            .finally(() =>
            {
            });
    }


    async deleteArticle(articleID: number)
    {
        this.navigationProgress.start();
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
                })
                .finally(() =>
                {
                    this.navigationProgress.end();
                });
        } else
        {
            this.handlePopMsg.popMsg('You has no permission to delete this article');
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
        }

    }

    async changeAvatar(userData: UD, avatar: File, progressDiv: HTMLDivElement)
    {
        const params = new FormData();
        params.append('UserData', JSON.stringify(userData));
        params.append('avatarFile', avatar);

        return await this.postWithUrlFormData('changeAvatar', params, progressDiv)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    return response.data as UD;
                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    return null;
                }
            })
            .catch((error) =>
            {
                this.handlePopMsg.popMsg((error as Error).message);
                return null;
            });
    }

    async updateUserProfile(userData: UD, username: string, gender: number, description: string)
    {
        const params = {
            UserData: userData,
            newUsername: username,
            newGender: gender,
            newDescription: description
        };
        return await this.postWithUrlParams('updateUserProfile', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    this.handlePopMsg.popMsg(response.message);
                    return response.data as UD;
                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    return null;
                }
            })
            .catch((error) =>
            {
                this.handlePopMsg.popMsg((error as Error).message);
                return null;
            });
    }

    async updateUserPassword(userData: UD, password: string)
    {
        const params = {
            UserData: userData,
            newPassword: password
        };
        return await this.postWithUrlParams('updateUserPassword', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    this.handlePopMsg.popMsg(response.message);
                    return true;
                } else
                {
                    this.handlePopMsg.popMsg(response.message);
                    return false;
                }
            })
            .catch((error) =>
            {
                this.handlePopMsg.popMsg((error as Error).message);
                return false;
            });
    }

    async getLoginAndRegisterSettings()
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if(UserData){
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
            };
            return await this.postWithUrlParams('getLoginAndRegisterSettings', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        return response.data as setting_loginandregister;
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        changePage.toIndex();
                        return null;
                    }
                })
                .catch((error) =>
                {
                    this.handlePopMsg.popMsg((error as Error).message);
                    const changePage = new ChangePage(true);
                    changePage.toIndex();
                    return null;
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }



    }

}
