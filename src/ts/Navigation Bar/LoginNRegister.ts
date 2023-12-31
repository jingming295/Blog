import { SendPost } from "../Send Fetch";
import { HandlePopMsg } from "./popMsg";
import { NavRelated } from ".";
import { SHA256 } from "../Crypto/sha256";
import { LoginNRegister } from "../Login And Register Page";
/**
 * 登录和注册相关
 * @class
 */
export class HandleLoginNRegister
{
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

        sendPost.Register(params.email, params.username, params.password);
    }

    async handleLogin()
    {
        const sendPost = new SendPost();
        const sha256 = new SHA256();
        const uIEmail = document.getElementById('email') as HTMLInputElement;
        const uIPwd = document.getElementById('password') as HTMLInputElement;

        const hashedPassword = await sha256.hashPassword(uIPwd.value);

        const params = {
            email: uIEmail.value,
            password: hashedPassword,
        };

        if (await sendPost.Login(params.email, params.password))
        {
            const navRelated = new NavRelated();
            const loginNRegister = new LoginNRegister();
            loginNRegister.closeLoginnRegisterPg();
            navRelated.changeNavBarStatus();
            const warpLoginnregister = document.getElementById('warpLoginnregister');
            await this.delay(150);
            warpLoginnregister?.remove();
        }

    }

    delay(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}