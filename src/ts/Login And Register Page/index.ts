import { HandleLoginNRegister } from "../Navigation Bar/LoginNRegister";

export class LoginNRegister
{
    init()
    {
        if (!localStorage.getItem('UserData'))
        {
            this.MakeLoginNRegister();
        }
    }

    /**
     * 生成登录注册组件
     */
    private MakeLoginNRegister()
    {
        if (document.getElementById('warpLoginnregister'))
        {
            return;
        }

        /**
         * generate until login box
         */
        function loginBox()
        {
            const formElement = document.createElement('div');
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

            const actionform = form();
            formElement.appendChild(actionform);

            loginBoxInnerDiv.appendChild(closeLoginBoxSpan);
            loginBoxInnerDiv.appendChild(loginBoxLogoDiv);
            loginBoxInnerDiv.appendChild(formElement);

            loginBoxDiv.appendChild(loginBoxInnerDiv);
            return loginBoxDiv;
        }

        /**
         * Generate Login and Register Component
         */
        const form = () =>
        {
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
                return loginBoxTitleDiv;
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
                usernameInput.type = 'name';
                usernameInput.id = 'name';
                usernameInput.tabIndex = 1;
                usernameInput.spellcheck = false;
                usernameInput.autocomplete = 'off';
                

                const usernameInputLabel = document.createElement('span');
                usernameInputLabel.innerHTML = '<b>Username</b>';
                loginBoxItem0Div.appendChild(usernameInput);
                loginBoxItem0Div.appendChild(usernameInputLabel);
                return loginBoxItem0Div;
            }
            /**
             * 创建输入邮箱的输入框
             */
            function createEmailInput()
            {
                const loginBoxItem1Div = document.createElement('div');
                loginBoxItem1Div.className = 'loginBox-item';

                const usernameInput = document.createElement('input');
                usernameInput.type = 'text'
                usernameInput.name = 'email'
                usernameInput.id = 'email';
                usernameInput.tabIndex = 1;
                usernameInput.spellcheck = false;
                usernameInput.autocomplete = 'email';

                const usernameInputLabel = document.createElement('span');
                usernameInputLabel.innerHTML = '<b>Email</b>';
                loginBoxItem1Div.appendChild(usernameInput);
                loginBoxItem1Div.appendChild(usernameInputLabel);
                return loginBoxItem1Div;
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
                passwordInput.name = 'password';
                passwordInput.id = 'password';
                passwordInput.tabIndex = 2;
                passwordInput.spellcheck = false;
                passwordInput.autocomplete = 'new-password';

                const passwordInputLabel = document.createElement('span');
                passwordInputLabel.innerHTML = '<b>Password</b>';

                loginBoxItem2Div.appendChild(passwordInput);
                loginBoxItem2Div.appendChild(passwordInputLabel);
                return loginBoxItem2Div;
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
                return loginBoxItem3Div;
            }

            /**
             * 创建底下组件
             */
            function createSwitch()
            {
                const loginBoxSwitchWrapper = document.createElement('div');
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

                loginBoxSwitchWrapper.appendChild(loginBoxSwitchP);
                loginBoxSwitchWrapper.appendChild(loginBoxButtonDiv);
                return loginBoxSwitchWrapper;
            }
            const switchToRegister = () =>
            {
                const loginBoxTitleSpan = document.getElementById('loginBox-title-span');
                // 显示和隐藏组件
                if (loginBoxTitleSpan)
                {
                    if (loginBoxItem3Div.style.visibility === 'hidden')
                    {
                        this.ShowRegisterComponents(loginBoxItem3Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                        this.ShowRegisterComponents(loginBoxItem0Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                    } else
                    {
                        this.ShowLoginComponents(loginBoxItem3Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                        this.ShowLoginComponents(loginBoxItem0Div, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                    }
                }
            };
            const loginBoxOperationDiv = document.createElement('div');
            loginBoxOperationDiv.className = 'loginBox-operation';

            const loginBoxItem0Div = document.createElement('div'); // 昵称
            const loginBoxItem3Div = document.createElement('div'); // 重复密码
            const registerLink = document.createElement('a'); // 切换登录或者注册的组件
            const newUserSpan = document.createElement('span'); // 切换登录或者注册的组件的标题
            const quickLoginButton = document.createElement('button');// 快速xx的按钮
            const smallTitle = showSmallTitle();
            const nameInput = createNameInput();
            const emailInput = createEmailInput();
            const passwordInput = createPasswordInput();
            const confPasswordInput = createConfPasswordInput();
            const switchWrapper = createSwitch();
            loginBoxOperationDiv.appendChild(smallTitle);
            loginBoxOperationDiv.appendChild(nameInput);
            loginBoxOperationDiv.appendChild(emailInput);
            loginBoxOperationDiv.appendChild(passwordInput);
            loginBoxOperationDiv.appendChild(confPasswordInput);
            loginBoxOperationDiv.appendChild(switchWrapper);
            // 组装元素层级关系
            return loginBoxOperationDiv;

        };

        const loginRegisterDiv = document.createElement('div');
        loginRegisterDiv.className = 'warpLoginnregister';
        loginRegisterDiv.id = 'warpLoginnregister';
        const login = loginBox();
        loginRegisterDiv.appendChild(login);


        // 将生成的元素添加到页面中
        const appContainer = document.body;
        if (appContainer)
        {
            appContainer.appendChild(loginRegisterDiv);
            this.addButtonListener();
            const handleLoginNRegister = new HandleLoginNRegister();
            handleLoginNRegister.init();
        }
    }


    /**
    * 为导航栏上的按钮添加listener
    */
    private addButtonListener()
    {
        /**
         * 显示登录页面
         */
        const showLoginPage = () =>
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
                this.ShowLoginComponents(loginBoxItem0iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                this.ShowLoginComponents(loginBoxItem3iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                const loginnregister = document.getElementById('warpLoginnregister');
                if (loginnregister)
                {
                    loginnregister.classList.add('showWarpLoginnRegister');
                }
            }
        };

        /**
        * 显示注册页面
        */
        const showRegisterPage = () =>
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
                this.ShowRegisterComponents(loginBoxItem0iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                this.ShowRegisterComponents(loginBoxItem3iv, registerLink, newUserSpan, quickLoginButton, loginBoxTitleSpan);
                const loginnregister = document.getElementById('warpLoginnregister');
                if (loginnregister)
                {
                    loginnregister.classList.add('showWarpLoginnRegister');
                }
            }
        };
        const btnLogin = document.getElementById('btnLogin');
        const btnRegister = document.getElementById('btnRegister');
        const btnCloseLoginnRegisterPg = document.getElementById('closeloginBox');
        if (btnCloseLoginnRegisterPg) btnCloseLoginnRegisterPg.addEventListener('click', this.closeLoginnRegisterPg);
        if (btnLogin) btnLogin.addEventListener('click', showLoginPage);
        if (btnRegister) btnRegister.addEventListener('click', showRegisterPage);

    }

    /**
     * 显示指定注册组件
     * @param loginBoxItemDiv
     * @param registerLink
     * @param newUserSpan
     */
    private ShowRegisterComponents(loginBoxItemDiv: HTMLDivElement, registerLink: HTMLAnchorElement,
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
     * @param loginBoxItemDiv  login box item div
     * @param registerLink link of register
     * @param newUserSpan span of new user
     * @param quickLoginButton button of quick login    
     * @param loginBoxTitle title of login box
     */
    private ShowLoginComponents(loginBoxItemDiv: HTMLDivElement, registerLink: HTMLAnchorElement,
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