import { ChangePage } from "../Navigation Bar/changePage";
import { SendPost } from "../Send Fetch";
import '../../scss/Activation Page/index.scss'

export class ActivateAccountPage
{

    async init()
    {
        const hash = window.location.hash;
        if (hash.startsWith('#/activateAccount'))
        {
            const userData = JSON.parse(localStorage.getItem('UserData') as string);
            if (userData)
            {
                const changePage = new ChangePage(true);
                changePage.to404Page();
                return;
            }
            const token = hash.slice(hash.indexOf('?token=') + 7);
            if (token.length === 64)
            {
                const sendPost = new SendPost();
                const result = await sendPost.sendActivateAccountRequest(token);
                if (result)
                {
                    const body = document.body;
                    const contentDiv = this.createActivationStatusPage("Your account has been activated, please login.");

                    body.appendChild(contentDiv);
                } else {
                    const body = document.body;
                    const contentDiv = this.createActivationStatusPage("Account activation failed.");

                    body.appendChild(contentDiv);
                }
            } else
            {
                const changePage = new ChangePage(true);
                changePage.to404Page();
                return;
            }
        } else if (hash === '')
        {
            const changePage = new ChangePage(true);
            changePage.to404Page();
            return;
        }
    }

    createActivationStatusPage(msg:string)
    {
        const contentDiv = document.createElement('contentDiv');
        contentDiv.className = 'contentDiv';
        contentDiv.id = 'contentDiv';

        const msgWrapper = document.createElement('div');

        msgWrapper.className = 'msgWrapper';

        const Msg = document.createElement('h1');

        Msg.innerText = msg;

        msgWrapper.appendChild(Msg);

        contentDiv.appendChild(msgWrapper);

        return contentDiv;
    }
}