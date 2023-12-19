import { SendPost } from "../Send Fetch";
import { NavRelated } from "../Navigation Bar";
import { ChangePage } from "../Navigation Bar/changePage";
import { Editor } from "../Editor/Editor";
import { ArticleData, UserData } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import '../../scss/Editor/style.scss';
import '../../scss/NewPostPage/index.scss';
import { IDomEditor } from "@wangeditor/editor";
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
            sendPost.postWithUrlParams('keeplogin', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        this.DeletePreviousPageComponent();
                        this.createPostComponents();
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
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

    createPostComponents()
    {
        const body = document.body;
        const contentDiv = document.createElement('div');
        const postWrapper = document.createElement('div');
        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';

        postWrapper.className = 'postWrapper';

        function createTitleInput()
        {
            const titleWrapper = document.createElement('div');
            const titleInput = document.createElement('input');
            const areaSelect = document.createElement('select');

            titleWrapper.className = 'titleWrapper';

            titleInput.id = 'titleInput';
            titleInput.className = 'titleInput';
            titleInput.placeholder = 'Title';

            areaSelect.id = 'areaSelect';
            areaSelect.className = 'areaSelect';

            const areaOptions = ['Programming', 'Anime'];

            areaOptions.forEach(optionValue =>
            {
                const option = document.createElement('option');
                option.value = optionValue;
                option.innerHTML = optionValue;
                areaSelect.appendChild(option);
            });

            titleWrapper.appendChild(titleInput);
            titleWrapper.appendChild(areaSelect);
            postWrapper.appendChild(titleWrapper);
        }

        function createEditor()
        {
            const editorWarpper = document.createElement('div');
            const toolbar = document.createElement('div');
            const editorContainer = document.createElement('div');

            editorWarpper.id = 'editor—wrapper';
            editorWarpper.className = 'editor';

            toolbar.id = 'toolbar-container';

            editorContainer.id = 'editor-container';
            editorContainer.className = 'editor-container';

            editorWarpper.appendChild(toolbar);
            editorWarpper.appendChild(editorContainer);
            postWrapper.appendChild(editorWarpper);
            const editor = new Editor();
            return editor.createEditor();
        }

        const createSubmit = (editor: IDomEditor) =>
        {
            const submitWrapper = document.createElement('div');
            const submitBtn = document.createElement('button');

            submitWrapper.className = 'submitWrapper';

            submitBtn.className = 'submitBtn'
            submitBtn.innerHTML = 'Submit';

            submitWrapper.appendChild(submitBtn);
            postWrapper.appendChild(submitWrapper);

            submitBtn.onclick = () => {
                const titleInput = document.getElementById('titleInput') as HTMLInputElement;
                const areaSelect = document.getElementById('areaSelect') as HTMLSelectElement;
                const area = areaSelect.value;
                const title = titleInput.value;
                this.UploadArticle(title, editor.getHtml(), area, 'programming');
            }

        }
        contentDiv.appendChild(postWrapper);
        body.appendChild(contentDiv);
        createTitleInput();
        const editor = createEditor();
        createSubmit(editor);
    }

    UploadArticle(title:string, article:string, area:string, tag:string){
        const sendPost = new SendPost();
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const parseUserData: UserData = JSON.parse(UserData);
            const ArticleData:ArticleData = {
                title:title,
                article:article,
                area:area,
                tag:tag
            }
            const params = {
                UserData: parseUserData,
                ArticleData:ArticleData
            };
            sendPost.postWithUrlParams('uploadArticle', params)
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


}
