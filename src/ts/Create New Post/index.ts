import { SendPost } from "../Send Fetch";
import { NavRelated } from "../Navigation Bar";
import { ChangePage } from "../Navigation Bar/changePage";
import { Editor } from "../Editor/Editor";
import { UserData } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import '../../scss/Editor/style.scss'
import '../../scss/New Post Page/index.scss'
export class CreateNewPost
{
    private handlePopMsg: HandlePopMsg;
    constructor()
    {
        this.handlePopMsg = new HandlePopMsg();
    }
    init()
    {
        this.checkOnlineStatus();
        if (!(document.getElementById('navigationBar')))
        {
            const navRelated = new NavRelated();
            navRelated.MakeNav();
        }
    }

    checkOnlineStatus()
    {

        const sendPost = new SendPost();
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const parseUserData: UserData = JSON.parse(UserData);
            const params = {
                UserData: parseUserData,
            };
            sendPost.postWithUrlParams('keeplogin',params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.DeletePreviousPageComponent();
                        this.createEditor();
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message)
                        localStorage.clear();
                        const changePage = new ChangePage();
                        changePage.toIndex();
                        location.reload();
                    }
                })
                .catch((error: any) =>
                {
                    console.log(error);
                });
        } else
        {
            localStorage.clear();
            const changePage = new ChangePage();
            changePage.toIndex();
            location.reload();
        }
    }

    /**
     * 删除前一个页面的组件
     */
    DeletePreviousPageComponent = () =>
    {
        const contentDiv = document.getElementById('contentDiv');
        if (contentDiv)
        {
            contentDiv.remove();
        }
    };

    createEditor()
    {
        const body = document.body;
        const contentDiv = document.createElement('div');
        const editorWarpper = document.createElement('div');
        const toolbar = document.createElement('div');
        const editorContainer = document.createElement('div');

        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';

        editorWarpper.id = 'editor—wrapper';
        editorWarpper.className = 'editor';

        toolbar.id = 'toolbar-container';

        editorContainer.id = 'editor-container';
        editorContainer.style.height = '100%';

        editorWarpper.appendChild(toolbar);
        editorWarpper.appendChild(editorContainer);
        contentDiv.appendChild(editorWarpper);
        body.appendChild(contentDiv);
        const editor = new Editor();
        editor.createEditor();
    }
}
