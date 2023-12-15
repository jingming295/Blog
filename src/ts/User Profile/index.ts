import { SendPost } from '../Send Fetch';
import { NavRelated } from '../Navigation Bar';
import { ChangePage } from '../Navigation Bar/changePage';
import { ProfileData } from './interface';
import '../../scss/User Profile/index.scss'

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
    Init = () =>
    {
        const sendPost = new SendPost();
        if (!(document.getElementById('navigationBar')))
        {
            const navRelated = new NavRelated();
            navRelated.MakeNav();
        }
        this.DeletePreviousPageComponent();

        const hash = window.location.hash;
        if (hash.startsWith('#/u'))
        {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id)))
            {
                const params = {
                    id: id
                };
                sendPost.postWithUrlParams('userprofile', params)
                    .then(response =>
                    {

                        if (response.code === 0)
                        {
                            const profileData:ProfileData = response.data as ProfileData;
                            this.CreateContent(profileData);

                        } else {
                            const changePage = new ChangePage();
                            changePage.toIndex();
                            return;
                        }


                        
                    })
                    .catch(error =>
                    {
                        console.log(error);
                    });
            } else
            {
                // window.location.href = '404.html';
            }
        } else if (hash === '')
        {
            // window.location.href = '404.html';
        }
    };

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

    /**
     * 创建这个页面的组件
     */
    CreateContent = (profileData: ProfileData) =>
    {
        const site = document.body;
        if (site)
        {
            const contentDiv = document.createElement('div');
            const authorWarp = document.createElement('div');
            authorWarp.style.background = '#fff';
            authorWarp.style.borderRadius = '6px';

            contentDiv.id = 'contentDiv';
            contentDiv.className = 'contentDiv';
            contentDiv.style.maxWidth = '100%';
            contentDiv.style.marginLeft = '3%';
            contentDiv.style.marginRight = '3%';
            contentDiv.appendChild(authorWarp);

            site.appendChild(contentDiv);
            createUserInfoContent(authorWarp, profileData);
            createUserTab(contentDiv, profileData);
        } else
        {
            const siteDiv = document.createElement('div');
            siteDiv.id = 'site';
            siteDiv.className = 'site';
            document.body.appendChild(siteDiv);
        }

        /**
         * 创建包含用户头像和用户信息
         * @param contentDiv
         * @param profileData
         */
        function createUserInfoContent(contentDiv: HTMLDivElement, profileData: ProfileData)
        {
            const backgroundDiv = document.createElement('div');
            backgroundDiv.id = 'backgroundDiv';
            backgroundDiv.className = 'backgroundDiv';

            const userAvatarBackgroundDiv = document.createElement('div');
            userAvatarBackgroundDiv.id = 'userAvatarBackgroundDiv';
            userAvatarBackgroundDiv.className = 'userAvatarBackgroundDiv';
            userAvatarBackgroundDiv.style.maxWidth = '100%';
            userAvatarBackgroundDiv.style.height = '150px';
            userAvatarBackgroundDiv.style.padding = '0px 42px 18px 42px';
            userAvatarBackgroundDiv.style.display = 'flex';
            userAvatarBackgroundDiv.style.marginTop = '-80px';

            contentDiv.appendChild(backgroundDiv);
            contentDiv.appendChild(userAvatarBackgroundDiv);
            createUserAvatar(userAvatarBackgroundDiv, profileData.avatar);
            createUserData(userAvatarBackgroundDiv, profileData.name);

            /**
             * 创建用户头像
             * @param userAvatarBackgroundDiv
             * @param avatar
             */
            function createUserAvatar(userAvatarBackgroundDiv: HTMLDivElement, avatar: string)
            {
                const userImgWarp = document.createElement('div');
                const userImg = document.createElement('img');

                userImgWarp.style.width = '150px';
                userImgWarp.style.height = '150px';
                userImgWarp.appendChild(userImg);
                userImg.style.width = '100%';
                userImg.style.height = '100%';
                userImg.style.objectFit = 'cover';
                userImg.src = '../avatar/' + avatar;
                userImg.style.border = '4px solid #fff';
                userImg.style.borderRadius = '6px';
                userImg.style.boxSizing = 'border-box';
                userAvatarBackgroundDiv.appendChild(userImgWarp);
            }

            /**
             * 创建显示用户资料的组件
             * @param userAvatarBackgroundDiv
             * @param userName
             */
            function createUserData(userAvatarBackgroundDiv: HTMLDivElement, userName: string)
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
                userDesc.textContent = '施工中';

                userNameWarp.appendChild(username);
                userDataWarp.appendChild(userNameWarp);
                userDataWarp.appendChild(userDesc);

                userAvatarBackgroundDiv.appendChild(userDataWarp);
            }
        }

        function createUserTab(contentDiv: HTMLDivElement, profileData: ProfileData)
        {
            const userTable = document.createElement('div');
            userTable.style.display = 'flex';
            userTable.style.marginTop = '20px';
            const leftPanel = document.createElement('div');
            userTable.id = 'userTab';

            leftPanel.style.maxWidth = '100%';
            leftPanel.id = 'lp';

            const rightPanel = document.createElement('div');
            rightPanel.style.width = '100%';
            rightPanel.style.marginLeft = '20px';
            rightPanel.id = 'rp';

            userTable.appendChild(leftPanel);
            userTable.appendChild(rightPanel);

            contentDiv.appendChild(userTable);

            createLeftPanel(leftPanel);
            createRightPanel(rightPanel, profileData);

            function createLeftPanel(leftPanel: HTMLDivElement)
            {
                let i = 0;
                const arr: Array<string> = ['User Profile', 'Posts'];
                for (i = 0; i < arr.length; i++)
                {
                    const userTab = document.createElement('div');
                    userTab.style.width = '200px';

                    const userSideBar = document.createElement('div');
                    userSideBar.style.padding = '16px';
                    userSideBar.style.background = '#fff';
                    userSideBar.style.display = 'flex';
                    userSideBar.style.justifyContent = 'space-between';
                    userSideBar.style.transition = 'all 0.08s ease';
                    userSideBar.style.cursor = 'pointer';

                    userSideBar.addEventListener('mouseover', function ()
                    {
                        userSideBar.style.background = 'rgb(247 241 244)';
                    });
                    userSideBar.addEventListener('mouseout', (event: MouseEvent) =>
                    {
                        userSideBar.style.background = '#fff';
                    });

                    const userSideBarItem = document.createElement('p');
                    userSideBarItem.innerText = arr[i];
                    userSideBarItem.style.color = '#73abff';

                    const arrow = document.createElement('div');
                    arrow.innerHTML = '>';
                    arrow.style.color = 'black';

                    leftPanel.appendChild(userTab);
                    userSideBar.appendChild(userSideBarItem);
                    userSideBar.appendChild(arrow);
                    userTab.appendChild(userSideBar);
                }
            }

            function createRightPanel(rightPanel: HTMLDivElement, profileData: ProfileData)
            {
                let i = 0;
                const arr: string[][] = [
                    ['昵称: ', profileData.name],
                    ['邮箱: ', profileData.email]
                ];

                for (i = 0; i < arr.length; i++)
                {
                    const userInfoBox = document.createElement('div');
                    const userInfoItem = document.createElement('p');
                    const title = document.createElement('span');
                    const content = document.createElement('span');

                    userInfoBox.style.width = '100%';
                    userInfoBox.style.backgroundColor = 'white';

                    userInfoItem.style.padding = '20px';
                    userInfoItem.style.color = 'black';

                    title.innerText = arr[i][0];
                    title.style.marginRight = '10px';

                    content.innerText = arr[i][1];

                    userInfoItem.appendChild(title);
                    userInfoItem.appendChild(content);
                    userInfoBox.appendChild(userInfoItem);
                    rightPanel.appendChild(userInfoBox);
                }
            }
        }
    };
}

