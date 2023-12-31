import { ChangePage } from "./changePage";
import { HandleLoginNRegister } from "./LoginNRegister";
import { UserData } from "./interface";
import { UserVerification } from "../User Verification";
import { LoginNRegister } from "../Login And Register Page";
/**
 * 顶栏相关
 * @class
 */
export class NavRelated
{
    async init()
    {
        const navigationBar = document.createElement('div');
        navigationBar.className = 'navigationBar';
        navigationBar.id = 'navigationBar';

        if (!document.getElementById('navigationBar'))
        {
            const appContainer = document.body;
            appContainer.appendChild(navigationBar);
        }

        const navigationContainer = await this.MakeNav();
        navigationBar.appendChild(navigationContainer);
        const loginNRegister = new LoginNRegister();
        loginNRegister.init();
    }
    /**
     * 生成顶栏
     */
    private async MakeNav()
    {

        const navigationContainer = document.createElement('div');
        navigationContainer.className = 'navigation-container';
        navigationContainer.id = 'navigation-container';
        const leftBanner = this.createLeftBanner();

        const rightBanner = await this.createRightBanner();
        navigationContainer.appendChild(leftBanner);
        navigationContainer.appendChild(rightBanner);
        return navigationContainer;


    }

    private async createRightBanner(): Promise<HTMLDivElement>
    {
        const userData = localStorage.getItem('UserData');
        if (userData)
        {
            const parseUserData: UserData = JSON.parse(userData);
            const userVerification = new UserVerification();
            const status = await userVerification.verification();
            if (status)
            {
                const rightBanner = this.createRightBannerWithUserComponent(parseUserData.userData.avatar, parseUserData.userData.id.toString());
                return rightBanner;
            } else
            {
                localStorage.clear();
                const changePage = new ChangePage(true);
                changePage.toIndex();
                return await this.createRightBanner();
            }
        } else
        {
            const LogReg = this.createRightBannerWithLoginComponent();
            return LogReg;
        }
    }

    private async createRightBannerWithLoginComponent(): Promise<HTMLDivElement>
    {
        function aprLoginNRegisterComponent()
        {
            const LogRegWrapper = document.createElement('div');

            const btnLogin = document.createElement('button');
            btnLogin.className = 'btnLogin';
            btnLogin.id = 'btnLogin';
            btnLogin.textContent = 'Login';
            const btnRegister = document.createElement('button');
            btnRegister.className = 'btnRegister';
            btnRegister.id = 'btnRegister';
            btnRegister.textContent = 'Register';
            LogRegWrapper.appendChild(btnLogin);
            LogRegWrapper.appendChild(btnRegister);
            return LogRegWrapper;
        }

        let rightBanner = document.createElement('div');
        rightBanner.className = 'rightBanner';
        rightBanner.id = 'rightBanner';
        const LogReg = aprLoginNRegisterComponent();
        rightBanner.appendChild(LogReg);
        return rightBanner;
    };

    private createRightBannerWithUserComponent(avatar: string, id: string): HTMLDivElement
    {
        function aprUserComponent(avatar: string, id: string)
        {
            function userDropMenu()
            {
                function createAvatar()
                {
                    const userMenuAvatarWrapper = document.createElement('div');
                    userMenuAvatarWrapper.className = 'userMenuAvatarWrapper';
                    const userMenuAvatar = document.createElement('img');
                    userMenuAvatar.className = 'userMenuAvatar';
                    userMenuAvatar.src = '../avatar/' + avatar;

                    userMenuAvatar.onclick = () =>
                    {
                        const changePage = new ChangePage(true);
                        changePage.toUserProfile(id);
                    };

                    userMenuAvatarWrapper.appendChild(userMenuAvatar);
                    return userMenuAvatarWrapper;
                }


                function createUsername()
                {
                    const userMenuUsernameWrapper = document.createElement('div');
                    const userMenuUsername = document.createElement('h5');
                    userMenuUsernameWrapper.className = 'userMenuUsernameWrapper';
                    userMenuUsername.className = 'userMenuUsername';
                    userMenuUsername.innerText = 'jingming295';
                    userMenuUsernameWrapper.appendChild(userMenuUsername);
                    return userMenuUsernameWrapper;
                }

                function createUserStatusBar()
                {
                    const userMenuStatusWrapper = document.createElement('div');
                    const userMenuStatus = document.createElement('p');
                    userMenuStatus.className = 'userMenuStatus';
                    userMenuStatusWrapper.className = 'userMenuStatusWrapper';
                    userMenuStatusWrapper.appendChild(userMenuStatus);
                    return userMenuStatusWrapper;
                }

                function createMenu()
                {
                    const menuItem = [
                        {
                            name: 'Post Article',
                            func: function ()
                            {
                                const changePage = new ChangePage(true);
                                changePage.toPostArticle();
                            }
                        },
                        {
                            name: 'Manage Article',
                            func: function ()
                            {
                                const changePage = new ChangePage(true);
                                changePage.toManageArticle();
                            }
                        },
                        {
                            name: 'Logout',
                            func: function ()
                            {
                                const changePage = new ChangePage(true);
                                const navRelated = new NavRelated();
                                changePage.toIndex();
                                localStorage.clear();
                                navRelated.changeNavBarStatus();

                            }
                        }
                    ];
                    const userMenuWrapper = document.createElement('div');
                    userMenuWrapper.className = 'userMenuWrapper';

                    menuItem.forEach((item) =>
                    {
                        const userMenu = document.createElement('div');
                        userMenu.className = `${item.name}Wrapper`;
                        userMenu.innerText = item.name;
                        userMenu.onclick = item.func; // 绑定函数到onclick事件
                        userMenuWrapper.appendChild(userMenu);
                    });

                    return userMenuWrapper;
                }

                const userMenuDiv = document.createElement('div');
                userMenuDiv.className = 'userMenu';

                const userMenuAvatarWrapper = createAvatar();
                const userMenuUsernameWrapper = createUsername();
                const userMenuStatusWrapper = createUserStatusBar();
                const userMenuWrapper = createMenu();
                userMenuDiv.appendChild(userMenuAvatarWrapper);
                userMenuDiv.appendChild(userMenuUsernameWrapper);
                userMenuDiv.appendChild(userMenuStatusWrapper);
                userMenuDiv.appendChild(userMenuWrapper);

                return userMenuDiv;


            }

            function createUserAvatar()
            {
                const userAvatarDiv = document.createElement('div');
                const userAvatarImg = document.createElement('img');
                userAvatarDiv.className = 'userAvatarWrapper';

                const userAvatarImageWrapper = document.createElement('div');
                userAvatarImageWrapper.className = 'userAvatarImageWrapper';

                userAvatarImg.className = 'userAvatar';
                userAvatarImg.setAttribute('UserId', id);
                userAvatarImg.addEventListener('click', () =>
                {
                    const avatarId = userAvatarImg.getAttribute('UserId');
                    if (avatarId !== null)
                    {
                        const changePage = new ChangePage(true);
                        changePage.toUserProfile(avatarId);
                    }
                });



                // 添加鼠标进入事件
                userAvatarImg.onmouseenter = function() {
                    const userMenu = document.getElementsByClassName('userMenu')[0];
                    userMenu.classList.add('showUserMenu');
                };

                // 添加鼠标离开事件
                userAvatarDiv.onmouseleave = function() {
                    const userMenu = document.getElementsByClassName('userMenu')[0] as HTMLDivElement;
                    // 检查鼠标是否移动到了.userMenu上

                    userMenu.onmouseleave = function() {
                        // 如果鼠标从.userMenu移出，就移除.showUserMenu类使菜单消失
                        if(!userAvatarDiv.matches(':hover')){
                            userMenu.classList.remove('showUserMenu');
                        }
                    };
                    // 如果鼠标没有移动到.userMenu上，就移除.showUserMenu类使菜单消失
                    if (!userMenu.matches(':hover')) {
                        userMenu.classList.remove('showUserMenu');
                    }
                };






                userAvatarImg.src = '../avatar/' + avatar;
                const DropMenu = userDropMenu();
                userAvatarImageWrapper.appendChild(userAvatarImg);
                userAvatarDiv.appendChild(userAvatarImageWrapper);
                userAvatarDiv.appendChild(DropMenu);

                return userAvatarDiv;
            }

            function createPostArticleBtn()
            {
                const postArticleDiv = document.createElement('div');
                const postArticleBtn = document.createElement('div');

                postArticleDiv.className = 'articleDiv';
                postArticleBtn.className = 'articleBtn';
                postArticleBtn.innerText = 'Post Article';
                postArticleBtn.onclick = () =>
                {
                    const changePage = new ChangePage(true);
                    changePage.toPostArticle();
                };
                postArticleDiv.appendChild(postArticleBtn);
                return postArticleDiv;
            }

            function createManageArticleBtn()
            {
                const manageArticleDiv = document.createElement('div');
                const manageArticleBtn = document.createElement('div');
                manageArticleDiv.className = 'articleDiv';
                manageArticleBtn.className = 'articleBtn';
                manageArticleBtn.innerText = 'Manage Article';
                manageArticleBtn.onclick = () =>
                {
                    const changePage = new ChangePage(true);
                    changePage.toManageArticle();
                };
                manageArticleDiv.appendChild(manageArticleBtn);
                return manageArticleDiv;
            }

            const rightBanner = document.createElement('div');
            rightBanner.className = 'rightBanner';
            rightBanner.id = 'rightBanner';
            const userAvatarDiv = createUserAvatar();
            const postArticleBtn = createPostArticleBtn();
            const manageArticleBtn = createManageArticleBtn();
            rightBanner.appendChild(postArticleBtn);
            rightBanner.appendChild(manageArticleBtn);
            rightBanner.appendChild(userAvatarDiv);
            return rightBanner;
        };
        const userComponent = aprUserComponent(avatar, id);
        return userComponent;
    }


    private createLeftBanner(): HTMLDivElement
    {

        /**
         * make logo
         * @returns 
         */
        function makeLogo()
        {

            const logo = document.createElement('div');
            logo.className = 'logo';
            const logoLink = document.createElement('a');
            logoLink.rel = 'home';
            logoLink.onclick = () =>
            {
                const changePage = new ChangePage(true);
                changePage.toIndex();
            };

            const siteTitle = document.createElement('p');
            siteTitle.className = 'site-title';
            siteTitle.textContent = 'Blog';

            logoLink.appendChild(siteTitle);
            logo.appendChild(logoLink);
            return logo;
        }

        /**
         * make menu
         * @returns 
         */
        function makeMenu()
        {
            const area = ['Programming', 'Anime'];
            const ul = document.createElement('ul');
            area.forEach((value) =>
            {
                const li = document.createElement('li');
                const areaLink = document.createElement('div');
                areaLink.textContent = value;
                areaLink.className = 'menu-item';
                areaLink.onclick = () =>
                {
                    const changePage = new ChangePage(true);
                    changePage.toArea(value);
                };
                li.appendChild(areaLink);
                ul.appendChild(li);
            });
            return ul;
        }

        const leftBanner = document.createElement('div');
        leftBanner.className = 'leftBanner';
        const logo = makeLogo();
        const menu = makeMenu();
        leftBanner.appendChild(logo);
        leftBanner.appendChild(menu);
        return leftBanner;
    }

    async changeNavBarStatus()
    {
        const navigationContainer = document.getElementById('navigation-container');
        if (navigationContainer instanceof HTMLDivElement)
        {
            this.DeleteRightBanner();
            const rightBanner = await this.createRightBanner();
            navigationContainer.appendChild(rightBanner);
            const loginNRegister = new LoginNRegister();
            loginNRegister.init();

        }
    }

    private DeleteRightBanner()
    {
        const rightBanner = document.getElementById('rightBanner');
        if (rightBanner)
        {
            rightBanner.remove();
        }
    }

}