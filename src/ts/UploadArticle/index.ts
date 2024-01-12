import { SendPost } from "../Send Fetch";
import { Editor } from "../Editor/Editor";
import '../../scss/Editor/style.scss';
import '../../scss/NewPostPage/index.scss';
import { IDomEditor } from "@wangeditor/editor";
import { UserVerification } from "../User Verification";
import { NavigationProgress } from "../Create Navigation Progress";
import { RetArticleData } from "../Send Fetch/interface";
import { ChangePage } from "../Navigation Bar/changePage";
export class UploadArticle
{
    private navigationProgress = new NavigationProgress();

    async init(id: number | null = null)
    {
        this.navigationProgress.start();
        const userVerification = new UserVerification();
        if (await userVerification.verification())
        {
            if (id)
            {
                const sendPost = new SendPost();
                await sendPost.CheckPermission(id);
            }
            await this.createPostComponents(id);

        }
        setTimeout(() =>
        {
            this.navigationProgress.end();
            this.setEditorContainerHeight();
        }, 100);
    }

    async createPostComponents(id: number | null)
    {
        let article: RetArticleData | null = null;
        if (id)
        {
            const sendPost = new SendPost();
            article = await sendPost.getArticleContent(id);
        }
        const body = document.body;
        const contentDiv = document.createElement('div');
        const postWrapper = document.createElement('div');
        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';
        contentDiv.style.paddingLeft = '5%';
        contentDiv.style.paddingRight = '5%';

        postWrapper.className = 'postWrapper';

        async function createTitleInput(article: RetArticleData | null)
        {

            async function createTitleInput()
            {
                const titleWrapper = document.createElement('div');
                const titleInput = document.createElement('input');
                titleWrapper.className = 'titleWrapper';
                titleInput.placeholder = 'Title';
                titleInput.autocomplete = 'off';
                titleInput.id = 'titleInput';
                titleInput.className = 'titleInput';

                titleInput.onfocus = () =>
                {
                    titleWrapper.style.backgroundColor = 'white';
                    titleWrapper.style.boxShadow = '0 0 0 1px rgb(22,192,248) inset';

                };

                titleInput.onblur = () =>
                {
                    titleWrapper.style.backgroundColor = 'rgba(242, 243, 245, 1)';
                    titleWrapper.style.boxShadow = 'none';
                };

                if (article?.article.articleTitle)
                {
                    titleInput.value = article.article.articleTitle;
                }
                titleWrapper.appendChild(titleInput);
                return titleWrapper;
            }

            async function createAreaInput()
            {
                function createDropDownMenu()
                {
                    const dropDownWrapper = document.createElement('div');

                    dropDownWrapper.className = 'dropDownWrapper';

                    const bigAreaWrapper = document.createElement('div');
                    bigAreaWrapper.className = 'bigAreaWrapper';

                    const subAreaWrapper = document.createElement('div');
                    subAreaWrapper.className = 'subAreaWrapper';
                    if (!allArea) return dropDownWrapper;
                    allArea.forEach(area =>
                    {
                        const bigAreaBtn = document.createElement('div');
                        bigAreaBtn.className = 'bigAreaBtn';
                        bigAreaBtn.innerHTML = area.bigAreaName;
                        bigAreaBtn.onclick = () =>
                        {
                            const subAreaBtn = document.querySelectorAll('.subAreaBtn') as NodeListOf<HTMLDivElement>;
                            subAreaBtn.forEach(btn =>
                            {
                                btn.remove();
                            });
                            area.subarea.forEach(subArea =>
                            {
                                if (subArea.subareaName)
                                {
                                    const subAreaBtn = document.createElement('div');
                                    subAreaBtn.className = 'subAreaBtn';
                                    subAreaBtn.innerHTML = subArea.subareaName;
                                    subAreaWrapper.appendChild(subAreaBtn);

                                    subAreaBtn.onclick = () =>
                                    {
                                        if (!subArea.subareaName) return;
                                        areaInput.value = area.bigAreaName + ' - ' + subArea.subareaName;
                                        areaHiddenInput.value = subArea.subareaName;
                                        areaInputWrapper.style.backgroundColor = 'rgba(242, 243, 245, 1)';
                                        areaInputWrapper.style.boxShadow = 'none';
                                        areaWrapper.style.width = '30%';
                                        dropDownWrapper.classList.remove('showDropDownWrapper');
                                    };
                                }
                            });
                            subAreaWrapper.style.width = bigAreaWrapper.offsetWidth + 'px';
                        };
                        bigAreaWrapper.appendChild(bigAreaBtn);
                    });

                    dropDownWrapper.appendChild(bigAreaWrapper);
                    dropDownWrapper.appendChild(subAreaWrapper);

                    return dropDownWrapper;
                }
                const allArea = await sendPost.getAllArticleArea();

                const areaWrapper = document.createElement('div');
                areaWrapper.className = 'areaWrapper';

                const areaInputWrapper = document.createElement('div');
                areaInputWrapper.className = 'areaInputWrapper';

                const areaInput = document.createElement('input');
                areaInput.placeholder = 'Please Select Area';
                areaInput.className = 'areaInput';
                areaInput.readOnly = true;

                const areaHiddenInput = document.createElement('input');
                areaHiddenInput.type = 'hidden';
                areaHiddenInput.className = 'areaHiddenInput';
                areaHiddenInput.id = 'areaHiddenInput';

                if (article?.article.articleArea)
                {
                    if (allArea)
                    {
                        const foundArea = allArea.find(area =>
                            area.subarea.some(subarea => subarea.subareaName === article.article.articleArea)
                        );
                        if (foundArea)
                        {
                            const foundSubarea = foundArea.subarea.find(subarea => subarea.subareaName === article.article.articleArea);
                            areaInput.value = foundArea.bigAreaName + ' - ' + foundSubarea?.subareaName;
                            areaHiddenInput.value = foundSubarea?.subareaName || '';
                        }
                    }

                }

                const dropDownWrapper = createDropDownMenu();
                areaInputWrapper.appendChild(areaInput);
                areaInputWrapper.appendChild(areaHiddenInput);
                areaInputWrapper.appendChild(dropDownWrapper);
                areaWrapper.appendChild(areaInputWrapper);

                areaInput.onfocus = () =>
                {
                    areaInputWrapper.style.backgroundColor = 'white';
                    areaInputWrapper.style.boxShadow = '0 0 0 1px rgb(22,192,248) inset';
                    areaWrapper.style.width = '50%';
                    const dropDownWrapper = document.querySelector('.dropDownWrapper') as HTMLDivElement;
                    if (dropDownWrapper)
                    {
                        dropDownWrapper.classList.add('showDropDownWrapper');
                    }

                };

                areaInput.onblur = () =>
                {
                    const dropDownWrapper = document.querySelector('.dropDownWrapper') as HTMLDivElement;
                    if (dropDownWrapper.matches(':hover'))
                    {
                        dropDownWrapper.onmouseleave = () =>
                        {
                            areaInputWrapper.style.backgroundColor = 'rgba(242, 243, 245, 1)';
                            areaInputWrapper.style.boxShadow = 'none';
                            areaWrapper.style.width = '30%';
                            dropDownWrapper.classList.remove('showDropDownWrapper');
                        };
                        return;
                    }
                    areaInputWrapper.style.backgroundColor = 'rgba(242, 243, 245, 1)';
                    areaInputWrapper.style.boxShadow = 'none';
                    areaWrapper.style.width = '30%';
                    dropDownWrapper.classList.remove('showDropDownWrapper');
                };

                return areaWrapper;
            }

            const inputWrapper = document.createElement('div');
            inputWrapper.className = 'inputWrapper';
            const sendPost = new SendPost();


            const titleWrapper = await createTitleInput();
            const areaInput = await createAreaInput();


            inputWrapper.appendChild(titleWrapper);
            inputWrapper.appendChild(areaInput);

            return inputWrapper;
        }

        const createEditor = (html: string | null = null) =>
        {
            try {
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

                // 在窗口大小改变时重新设置 editorContainer 的高度
                window.addEventListener('resize', this.setEditorContainerHeight);

                const editor = new Editor();
                return editor.createEditor(html);
            } catch (error) {
                console.log(error);
                const contentDivs = document.querySelectorAll('.contentDiv');
                contentDivs.forEach((contentDiv) => {
                    if(contentDiv.parentNode)
                    contentDiv.parentNode.removeChild(contentDiv);
                });
                const changePage = new ChangePage(true);
                changePage.to404Page();

                return null;
            }



        };


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
                    const areaSelect = document.getElementById('areaHiddenInput') as HTMLInputElement;
                    const area = areaSelect.value;
                    const title = titleInput.value;
                    sendPost.UploadArticle(title, editor.getHtml(), area, 'blog');
                };
            } else
            {
                submitBtn.onclick = () =>
                {
                    const titleInput = document.getElementById('titleInput') as HTMLInputElement;
                    const areaSelect = document.getElementById('areaHiddenInput') as HTMLInputElement;
                    const area = areaSelect.value;
                    const title = titleInput.value;
                    sendPost.UpdateArticle(id, title, editor.getHtml(), area, 'blog');
                };
            }
            return submitWrapper;

        };
        const titleInput = await createTitleInput(article);


        postWrapper.appendChild(titleInput);
        contentDiv.appendChild(postWrapper);
        body.appendChild(contentDiv);
        if (article)
        {
            const editor = createEditor(article.article.articleContent);
            if(!editor) return;
            const submitWrapper = createSubmit(editor);
            postWrapper.appendChild(submitWrapper);
        } else
        {
            const editor = createEditor();
            if(!editor) return;
            const submitWrapper = createSubmit(editor);
            postWrapper.appendChild(submitWrapper);
        }
    }

    setEditorContainerHeight()
    {
        const editorContainer = document.getElementById('editor-container') as HTMLDivElement;
        if (!editorContainer) return;
        const postWrapper = document.querySelector('.postWrapper') as HTMLDivElement;
        const postWrapperHeight = postWrapper.offsetHeight;
        const toolbar = document.getElementById('toolbar-container') as HTMLDivElement;
        const inputWrapper = document.querySelector('.inputWrapper') as HTMLDivElement;
        const submitWrapper = document.querySelector('.submitWrapper') as HTMLDivElement;

        const toolbarHeight = toolbar.offsetHeight;
        const inputWrapperHeight = inputWrapper.offsetHeight;
        const postWrapperMarginBottom = parseInt(window.getComputedStyle(postWrapper).marginBottom);

        let submitWrapperHeight = 55;
        if (submitWrapper)
        {
            submitWrapperHeight = submitWrapper.offsetHeight;
        }
        const newEditorContainerHeight = postWrapperHeight - toolbarHeight - submitWrapperHeight - inputWrapperHeight - postWrapperMarginBottom - 20;
        editorContainer.style.height = `${newEditorContainerHeight}px`;
    }
}
