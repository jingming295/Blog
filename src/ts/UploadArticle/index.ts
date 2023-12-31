import { SendPost } from "../Send Fetch";
import { Editor } from "../Editor/Editor";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import '../../scss/Editor/style.scss';
import '../../scss/NewPostPage/index.scss';
import { IDomEditor } from "@wangeditor/editor";
import { UserVerification } from "../User Verification";
export class UploadArticle
{
    private handlePopMsg: HandlePopMsg;
    constructor()
    {
        this.handlePopMsg = new HandlePopMsg();
    }
    async init(id: number | null = null)
    {
        const userVerification = new UserVerification();
        if (await userVerification.verification())
        {
            if (id)
            {
                const sendPost = new SendPost();
                sendPost.CheckPermission(id);
            }
            this.createPostComponents(id);
        }
    }

    async createPostComponents(id: number | null)
    {
        let article:{articleId: string,  articleTitle: string, articleArea:string, articleAuthor: string, articleContent: string; } | null = null;
        if(id){
            const sendPost = new SendPost();
            article = await sendPost.getArticleContent(id)
        }
        const body = document.body;
        const contentDiv = document.createElement('div');
        const postWrapper = document.createElement('div');
        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';

        postWrapper.className = 'postWrapper';

        function createTitleInput(title:string | null=null, area:string | null=null)
        {
            const inputWrapper = document.createElement('div');
            const titleWrapper = document.createElement('div');
            const areaWrapper = document.createElement('div');
            const titleInput = document.createElement('input');
            const areaSelect = document.createElement('select');

            inputWrapper.className = 'inputWrapper';

            titleWrapper.className = 'titleWrapper';

            areaWrapper.className = 'areaWrapper';

            titleInput.id = 'titleInput';
            titleInput.className = 'titleInput';
            titleInput.placeholder = 'Title';
            if(title){
                titleInput.value = title;
            }

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

            if(area){
                areaSelect.value = area;
            }

            titleWrapper.appendChild(titleInput);
            areaWrapper.appendChild(areaSelect);
            inputWrapper.appendChild(titleWrapper);
            inputWrapper.appendChild(areaWrapper);

            postWrapper.appendChild(inputWrapper);
        }

        function createEditor(html: string | null = null)
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
            return editor.createEditor(html);
        }

        const createSubmit = (editor: IDomEditor) =>
        {
            const sendPost = new SendPost();
            const submitWrapper = document.createElement('div');
            const submitBtn = document.createElement('button');

            submitWrapper.className = 'submitWrapper';

            submitBtn.className = 'submitBtn';
            submitBtn.innerHTML = 'Submit';

            submitWrapper.appendChild(submitBtn);
            postWrapper.appendChild(submitWrapper);
            if (id === null)
            {
                submitBtn.onclick = () =>
                {
                    const titleInput = document.getElementById('titleInput') as HTMLInputElement;
                    const areaSelect = document.getElementById('areaSelect') as HTMLSelectElement;
                    const area = areaSelect.value;
                    const title = titleInput.value;
                    sendPost.UploadArticle(title, editor.getHtml(), area, 'blog');
                };
            } else
            {
                submitBtn.onclick = () =>
                {
                    const titleInput = document.getElementById('titleInput') as HTMLInputElement;
                    const areaSelect = document.getElementById('areaSelect') as HTMLSelectElement;
                    const area = areaSelect.value;
                    const title = titleInput.value;
                    sendPost.UpdateArticle(id, title, editor.getHtml(), area, 'blog');
                };
            }


        };
        contentDiv.appendChild(postWrapper);
        body.appendChild(contentDiv);
        if(article){
            createTitleInput(article.articleTitle, article.articleArea);
            const editor = createEditor(article.articleContent);
            createSubmit(editor);
        } else {
            createTitleInput()
            const editor = createEditor();
            createSubmit(editor);
        }


    }
}
