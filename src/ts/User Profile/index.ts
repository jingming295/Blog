import { SendPost } from '../Send Fetch';
import { UserData } from '../Navigation Bar/interface';
import { ChangePage } from '../Navigation Bar/changePage';
import { ProfileData } from './interface';
import '../../scss/UserProfile/index.scss';
import { ArticleCard } from '../Manage Article Page/interface';

/**
 * MakeUserProfile class 创建User Profile的组件
 * @class
 * @classdesc Handles user profile page functionality.
 */
export class MakeUserProfile
{
    /**
     * init
     */
    Init = async () =>
    {
        const sendPost = new SendPost();

        const hash = window.location.hash;
        if (hash.startsWith('#/u'))
        {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id)))
            {
                const profileData = await sendPost.getUserProfile(parseInt(id));
                if (profileData)
                {
                    this.CreateContent(profileData);
                } else
                {
                    const changePage = new ChangePage(true);
                    changePage.to404Page();
                    return;
                }
            } else
            {
                const changePage = new ChangePage(true);
                changePage.to404Page();
            }
        } else if (hash === '')
        {
            const changePage = new ChangePage(true);
            changePage.to404Page();
        }
    };


    /**
     * 创建这个页面的组件
     */
    CreateContent = async (profileData: ProfileData) =>
    {
        const site = document.body;
        if (site)
        {

            const contentDiv = document.createElement('div');



            contentDiv.id = 'contentDiv';
            contentDiv.className = 'contentDiv';
            const authorHeaderWarp = createUserInfoContent(profileData);
            const userTab = await createUserTab(profileData);

            contentDiv.appendChild(authorHeaderWarp);
            contentDiv.appendChild(userTab);
            site.appendChild(contentDiv);
        }

        /**
         * 创建包含用户头像和用户信息
         * @param contentDiv
         * @param profileData
         */
        function createUserInfoContent(profileData: ProfileData): HTMLDivElement
        {
            /**
             * create user avatar
             * @param userAvatarBackgroundDiv
             * @param avatar
             */
            function createUserAvatar(avatar: string): HTMLDivElement
            {
                const userImgWarp = document.createElement('div');
                const userImg = document.createElement('img');

                userImgWarp.style.width = '150px';
                userImgWarp.style.height = '150px';

                userImg.style.width = '100%';
                userImg.style.height = '100%';
                userImg.style.objectFit = 'cover';
                userImg.src = '../avatar/' + avatar;
                userImg.style.border = '4px solid #fff';
                userImg.style.borderRadius = '6px';
                userImg.style.boxSizing = 'border-box';
                userImgWarp.appendChild(userImg);
                return userImgWarp;
            }

            /**
             * create user data
             * @param userAvatarBackgroundDiv
             * @param userName
             */
            function createUserData(userName: string): HTMLDivElement
            {
                const userDataWarp = document.createElement('div');
                userDataWarp.style.display = 'flex';
                userDataWarp.style.flexDirection = 'column';
                userDataWarp.style.justifyContent = 'flex-end';
                userDataWarp.style.marginLeft = '10px';

                const userNameWarp = document.createElement('div');
                userNameWarp.style.display = 'flex';

                const username = document.createElement('h2');
                username.textContent = userName;
                username.style.color = 'black';
                username.style.margin = '0';

                const userDesc = document.createElement('p');
                userDesc.style.color = 'black';
                userDesc.textContent = 'This is a user description.';

                userNameWarp.appendChild(username);

                userDataWarp.appendChild(userNameWarp);
                userDataWarp.appendChild(userDesc);

                return userDataWarp;
            }

            const authorHeaderWarp = document.createElement('div');
            authorHeaderWarp.className = 'userHeaderWarp';

            const backgroundDiv = document.createElement('div');
            backgroundDiv.id = 'backgroundDiv';
            backgroundDiv.className = 'backgroundDiv';

            const userHeaderComponentWrapper = document.createElement('div');
            userHeaderComponentWrapper.className = 'userHeaderComponentWrapper';


            const userAvatar = createUserAvatar(profileData.avatar);
            const userData = createUserData(profileData.name);
            userHeaderComponentWrapper.appendChild(userAvatar);
            userHeaderComponentWrapper.appendChild(userData);

            authorHeaderWarp.appendChild(backgroundDiv);
            authorHeaderWarp.appendChild(userHeaderComponentWrapper);
            return authorHeaderWarp;
        }

        async function createUserTab(profileData: ProfileData)
        {
            function createLeftPanel(): HTMLDivElement
            {
                const leftPanel = document.createElement('div');
                leftPanel.className = 'userProfile-Usertab-leftPanel';
                let i = 0;

                const sideBarItem = [
                    {
                        name: 'User Profile',
                        func: function ()
                        {
                            const rightPanel = document.querySelector('.userProfile-Usertab-rightPanel') as HTMLDivElement;
                            if (rightPanel)
                            {
                                rightPanel.remove();
                                const rightPanerWrapper = document.querySelector('.userProfile-Usertab-rightPanelWrapper') as HTMLDivElement;
                                if (rightPanerWrapper)
                                {
                                    const rightPanel = createUserProfileRightPanel(profileData);
                                    rightPanerWrapper.appendChild(rightPanel);
                                }
                            }
                        }
                    },
                    {
                        name: 'Posts',
                        func: async function ()
                        {
                            const UserData = localStorage.getItem('UserData');
                            if (UserData !== null)
                            {
                                const parseUserData: UserData = JSON.parse(UserData);
                                const sendPost = new SendPost();
                                const data = await sendPost.getArticleDataByAuthor(parseUserData);
                                if (data)
                                {
                                    const rightPanel = document.querySelector('.userProfile-Usertab-rightPanel') as HTMLDivElement;
                                    if (rightPanel)
                                    {
                                        rightPanel.remove();
                                        const rightPanerWrapper = document.querySelector('.userProfile-Usertab-rightPanelWrapper') as HTMLDivElement;
                                        if (rightPanerWrapper)
                                        {
                                            const rightPanel = createPostsRightPanel(data);
                                            rightPanerWrapper.appendChild(rightPanel);
                                        }
                                    }
                                } else
                                {
                                    
                                }

                            }
                        }
                    }
                ];

                sideBarItem.forEach((item) =>
                {
                    const userSideBarWrapper = document.createElement('div');
                    userSideBarWrapper.className = 'userSideBarWrapper';

                    const userSideBar = document.createElement('div');
                    userSideBar.className = 'userSideBar';
                    userSideBar.onclick = item.func;

                    const userSideBarItem = document.createElement('p');
                    userSideBarItem.className = 'userSideBarItem';
                    userSideBarItem.innerText = item.name;

                    const arrow = document.createElement('div');
                    arrow.className = 'arrow';
                    arrow.innerHTML = '>';

                    userSideBar.appendChild(userSideBarItem);
                    userSideBar.appendChild(arrow);
                    userSideBarWrapper.appendChild(userSideBar);
                    leftPanel.appendChild(userSideBarWrapper);
                });
                return leftPanel;
            }

            function createUserProfileRightPanel(profileData: ProfileData)
            {
                const rightPanel = document.createElement('div');
                rightPanel.className = 'userProfile-Usertab-rightPanel';
                let i = 0;
                const arr: string[][] = [
                    ['Name: ', profileData.name],
                    ['Email: ', profileData.email]
                ];

                for (i = 0; i < arr.length; i++)
                {
                    const userInfoBox = document.createElement('div');
                    const userInfoItem = document.createElement('p');
                    const title = document.createElement('span');
                    const content = document.createElement('span');

                    userInfoBox.className = 'userInfoBox';

                    userInfoItem.className = 'userInfoItem';

                    title.className = 'userInfoItem-title';
                    title.innerText = arr[i][0];

                    content.innerText = arr[i][1];

                    userInfoItem.appendChild(title);
                    userInfoItem.appendChild(content);
                    userInfoBox.appendChild(userInfoItem);
                    rightPanel.appendChild(userInfoBox);
                }
                return rightPanel;
            }

            function createPostsRightPanel(data: void | ArticleCard[] | undefined)
            {
                function appearArticleCard(articleData: ArticleCard)
                {
                    const sendPost = new SendPost();
                    const articleCardWrapper = document.createElement('div');
                    articleCardWrapper.className = 'articleCardWrapper';

                    const areaWrapper = document.createElement('div');
                    const titleWrapper = document.createElement('div');
                    const contentWrapper = document.createElement('div');
                    const buttonWrapper = document.createElement('div');

                    buttonWrapper.className = 'buttonWrapper';


                    const area = document.createElement('div');

                    const title = document.createElement('div');

                    const content = document.createElement('div');

                    const editBtn = document.createElement('div');

                    const deleteBtn = document.createElement('div');


                    area.innerHTML = articleData.articleArea;
                    area.className = 'area';

                    title.innerHTML = articleData.articleTitle;
                    title.className = 'title';
                    title.onclick = () => { const changePage = new ChangePage(true); changePage.toArticle(articleData.articleID.toString()); };

                    content.innerHTML = articleData.p;
                    content.className = 'content';

                    editBtn.innerHTML = 'Edit';
                    editBtn.className = 'editBtn';

                    editBtn.onclick = () => { const changePage = new ChangePage(true); changePage.toEditArticle(articleData.articleID); };

                    deleteBtn.innerHTML = 'Delete';
                    deleteBtn.className = 'deleteBtn';
                    deleteBtn.onclick = () => { sendPost.deleteArticle(articleData.articleID); };

                    areaWrapper.appendChild(area);

                    titleWrapper.appendChild(title);

                    contentWrapper.appendChild(content);

                    buttonWrapper.appendChild(editBtn);

                    buttonWrapper.appendChild(deleteBtn);

                    articleCardWrapper.appendChild(areaWrapper);

                    articleCardWrapper.appendChild(titleWrapper);

                    articleCardWrapper.appendChild(contentWrapper);

                    articleCardWrapper.appendChild(buttonWrapper);

                    return articleCardWrapper;
                }

                const rightPanel = document.createElement('div');
                rightPanel.className = 'userProfile-Usertab-rightPanel';
                if (data)
                {

                    data.forEach(item =>
                    {
                        const articleCard = appearArticleCard(item);
                        rightPanel.appendChild(articleCard);
                    });

                }
                return rightPanel;
            }

            const userTable = document.createElement('div');
            const leftPanelWrapper = document.createElement('div');
            const rightPanelWrapper = document.createElement('div');

            userTable.className = 'userProfile-Usertab';

            leftPanelWrapper.className = 'userProfile-Usertab-leftPanelWrapper';


            rightPanelWrapper.className = 'userProfile-Usertab-rightPanelWrapper';

            userTable.appendChild(leftPanelWrapper);
            userTable.appendChild(rightPanelWrapper);

            const leftPanel = createLeftPanel();
            const rightPanel = createUserProfileRightPanel(profileData);
            leftPanelWrapper.appendChild(leftPanel);
            rightPanelWrapper.appendChild(rightPanel);
            return userTable;
        }
    };
}

