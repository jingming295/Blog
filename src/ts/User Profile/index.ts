import { SendPost } from '../Send Fetch';
import { UserData } from '../Navigation Bar/interface';
import { ChangePage } from '../Navigation Bar/changePage';
import { ProfileData } from './interface';
import '../../scss/UserProfile/index.scss';
import { ArticleCard } from '../Manage Article Page/interface';
import { HandlePopMsg } from '../Navigation Bar/popMsg';
import { urlconfig } from '../Url Config/config';
import { SHA256 } from '../Crypto/sha256';

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
    handlePopMsg = new HandlePopMsg();
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
                console.log(profileData);
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
                function createChangeImgBtn(userData: UserData): HTMLDivElement
                {
                    const inputFile = document.createElement('input');
                    inputFile.type = 'file';
                    inputFile.className = 'inputFile';
                    inputFile.accept = 'image/*';
                    const changeImgBtn = document.createElement('div');
                    changeImgBtn.className = 'changeImgBtn';
                    changeImgBtn.innerHTML = 'Change Image';
                    changeImgBtn.appendChild(inputFile);
                    let clicked = false;
                    changeImgBtn.onclick = () =>
                    {
                        if (clicked) return;
                        inputFile.click();
                        inputFile.onchange = async () =>
                        {
                            const file = inputFile.files;
                            if (file && file[0])
                            {
                                if (file[0].size > 20 * 1024 * 1024)
                                {
                                    const handlePopMsg = new HandlePopMsg();
                                    handlePopMsg.popMsg('Image size must be less than 20MB');
                                    return;
                                }
                                const sendPost = new SendPost();
                                const data = await sendPost.changeAvatar(userData, file[0], changeImgBtn);
                                if (data)
                                {
                                    localStorage.setItem('UserData', JSON.stringify(data));
                                    const userAvatar = document.querySelector('.userAvatar') as HTMLImageElement;
                                    const userMenuAvatar = document.querySelector('.userMenuAvatar') as HTMLImageElement;
                                    if (userAvatar && userMenuAvatar)
                                    {
                                        userAvatar.src = `${urlconfig.avatarUrl}${data.userData.avatar}`;
                                        userMenuAvatar.src = `${urlconfig.avatarUrl}${data.userData.avatar}`;
                                    }
                                    clicked = true;
                                    const changePage = new ChangePage(true);
                                    changePage.toUserProfile(data.userData.id.toString());
                                }
                            }
                        };
                    };

                    return changeImgBtn;
                }

                const userImgWarp = document.createElement('div');
                userImgWarp.className = 'userImgWarp';
                const userImg = document.createElement('img');


                userImgWarp.style.width = '150px';
                userImgWarp.style.height = '150px';

                userImg.className = 'userImg';
                userImg.src = `${urlconfig.avatarUrl}${avatar}`;
                userImgWarp.appendChild(userImg);

                const userData = localStorage.getItem('UserData');
                if (userData)
                {
                    const parsedUserData = JSON.parse(userData) as UserData;
                    if (parsedUserData.userData.id === profileData.id)
                    {
                        const changeImgBtn = createChangeImgBtn(parsedUserData);
                        userImgWarp.appendChild(changeImgBtn);

                    }
                }

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
                userDesc.textContent = profileData.description;

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
            backgroundDiv.style.backgroundImage = `url(../background/1.jpg)`;

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
                            async function getArticleDataAndCreateRightPanel(isOwner: boolean)
                            {
                                const sendPost = new SendPost();
                                const articleData = await sendPost.getArticleDataByAuthor(profileData.id);
                                if (articleData)
                                {
                                    const rightPanel = document.querySelector('.userProfile-Usertab-rightPanel') as HTMLDivElement;
                                    if (rightPanel)
                                    {
                                        rightPanel.remove();
                                        const rightPanerWrapper = document.querySelector('.userProfile-Usertab-rightPanelWrapper') as HTMLDivElement;
                                        if (rightPanerWrapper)
                                        {
                                            const rightPanel = createPostsRightPanel(articleData, isOwner);
                                            rightPanerWrapper.appendChild(rightPanel);
                                        }
                                    }
                                }
                            }
                            const UserData = localStorage.getItem('UserData');
                            if (UserData)
                            {
                                const parseUserData: UserData = JSON.parse(UserData);
                                if (parseUserData && parseUserData.userData.id === profileData.id)
                                {
                                    await getArticleDataAndCreateRightPanel(true);
                                } else
                                {
                                    await getArticleDataAndCreateRightPanel(false);
                                }
                            } else
                            {
                                await getArticleDataAndCreateRightPanel(false);
                            }
                        }
                    },
                    {
                        name: 'Settings',
                        func: function ()
                        {
                            const rightPanel = document.querySelector('.userProfile-Usertab-rightPanel') as HTMLDivElement;
                            if (rightPanel)
                            {
                                rightPanel.remove();
                                const rightPanerWrapper = document.querySelector('.userProfile-Usertab-rightPanelWrapper') as HTMLDivElement;
                                if (rightPanerWrapper)
                                {
                                    const rightPanel = createSettingRightPanel();
                                    rightPanerWrapper.appendChild(rightPanel);

                                }
                            }
                        }
                    },
                ];

                sideBarItem.forEach((item) =>
                {
                    if (item.name === 'Settings')
                    {
                        const UserData = localStorage.getItem('UserData');
                        if (UserData)
                        {
                            const parseUserData: UserData = JSON.parse(UserData);
                            if (parseUserData && parseUserData.userData.id !== profileData.id)
                            {
                                return;
                            }
                        } else
                        {
                            return;
                        }
                    }
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
                const genderNum = profileData.gender;
                let gender;
                switch (genderNum)
                {
                    case 0:
                        gender = "Secert";
                        break;
                    case 1:
                        gender = "Male";
                        break;
                    case 2:
                        gender = "Female";
                        break;
                    default:
                        gender = "Secert";
                        break;
                }
                let i = 0;
                const arr: string[][] = [
                    ['Name: ', profileData.name],
                    ['Email: ', profileData.email],
                    ['Gender: ', gender]
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

            function createPostsRightPanel(data: ArticleCard[], isOwner: boolean)
            {
                function appearArticleCard(articleData: ArticleCard)
                {
                    function crreateTitleArea()
                    {
                        const titleWrapper = document.createElement('div');
                        const title = document.createElement('div');
                        title.innerHTML = articleData.articleTitle;
                        title.className = 'title';
                        title.onclick = () => { const changePage = new ChangePage(true); changePage.toArticle(articleData.articleID.toString()); };
                        titleWrapper.appendChild(title);
                        return titleWrapper;
                    }

                    function createContentArea()
                    {
                        const contentWrapper = document.createElement('div');
                        const content = document.createElement('div');
                        content.innerHTML = articleData.p;
                        content.className = 'content';
                        contentWrapper.appendChild(content);
                        return contentWrapper;
                    }

                    function createAreaArea()
                    {
                        const areaWrapper = document.createElement('div');
                        const area = document.createElement('div');
                        area.innerHTML = articleData.articleArea;
                        area.className = 'area';
                        areaWrapper.appendChild(area);
                        return areaWrapper;
                    }

                    function createEditDeleteBtn()
                    {
                        const buttonWrapper = document.createElement('div');
                        buttonWrapper.className = 'buttonWrapper';
                        const editBtn = document.createElement('div');
                        const deleteBtn = document.createElement('div');
                        editBtn.innerHTML = 'Edit';
                        editBtn.className = 'editBtn';
                        editBtn.onclick = () => { const changePage = new ChangePage(true); changePage.toEditArticle(articleData.articleID); };
                        deleteBtn.innerHTML = 'Delete';
                        deleteBtn.className = 'deleteBtn';
                        deleteBtn.onclick = () => { sendPost.deleteArticle(articleData.articleID); };
                        buttonWrapper.appendChild(editBtn);
                        buttonWrapper.appendChild(deleteBtn);
                        return buttonWrapper;
                    }
                    const sendPost = new SendPost();
                    const articleCardWrapper = document.createElement('div');
                    articleCardWrapper.className = 'articleCardWrapper';

                    const titleWrapper = crreateTitleArea();
                    const contentWrapper = createContentArea();
                    const areaWrapper = createAreaArea();
                    articleCardWrapper.appendChild(areaWrapper);

                    articleCardWrapper.appendChild(titleWrapper);

                    articleCardWrapper.appendChild(contentWrapper);
                    if (isOwner)
                    {
                        const buttonWrapper = createEditDeleteBtn();
                        articleCardWrapper.appendChild(buttonWrapper);
                    }
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

            function createSettingRightPanel()
            {
                function Navigation()
                {
                    const navigationItems = [{
                        name: 'Information',
                        func: function (navigationItem: HTMLDivElement)
                        {
                            const navigationItemOnSelect = document.querySelectorAll('.navigationItemOnSelect');
                            navigationItemOnSelect.forEach(item =>
                            {
                                item.classList.remove('navigationItemOnSelect');
                            });
                            navigationItem.classList.add('navigationItemOnSelect');

                            const basicSettingsWrapper = document.querySelector('.basicSettingsWrapper') as HTMLDivElement;
                            if (basicSettingsWrapper) return;

                            const settingWrapper = document.querySelector('.settingWrapper') as HTMLDivElement;
                            if (settingWrapper)
                            {
                                settingWrapper.remove();
                            }
                            const rightPanel = document.querySelector('.userProfile-Usertab-rightPanel') as HTMLDivElement;
                            if (rightPanel)
                            {
                                const basicSettings = BasicSettings();
                                if (basicSettings)
                                {
                                    rightPanel.appendChild(basicSettings);
                                }

                            }
                        }
                    },
                    {
                        name: 'Password',
                        func: function (navigationItem: HTMLDivElement)
                        {
                            const navigationItemOnSelect = document.querySelectorAll('.navigationItemOnSelect');
                            navigationItemOnSelect.forEach(item =>
                            {
                                item.classList.remove('navigationItemOnSelect');
                            });
                            navigationItem.classList.add('navigationItemOnSelect');

                            const passwordSettingsWrapper = document.querySelector('.passwordSettingsWrapper') as HTMLDivElement;
                            if (passwordSettingsWrapper) return;

                            const settingWrapper = document.querySelector('.settingWrapper') as HTMLDivElement;
                            if (settingWrapper)
                            {
                                settingWrapper.remove();
                            }
                            const rightPanel = document.querySelector('.userProfile-Usertab-rightPanel') as HTMLDivElement;
                            if (rightPanel)
                            {
                                const passwordSettings = PasswordSettings();
                                if (passwordSettings)
                                {
                                    rightPanel.appendChild(passwordSettings);
                                }

                            }

                        }
                    }];
                    const navigationWrapper = document.createElement('div');
                    navigationWrapper.className = 'navigationWrapper';
                    navigationItems.forEach(item =>
                    {
                        const navigationItem = document.createElement('div');
                        navigationItem.className = 'navigationItem';
                        navigationItem.innerHTML = item.name;
                        if (item.name === 'Information')
                        {
                            navigationItem.classList.add('navigationItemOnSelect');
                        }
                        navigationItem.onclick = () =>
                        {
                            item.func(navigationItem);
                        };
                        navigationWrapper.appendChild(navigationItem);
                    });
                    return navigationWrapper;
                }

                function BasicSettings()
                {
                    
                    function createChangeName(parsedUserData: UserData)
                    {
                        const changeNameWrapper = document.createElement('div');

                        const changeNameInputWrapper = document.createElement('div');
                        changeNameInputWrapper.className = 'commonSettingsInputWrapper';

                        const changeNameTitle = document.createElement('div');
                        const changeNameInput = document.createElement('input');
                        changeNameWrapper.className = 'commonSettingsWrapper';
                        changeNameTitle.className = 'commonSettingsTitle';
                        changeNameInput.className = 'commonSettingsInput';
                        changeNameInput.placeholder = 'Please input your name';
                        changeNameInput.value = parsedUserData.userData.name;
                        changeNameInput.id = 'changeNameInput';
                        changeNameTitle.innerHTML = 'Name';

                        changeNameInputWrapper.appendChild(changeNameInput);
                        changeNameWrapper.appendChild(changeNameTitle);
                        changeNameWrapper.appendChild(changeNameInputWrapper);
                        return changeNameWrapper;
                    }
                    function createChangeGender(parsedUserData: UserData)
                    {
                        const createRadioButton = (id: string, label: string, select: boolean = false) =>
                        {
                            const RadioWrapper = document.createElement('div');

                            RadioWrapper.className = 'radioWrapper';
                            const radioButton = document.createElement('input');
                            radioButton.type = 'radio';
                            radioButton.id = id;
                            radioButton.name = 'gender';
                            radioButton.className = 'radioContainer';
                            radioButton.value = id;

                            // 根据 gender 的值设置 radioButton.checked 的值
                            if (select)
                            {
                                radioButton.checked = true;
                            }

                            const radioLabel = document.createElement('label');
                            radioLabel.innerHTML = label;
                            radioLabel.className = 'radioLabel';
                            radioLabel.setAttribute('for', id);

                            RadioWrapper.appendChild(radioButton);
                            RadioWrapper.appendChild(radioLabel);

                            // 添加点击事件监听器
                            RadioWrapper.addEventListener('click', () =>
                            {
                                radioButton.checked = true;
                            });

                            return RadioWrapper;
                        };

                        const changeGenderWrapper = document.createElement('div');
                        changeGenderWrapper.className = 'changeGenderWrapper';

                        const changeGenderTitle = document.createElement('div');
                        changeGenderTitle.className = 'changeGenderTitle';
                        changeGenderTitle.innerHTML = 'Gender';

                        const radioGroupWrapper = document.createElement('div');
                        radioGroupWrapper.className = 'radioGroupWrapper';

                        const gender = parsedUserData.userData.gender;

                        const secert = createRadioButton('Secert', 'Secert', gender === 0);
                        const male = createRadioButton('Male', 'Male', gender === 1);
                        const female = createRadioButton('Female', 'Female', gender === 2);

                        radioGroupWrapper.appendChild(secert);
                        radioGroupWrapper.appendChild(male);
                        radioGroupWrapper.appendChild(female);

                        changeGenderWrapper.appendChild(changeGenderTitle);
                        changeGenderWrapper.appendChild(radioGroupWrapper);

                        return changeGenderWrapper;

                    }
                    function createChangeUserDescription(parsedUserData: UserData)
                    {
                        const changeUserDescriptionWrapper = document.createElement('div');
                        changeUserDescriptionWrapper.className = 'commonSettingsWrapper';
                        const changeUserDescriptionTitle = document.createElement('div');
                        changeUserDescriptionTitle.className = 'commonSettingsTitle';
                        changeUserDescriptionTitle.innerHTML = 'Description';

                        const changeUserDescriptionInputWrapper = document.createElement('div');
                        changeUserDescriptionInputWrapper.className = 'commonSettingsInputWrapper';

                        const changeUserDescriptionInput = document.createElement('input');
                        changeUserDescriptionInput.className = 'commonSettingsInput';
                        changeUserDescriptionInput.id = 'changeUserDescriptionInput'
                        changeUserDescriptionInput.placeholder = 'Please input your description';

                        changeUserDescriptionInput.value = parsedUserData.userData.userDesc;

                        changeUserDescriptionWrapper.appendChild(changeUserDescriptionTitle);
                        changeUserDescriptionInputWrapper.appendChild(changeUserDescriptionInput);
                        changeUserDescriptionWrapper.appendChild(changeUserDescriptionInputWrapper);
                        return changeUserDescriptionWrapper;
                    }

                    function createButtonSubmit()
                    {
                        const buttonSubmitWrapper = document.createElement('div');
                        buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';
                        const buttonSubmit = document.createElement('div');
                        buttonSubmit.className = 'commomButtonSubmit';
                        buttonSubmit.innerHTML = 'Save';

                        buttonSubmit.onclick = async () =>
                        {
                            const userData = localStorage.getItem('UserData');
                            if (userData)
                            {
                                const parsedUserData: UserData = JSON.parse(userData);
                                const changeNameInput = document.getElementById('changeNameInput') as HTMLInputElement;
                                const changeUserDescriptionInput = document.getElementById('changeUserDescriptionInput') as HTMLInputElement;
                                let selectedGender = document.querySelector('input[name="gender"]:checked');
                                if (selectedGender)
                                {
                                    const name = changeNameInput.value;
                                    const userDesc = changeUserDescriptionInput.value;
                                    const genderString = selectedGender.id;
                                    let gender;
                                    switch (genderString)
                                    {
                                        case 'Secert':
                                            gender = 0;
                                            break;
                                        case 'Male':
                                            gender = 1;
                                            break;
                                        case 'Female':
                                            gender = 2;
                                            break;
                                        default:
                                            gender = 0;
                                    }

                                    const sendPost = new SendPost();
                                    const newUserData = await sendPost.updateUserProfile(parsedUserData, name, gender, userDesc);
                                    if (newUserData)
                                    {
                                        localStorage.setItem('UserData', JSON.stringify(newUserData));
                                        const changePage = new ChangePage(true);
                                        changePage.toUserProfile(newUserData.userData.id.toString());
                                    }
                                }





                            }
                        };

                        buttonSubmitWrapper.appendChild(buttonSubmit);
                        return buttonSubmitWrapper;
                    }

                    const userData = localStorage.getItem('UserData');
                    if (userData)
                    {
                        const parsedUserData: UserData = JSON.parse(userData);
                        const settingWrapper = document.createElement('div');
                        settingWrapper.className = 'settingWrapper';
                        const basicSettingsWrapper = document.createElement('div');
                        basicSettingsWrapper.className = 'basicSettingsWrapper';
                        const changeName = createChangeName(parsedUserData);
                        const changeGender = createChangeGender(parsedUserData);
                        const changeUserDescription = createChangeUserDescription(parsedUserData);
                        const buttonSubmit = createButtonSubmit();

                        basicSettingsWrapper.appendChild(changeName);

                        basicSettingsWrapper.appendChild(changeGender);
                        basicSettingsWrapper.appendChild(changeUserDescription);
                        basicSettingsWrapper.appendChild(buttonSubmit);
                        settingWrapper.appendChild(basicSettingsWrapper);
                        return settingWrapper;
                    } else
                    {
                        const changePage = new ChangePage(true);
                        changePage.to404Page();
                        return;
                    }



                }

                function PasswordSettings()
                {
                    function createPasswordInput()
                    {
                        const changePasswordWrapper = document.createElement('div');

                        const changePasswordInputWrapper = document.createElement('div');
                        changePasswordInputWrapper.className = 'commonSettingsInputWrapper ';

                        const changePasswordTitle = document.createElement('div');
                        const changePasswordInput = document.createElement('input');
                        changePasswordWrapper.className = 'commonSettingsWrapper';
                        changePasswordTitle.className = 'commonSettingsTitle';
                        changePasswordTitle.innerHTML = 'Password';

                        changePasswordInput.className = 'commonSettingsInput';
                        changePasswordInput.placeholder = 'Please input new password';
                        changePasswordInput.type = 'password';
                        changePasswordInput.id = 'changePasswordInput';
                        changePasswordInput.autocomplete = 'new-password';

                        
                        changePasswordWrapper.appendChild(changePasswordTitle);
                        changePasswordInputWrapper.appendChild(changePasswordInput);
                        
                        changePasswordWrapper.appendChild(changePasswordInputWrapper);
                        return changePasswordWrapper;
                    }
                    function createConfPasswordInput()
                    {
                        const changePasswordWrapper = document.createElement('div');

                        const changePasswordInputWrapper = document.createElement('div');
                        changePasswordInputWrapper.className = 'commonSettingsInputWrapper ';

                        const changePasswordTitle = document.createElement('div');
                        const changePasswordInput = document.createElement('input');
                        changePasswordWrapper.className = 'commonSettingsWrapper';
                        changePasswordTitle.className = 'commonSettingsTitle';
                        changePasswordTitle.innerHTML = 'Confirm Password';

                        changePasswordInput.className = 'commonSettingsInput';
                        changePasswordInput.placeholder = 'Please retype your password';
                        changePasswordInput.type = 'password';
                        changePasswordInput.id = 'confChangePasswordInput';
                        changePasswordInput.autocomplete = 'new-password';
                        
                        changePasswordWrapper.appendChild(changePasswordTitle);
                        changePasswordInputWrapper.appendChild(changePasswordInput);
                        
                        changePasswordWrapper.appendChild(changePasswordInputWrapper);
                        return changePasswordWrapper;
                    }

                    function createButtonSubmit()
                    {
                        const buttonSubmitWrapper = document.createElement('div');
                        buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';
                        const buttonSubmit = document.createElement('div');
                        buttonSubmit.className = 'commomButtonSubmit';
                        buttonSubmit.innerHTML = 'Save';

                        buttonSubmit.onclick = async () =>
                        {
                            const userData = localStorage.getItem('UserData');
                            if (userData)
                            {
                                const parsedUserData: UserData = JSON.parse(userData);
                                const passwordInput = document.getElementById('changePasswordInput') as HTMLInputElement;
                                const ConfPasswordInput = document.getElementById('confChangePasswordInput') as HTMLInputElement;

                                const password = passwordInput.value;
                                const confPassword = ConfPasswordInput.value;

                                if (password !== confPassword)
                                {
                                    const handlePopMsg = new HandlePopMsg();
                                    handlePopMsg.popMsg('Password does not match');
                                    return;
                                }
                                const sha256 = new SHA256()
                                const hashedPassword = await sha256.hashPassword(password);
                                const sendPost = new SendPost();

                                const result = await sendPost.updateUserPassword(parsedUserData, hashedPassword);

                                if(result){
                                    const changePage = new ChangePage(true);
                                    changePage.toUserProfile(parsedUserData.userData.id.toString());
                                }


                            }
                        };

                        buttonSubmitWrapper.appendChild(buttonSubmit);
                        return buttonSubmitWrapper;
                    }
                    const settingWrapper = document.createElement('div');
                    settingWrapper.className = 'settingWrapper';
                    const passwordSettingsWrapper = document.createElement('div');
                    passwordSettingsWrapper.className = 'passwordSettingsWrapper';
                    const changePassword = createPasswordInput();
                    const confChangePassword = createConfPasswordInput();
                    const buttonSubmit = createButtonSubmit();
                    passwordSettingsWrapper.appendChild(changePassword);
                    passwordSettingsWrapper.appendChild(confChangePassword);
                    passwordSettingsWrapper.appendChild(buttonSubmit);
                    settingWrapper.appendChild(passwordSettingsWrapper);
                    return settingWrapper;
                }

                const rightPanel = document.createElement('div');
                rightPanel.className = 'userProfile-Usertab-rightPanel';

                const navigation = Navigation();
                const basicSettings = BasicSettings();
                rightPanel.appendChild(navigation);

                if (basicSettings)
                {
                    rightPanel.appendChild(basicSettings);
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

