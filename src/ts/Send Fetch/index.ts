import { NavigationProgress } from "../Create Navigation Progress";
import { ArticleCard } from "../Manage Article Page/interface";
import { ChangePage } from "../Navigation Bar/changePage";
import { UserData as UD, ArticleData as AD } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { ProfileData } from "../User Profile/interface";
import { ArticleArea, ArticleCardData, ColorScheme, RetArticleData, setting_email, setting_loginandregister } from "./interface";
import { urlconfig } from "../Url Config/config";

export class SendPost
{
    private navigationProgress = new NavigationProgress();
    handlePopMsg = new HandlePopMsg();

    private postWithUrlParams(api: string, params: Record<string, string | number | UD | AD | setting_loginandregister | setting_email>)
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
                this.handlePopMsg.popMsg(error);
                const contentDivs = document.querySelectorAll('.contentDiv');
                for (let i = 1; i < contentDivs.length; i++)
                {
                    console.log(contentDivs[i]);
                    contentDivs[i].remove();
                }
            });
    }

    private postWithUrlFormData(api: string, params: FormData, progressDiv: HTMLDivElement | null): Promise<XMLHttpRequest["response"]>
    {
        const url = `${urlconfig.serverUrl}${api}`;


        return new Promise((resolve, reject) =>
        {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.upload.onprogress = function (event)
            {
                if (event.lengthComputable)
                {
                    const percentComplete = event.loaded / event.total * 100;
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
            .catch((error) =>
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
                .then(async (response) =>
                {
                    if (response.code === 0)
                    {
                        return true;
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        localStorage.clear();
                        const changePage = new ChangePage(true);
                        await changePage.toIndex();
                        location.reload();
                    }
                })
                .catch(async (error) =>
                {
                    console.log(error);
                    localStorage.clear();
                    const changePage = new ChangePage(true);
                    await changePage.toIndex();
                    location.reload();
                });
        } else
        {
            this.handlePopMsg.popMsg('You has no permission to edit this article');
            localStorage.clear();
            const changePage = new ChangePage(true);
            await changePage.toIndex();
        }


    }

    async UploadArticle(title: string, article: string, area: string, tag: string)
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
                .then(async (response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        await changePage.toIndex();
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                    }
                })
                .catch((error) =>
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
            await changePage.toIndex();
            location.reload();
        }
    }

    async UpdateArticle(id: number, title: string, article: string, area: string, tag: string)
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
                .catch((error) =>
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
            await changePage.toIndex();
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
        }).catch((error) =>
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
        return await this.postWithUrlParams('getArticleCardData', params).then(async (response) =>
        {
            if (response.code === 0)
            {
                return response.data as ArticleCardData[];
            } else
            {
                this.handlePopMsg.popMsg(response.message);
                const changePage = new ChangePage(true);
                await changePage.to404Page();
                return [];
            }

        }).catch((error) =>
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
        }).catch((error) =>
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
        return await this.postWithUrlParams('getArticleContent', params).then(async (response) =>
        {
            if (response.code === 0)
            {
                return response.data as RetArticleData;
            } else
            {
                this.handlePopMsg.popMsg(response.message);
                const changePage = new ChangePage(true);
                await changePage.to404Page();
                return null;
            }
        }).catch(async (error) =>
        {
            console.log(error)
            const changePage = new ChangePage(true);
            await changePage.to404Page();
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
            .catch(async (error) =>
            {
                this.handlePopMsg.popMsg((error as Error).message);
                const changePage = new ChangePage(true);
                await changePage.toIndex();
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
                .then(async (response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        await changePage.toManageArticle();
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        await changePage.toIndex();
                    }
                })
                .catch(async (error) =>
                {
                    this.handlePopMsg.popMsg((error as Error).message);
                    const changePage = new ChangePage(true);
                    await changePage.toIndex();
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
            await changePage.toIndex();
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
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
            };
            return await this.postWithUrlParams('getLoginAndRegisterSettings', params)
                .then(async (response) =>
                {
                    if (response.code === 0)
                    {
                        return response.data as setting_loginandregister;
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        await changePage.toIndex();
                        return null;
                    }
                })
                .catch(async (error) =>
                {
                    this.handlePopMsg.popMsg((error as Error).message);
                    const changePage = new ChangePage(true);
                    await changePage.toIndex();
                    return null;
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }



    }

    async updateLoginAndRegisterSettings(setting: setting_loginandregister)
    {
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                setting: setting
            };
            return await this.postWithUrlParams('updateLoginAndRegisterSettings', params)
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }

    }

    async getEmailSettings()
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
            };
            return await this.postWithUrlParams('getEmailSettings', params)
                .then(async (response) =>
                {
                    if (response.code === 0)
                    {
                        return response.data as setting_email;
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        const changePage = new ChangePage(true);
                        await changePage.toIndex();
                        return null;
                    }
                })
                .catch(async (error) =>
                {
                    this.handlePopMsg.popMsg((error as Error).message);
                    const changePage = new ChangePage(true);
                    await changePage.toIndex();
                    return null;
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        } else
        {
            const changePage = new ChangePage(true);
            await changePage.toIndex();
            return null;
        }
    }

    async updateEmailSettings(setting: setting_email)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                setting: setting
            };
            return await this.postWithUrlParams('updateEmailSettings', params)
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }

    async sendTestEmail(testEmailAddress: string)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                testEmailAddress: testEmailAddress
            };
            return await this.postWithUrlParams('sendTestEmail', params)
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }

    async sendActivateAccountRequest(token: string)
    {
        this.navigationProgress.start();
        const params = {
            token: token
        };
        return await this.postWithUrlParams('activateAccountRequest', params)
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
            }
            ).finally(() =>
            {
                this.navigationProgress.end();
            });
    }

    async getAllArticleArea()
    {
        const params = {};
        return await this.postWithUrlParams('getAllArticleArea', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    return response.data as ArticleArea[];
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
            }
            ).finally(() =>
            {
            });
    }

    async getColorScheme()
    {
        const params = {};
        return await this.postWithUrlParams('getAllColorScheme', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    return response.data as ColorScheme[];
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
            }
            ).finally(() =>
            {
            });

    }

    async deleteColorScheme(id: number)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                id: id
            };
            return await this.postWithUrlParams('deleteColorScheme', params)
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }

    async addColorScheme(textColor: string, backgroundColor: string)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                textColor: textColor,
                backgroundColor: backgroundColor
            };
            return await this.postWithUrlParams('addColorScheme', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);
                        return response.data as { id: number; };
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }

    async getAllBigArea()
    {
        this.navigationProgress.start();
        const params = {};
        return await this.postWithUrlParams('getAllArticleBigArea', params)
            .then((response) =>
            {
                if (response.code === 0)
                {
                    return response.data as {
                        id: number,
                        name: string;
                    }[];
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
            }
            ).finally(() =>
            {
                this.navigationProgress.end();
            });
    }

    async deleteBigArea(id: number)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                id: id
            };
            return await this.postWithUrlParams('deleteBigArea', params)
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }

    async updateBigArea(id: number, name: string)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                id: id,
                name: name
            };
            return await this.postWithUrlParams('updateBigArea', params)
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }


    async addBigArea(name: string)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                name: name
            };
            return await this.postWithUrlParams('addBigArea', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);
                        return response.data as { id: number; };
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }

    async updateSubArea(id: number, name: string, bigAreaID: number, colorSchemeID: number)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const parseUserData: UD = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
                id: id,
                name: name,
                bigAreaID: bigAreaID,
                colorSchemeID: colorSchemeID
            };
            return await this.postWithUrlParams('updateSubArea', params)
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
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }

    }

    async deleteSubArea(id: number)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const params = {
                UserData: JSON.parse(UserData),
                id: id
            };
            return await this.postWithUrlParams('deleteSubArea', params)
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
                    console.log(error);
                    return false;
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }

    async addSubArea(name: string, bigAreaID: number, colorSchemeID: number)
    {
        this.navigationProgress.start();
        const UserData = localStorage.getItem('UserData');
        if (UserData)
        {
            const params = {
                UserData: JSON.parse(UserData),
                name: name,
                bigAreaID: bigAreaID,
                colorSchemeID: colorSchemeID
            };
            return await this.postWithUrlParams('addSubArea', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.handlePopMsg.popMsg(response.message);

                        return response.data as { id: number; };
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        return null;
                    }
                })
                .catch((error) =>
                {
                    console.log(error);
                    return null;
                }
                ).finally(() =>
                {
                    this.navigationProgress.end();
                });
        }
    }
}
