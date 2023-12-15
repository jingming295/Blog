import { ChangePage } from "./changePage";
import { HandleLoginNRegister } from "./LoginNRegister";
import { HandlePopMsg } from "./popMsg";
import { SendPost } from "../Send Fetch";
import { UserData } from "./interface";
/**
 * 顶栏相关
 * @class
 */
export class NavRelated
{
    private handlePopMsg: HandlePopMsg;
    constructor()
    {
        this.handlePopMsg = new HandlePopMsg();
    }
    /**
     * 生成顶栏
     */
    MakeNav()
    {
        /**
         * 生成右边的横幅
         */
        const rightBanner = (navigationContainer: HTMLDivElement) =>
        {
            if (document.getElementById('rightBanner'))
            {
                DeleteComponent();
                return;
            }
            const rightBanner = document.createElement('div');
            rightBanner.className = 'rightBanner';
            rightBanner.id = 'rightBanner';
            navigationContainer.appendChild(rightBanner);

            const userData = localStorage.getItem('UserData');
            if (userData)
            {
                const sendPost = new SendPost();

                if (userData !== null)
                {
                    const parseUserData: UserData = JSON.parse(userData);
                    const params = {
                        UserData: parseUserData,

                    };
                    sendPost.postWithUrlParams('keeplogin', params)
                        .then((response) =>
                        {
                            if (response.code === 0)
                            {
                                aprUserComponent(parseUserData.userData.avatar, parseUserData.userData.id.toString());

                            } else
                            {
                                this.handlePopMsg.popMsg(response.message)
                                localStorage.clear();
                                const navRelated = new NavRelated();
                                navRelated.MakeNav();
                            }
                        })
                        .catch((error: any) =>
                        {
                            console.log(error);
                        });
                } else
                {
                    localStorage.clear();
                    location.reload();
                }
            } else
            {
                aprLoginComponent();
            }

            function aprLoginComponent()
            {
                const btnLogin = document.createElement('button');
                btnLogin.className = 'btnLogin';
                btnLogin.id = 'btnLogin';
                btnLogin.textContent = 'Login';
                const btnRegister = document.createElement('button');
                btnRegister.className = 'btnRegister';
                btnRegister.id = 'btnRegister';
                btnRegister.textContent = 'Register';
                rightBanner.appendChild(btnLogin);
                rightBanner.appendChild(btnRegister);
            }

            function aprUserComponent(avatar: string, id: string)
            {
                const changePage = new ChangePage();
                const rightBanner = document.getElementById('rightBanner');
                if (rightBanner)
                {
                    const userAvatarDiv = document.createElement('div');
                    const postArticleDiv = document.createElement('div');
                    const userAvatarImg = document.createElement('img');
                    const postArticleBtn = document.createElement('div');

                    userAvatarDiv.style.height = '38px';
                    userAvatarDiv.style.width = '38px';
                    userAvatarDiv.style.marginLeft = '20px';

                    postArticleBtn.innerText = 'post';
                    postArticleBtn.style.color = 'black';
                    postArticleBtn.style.fontSize = 'xx-small';
                    postArticleBtn.style.padding = '6px';
                    postArticleBtn.style.cursor = 'pointer';
                    postArticleBtn.style.backgroundColor = '#FF69B4';
                    postArticleBtn.style.color = 'white';
                    postArticleBtn.style.borderRadius = '15px';
                    postArticleBtn.addEventListener('click', changePage.toPostArticle);

                    userAvatarImg.style.width = '100%';
                    userAvatarImg.style.height = '100%';
                    userAvatarImg.style.borderRadius = '50%';
                    userAvatarImg.style.objectFit = 'cover';
                    userAvatarImg.setAttribute('UserId', id);
                    userAvatarImg.addEventListener('click', () =>
                    {
                        const avatarId = userAvatarImg.getAttribute('UserId');
                        if (avatarId !== null)
                        {
                            changePage.toUserProfile(avatarId);
                        }
                    });

                    userAvatarDiv.style.cursor = 'pointer';
                    userAvatarImg.src = '../avatar/' + avatar;
                    userAvatarDiv.appendChild(userAvatarImg);
                    postArticleDiv.appendChild(postArticleBtn);
                    rightBanner.appendChild(postArticleDiv);
                    rightBanner.appendChild(userAvatarDiv);
                    navigationContainer.appendChild(rightBanner);
                }
            }

            function DeleteComponent()
            {
                const rightBanner = document.getElementById('rightBanner');
                if (rightBanner)
                {
                    rightBanner.remove();
                    const navRelated = new NavRelated();
                    navRelated.MakeNav();
                }
            }
        };

        if (document.getElementById('navigationBar'))
        {
            const navigationContainer = document.getElementById('navigation-container');
            if (navigationContainer instanceof HTMLDivElement)
            {
                rightBanner(navigationContainer);
                this.MakeLoginNRegister();
                this.addButtonListener();
            }
        } else
        {
            const navigationBar = document.createElement('div');
            navigationBar.style.userSelect = 'none';
            navigationBar.className = 'navigationBar';
            navigationBar.id = 'navigationBar';

            const navigationContainer = document.createElement('div');
            navigationContainer.className = 'navigation-container';
            navigationContainer.id = 'navigation-container';
            navigationBar.appendChild(navigationContainer);

            leftBanner(navigationContainer);
            rightBanner(navigationContainer);
            const appContainer = document.body;
            if (appContainer)
            {
                appContainer.appendChild(navigationBar);
                if (localStorage.getItem('UserData') && localStorage.getItem('EncUserData'))
                {
                    // 在这里输入要做的东西
                } else
                {
                    this.MakeLoginNRegister();
                }
            }
        }

        /**
         * 生成右边的横幅
         */
        function leftBanner(navigationContainer: HTMLDivElement)
        {
            const leftBanner = document.createElement('div');
            // rightBanner.className = 'rightBanner';
            leftBanner.className = 'leftBanner';
            aprLogo();
            aprMenu();
            navigationContainer.appendChild(leftBanner);

            /**
             * 生成logo
             */
            function aprLogo()
            {
                const changePage = new ChangePage();
                const logo = document.createElement('div');
                logo.className = 'logo';

                const logoLink = document.createElement('a');
                logoLink.rel = 'home';
                logoLink.style.cursor = 'pointer';
                logoLink.addEventListener('click', changePage.toIndex);

                const siteTitle = document.createElement('p');
                siteTitle.className = 'site-title';
                siteTitle.textContent = 'Blog';

                logoLink.appendChild(siteTitle);
                logo.appendChild(logoLink);
                leftBanner.appendChild(logo);
            }

            function aprMenu()
            {
                const ul = document.createElement('ul');
                ul.style.marginLeft = '20px';
                const gameLi = document.createElement('li');
                const gameLink = document.createElement('a');
                gameLink.href = '';
                gameLink.textContent = 'Programming';
                gameLi.appendChild(gameLink);
                ul.appendChild(gameLi);

                const resourceLi = document.createElement('li');
                const resourceLink = document.createElement('a');
                resourceLink.href = '';
                resourceLink.textContent = 'Anime';
                resourceLi.appendChild(resourceLink);
                ul.appendChild(resourceLi);
                leftBanner.appendChild(ul);
            }
        }
    }

    /**
     * 生成登录注册组件
     */
    MakeLoginNRegister()
    {
        if (document.getElementById('warpLoginnregister'))
        {
            return;
        }
        const loginRegisterDiv = document.createElement('div');
        loginRegisterDiv.className = 'warpLoginnregister';
        loginRegisterDiv.id = 'warpLoginnregister';
        loginRegisterDiv.style.top = '0';
        const formElement = document.createElement('div');
        loginBox();
        form();

        // 将生成的元素添加到页面中
        const appContainer = document.body;
        if (appContainer)
        {
            appContainer.appendChild(loginRegisterDiv);
            this.addButtonListener();
            const handleLoginNRegister = new HandleLoginNRegister();
            handleLoginNRegister.init();
        }
        /**
         * 生成到logo为止
         */
        function loginBox()
        {
            const loginBoxDiv = document.createElement('div');
            loginBoxDiv.className = 'loginBox';

            const loginBoxInnerDiv = document.createElement('div');
            loginBoxInnerDiv.className = 'loginBox-inner';

            const closeLoginBoxSpan = document.createElement('span');
            closeLoginBoxSpan.className = 'closeloginBox';
            closeLoginBoxSpan.id = 'closeloginBox';
            closeLoginBoxSpan.innerText = '×';

            const loginBoxLogoDiv = document.createElement('div');
            loginBoxLogoDiv.className = 'loginBox-logo';
            loginBoxLogoDiv.innerText = 'Blog';
            loginBoxInnerDiv.appendChild(closeLoginBoxSpan);
            loginBoxInnerDiv.appendChild(loginBoxLogoDiv);
            loginBoxInnerDiv.appendChild(formElement);

            loginBoxDiv.appendChild(loginBoxInnerDiv);

            loginRegisterDiv.appendChild(loginBoxDiv);
        }

        /**
         * 生成登录组件
         */
        function form()
        {
            const loginBoxOperationDiv = document.createElement('div');
            loginBoxOperationDiv.className = 'loginBox-operation';

            const loginBoxItem0Div = document.createElement('div'); // 昵称
            const loginBoxItem3Div = document.createElement('div'); // 重复密码
            const registerLink = document.createElement('a'); // 切换登录或者注册的组件
            const newUserSpan = document.createElement('span'); // 切换登录或者注册的组件的标题
            const quickLoginButton = document.createElement('button');// 快速xx的按钮
            showSmallTitle();
            createNameInput();
            createEmailInput();
            createPasswordInput();
            createConfPasswordInput();
            createSwitch();
            // 组装元素层级关系
            formElement.appendChild(loginBoxOperationDiv);
            /**
             * 显示小标题 eg. 登录，注册，忘记密码
             */
            function showSmallTitle()
            {
                const loginBoxTitleDiv = document.createElement('div');
                loginBoxTitleDiv.className = 'loginBox-title';
                const loginBoxTitleSpan = document.createElement('span');
                loginBoxTitleSpan.innerText = 'Login';
                loginBoxTitleSpan.id = 'loginBox-title-span';
                loginBoxTitleDiv.appendChild(loginBoxTitleSpan);
                loginBoxOperationDiv.appendChild(loginBoxTitleDiv);
            }
            /**
             * 创建输入邮箱的输入框
             */
            function createNameInput()
            {
                loginBoxItem0Div.className = 'loginBox-item';

                // 先隐藏组件，并且添加动画
                loginBoxItem0Div.style.height = '0';
                loginBoxItem0Div.style.opacity = '0';
                loginBoxItem0Div.style.transition = 'all .3s ease-in-out';
                loginBoxItem0Div.style.marginTop = '0';
                loginBoxItem0Div.style.visibility = 'hidden';

                const usernameInput = document.createElement('input');
                usernameInput.type = 'text';
                usernameInput.id = 'name';
                usernameInput.tabIndex = 1;
                usernameInput.spellcheck = false;
                usernameInput.autocomplete = 'off';

                const usernameInputLabel = document.createElement('span');
                usernameInputLabel.innerHTML = '<b>Username</b>';
                loginBoxItem0Div.appendChild(usernameInput);
                loginBoxItem0Div.appendChild(usernameInputLabel);
                loginBoxOperationDiv.appendChild(loginBoxItem0Div);
            }
            /**
             * 创建输入邮箱的输入框
             */
            function createEmailInput()
            {
                const loginBoxItem1Div = document.createElement('div');
                loginBoxItem1Div.className = 'loginBox-item';

                const usernameInput = document.createElement('input');
                usernameInput.type = 'email';
                usernameInput.id = 'email';
                usernameInput.tabIndex = 1;
                usernameInput.spellcheck = false;
                usernameInput.autocomplete = 'email';

                const usernameInputLabel = document.createElement('span');
                usernameInputLabel.innerHTML = '<b>Email</b>';
                loginBoxItem1Div.appendChild(usernameInput);
                loginBoxItem1Div.appendChild(usernameInputLabel);
                loginBoxOperationDiv.appendChild(loginBoxItem1Div);
            }

            /**
             * 创建输入密码的输入框
             */
            function createPasswordInput()
            {
                const loginBoxItem2Div = document.createElement('div');
                loginBoxItem2Div.className = 'loginBox-item';

                const passwordInput = document.createElement('input');
                passwordInput.type = 'password';
                passwordInput.id = 'password';
                passwordInput.tabIndex = 2;
                passwordInput.spellcheck = false;
                passwordInput.autocomplete = 'off';

                const passwordInputLabel = document.createElement('span');
                passwordInputLabel.innerHTML = '<b>Password</b>';

                loginBoxItem2Div.appendChild(passwordInput);
                loginBoxItem2Div.appendChild(passwordInputLabel);
                loginBoxOperationDiv.appendChild(loginBoxItem2Div);
            }

            /**
             * 创建输入密码的输入框
             */
            function createConfPasswordInput()
            {
                loginBoxItem3Div.className = 'loginBox-item';
                // 先隐藏组件，并且添加动画
                loginBoxItem3Div.style.height = '0';
                loginBoxItem3Div.style.opacity = '0';
                loginBoxItem3Div.style.transition = 'all .3s ease-in-out';
                loginBoxItem3Div.style.marginTop = '0';
                loginBoxItem3Div.style.visibility = 'hidden';

                const passwordInput = document.createElement('input');
                passwordInput.type = 'password';
                passwordInput.id = 'confPassword';
                passwordInput.tabIndex = 2;
                passwordInput.spellcheck = false;

                const passwordInputLabel = document.createElement('span');
                passwordInputLabel.innerHTML = '<b>Repeat Password</b>';

                loginBoxItem3Div.appendChild(passwordInput);
                loginBoxItem3Div.appendChild(passwordInputLabel);
                loginBoxOperationDiv.appendChild(loginBoxItem3Div);
            }

            /**
             * 创建底下组件
             */
            function createSwitch()
            {
                const loginBoxSwitchP = document.createElement('p');
                loginBoxSwitchP.className = 'loginBox-switch';
                loginBoxSwitchP.id = 'loginBox-switch';

                const forgetPasswordLink = document.createElement('a');
                forgetPasswordLink.href = 'javascript:void(0)';
                forgetPasswordLink.innerText = 'Forgot Password?';

                newUserSpan.innerText = 'New User?';
                registerLink.href = 'javascript:void(0)';
                registerLink.innerText = 'Register';
                registerLink.addEventListener('click', switchToRegister);

                const loginBoxButtonDiv = document.createElement('div');
                loginBoxButtonDiv.className = 'loginBox-button';
                loginBoxButtonDiv.id = 'loginBox-button';

                quickLoginButton.innerText = 'Login';
                loginBoxSwitchP.appendChild(forgetPasswordLink);
                loginBoxSwitchP.appendChild(document.createTextNode(' '));
                loginBoxSwitchP.appendChild(newUserSpan);
                newUserSpan.appendChild(registerLink);
                loginBoxButtonDiv.appendChild(quickLoginButton);

                loginBoxOperationDiv.appendChild(loginBoxSwitchP);
                loginBoxOperationDiv.appendChild(loginBoxButtonDiv);
            }

            function switchToRegister()
            {
                const loginBoxTitleSpan = document.getElementById('loginBox-title-span');
                // 显示和隐藏组件
                if (loginBoxTitleSpan)
                {
                    const navRelated = new NavRelated();
                    if (loginBoxItem3Div.style.visibility === 'hidden')
                    {
                        navRelated.ShowRegisterComponents(loginBoxItem3Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                        navRelated.ShowRegisterComponents(loginBoxItem0Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                    } else
                    {
                        navRelated.ShowLoginComponents(loginBoxItem3Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                        navRelated.ShowLoginComponents(loginBoxItem0Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                    }
                }
            }
        }
    }

    /**
     * 为导航栏上的按钮添加listener
     */
    addButtonListener()
    {
        const navRelated = new NavRelated();
        const btnLogin = document.getElementById('btnLogin');
        const btnRegister = document.getElementById('btnRegister');
        const btnCloseLoginnRegisterPg = document.getElementById('closeloginBox');
        if (btnCloseLoginnRegisterPg) btnCloseLoginnRegisterPg.addEventListener('click', navRelated.closeLoginnRegisterPg);

        if (btnLogin) btnLogin.addEventListener('click', showLoginPage);
        if (btnRegister) btnRegister.addEventListener('click', showRegisterPage);

        /**
         * 显示登录页面
         */
        function showLoginPage()
        {
            const loginBoxItemDiv = document.getElementsByClassName('loginBox-item');
            const loginBoxSwitch = document.getElementById('loginBox-switch');
            const loginBoxButton = document.getElementById('loginBox-button');

            const newUserSpan = loginBoxSwitch?.querySelector('span');
            const registerLink = newUserSpan?.querySelector('a');
            const quickLoginButton = loginBoxButton?.querySelector('button');
            const loginBoxItem0iv = loginBoxItemDiv[0] as HTMLDivElement;
            const loginBoxItem3iv = loginBoxItemDiv[3] as HTMLDivElement;
            const loginBoxTitleSpan = document.getElementById('loginBox-title-span');
            if (loginBoxItem0iv && loginBoxItem3iv && registerLink && newUserSpan && quickLoginButton && loginBoxTitleSpan)
            {
                const navRelated = new NavRelated();
                navRelated.ShowLoginComponents(loginBoxItem0iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                navRelated.ShowLoginComponents(loginBoxItem3iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                const loginnregister = document.getElementById('warpLoginnregister');
                if (loginnregister)
                {
                    loginnregister.classList.add('showWarpLoginnRegister');
                }
            }
        }

        /**
    * 显示注册页面
    */
        function showRegisterPage()
        {
            const loginBoxItemDiv = document.getElementsByClassName('loginBox-item');
            const loginBoxSwitch = document.getElementById('loginBox-switch');
            const loginBoxButton = document.getElementById('loginBox-button');

            const newUserSpan = loginBoxSwitch?.querySelector('span');
            const registerLink = newUserSpan?.querySelector('a');
            const quickLoginButton = loginBoxButton?.querySelector('button');
            const loginBoxItem0iv = loginBoxItemDiv[0] as HTMLDivElement;
            const loginBoxItem3iv = loginBoxItemDiv[3] as HTMLDivElement;
            const loginBoxTitleSpan = document.getElementById('loginBox-title-span');
            if (loginBoxItem0iv && loginBoxItem3iv && registerLink && newUserSpan && quickLoginButton && loginBoxTitleSpan)
            {
                const navRelated = new NavRelated();
                navRelated.ShowRegisterComponents(loginBoxItem0iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                navRelated.ShowRegisterComponents(loginBoxItem3iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                const loginnregister = document.getElementById('warpLoginnregister');
                if (loginnregister)
                {
                    loginnregister.classList.add('showWarpLoginnRegister');
                }
            }
        }
    }

    /**
     * 显示指定注册组件
     * @param loginBoxItemDiv
     * @param registerLink
     * @param newUserSpan
     */
    ShowRegisterComponents(loginBoxItemDiv: HTMLDivElement, registerLink: HTMLAnchorElement,
        newUserSpan: HTMLSpanElement, quickLoginButton: HTMLButtonElement, loginBoxTitle: HTMLSpanElement)
    {
        loginBoxItemDiv.style.height = '45px';
        loginBoxItemDiv.style.opacity = '1';
        loginBoxItemDiv.style.marginTop = '20px';
        loginBoxItemDiv.style.visibility = '';
        if (registerLink.innerText !== 'Login')
        {
            registerLink.innerText = 'Login';
            newUserSpan.innerText = 'Already Have Account? ';
            newUserSpan.appendChild(registerLink);
        }
        if (quickLoginButton.innerText !== 'Register')
        {
            quickLoginButton.innerText = 'Register';
        }
        if (loginBoxTitle.innerText !== 'Register')
        {
            loginBoxTitle.innerText = 'Register';
        }
    }

    /**
     * 隐藏指定注册组件
     * @param loginBoxItemDiv
     * @param registerLink
     * @param newUserSpan
     */
    ShowLoginComponents(loginBoxItemDiv: HTMLDivElement, registerLink: HTMLAnchorElement,
        newUserSpan: HTMLSpanElement, quickLoginButton: HTMLButtonElement, loginBoxTitle: HTMLSpanElement)
    {
        loginBoxItemDiv.style.height = '0';
        loginBoxItemDiv.style.opacity = '0';
        loginBoxItemDiv.style.marginTop = '0';
        loginBoxItemDiv.style.visibility = 'hidden';
        if (registerLink.innerText !== 'Register')
        {
            registerLink.innerText = 'Register';
            newUserSpan.innerText = 'New User? ';
            newUserSpan.appendChild(registerLink);
        }
        if (quickLoginButton.innerText !== 'Login')
        {
            quickLoginButton.innerText = 'Login';
        }
        if (loginBoxTitle.innerText !== 'Login')
        {
            loginBoxTitle.innerText = 'Login';
        }
    }

    /**
     * 关闭登录或者注册页面
     */
    closeLoginnRegisterPg()
    {
        const warpLoginnRegister = document.getElementById('warpLoginnregister');
        if (warpLoginnRegister) warpLoginnRegister.className = 'warpLoginnregister';
    }
}