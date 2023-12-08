import { SendPost } from "../Send Fetch";
import { HandlePopMsg } from "./popMsg";
import { NavRelated } from ".";
import { SHA256 } from "../Crypto/sha256";
/**
 * 登录和注册相关
 * @class
 */
export class HandleLoginNRegister
{
    constructor()
    {

    }

    init()
    {
        try
        {
            this.addBtnListener();
        } catch (error)
        {

        }

    }

    addBtnListener()
    {
        const loginBoxButtonDiv = document.getElementById('loginBox-button');
        const loginBoxButton = loginBoxButtonDiv?.querySelector('button');
        loginBoxButton?.addEventListener('click', async (event: MouseEvent) =>
        {
            try
            {
                // handle click event here
                await this.handleRequest(loginBoxButton);
            } catch (error)
            {
                const handlePopMsg = new HandlePopMsg();
                handlePopMsg.popMsg((error as Error).message);
            }

        });
    }

    async handleRequest(loginBoxButton: HTMLButtonElement)
    {
        if (loginBoxButton.innerText === 'Register')
        {
            await this.handleRegister();
        } else if (loginBoxButton.innerText === 'Login')
        {
            await this.handleLogin();
        }
    }

    async handleRegister()
    {
        const handlePopMsg = new HandlePopMsg();
        const sendPost = new SendPost();
        const sha256 = new SHA256();
        const uIName = document.getElementById('name') as HTMLInputElement;
        const uIEmail = document.getElementById('email') as HTMLInputElement;
        const uIPwd = document.getElementById('password') as HTMLInputElement;
        const uICPwd = document.getElementById('confPassword') as HTMLInputElement;
        if (uIPwd.value !== uICPwd.value)
        {
            handlePopMsg.popMsg('Password and repeat password must be same');
            return;
        }

        const hashedPassword = await sha256.hashPassword(uIPwd.value);


        const params = {
            email: uIEmail.value,
            username: uIName.value,
            password: hashedPassword
        };

        sendPost.postWithUrlParams('register', params)
            .then((response) =>
            {
                console.log(response)
                handlePopMsg.popMsg(response.message);
            })
            .catch((error: any) =>
            {
                console.log(error);
            });
    }

    async handleLogin()
    {
        const sendPost = new SendPost();
        const sha256 = new SHA256();
        const handlePopMsg = new HandlePopMsg();
        const uIEmail = document.getElementById('email') as HTMLInputElement;
        const uIPwd = document.getElementById('password') as HTMLInputElement;

        const hashedPassword = await sha256.hashPassword(uIPwd.value);

        const params = {
            email: uIEmail.value,
            password: hashedPassword,
        };

        sendPost.postWithUrlParams('login', params)
            .then(async (response) =>
            {
                console.log(response)
                handlePopMsg.popMsg(response.message);
                if (response.code === 0)
                {
                    localStorage.setItem('UserData', JSON.stringify(response.data));
                    const navRelated = new NavRelated();
                    navRelated.closeLoginnRegisterPg();
                    navRelated.MakeNav();
                    const warpLoginnregister = document.getElementById('warpLoginnregister');
                    await this.delay(150);
                    warpLoginnregister?.remove();
                }
            })
            .catch((error) =>
            {
                handlePopMsg.popMsg(error);
            });

    }

    delay(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}