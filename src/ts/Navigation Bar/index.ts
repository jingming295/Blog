import { ChangePage } from "./changePage";
import { UserData } from "./interface";
import { UserVerification } from "../User Verification";
import { LoginNRegister } from "../Login And Register Page";
import { urlconfig } from "../Url Config/config";
import { SendPost } from "../Send Fetch";
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
        const leftBanner = await this.createLeftBanner();

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
                const rightBanner = this.createRightBannerWithUserComponent(parseUserData);
                return rightBanner;
            } else
            {
                localStorage.clear();
                const changePage = new ChangePage(true);
                await changePage.toIndex();
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

        const rightBanner = document.createElement('div');
        rightBanner.className = 'rightBanner';
        rightBanner.id = 'rightBanner';
        const LogReg = aprLoginNRegisterComponent();
        const searchBar = this.aprSearchBar();
        rightBanner.appendChild(searchBar);
        rightBanner.appendChild(LogReg);
        return rightBanner;
    }

    private aprSearchBar(){
        const searchBarComponentWrapper = document.createElement('div');
        const searchBarWrapper = document.createElement('div');
        searchBarWrapper.className = 'searchBarWrapper';
        searchBarComponentWrapper.className = 'searchBarComponentWrapper';

        const searchBar = document.createElement('input');
        searchBar.className = 'searchBar';
        searchBar.name = 'searchBar';
        searchBar.placeholder = 'Search';
        searchBar.type = 'text';
        searchBar.autocomplete = 'off';
        searchBar.onkeydown = async function(e){
            if(e.key === 'Enter'){
                const changePage = new ChangePage(true);
                const value = searchBar.value;
                await changePage.toSearch(value);
            }
        }

        const btnSearch = document.createElement('div')
        btnSearch.className = 'btnSearch';
        btnSearch.innerText = 'Search';
        btnSearch.onclick = async function(){
            const changePage = new ChangePage(true);
            const value = searchBar.value;
            await changePage.toSearch(value);
        }
        searchBarWrapper.appendChild(searchBar);
        searchBarComponentWrapper.appendChild(searchBarWrapper);
        searchBarComponentWrapper.appendChild(btnSearch);
        return searchBarComponentWrapper;
    }

    private createRightBannerWithUserComponent(userData: UserData): HTMLDivElement
    {
        function aprUserComponent(userData: UserData)
        {
            function userDropMenu()
            {
                function createAvatar()
                {
                    const userMenuAvatarWrapper = document.createElement('div');
                    userMenuAvatarWrapper.className = 'userMenuAvatarWrapper';
                    const userMenuAvatar = document.createElement('img');
                    userMenuAvatar.className = 'userMenuAvatar';
                    userMenuAvatar.src = `${urlconfig.avatarUrl}${userData.userData.avatar}`;

                    userMenuAvatar.onclick = async () =>
                    {
                        const changePage = new ChangePage(true);
                        await changePage.toUserProfile(userData.userData.id.toString());
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
                    userMenuUsername.innerText = userData.userData.name;
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
                            func: async function ()
                            {
                                const changePage = new ChangePage(true);
                                await changePage.toPostArticle();
                            }
                        },
                        {
                            name: 'Manage Article',
                            func: async function ()
                            {
                                const changePage = new ChangePage(true);
                                await changePage.toManageArticle();
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
                    if (userData.userData.class === 3)
                    {
                        const adminPage = [
                            {
                                name: 'Admin Page',
                                func: async function ()
                                {
                                    const changePage = new ChangePage(true);
                                    await changePage.toAdminPage();
                                }
                            }
                        ];
                        adminPage.forEach((item) =>
                        {
                            menuItem.unshift(item);
                        });
                    }

                    const userMenuWrapper = document.createElement('div');
                    userMenuWrapper.className = 'userMenuWrapper';

                    menuItem.forEach(async (item) =>
                    {
                        const userMenu = document.createElement('div');
                        userMenu.className = `${item.name}Wrapper`;
                        userMenu.innerText = item.name;
                        userMenu.onclick = await item.func; // 绑定函数到onclick事件
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
                userAvatarImg.setAttribute('UserId', userData.userData.id.toString());

                userAvatarImg.onclick = () =>
                {
                    if (window.innerWidth > 640) {
                        const changePage = new ChangePage(true);
                        changePage.toUserProfile(userData.userData.id.toString());
                    }
                };

                // 添加鼠标进入事件
                userAvatarImg.onmouseenter = function ()
                {
                    const userMenu = document.getElementsByClassName('userMenu')[0];
                    userMenu.classList.add('showUserMenu');
                };

                // 添加鼠标离开事件
                userAvatarDiv.onmouseleave = function ()
                {
                    const userMenu = document.getElementsByClassName('userMenu')[0] as HTMLDivElement;
                    // 检查鼠标是否移动到了.userMenu上

                    userMenu.onmouseleave = function ()
                    {
                        // 如果鼠标从.userMenu移出，就移除.showUserMenu类使菜单消失
                        if (!userAvatarDiv.matches(':hover'))
                        {
                            userMenu.classList.remove('showUserMenu');
                        }
                    };
                    // 如果鼠标没有移动到.userMenu上，就移除.showUserMenu类使菜单消失
                    if (!userMenu.matches(':hover'))
                    {
                        userMenu.classList.remove('showUserMenu');
                    }
                };
                userAvatarImg.src = `${urlconfig.avatarUrl}${userData.userData.avatar}`;
                const DropMenu = userDropMenu();
                userAvatarImageWrapper.appendChild(userAvatarImg);
                userAvatarDiv.appendChild(userAvatarImageWrapper);
                userAvatarDiv.appendChild(DropMenu);

                return userAvatarDiv;
            }

            const userConponent = document.createElement('div');
            userConponent.className = 'userComponent';

            const userAvatarDiv = createUserAvatar();
            userConponent.appendChild(userAvatarDiv);
            return userConponent;
        }
        const rightBanner = document.createElement('div');
        rightBanner.className = 'rightBanner';
        rightBanner.id = 'rightBanner';
        const searchBar = this.aprSearchBar();
        const userComponent = aprUserComponent(userData);
        
        rightBanner.appendChild(searchBar);
        rightBanner.appendChild(userComponent);
        return rightBanner;
    }


    private async createLeftBanner(): Promise<HTMLDivElement>
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
            logoLink.onclick = async () =>
            {
                const changePage = new ChangePage(true);
                await changePage.toIndex();
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
        async function makeMenu()
        {
            const sendPost = new SendPost();

            const AllArticleArea = await sendPost.getAllArticleArea();
            const areaItemWrapper = document.createElement('div');
            areaItemWrapper.className = 'areaItemWrapper';
            if(!AllArticleArea) return areaItemWrapper;
            AllArticleArea.forEach((item) =>{
                const areaItem = document.createElement('div');
                areaItem.className = 'areaItem';
                const areaLink = document.createElement('div');
                areaLink.textContent = item.bigAreaName;
                areaLink.className = 'menu-item';

                areaItem.appendChild(areaLink);
                if(item.subarea[0].subAreaID){
                    const DropMenuWrapper = document.createElement('div');
                    const DropMenu = document.createElement('div');
                    DropMenuWrapper.className = 'dropMenuWrapper';
                    DropMenu.className = 'dropMenu';
                    DropMenuWrapper.appendChild(DropMenu);

                    areaLink.onmouseenter = () =>{
                        DropMenuWrapper.classList.add('showDropMenuWrapper');
                    }

                    areaLink.onmouseleave = function ()
                    {
    
                        DropMenuWrapper.onmouseleave = function ()
                        {
                            if (!areaItem.matches(':hover'))
                            {
                                DropMenuWrapper.classList.remove('showDropMenuWrapper');
                            }
                        };
                        if (!DropMenuWrapper.matches(':hover'))
                        {
                            DropMenuWrapper.classList.remove('showDropMenuWrapper');
                        }
                    };

                    item.subarea.forEach((subItem) =>{
                        if(subItem.subareaName === null) return;

                        const subAreaLink = document.createElement('div');
    
                        subAreaLink.textContent = subItem.subareaName;
    
                        subAreaLink.className = 'subAreaLink';

                        subAreaLink.onclick = async () =>{
                            if(subItem.subareaName === null) return;
                            const changePage = new ChangePage(true);
                            await changePage.toArea(subItem.subareaName);
                        }
    
                        DropMenu.appendChild(subAreaLink);
                    })
                    areaItem.appendChild(DropMenuWrapper);
                }
                
                
                areaItemWrapper.appendChild(areaItem);


                
            })


            return areaItemWrapper;
        }

        const leftBanner = document.createElement('div');
        leftBanner.className = 'leftBanner';
        const logo = makeLogo();
        const menu = await makeMenu();
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