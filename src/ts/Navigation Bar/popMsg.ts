/**
 * 显示信息
 * @class
 */
export class HandlePopMsg
{
    constructor(){
        this.createMsgContainer()
    }

    /**
   * create a container to handle msg
   */
    private createMsgContainer()
    {
        if (!document.getElementById('msgContainerDiv'))
        {
            const appContainer = document.body;
            const msgContainerDiv = document.createElement('div');
            msgContainerDiv.id = 'msgContainerDiv';
            msgContainerDiv.style.position = 'fixed';
            msgContainerDiv.style.top = '130px';
            msgContainerDiv.style.zIndex = '999999';
            msgContainerDiv.style.width = '100%';
            msgContainerDiv.style.display = 'flex';
            msgContainerDiv.style.justifyContent = 'center';
            appContainer?.appendChild(msgContainerDiv);
        }
    }

    async popMsg(msg: string)
    {
        const msgContainerDiv = document.getElementById('msgContainerDiv');
        const msgwarpDiv = document.getElementById('msgwarpDiv');
        if (msgContainerDiv && !msgwarpDiv)
        {
            const msgwarpDiv = document.createElement('div');
            const msgSpan = document.createElement('span');
            msgwarpDiv.id = 'msgwarpDiv';
            msgwarpDiv.style.display = 'flex';
            msgwarpDiv.style.textAlign = 'center';
            msgwarpDiv.style.backgroundColor = '#ffffff';
            msgwarpDiv.style.color = '#333';
            msgwarpDiv.style.boxShadow = '0 4px 12px rgba(0, 0, 0, .15)';
            msgwarpDiv.style.borderRadius = '4px';
            msgwarpDiv.style.opacity = '0';
            msgwarpDiv.style.transition = 'all 0.2s ease-in';

            msgSpan.style.fontSize = '15px';
            msgSpan.style.lineHeight = '1';

            msgwarpDiv.append(msgSpan);
            msgContainerDiv.append(msgwarpDiv);

            await delay(5);
            displayMsg(msgwarpDiv, msgSpan);
            await delay(1500);
            hideMsg(msgwarpDiv, msgSpan);

            await delay(200);
            msgContainerDiv.removeChild(msgwarpDiv);
        }

        function displayMsg(msgwarpDiv: HTMLDivElement, msgSpan: HTMLSpanElement)
        {
            msgwarpDiv.style.padding = '10px';
            msgSpan.innerText = msg;
            msgwarpDiv.style.opacity = '1';
        }

        function hideMsg(msgwarpDiv: HTMLDivElement, msgSpan: HTMLSpanElement)
        {
            msgwarpDiv.style.padding = '0';
            msgwarpDiv.style.opacity = '0';
        }

        function delay(ms: number)
        {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
}