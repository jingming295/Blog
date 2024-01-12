import { ChangePage } from "../Navigation Bar/changePage";
import { UserData } from "../Navigation Bar/interface";
import { SendPost } from "../Send Fetch";
import { UserVerification } from "../User Verification";
import '../../scss/AdminPage/index.scss';
import { NavigationProgress } from "../Create Navigation Progress";
import { ColorScheme, setting_loginandregister } from "../Send Fetch/interface";
import { ArticleSubArea } from "./interface";
import { NavRelated } from "../Navigation Bar";

export class AdminPage
{
    private navigationProgress = new NavigationProgress();
    async init()
    {
        const userVerification = new UserVerification();
        userVerification.verification();
        const userData = localStorage.getItem('UserData');
        if (userData)
        {
            this.navigationProgress.start();
            const parseUserData = JSON.parse(userData) as UserData;
            if (parseUserData.userData.class !== 3)
            {
                const changePage = new ChangePage();
                await changePage.toIndex();
                this.navigationProgress.end();
                return;
            }
            const sendPost = new SendPost();
            const result = await sendPost.KeepLogin(parseUserData);
            if (!result)
            {
                const changePage = new ChangePage();
                await changePage.toIndex();
                this.navigationProgress.end();
                return;
            }
            if (parseUserData.userData.class !== 3)
            {
                const changePage = new ChangePage();
                await changePage.toIndex();
                this.navigationProgress.end();
                return;
            }

            const contentDiv = document.createElement('contentDiv');
            contentDiv.className = 'contentDiv';
            contentDiv.id = 'contentDiv';
            contentDiv.style.paddingLeft = '0px';
            contentDiv.style.paddingRight = '0px';

            const adminPageWrapper = this.CreateAdminPage();
            contentDiv.appendChild(adminPageWrapper);

            document.body.appendChild(contentDiv);
            this.navigationProgress.end();
        }

    }

    private CreateAdminPage()
    {
        const adminPageWrapper = document.createElement('div');
        adminPageWrapper.className = 'adminPageWrapper';
        adminPageWrapper.id = 'adminPageWrapper';

        const sideNavBarWrapper = this.createSideNavBar();
        const mainMain = this.MainMain();

        adminPageWrapper.appendChild(sideNavBarWrapper);

        adminPageWrapper.appendChild(mainMain);

        return adminPageWrapper;
    }


    private createSideNavBar()
    {
        const sideNavBarWrapper = document.createElement('div');
        sideNavBarWrapper.className = 'sideNavBarWrapper';
        sideNavBarWrapper.id = 'sideNavBarWrapper';

        const sideBarMainPageWrapper = this.sideBarMain();
        const sideBarSettingWrapper = this.sideBarSetting();

        sideNavBarWrapper.appendChild(sideBarMainPageWrapper);
        sideNavBarWrapper.appendChild(sideBarSettingWrapper);

        return sideNavBarWrapper;
    }

    private sideBarMain()
    {
        const sideBarMainPageWrapper = document.createElement('div');

        const sideBarMainPageButton = document.createElement('div');

        sideBarMainPageWrapper.classList.add('adminPageSideBarCommonBtnWrapper');

        sideBarMainPageButton.classList.add('adminPageSideBarCommonBtnActive');

        sideBarMainPageButton.innerText = 'Main';

        sideBarMainPageButton.onclick = (event) =>
        {
            const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');

            activeElements.forEach((element) =>
            {
                element.classList.remove('adminPageSideBarCommonBtnActive');
                element.classList.add('adminPageSideBarCommonBtn');
            });

            sideBarMainPageButton.classList.add('adminPageSideBarCommonBtnActive');
            this.addRippleEffect(sideBarMainPageButton, event);

            const adminPageWrapper = document.getElementById('adminPageWrapper');
            const mainMain = this.MainMain();
            adminPageWrapper?.appendChild(mainMain);

        };

        sideBarMainPageWrapper.appendChild(sideBarMainPageButton);

        return sideBarMainPageWrapper;
    }

    private sideBarSetting()
    {
        const sideBarSettingWrapper = document.createElement('div');

        const sideBarSettingButton = document.createElement('div');

        const SideBarSettingSubItem = this.SideBarSettingSubItem();

        sideBarSettingWrapper.classList.add('adminPageSideBarCommonBtnWrapper');

        sideBarSettingButton.classList.add('adminPageSideBarCommonBtn');

        sideBarSettingButton.innerText = 'Settings';

        sideBarSettingButton.onclick = (event) =>
        {

            const currentButtonHeight = SideBarSettingSubItem.style.height;
            const children = SideBarSettingSubItem.children;
            const totalHeight = children.length * 50;
            SideBarSettingSubItem.style.height = currentButtonHeight === `${totalHeight}px` ? '0' : `${totalHeight}px`;
            this.addRippleEffect(sideBarSettingButton, event);
        };

        sideBarSettingWrapper.appendChild(sideBarSettingButton);
        sideBarSettingWrapper.appendChild(SideBarSettingSubItem);

        return sideBarSettingWrapper;
    }

    private SideBarSettingSubItem()
    {
        const navigationProgress = new NavigationProgress();
        const loginAndRegister = () =>
        {
            const sideBarParameterChildButton = document.createElement('div');
            sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtn');
            sideBarParameterChildButton.classList.add('subItemBtn');

            sideBarParameterChildButton.innerText = 'Login And Register';

            sideBarParameterChildButton.onclick = async (event) =>
            {
                navigationProgress.start();
                const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');

                activeElements.forEach((element) =>
                {
                    element.classList.remove('adminPageSideBarCommonBtnActive');
                    element.classList.add('adminPageSideBarCommonBtn');
                });

                sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtnActive');
                this.addRippleEffect(sideBarParameterChildButton, event);
                const adminPageWrapper = document.getElementById('adminPageWrapper');
                const mainLoginAndRegister = await this.MainLoginAndRegisterSetting();
                const wrapper = document.getElementById('MainWrapper');
                if (wrapper)
                {
                    wrapper.remove();
                }
                adminPageWrapper?.appendChild(mainLoginAndRegister);
                navigationProgress.end();
            };
            return sideBarParameterChildButton;
        };

        const Email = () =>
        {
            const sideBarParameterChildButton = document.createElement('div');
            sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtn');
            sideBarParameterChildButton.classList.add('subItemBtn');

            sideBarParameterChildButton.innerText = 'Email';

            sideBarParameterChildButton.onclick = async (event) =>
            {
                navigationProgress.start();
                const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');

                activeElements.forEach((element) =>
                {
                    element.classList.remove('adminPageSideBarCommonBtnActive');
                    element.classList.add('adminPageSideBarCommonBtn');
                });

                sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtnActive');
                this.addRippleEffect(sideBarParameterChildButton, event);
                const adminPageWrapper = document.getElementById('adminPageWrapper');
                const emailWrapper = await this.MainEmail();
                const wrapper = document.getElementById('MainWrapper');
                if (wrapper)
                {
                    wrapper.remove();
                }
                adminPageWrapper?.appendChild(emailWrapper);
                navigationProgress.end();
            };
            return sideBarParameterChildButton;
        };

        const colorScheme = () =>
        {
            const sideBarParameterChildButton = document.createElement('div');
            sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtn');
            sideBarParameterChildButton.classList.add('subItemBtn');

            sideBarParameterChildButton.innerText = 'Color Scheme';

            sideBarParameterChildButton.onclick = async (event) =>
            {
                navigationProgress.start();
                const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');

                activeElements.forEach((element) =>
                {
                    element.classList.remove('adminPageSideBarCommonBtnActive');
                    element.classList.add('adminPageSideBarCommonBtn');
                });

                sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtnActive');
                this.addRippleEffect(sideBarParameterChildButton, event);
                const adminPageWrapper = document.getElementById('adminPageWrapper');
                const colorScheme = await this.MainColorScheme();
                const wrapper = document.getElementById('MainWrapper');
                if (wrapper)
                {
                    wrapper.remove();
                }
                adminPageWrapper?.appendChild(colorScheme);
                navigationProgress.end();
            };
            return sideBarParameterChildButton;
        };

        const Area = () =>
        {
            const sideBarParameterChildButton = document.createElement('div');
            sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtn');
            sideBarParameterChildButton.classList.add('subItemBtn');

            sideBarParameterChildButton.innerText = 'Article Area';

            sideBarParameterChildButton.onclick = async (event) =>
            {
                const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');

                activeElements.forEach((element) =>
                {
                    element.classList.remove('adminPageSideBarCommonBtnActive');
                    element.classList.add('adminPageSideBarCommonBtn');
                });

                sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtnActive');
                this.addRippleEffect(sideBarParameterChildButton, event);
                const adminPageWrapper = document.getElementById('adminPageWrapper');
                const area = await this.MainArea();
                const wrapper = document.getElementById('MainWrapper');
                if (wrapper)
                {
                    wrapper.remove();
                }
                adminPageWrapper?.appendChild(area);

            };
            return sideBarParameterChildButton;
        };

        const subArea = () =>
        {
            const sideBarParameterChildButton = document.createElement('div');
            sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtn');
            sideBarParameterChildButton.classList.add('subItemBtn');

            sideBarParameterChildButton.innerText = 'Article Sub Area';

            sideBarParameterChildButton.onclick = async (event) =>
            {
                navigationProgress.start();
                const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');

                activeElements.forEach((element) =>
                {
                    element.classList.remove('adminPageSideBarCommonBtnActive');
                    element.classList.add('adminPageSideBarCommonBtn');
                });

                sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtnActive');
                this.addRippleEffect(sideBarParameterChildButton, event);
                const adminPageWrapper = document.getElementById('adminPageWrapper');
                const subArea = await this.MainSubArea();
                const wrapper = document.getElementById('MainWrapper');
                if (wrapper)
                {
                    wrapper.remove();
                }
                adminPageWrapper?.appendChild(subArea);
                navigationProgress.end();
            };
            return sideBarParameterChildButton;
        };

        const sideBarParameterChildWrapper = document.createElement('div');

        sideBarParameterChildWrapper.classList.add('adminPageSideBarCommonBtnWrapper');
        sideBarParameterChildWrapper.classList.add('subItemBtnWrapper');

        const LoginAndRegisterBtn = loginAndRegister();
        const EmailBtn = Email();
        const ColorSchemeBtn = colorScheme();
        const AreaBtn = Area();
        const SubAreaBtn = subArea();

        sideBarParameterChildWrapper.appendChild(LoginAndRegisterBtn);
        sideBarParameterChildWrapper.appendChild(EmailBtn);
        sideBarParameterChildWrapper.appendChild(ColorSchemeBtn);
        sideBarParameterChildWrapper.appendChild(AreaBtn);
        sideBarParameterChildWrapper.appendChild(SubAreaBtn);
        return sideBarParameterChildWrapper;
    }

    private addRippleEffect(target: HTMLElement, e: MouseEvent)
    {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');

        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        const x = e.clientX - rect.left - window.scrollX - size / 2;
        const y = e.clientY - rect.top - window.scrollY - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        target.appendChild(ripple);

        ripple.addEventListener('animationend', () =>
        {
            ripple.remove();
        });
    }

    private MainMain()
    {
        const wrapper = document.getElementById('MainWrapper');
        if (wrapper)
        {
            wrapper.remove();
        }
        const MainWrapper = document.createElement('div');
        MainWrapper.className = 'MainWrapper';
        MainWrapper.id = 'MainWrapper';

        const Title = document.createElement('div');

        Title.className = 'Title';

        Title.innerText = 'Nothings to display now';

        MainWrapper.appendChild(Title);

        return MainWrapper;
    }

    private async MainLoginAndRegisterSetting()
    {
        function createButtonSubmit()
        {
            const buttonSubmitWrapper = document.createElement('div');
            buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';
            const buttonSubmit = document.createElement('div');
            buttonSubmit.className = 'commomButtonSubmit';
            buttonSubmit.innerHTML = 'Save';

            buttonSubmit.onclick = async () =>
            {
                const loginAndRegisterSetting: setting_loginandregister = {
                    id: id,
                    allowUserRegis: allowNewUserRegister,
                    emailVerification: emailVerification
                };
                const sendPost = new SendPost();
                await sendPost.updateLoginAndRegisterSettings(loginAndRegisterSetting);
            };

            buttonSubmitWrapper.appendChild(buttonSubmit);
            return buttonSubmitWrapper;
        }

        const sendPost = new SendPost();

        const LoginAndRegisterSetting = await sendPost.getLoginAndRegisterSettings();
        const MainWrapper = document.createElement('div');
        MainWrapper.className = 'MainWrapper';
        MainWrapper.id = 'MainWrapper';

        if (!LoginAndRegisterSetting) return MainWrapper;

        const id = LoginAndRegisterSetting.id;
        let allowNewUserRegister = LoginAndRegisterSetting.allowUserRegis;
        let emailVerification = LoginAndRegisterSetting.emailVerification;

        const Title = document.createElement('div');

        Title.className = 'Title';

        Title.innerText = 'Login And Register';

        const AllowNewUserToRegisterItem = this.CreateSwitchOption(
            'Allow new users to register',
            'If this option is off, new users will not be able to register',
            allowNewUserRegister,
            (newValue: number) =>
            {
                allowNewUserRegister = newValue;
            }
        );

        const EmailVerification = this.CreateSwitchOption(
            'Email Verification',
            'After the user registers, the system will send an email to the user to verify the email address. Please make sure that email setting is correct',
            emailVerification,
            (newValue: number) =>
            {
                emailVerification = newValue;
            }
        );

        const buttonSubmitWrapper = createButtonSubmit();

        MainWrapper.appendChild(Title);
        MainWrapper.appendChild(AllowNewUserToRegisterItem);
        MainWrapper.appendChild(EmailVerification);
        MainWrapper.appendChild(buttonSubmitWrapper);


        return MainWrapper;

    }

    private async MainEmail()
    {

        function createButtonSubmit()
        {
            const buttonSubmitWrapper = document.createElement('div');
            buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';
            const buttonSubmit = document.createElement('div');
            buttonSubmit.className = 'commomButtonSubmit';
            buttonSubmit.innerHTML = 'Save';

            const buttonSendTestEmail = document.createElement('div');
            buttonSendTestEmail.className = 'commonButtonSecondSubmit';
            buttonSendTestEmail.innerHTML = 'Send Test Email';

            buttonSendTestEmail.onclick = async () =>
            {
                const sendPost = new SendPost();
                await sendPost.sendTestEmail(TestEmailAddress);
            };

            buttonSubmit.onclick = async () =>
            {
                if (!EmailSetting) return;
                const sendPost = new SendPost();
                await sendPost.updateEmailSettings(EmailSetting);
            };

            buttonSubmitWrapper.appendChild(buttonSendTestEmail);
            buttonSubmitWrapper.appendChild(buttonSubmit);

            return buttonSubmitWrapper;
        }

        const MainWrapper = document.createElement('div');
        MainWrapper.className = 'MainWrapper';
        MainWrapper.id = 'MainWrapper';

        const sendPost = new SendPost();

        const EmailSetting = await sendPost.getEmailSettings();
        if (!EmailSetting) return MainWrapper;
        let TestEmailAddress = '';

        const Title = document.createElement('div');
        Title.className = 'Title';
        Title.innerText = 'Email';

        const senderNameInput = this.CreateInputTextOption(
            `Sender Name`,
            `The sender's name as shown in the email`,
            EmailSetting.senderName,
            (newValue: string) =>
            {
                if (EmailSetting)
                    EmailSetting.senderName = newValue;
            }
        );

        const senderEmailInput = this.CreateInputTextOption(
            `Sender Email`,
            `The sender's email address`,
            EmailSetting.senderEmail,
            (newValue: string) =>
            {
                if (EmailSetting)
                    EmailSetting.senderEmail = newValue;
            }
        );

        const smtpServerInput = this.CreateInputTextOption(
            `SMTP Server`,
            `The SMTP server address`,
            EmailSetting.smtpServer,
            (newValue: string) =>
            {
                if (EmailSetting)
                    EmailSetting.smtpServer = newValue;
            }
        );

        const smtpPortInput = this.CreateInputTextOption(
            `SMTP Port`,
            `The SMTP port`,
            EmailSetting.smtpPort || 0,
            (newValue: string) =>
            {
                if (EmailSetting)
                    EmailSetting.smtpPort = parseInt(newValue);
            }
        );

        const smtpUsernameInput = this.CreateInputTextOption(
            `SMTP Username`,
            `SMTP email`,
            EmailSetting.smtpUsername,
            (newValue: string) =>
            {
                if (EmailSetting)
                    EmailSetting.smtpUsername = newValue;
            }
        );

        const smtpPasswordInput = this.CreateInputPasswordOption(
            `SMTP Password`,
            `The SMTP password`,
            EmailSetting.smtpPassword,
            (newValue: string) =>
            {
                if (EmailSetting)
                    EmailSetting.smtpPassword = newValue;
            }
        );

        const replyEmailInput = this.CreateInputTextOption(
            `Reply Email`,
            `The reply email address`,
            EmailSetting.replyEmail,
            (newValue: string) =>
            {
                if (EmailSetting)
                    EmailSetting.replyEmail = newValue;
            }
        );

        const forceSSL = this.CreateSwitchOption(
            'Force SSL',
            'If turned on, the system uses port 465 with SSL for SMTP. If turned off, it uses the specified SMTP Port with TLS for encryption.',
            EmailSetting.forceSSL,
            (newValue: number) =>
            {
                if (EmailSetting)
                    EmailSetting.forceSSL = newValue;
            }
        );

        const testEmailAddressInput = this.CreateInputTextOption(
            `Test Email Address`,
            `The email address to send the test email to`,
            TestEmailAddress,
            (newValue: string) =>
            {
                TestEmailAddress = newValue;
            }
        );

        const buttonSubmitWrapper = createButtonSubmit();

        MainWrapper.appendChild(Title);
        MainWrapper.appendChild(senderNameInput);
        MainWrapper.appendChild(senderEmailInput);
        MainWrapper.appendChild(smtpServerInput);
        MainWrapper.appendChild(smtpPortInput);
        MainWrapper.appendChild(smtpUsernameInput);
        MainWrapper.appendChild(smtpPasswordInput);
        MainWrapper.appendChild(replyEmailInput);
        MainWrapper.appendChild(forceSSL);
        MainWrapper.appendChild(testEmailAddressInput);
        MainWrapper.appendChild(buttonSubmitWrapper);
        return MainWrapper;

    }

    private async MainColorScheme()
    {

        function displayColorSchemeTitle()
        {
            const colorSchemeTitleWrapper = document.createElement('tr');

            colorSchemeTitleWrapper.className = 'commonTitleWrapper';

            const colorSchemeTitle = document.createElement('th');
            colorSchemeTitle.className = 'commonTitle';
            colorSchemeTitle.innerText = 'Color Scheme';

            const tagSamle = document.createElement('th');

            tagSamle.className = 'commonTitle';
            tagSamle.innerText = 'Tag Example';

            const actionTitle = document.createElement('th');

            actionTitle.className = 'commonTitle';
            actionTitle.innerText = 'Action';

            colorSchemeTitleWrapper.appendChild(colorSchemeTitle);
            colorSchemeTitleWrapper.appendChild(tagSamle);
            colorSchemeTitleWrapper.appendChild(actionTitle);

            return colorSchemeTitleWrapper;
        }

        function createColorSchemeItem(colorScheme: ColorScheme)
        {
            function createColorWrapper()
            {
                const colorWrapper = document.createElement('td');
                colorWrapper.className = 'colorWrapper';

                const colorGroupWrapper = document.createElement('div');
                colorGroupWrapper.className = 'colorGroupWrapper';

                const fontColor = document.createElement('div');
                const backgroundColor = document.createElement('div');
                fontColor.className = 'fontColor';
                backgroundColor.className = 'backgroundColor';

                fontColor.style.backgroundColor = colorScheme.textColor;
                backgroundColor.style.backgroundColor = colorScheme.backgroundColor;

                colorGroupWrapper.appendChild(fontColor);
                colorGroupWrapper.appendChild(backgroundColor);
                colorWrapper.appendChild(colorGroupWrapper);

                return colorWrapper;
            }
            function createTagExampleWrapper()
            {
                const tagtd = document.createElement('td');
                const tagExampleWrapper = document.createElement('div');
                tagExampleWrapper.className = 'tagExampleWrapper';

                const tagExample = document.createElement('div');
                tagExample.className = 'tagExample';
                tagExample.innerText = 'Tag Example';

                tagExample.style.color = colorScheme.textColor;
                tagExample.style.backgroundColor = colorScheme.backgroundColor;

                tagExampleWrapper.appendChild(tagExample);
                tagtd.appendChild(tagExampleWrapper);
                return tagtd;
            }

            function createDeletebtn()
            {
                const actiontd = document.createElement('td');
                const actionWrapper = document.createElement('div');

                actionWrapper.className = 'actionWrapper';

                const deleteBtnWrapper = document.createElement('div');

                deleteBtnWrapper.className = 'commonBtnWrapper';

                const deleteBtn = document.createElement('div');

                deleteBtn.className = 'commonBtn';
                deleteBtn.innerText = '🗑️';

                deleteBtnWrapper.onclick = async () =>
                {
                    const sendPost = new SendPost();
                    const result = await sendPost.deleteColorScheme(colorScheme.id);
                    if (result)
                    {
                        colorSchemeItemWrapper.remove();
                    }
                };

                deleteBtnWrapper.appendChild(deleteBtn);
                actionWrapper.appendChild(deleteBtnWrapper);
                actiontd.appendChild(actionWrapper);
                return actiontd;
            }
            const colorSchemeItemWrapper = document.createElement('tr');
            colorSchemeItemWrapper.className = 'commonItemWrapper';

            const colorWrapper = createColorWrapper();
            const tagExampleWrapper = createTagExampleWrapper();
            const actionWrapper = createDeletebtn();
            colorSchemeItemWrapper.appendChild(colorWrapper);
            colorSchemeItemWrapper.appendChild(tagExampleWrapper);
            colorSchemeItemWrapper.appendChild(actionWrapper);

            return colorSchemeItemWrapper;
        }


        function createAddColorSchemeBtn()
        {
            const buttonSubmitWrapper = document.createElement('div');
            buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';

            buttonSubmitWrapper.style.justifyContent = 'flex-start';

            buttonSubmitWrapper.style.paddingLeft = '20%';

            const buttonAddColorScheme = document.createElement('div');
            buttonAddColorScheme.className = 'commonButtonSecondSubmit';
            buttonAddColorScheme.innerHTML = 'Add Color Scheme';

            buttonAddColorScheme.onclick = async () =>
            {
                const addColorScheme = document.querySelector('.commonFullScreenWrapper') as HTMLDivElement;
                if (addColorScheme)
                {
                    addColorScheme.classList.add('commonFullScreenMainWrapperActive');
                }

            };



            buttonSubmitWrapper.appendChild(buttonAddColorScheme);

            return buttonSubmitWrapper;
        }

        function createAddColorScheme()
        {

            function createtColorPlatte(title: string, color: string, onChange: (newValue: string) => void)
            {
                const colorPlatteWrapper = document.createElement('div');

                colorPlatteWrapper.className = 'commonItemWrapper';

                const colorPlatteTitle = document.createElement('div');

                colorPlatteTitle.className = 'commonTitle';
                colorPlatteTitle.innerText = title;

                const colorInput = document.createElement('input');
                colorInput.className = 'commonInput';
                colorInput.type = 'text';
                colorInput.value = color;

                const colorPlatteInput = document.createElement('input');
                colorPlatteInput.className = 'colorPlatteInput';
                colorPlatteInput.type = 'color';
                colorPlatteInput.value = color;

                colorPlatteInput.oninput = () =>
                {
                    colorInput.value = colorPlatteInput.value;
                    onChange(colorPlatteInput.value);
                };

                colorInput.oninput = () =>
                {
                    colorPlatteInput.value = colorInput.value;
                    onChange(colorPlatteInput.value);
                };

                colorPlatteWrapper.appendChild(colorPlatteTitle);
                colorPlatteWrapper.appendChild(colorInput);
                colorPlatteWrapper.appendChild(colorPlatteInput);
                return colorPlatteWrapper;
            }

            function CreateSample()
            {
                const sampleWrapper = document.createElement('div');

                sampleWrapper.className = 'sampleWrapper';

                const tagExample = document.createElement('div');
                tagExample.className = 'colorScheme-tagExample';

                tagExample.innerText = 'Tag Example';

                sampleWrapper.appendChild(tagExample);


                return sampleWrapper;
            }

            function createButtonSubmit()
            {
                const buttonSubmitWrapper = document.createElement('div');
                buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';

                const buttonSubmit = document.createElement('div');
                buttonSubmit.className = 'commomButtonSubmit';
                buttonSubmit.innerHTML = 'Save';

                const buttonCancel = document.createElement('div');
                buttonCancel.className = 'commonButtonSecondSubmit';
                buttonCancel.innerHTML = 'Cancel';

                buttonCancel.onclick = async () =>
                {
                    addColorSchemeWrapper.classList.remove('commonFullScreenMainWrapperActive');
                };

                buttonSubmit.onclick = async () =>
                {
                    const sendPost = new SendPost();
                    const result = await sendPost.addColorScheme(textColor, backgroundColor);
                    if (result)
                    {
                        const colorSchemeItemWrapper = createColorSchemeItem({
                            id: result.id,
                            textColor: textColor,
                            backgroundColor: backgroundColor
                        });
                        colorSchemeWrapper.appendChild(colorSchemeItemWrapper);
                        addColorSchemeWrapper.classList.remove('commonFullScreenMainWrapperActive');
                    }
                };

                buttonSubmitWrapper.appendChild(buttonCancel);
                buttonSubmitWrapper.appendChild(buttonSubmit);

                return buttonSubmitWrapper;
            }

            let textColor: string = `#ffffff`;
            let backgroundColor: string = `#000000`;
            const addColorSchemeWrapper = document.createElement('div');
            addColorSchemeWrapper.className = 'commonFullScreenWrapper';

            const colorSchemeMainWrapper = document.createElement('div');
            colorSchemeMainWrapper.className = 'commonFullScreenMainWrapper';
            colorSchemeMainWrapper.style.width = '80%';

            const inputAreaWrapper = document.createElement('div');

            inputAreaWrapper.className = 'inputAreaWrapper';

            const textColorPlatte = createtColorPlatte(
                `Text Color`,
                textColor,
                (newValue: string) =>
                {
                    textColor = newValue;
                    const tagExample = document.querySelector('.colorScheme-tagExample') as HTMLDivElement;
                    if (tagExample)
                    {
                        tagExample.style.color = textColor;
                    }
                }
            );

            const backgroundColorPlatte = createtColorPlatte(
                `Background Color`,
                backgroundColor,
                (newValue: string) =>
                {
                    backgroundColor = newValue;
                    const tagExample = document.querySelector('.colorScheme-tagExample') as HTMLDivElement;
                    if (tagExample)
                    {
                        tagExample.style.backgroundColor = backgroundColor;
                    }
                }
            );

            const sampleWrapper = CreateSample();
            const buttonSubmitWrapper = createButtonSubmit();

            inputAreaWrapper.appendChild(textColorPlatte);
            inputAreaWrapper.appendChild(backgroundColorPlatte);
            inputAreaWrapper.appendChild(sampleWrapper);
            colorSchemeMainWrapper.appendChild(inputAreaWrapper);
            colorSchemeMainWrapper.appendChild(buttonSubmitWrapper);

            addColorSchemeWrapper.appendChild(colorSchemeMainWrapper);


            return addColorSchemeWrapper;
        }


        const MainWrapper = document.createElement('div');
        MainWrapper.className = 'MainWrapper';
        MainWrapper.id = 'MainWrapper';

        const sendPost = new SendPost();
        const colorScheme = await sendPost.getColorScheme();
        if (!colorScheme) return MainWrapper;

        const Title = document.createElement('div');
        Title.className = 'Title';
        Title.innerText = 'Color Scheme';


        const colorSchemeWrapper = document.createElement('table');
        colorSchemeWrapper.className = 'commonTableWrapper';
        const colorSchemeTitleWrapper = displayColorSchemeTitle();



        colorSchemeWrapper.appendChild(colorSchemeTitleWrapper);

        colorScheme.forEach((colorScheme) =>
        {
            const colorSchemeItemWrapper = createColorSchemeItem(colorScheme);
            colorSchemeWrapper.appendChild(colorSchemeItemWrapper);
        });

        const addColorSchemeBtn = createAddColorSchemeBtn();
        const addColorScheme = createAddColorScheme();
        MainWrapper.appendChild(Title);
        MainWrapper.appendChild(colorSchemeWrapper);
        MainWrapper.appendChild(addColorSchemeBtn);
        MainWrapper.appendChild(addColorScheme);

        return MainWrapper;
    }

    private async MainArea()
    {
        function displayAreaTitle()
        {
            const TitleWrapper = document.createElement('tr');

            TitleWrapper.className = 'commonTitleWrapper';

            const colorSchemeTitle = document.createElement('th');
            colorSchemeTitle.className = 'commonTitle';
            colorSchemeTitle.innerText = 'ID';

            const name = document.createElement('th');

            name.className = 'commonTitle';
            name.innerText = 'Area Name';

            const actionTitle = document.createElement('th');

            actionTitle.className = 'commonTitle';
            actionTitle.innerText = 'Action';

            TitleWrapper.appendChild(colorSchemeTitle);
            TitleWrapper.appendChild(name);
            TitleWrapper.appendChild(actionTitle);

            return TitleWrapper;
        }

        function createAreaItem(area: { id: number; name: string; })
        {
            function createIdWrapper()
            {
                const idWrapper = document.createElement('td');
                idWrapper.innerText = area.id.toString();
                return idWrapper;
            }

            function createEditWrapper(onchange: (newValue: string) => void)
            {
                const editWrapper = document.createElement('td');
                const inputText = document.createElement('input');
                inputText.className = 'commonInput';
                inputText.value = area.name;
                editWrapper.appendChild(inputText);

                inputText.oninput = () =>
                {
                    onchange(inputText.value);
                };

                return editWrapper;
            }

            function createBtn()
            {
                const actiontd = document.createElement('td');
                const actionWrapper = document.createElement('div');

                actionWrapper.className = 'actionWrapper';

                const saveBtnWrapper = document.createElement('div');
                saveBtnWrapper.className = 'commonBtnWrapper';
                saveBtnWrapper.onclick = async () =>
                {
                    const sendPost = new SendPost();
                    const result = await sendPost.updateBigArea(area.id, areaName);

                    if (result)
                    {
                        const navbar = document.getElementById('navigationBar') as HTMLDivElement;

                        if (navbar)
                        {
                            navbar.remove();
                            const navRelated = new NavRelated();
                            await navRelated.init();
                        }
                    }
                };

                const saveBtn = document.createElement('div');
                saveBtn.className = 'commonBtn';
                saveBtn.innerText = '💾';

                const deleteBtnWrapper = document.createElement('div');
                deleteBtnWrapper.className = 'commonBtnWrapper';
                deleteBtnWrapper.onclick = async () =>
                {
                    const sendPost = new SendPost();
                    const result = await sendPost.deleteBigArea(area.id);
                    if (result)
                    {
                        AreaItemWrapper.remove();
                        const navbar = document.getElementById('navigationBar') as HTMLDivElement;

                        if (navbar)
                        {
                            navbar.remove();
                            const navRelated = new NavRelated();
                            await navRelated.init();
                        }
                    }
                };

                const deleteBtn = document.createElement('div');

                deleteBtn.className = 'commonBtn';
                deleteBtn.innerText = '🗑️';

                saveBtnWrapper.appendChild(saveBtn);
                deleteBtnWrapper.appendChild(deleteBtn);
                actionWrapper.appendChild(saveBtnWrapper);
                actionWrapper.appendChild(deleteBtnWrapper);
                actiontd.appendChild(actionWrapper);
                return actiontd;
            }
            let areaName = area.name;
            const AreaItemWrapper = document.createElement('tr');
            AreaItemWrapper.className = 'commonItemWrapper';

            const IdWrapper = createIdWrapper();
            const editWrapper = createEditWrapper((newValue: string) => { areaName = newValue; });
            const actionWrapper = createBtn();
            AreaItemWrapper.appendChild(IdWrapper);
            AreaItemWrapper.appendChild(editWrapper);
            AreaItemWrapper.appendChild(actionWrapper);

            return AreaItemWrapper;
        }

        function createAddAreaBtn()
        {
            const buttonSubmitWrapper = document.createElement('div');
            buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';

            buttonSubmitWrapper.style.justifyContent = 'flex-start';

            buttonSubmitWrapper.style.paddingLeft = '20%';

            const buttonAddColorScheme = document.createElement('div');
            buttonAddColorScheme.className = 'commonButtonSecondSubmit';
            buttonAddColorScheme.innerHTML = 'Add Area';

            buttonAddColorScheme.onclick = async () =>
            {
                const addColorScheme = document.querySelector('.commonFullScreenWrapper') as HTMLDivElement;
                if (addColorScheme)
                {
                    addColorScheme.classList.add('commonFullScreenMainWrapperActive');
                }

            }



            buttonSubmitWrapper.appendChild(buttonAddColorScheme);

            return buttonSubmitWrapper;
        }

        function createAddArea()
        {

            function createAreaInput(title: string, onChange: (newValue: string) => void)
            {
                const commonItemWrapper = document.createElement('div');

                commonItemWrapper.className = 'commonItemWrapper';

                const commonTitle = document.createElement('div');

                commonTitle.className = 'commonTitle';
                commonTitle.innerText = title;

                const areaInput = document.createElement('input');
                areaInput.className = 'commonInput';
                areaInput.type = 'text';


                areaInput.oninput = () =>
                {
                    onChange(areaInput.value);
                };

                commonItemWrapper.appendChild(commonTitle);
                commonItemWrapper.appendChild(areaInput);
                return commonItemWrapper;
            }

            function createButtonSubmit()
            {
                const buttonSubmitWrapper = document.createElement('div');
                buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';

                const buttonSubmit = document.createElement('div');
                buttonSubmit.className = 'commomButtonSubmit';
                buttonSubmit.innerHTML = 'Add';

                const buttonCancel = document.createElement('div');
                buttonCancel.className = 'commonButtonSecondSubmit';
                buttonCancel.innerHTML = 'Cancel';

                buttonCancel.onclick = async () =>
                {
                    addColorSchemeWrapper.classList.remove('commonFullScreenMainWrapperActive');
                };

                buttonSubmit.onclick = async () =>
                {
                    const sendPost = new SendPost();
                    const result = await sendPost.addBigArea(areaName);
                    if (result)
                    {
                        const colorSchemeItemWrapper = createAreaItem({
                            id: result.id,
                            name: areaName
                        });
                        AreaWrapper.appendChild(colorSchemeItemWrapper);
                        addColorSchemeWrapper.classList.remove('commonFullScreenMainWrapperActive');


                        const navbar = document.getElementById('navigationBar') as HTMLDivElement;

                        if (navbar)
                        {
                            navbar.remove();
                            const navRelated = new NavRelated();
                            await navRelated.init();
                        }
                    }
                };

                buttonSubmitWrapper.appendChild(buttonCancel);
                buttonSubmitWrapper.appendChild(buttonSubmit);

                return buttonSubmitWrapper;
            }

            let areaName = '';
            const addColorSchemeWrapper = document.createElement('div');
            addColorSchemeWrapper.className = 'commonFullScreenWrapper';

            const colorSchemeMainWrapper = document.createElement('div');
            colorSchemeMainWrapper.className = 'commonFullScreenMainWrapper';

            const inputAreaWrapper = document.createElement('div');

            inputAreaWrapper.className = 'inputAreaWrapper';

            const textColorPlatte = createAreaInput(
                `New Area`,
                (newValue: string) =>
                {
                    areaName = newValue;
                }
            );

            const buttonSubmitWrapper = createButtonSubmit();

            inputAreaWrapper.appendChild(textColorPlatte);
            colorSchemeMainWrapper.appendChild(inputAreaWrapper);
            colorSchemeMainWrapper.appendChild(buttonSubmitWrapper);

            addColorSchemeWrapper.appendChild(colorSchemeMainWrapper);


            return addColorSchemeWrapper;
        }

        const MainWrapper = document.createElement('div');
        MainWrapper.className = 'MainWrapper';
        MainWrapper.id = 'MainWrapper';

        const Title = document.createElement('div');
        Title.className = 'Title';
        Title.innerText = 'Article Area';

        const sendPost = new SendPost();
        const area = await sendPost.getAllBigArea();
        if (!area) return MainWrapper;

        const AreaWrapper = document.createElement('table');
        AreaWrapper.className = 'commonTableWrapper';

        const areaSchemeTitleWrapper = displayAreaTitle();

        AreaWrapper.appendChild(areaSchemeTitleWrapper);

        area.forEach(element =>
        {
            const areaItem = createAreaItem(element);
            AreaWrapper.appendChild(areaItem);
        });

        const addAreaBtn = createAddAreaBtn();
        const addArea = createAddArea();

        MainWrapper.appendChild(Title);
        MainWrapper.appendChild(AreaWrapper);
        MainWrapper.appendChild(addAreaBtn);
        MainWrapper.appendChild(addArea);
        return MainWrapper;
    }

    private async MainSubArea()
    {
        function displayAreaTitle()
        {
            const TitleWrapper = document.createElement('tr');

            TitleWrapper.className = 'commonTitleWrapper';

            const colorSchemeTitle = document.createElement('th');
            colorSchemeTitle.className = 'commonTitle';
            colorSchemeTitle.innerText = 'ID';

            const name = document.createElement('th');
            name.className = 'commonTitle';
            name.innerText = 'Sub Area Name';

            const UnserArea = document.createElement('th');
            UnserArea.className = 'commonTitle';
            UnserArea.innerText = 'Under Area';

            const colorScheme = document.createElement('th');
            colorScheme.className = 'commonTitle';
            colorScheme.innerText = 'Color Scheme';

            const actionTitle = document.createElement('th');
            actionTitle.className = 'commonTitle';
            actionTitle.innerText = 'Action';

            TitleWrapper.appendChild(colorSchemeTitle);
            TitleWrapper.appendChild(name);
            TitleWrapper.appendChild(UnserArea);
            TitleWrapper.appendChild(colorScheme);
            TitleWrapper.appendChild(actionTitle);

            return TitleWrapper;
        }

        function creaSubAreaItem(element: ArticleSubArea)
        {

            function createIdWrapper()
            {
                const idWrapper = document.createElement('td');
                idWrapper.innerText = element.subAreaID.toString();
                return idWrapper;
            }

            function createEditWrapper(onchange: (newValue: string) => void)
            {
                const editWrapper = document.createElement('td');
                const inputText = document.createElement('input');
                inputText.className = 'commonInput';
                inputText.value = element.subareaName;
                editWrapper.appendChild(inputText);

                inputText.oninput = () =>
                {
                    onchange(inputText.value);
                };

                return editWrapper;
            }

            function createSelectWrapper(onchange: (newValue: number) => void)
            {
                const selectWrapper = document.createElement('td');
                const inputText = document.createElement('input');

                const dropMenuWrapper = document.createElement('div');


                dropMenuWrapper.className = 'commonDropMenuWrapper';

                inputText.onclick = () =>
                {
                    console.log('click');
                    dropMenuWrapper.classList.add('commonDropMenuWrapperActive');
                    inputText.style.boxShadow = `0 -2px 0 0 #f50057 inset;`;
                    const fullScreenWrapper = document.createElement('div');

                    fullScreenWrapper.className = 'commonFullScreenTrackClickWrapper';

                    fullScreenWrapper.onclick = () =>
                    {
                        fullScreenWrapper.remove();
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                    };

                    MainWrapper.appendChild(fullScreenWrapper);
                };

                area?.forEach(element =>
                {
                    const dropMenu = document.createElement('div');

                    dropMenu.className = 'commonDropMenu';

                    dropMenu.innerHTML = element.bigAreaName;

                    dropMenu.onclick = () =>
                    {
                        inputText.value = element.bigAreaName;
                        onchange(element.bigareaID);
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                        const fullScreenWrapper = document.querySelector('.commonFullScreenTrackClickWrapper') as HTMLDivElement;
                        if (fullScreenWrapper)
                        {
                            fullScreenWrapper.remove();
                        }
                    };

                    dropMenuWrapper.appendChild(dropMenu);

                });






                inputText.classList.add('commonInput');
                inputText.classList.add('selectInput');
                inputText.value = element.bigArea.bigAreaName;
                inputText.readOnly = true;

                selectWrapper.appendChild(inputText);
                selectWrapper.appendChild(dropMenuWrapper);

                return selectWrapper;
            }

            function createColorSelect(onchange: (newValue: number) => void)
            {
                const selectWrapper = document.createElement('td');
                const input = document.createElement('div');
                input.classList.add('commonInput');
                input.classList.add('selectInput');

                const colorGroupWrapper = document.createElement('div');

                colorGroupWrapper.className = 'colorGroupWrapper';

                const fontColor = document.createElement('div');

                const backgroundColor = document.createElement('div');

                fontColor.className = 'fontColor';


                backgroundColor.className = 'backgroundColor';

                fontColor.style.backgroundColor = element.colorScheme.textColor;

                backgroundColor.style.backgroundColor = element.colorScheme.backgroundColor;


                const dropMenuWrapper = document.createElement('div');
                dropMenuWrapper.className = 'commonDropMenuWrapper';

                colorScheme?.forEach(element =>
                {
                    const dropMenu = document.createElement('div');

                    dropMenu.className = 'commonDropMenu';

                    const dmcolorGroupWrapper = document.createElement('div');

                    dmcolorGroupWrapper.className = 'colorGroupWrapper';

                    const dmfontColor = document.createElement('div');

                    const dmbackgroundColor = document.createElement('div');

                    dmfontColor.className = 'fontColor';

                    dmbackgroundColor.className = 'backgroundColor';


                    dmfontColor.style.backgroundColor = element.textColor;

                    dmbackgroundColor.style.backgroundColor = element.backgroundColor;

                    dmcolorGroupWrapper.appendChild(dmfontColor);

                    dmcolorGroupWrapper.appendChild(dmbackgroundColor);

                    dropMenu.appendChild(dmcolorGroupWrapper);

                    dropMenu.onclick = () =>
                    {
                        fontColor.style.backgroundColor = element.textColor;
                        backgroundColor.style.backgroundColor = element.backgroundColor;
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                        const fullScreenWrapper = document.querySelector('.commonFullScreenTrackClickWrapper') as HTMLDivElement;
                        if (fullScreenWrapper)
                        {
                            fullScreenWrapper.remove();
                        }
                        onchange(element.id);
                    };

                    dropMenuWrapper.appendChild(dropMenu);

                });

                input.onclick = () =>
                {
                    dropMenuWrapper.classList.add('commonDropMenuWrapperActive');
                    input.style.boxShadow = `0 -2px 0 0 #f50057 inset;`;
                    const fullScreenWrapper = document.createElement('div');

                    fullScreenWrapper.className = 'commonFullScreenTrackClickWrapper';

                    fullScreenWrapper.onclick = () =>
                    {
                        fullScreenWrapper.remove();
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                    };

                    MainWrapper.appendChild(fullScreenWrapper);
                };


                colorGroupWrapper.appendChild(fontColor);

                colorGroupWrapper.appendChild(backgroundColor);

                input.appendChild(colorGroupWrapper);

                selectWrapper.appendChild(input);
                selectWrapper.appendChild(dropMenuWrapper);







                return selectWrapper;
            }

            function createBtn()
            {
                const actiontd = document.createElement('td');
                const actionWrapper = document.createElement('div');

                actionWrapper.className = 'actionWrapper';

                const saveBtnWrapper = document.createElement('div');
                saveBtnWrapper.className = 'commonBtnWrapper';
                saveBtnWrapper.onclick = async () =>
                {
                    console.log(element.subAreaID, subAreaName, bigAreaID, colorSchemeID);
                    const sendPost = new SendPost();
                    const result = await sendPost.updateSubArea(element.subAreaID, subAreaName, bigAreaID, colorSchemeID);
                    if (result)
                    {
                        const navbar = document.getElementById('navigationBar') as HTMLDivElement;

                        if (navbar)
                        {
                            navbar.remove();
                            const navRelated = new NavRelated();
                            await navRelated.init();
                        }
                    }
                };

                const saveBtn = document.createElement('div');
                saveBtn.className = 'commonBtn';
                saveBtn.innerText = '💾';

                const deleteBtnWrapper = document.createElement('div');
                deleteBtnWrapper.className = 'commonBtnWrapper';
                deleteBtnWrapper.onclick = async () =>
                {
                    const sendPost = new SendPost();
                    const result = await sendPost.deleteSubArea(element.subAreaID);
                    if (result)
                    {
                        AreaItemWrapper.remove();
                        const navbar = document.getElementById('navigationBar') as HTMLDivElement;

                        if (navbar)
                        {
                            navbar.remove();
                            const navRelated = new NavRelated();
                            await navRelated.init();
                        }
                    }
                };

                const deleteBtn = document.createElement('div');

                deleteBtn.className = 'commonBtn';
                deleteBtn.innerText = '🗑️';

                saveBtnWrapper.appendChild(saveBtn);
                deleteBtnWrapper.appendChild(deleteBtn);
                actionWrapper.appendChild(saveBtnWrapper);
                actionWrapper.appendChild(deleteBtnWrapper);
                actiontd.appendChild(actionWrapper);
                return actiontd;
            }

            const AreaItemWrapper = document.createElement('tr');
            AreaItemWrapper.className = 'commonItemWrapper';

            let subAreaName = element.subareaName;
            let bigAreaID = element.bigArea.bigareaID;
            let colorSchemeID = element.colorScheme.id;

            const IdWrapper = createIdWrapper();

            const editWrapper = createEditWrapper((newValue: string) =>
            {
                subAreaName = newValue;
            });

            const selectWrapper = createSelectWrapper((newValue: number) =>
            {
                bigAreaID = newValue;
            });

            const colorSelect = createColorSelect(
                (newValue: number) =>
                {
                    colorSchemeID = newValue;
                }
            );

            const actionWrapper = createBtn();

            AreaItemWrapper.appendChild(IdWrapper);

            AreaItemWrapper.appendChild(editWrapper);

            AreaItemWrapper.appendChild(selectWrapper);

            AreaItemWrapper.appendChild(colorSelect);

            AreaItemWrapper.appendChild(actionWrapper);

            return AreaItemWrapper;
        }

        function createAddSubAreaBtn()
        {
            const buttonSubmitWrapper = document.createElement('div');
            buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';

            buttonSubmitWrapper.style.justifyContent = 'flex-start';

            buttonSubmitWrapper.style.paddingLeft = '20%';

            const buttonAddColorScheme = document.createElement('div');
            buttonAddColorScheme.className = 'commonButtonSecondSubmit';
            buttonAddColorScheme.innerHTML = 'Add Sub Area';

            buttonAddColorScheme.onclick = async () =>
            {
                const addColorScheme = document.querySelector('.commonFullScreenWrapper') as HTMLDivElement;
                if (addColorScheme)
                {
                    addColorScheme.classList.add('commonFullScreenMainWrapperActive');
                }

            };



            buttonSubmitWrapper.appendChild(buttonAddColorScheme);

            return buttonSubmitWrapper;
        }

        function createAddSubArea()
        {

            function createSubAreaInput(title: string, onChange: (newValue: string) => void)
            {
                const commonItemWrapper = document.createElement('div');

                commonItemWrapper.className = 'commonItemWrapper';

                commonItemWrapper.style.width = `33%`;

                const commonTitle = document.createElement('div');

                commonTitle.className = 'commonTitle';
                commonTitle.innerText = title;

                const areaInput = document.createElement('input');
                areaInput.className = 'commonInput';
                areaInput.type = 'text';


                areaInput.oninput = () =>
                {
                    onChange(areaInput.value);
                };

                commonItemWrapper.appendChild(commonTitle);
                commonItemWrapper.appendChild(areaInput);
                return commonItemWrapper;
            }

            function createBigAreaInput(title: string, bigarea: string, onChange: (newValue: number) => void)
            {
                const selectWrapper = document.createElement('div');
                selectWrapper.className = 'commonItemWrapper';
                selectWrapper.style.width = `33%`;

                const commonTitle = document.createElement('div');

                commonTitle.className = 'commonTitle';
                commonTitle.innerText = title;

                const inputText = document.createElement('input');

                inputText.classList.add('commonInput');
                inputText.classList.add('selectInput');

                inputText.value = bigarea;
                inputText.placeholder = 'Select Area';

                inputText.readOnly = true;

                const dropMenuWrapper = document.createElement('div');

                dropMenuWrapper.className = 'commonDropMenuWrapper';

                inputText.onclick = () =>
                {
                    dropMenuWrapper.classList.add('commonDropMenuWrapperActive');
                    inputText.style.boxShadow = `0 -2px 0 0 #f50057 inset;`;
                    const fullScreenWrapper = document.createElement('div');

                    fullScreenWrapper.className = 'commonFullScreenTrackClickWrapper';

                    fullScreenWrapper.onclick = () =>
                    {
                        fullScreenWrapper.remove();
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                    };

                    addSubAreaWrapper.appendChild(fullScreenWrapper);
                };

                area?.forEach(element =>
                {
                    const dropMenu = document.createElement('div');

                    dropMenu.className = 'commonDropMenu';

                    dropMenu.innerHTML = element.bigAreaName;

                    dropMenu.onclick = () =>
                    {
                        inputText.value = element.bigAreaName;
                        onChange(element.bigareaID);
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                        const fullScreenWrapper = document.querySelector('.commonFullScreenTrackClickWrapper') as HTMLDivElement;
                        if (fullScreenWrapper)
                        {
                            fullScreenWrapper.remove();
                        }
                    };

                    dropMenuWrapper.appendChild(dropMenu);
                });

                selectWrapper.appendChild(commonTitle);
                selectWrapper.appendChild(inputText);
                selectWrapper.appendChild(dropMenuWrapper);
                return selectWrapper;

            }

            function createColorSchemeInput(title: string, onChange: (newValue: number) => void)
            {
                const selectWrapper = document.createElement('div');
                selectWrapper.className = 'commonItemWrapper';
                selectWrapper.style.width = `33%`;

                const commonTitle = document.createElement('div');

                commonTitle.className = 'commonTitle';
                commonTitle.innerText = title;

                const input = document.createElement('div');
                input.classList.add('commonInput');
                input.classList.add('selectInput');

                const colorGroupWrapper = document.createElement('div');

                colorGroupWrapper.className = 'colorGroupWrapper';

                const fontColor = document.createElement('div');

                const backgroundColor = document.createElement('div');

                fontColor.className = 'fontColor';

                backgroundColor.className = 'backgroundColor';

                if (colorScheme)
                {
                    fontColor.style.backgroundColor = colorScheme[0].textColor;
                    backgroundColor.style.backgroundColor = colorScheme[0].backgroundColor;
                }


                const dropMenuWrapper = document.createElement('div');
                dropMenuWrapper.className = 'commonDropMenuWrapper';

                colorScheme?.forEach(element =>
                {
                    const dropMenu = document.createElement('div');

                    dropMenu.className = 'commonDropMenu';

                    const dmcolorGroupWrapper = document.createElement('div');

                    dmcolorGroupWrapper.className = 'colorGroupWrapper';

                    const dmfontColor = document.createElement('div');

                    const dmbackgroundColor = document.createElement('div');

                    dmfontColor.className = 'fontColor';

                    dmbackgroundColor.className = 'backgroundColor';


                    dmfontColor.style.backgroundColor = element.textColor;

                    dmbackgroundColor.style.backgroundColor = element.backgroundColor;

                    dmcolorGroupWrapper.appendChild(dmfontColor);

                    dmcolorGroupWrapper.appendChild(dmbackgroundColor);

                    dropMenu.appendChild(dmcolorGroupWrapper);

                    dropMenu.onclick = () =>
                    {
                        fontColor.style.backgroundColor = element.textColor;
                        backgroundColor.style.backgroundColor = element.backgroundColor;
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                        const fullScreenWrapper = document.querySelector('.commonFullScreenTrackClickWrapper') as HTMLDivElement;
                        if (fullScreenWrapper)
                        {
                            fullScreenWrapper.remove();
                        }
                        onChange(element.id);
                    };

                    dropMenuWrapper.appendChild(dropMenu);

                });

                input.onclick = () =>
                {
                    dropMenuWrapper.classList.add('commonDropMenuWrapperActive');
                    input.style.boxShadow = `0 -2px 0 0 #f50057 inset;`;
                    const fullScreenWrapper = document.createElement('div');

                    fullScreenWrapper.className = 'commonFullScreenTrackClickWrapper';

                    fullScreenWrapper.onclick = () =>
                    {
                        fullScreenWrapper.remove();
                        dropMenuWrapper.classList.remove('commonDropMenuWrapperActive');
                    };

                    addSubAreaWrapper.appendChild(fullScreenWrapper);
                };

                colorGroupWrapper.appendChild(fontColor);
                colorGroupWrapper.appendChild(backgroundColor);
                input.appendChild(colorGroupWrapper);
                selectWrapper.appendChild(commonTitle);
                selectWrapper.appendChild(input);
                selectWrapper.appendChild(dropMenuWrapper);
                return selectWrapper;

            }

            function createButtonSubmit()
            {
                const buttonSubmitWrapper = document.createElement('div');
                buttonSubmitWrapper.className = 'commonButtonSubmitWrapper';

                const buttonSubmit = document.createElement('div');
                buttonSubmit.className = 'commomButtonSubmit';
                buttonSubmit.innerHTML = 'Add';

                const buttonCancel = document.createElement('div');
                buttonCancel.className = 'commonButtonSecondSubmit';
                buttonCancel.innerHTML = 'Cancel';

                buttonCancel.onclick = async () =>
                {
                    addSubAreaWrapper.classList.remove('commonFullScreenMainWrapperActive');
                };

                buttonSubmit.onclick = async () =>
                {
                    const sendPost = new SendPost();
                    const result = await sendPost.addSubArea(subAreaName, bigAreaID, colorSchemeID);
                    if (result)
                    {
                        const foundColorScheme = colorScheme?.find(cs => cs.id === colorSchemeID);
                        const foundArea = area?.find(a => a.bigareaID === bigAreaID);

                        const newItem = creaSubAreaItem({
                            subAreaID: result.id,
                            subareaName: subAreaName,
                            bigArea: {
                                bigareaID: bigAreaID,
                                bigAreaName: foundArea ? foundArea.bigAreaName : ''
                            },
                            colorScheme: {
                                id: colorSchemeID,
                                textColor: foundColorScheme ? foundColorScheme.textColor : '',
                                backgroundColor: foundColorScheme ? foundColorScheme.backgroundColor : ''
                            }
                        });
                        AreaWrapper.appendChild(newItem);
                        addSubAreaWrapper.classList.remove('commonFullScreenMainWrapperActive');
                        const navbar = document.getElementById('navigationBar') as HTMLDivElement;

                        if (navbar)
                        {
                            navbar.remove();
                            const navRelated = new NavRelated();
                            await navRelated.init();
                        }
                    }


                };

                buttonSubmitWrapper.appendChild(buttonCancel);
                buttonSubmitWrapper.appendChild(buttonSubmit);

                return buttonSubmitWrapper;
            }

            let subAreaName = '';
            let bigAreaID = area ? area[0].bigareaID : 1;
            let colorSchemeID = colorScheme ? colorScheme[0].id : 1;
            const addSubAreaWrapper = document.createElement('div');
            addSubAreaWrapper.className = 'commonFullScreenWrapper';

            const colorSchemeMainWrapper = document.createElement('div');
            colorSchemeMainWrapper.className = 'commonFullScreenMainWrapper';

            const inputAreaWrapper = document.createElement('div');

            inputAreaWrapper.className = 'inputAreaWrapper';

            const NewSubArea = createSubAreaInput(
                `New Sub Area`,
                (newValue: string) =>
                {
                    subAreaName = newValue;
                }
            );

            const BigAreaInput = createBigAreaInput(
                `Under Area`,
                area ? area[0].bigAreaName : '',
                (newValue: number) =>
                {
                    bigAreaID = newValue;
                }
            );

            const colorSchemeInput = createColorSchemeInput(
                `Color Scheme`,
                (newValue: number) =>
                {
                    colorSchemeID = newValue;
                }
            );

            const buttonSubmitWrapper = createButtonSubmit();

            inputAreaWrapper.appendChild(NewSubArea);
            inputAreaWrapper.appendChild(BigAreaInput);
            inputAreaWrapper.appendChild(colorSchemeInput);
            colorSchemeMainWrapper.appendChild(inputAreaWrapper);
            colorSchemeMainWrapper.appendChild(buttonSubmitWrapper);

            addSubAreaWrapper.appendChild(colorSchemeMainWrapper);


            return addSubAreaWrapper;
        }

        const MainWrapper = document.createElement('div');
        MainWrapper.className = 'MainWrapper';
        MainWrapper.id = 'MainWrapper';


        const sendPost = new SendPost();
        const area = await sendPost.getAllArticleArea();
        const colorScheme = await sendPost.getColorScheme();

        if (!colorScheme) return MainWrapper;

        if (!area) return MainWrapper;

        const newArea: ArticleSubArea[] = [];

        area.forEach(articleArea =>
        {
            articleArea.subarea.forEach(subarea =>
            {
                if (subarea.subAreaID && subarea.subareaName && subarea.colorscheme)
                {
                    newArea.push({
                        subAreaID: subarea.subAreaID,
                        subareaName: subarea.subareaName,
                        bigArea: {
                            bigareaID: articleArea.bigareaID,
                            bigAreaName: articleArea.bigAreaName
                        },
                        colorScheme: {
                            id: subarea.colorscheme.id,
                            textColor: subarea.colorscheme.textColor,
                            backgroundColor: subarea.colorscheme.backgroundColor
                        }
                    });
                }
            });
        });

        newArea.sort((a, b) => a.subAreaID - b.subAreaID);

        const Title = document.createElement('div');
        Title.className = 'Title';
        Title.innerText = 'Article Sub Area';


        const AreaWrapper = document.createElement('table');
        AreaWrapper.className = 'commonTableWrapper';
        AreaWrapper.style.padding = '24px 10%';

        const areaTitleWrapper = displayAreaTitle();

        AreaWrapper.appendChild(areaTitleWrapper);


        newArea.forEach(element =>
        {
            const areaItem = creaSubAreaItem(element);
            AreaWrapper.appendChild(areaItem);

        });

        const addAreaBtn = createAddSubAreaBtn();

        const addArea = createAddSubArea();

        MainWrapper.appendChild(Title);
        MainWrapper.appendChild(AreaWrapper);
        MainWrapper.appendChild(addAreaBtn);
        MainWrapper.appendChild(addArea);
        return MainWrapper;
    }

    CreateSwitchOption(Title: string, description: string, option: number, onChange: (newValue: number) => void)
    {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'mainItemWrapper';

        const contorlWrapper = document.createElement('div');
        contorlWrapper.className = 'mainItemControlWrapper';

        const switchWrapper = document.createElement('div');
        switchWrapper.className = 'switchWrapper';

        const switchRoot = document.createElement('div');

        switchRoot.className = 'switchRoot';

        const switchTitle = document.createElement('div');

        switchTitle.className = 'switchTitle';

        switchTitle.innerText = Title;

        const switchTrack = document.createElement('div');
        switchTrack.className = 'switchTrack';

        const switchButtonWrapper = document.createElement('div');
        switchButtonWrapper.className = 'switchButtonWrapper';

        const switchButton = document.createElement('div');
        switchButton.className = 'switchButton';

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'mainItemDescription';
        descriptionDiv.innerText = description;

        switchWrapper.onclick = () =>
        {
            option = option === 0 ? 1 : 0;
            this.ChangeToSwitchRootActive(option, switchButtonWrapper, switchTrack);
            onChange(option);
        };

        this.ChangeToSwitchRootActive(option, switchButtonWrapper, switchTrack);

        switchButtonWrapper.appendChild(switchButton);

        switchRoot.appendChild(switchButtonWrapper);
        switchRoot.appendChild(switchTrack);

        switchWrapper.appendChild(switchRoot);
        switchWrapper.appendChild(switchTitle);

        contorlWrapper.appendChild(switchWrapper);

        itemWrapper.appendChild(contorlWrapper);
        itemWrapper.appendChild(descriptionDiv);

        return itemWrapper;
    }

    ChangeToSwitchRootActive(option: number, switchButtonWrapper: HTMLDivElement, switchTrack: HTMLDivElement)
    {
        switchButtonWrapper.classList.toggle('switchButtonWrapperActive', option === 1);
        switchTrack.classList.toggle('switchTrackActive', option === 1);
    }

    CreateInputTextOption(title: string, description: string, inputContent: string | number | null, onChange: (newValue: string) => void)
    {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'mainItemWrapper';

        const inputTitle = document.createElement('div');

        inputTitle.className = 'mainItemTitle';

        inputTitle.innerText = title;

        const contorlWrapper = document.createElement('div');
        contorlWrapper.className = 'mainItemControlWrapper';

        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'inputWrapper';

        const input = document.createElement('input');
        input.className = 'input';
        if (typeof inputContent === 'number')
        {
            input.type = 'number';
            input.min = '0';
            input.max = '65535';
            if (inputContent !== 0)
            {
                input.value = inputContent.toString();
            }
        } else if (typeof inputContent === 'string')
        {
            input.value = inputContent;
        }

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'mainItemDescription';
        descriptionDiv.innerText = description;

        input.onchange = () =>
        {
            onChange(input.value);
        };

        input.onfocus = () =>
        {
            inputTitle.style.color = '#f50057';
        };

        input.onblur = () =>
        {
            inputTitle.style.color = 'rgba(0, 0, 0, 0.54)';
        };




        inputWrapper.appendChild(input);

        contorlWrapper.appendChild(inputWrapper);

        itemWrapper.appendChild(inputTitle);
        itemWrapper.appendChild(contorlWrapper);
        itemWrapper.appendChild(descriptionDiv);

        return itemWrapper;
    }

    CreateInputPasswordOption(title: string, description: string, inputContent: string | null, onChange: (newValue: string) => void)
    {
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'mainItemWrapper';

        const inputTitle = document.createElement('div');

        inputTitle.className = 'mainItemTitle';

        inputTitle.innerText = title;

        const contorlWrapper = document.createElement('div');
        contorlWrapper.className = 'mainItemControlWrapper';

        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'inputWrapper';

        const input = document.createElement('input');
        input.className = 'input';
        input.type = 'password';
        input.autocomplete = 'new-password';
        if (typeof inputContent === 'string')
        {
            input.value = inputContent;
        }

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'mainItemDescription';
        descriptionDiv.innerText = description;

        input.onchange = () =>
        {
            onChange(input.value);
        };

        input.onfocus = () =>
        {
            inputTitle.style.color = '#f50057';
        };

        input.onblur = () =>
        {
            inputTitle.style.color = 'rgba(0, 0, 0, 0.54)';
        };

        inputWrapper.appendChild(input);

        contorlWrapper.appendChild(inputWrapper);

        itemWrapper.appendChild(inputTitle);
        itemWrapper.appendChild(contorlWrapper);
        itemWrapper.appendChild(descriptionDiv);

        return itemWrapper;
    }

}