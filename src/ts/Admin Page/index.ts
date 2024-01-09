import { ChangePage } from "../Navigation Bar/changePage";
import { UserData } from "../Navigation Bar/interface";
import { SendPost } from "../Send Fetch";
import { UserVerification } from "../User Verification";
import '../../scss/AdminPage/index.scss'
import { NavigationProgress } from "../Create Navigation Progress";

export class AdminPage{
    private navigationProgress = new NavigationProgress();
    async init(){
        const userVerification = new UserVerification();
        userVerification.verification();
        const userData = localStorage.getItem('UserData');
        if(userData){
            this.navigationProgress.start();
            const parseUserData = JSON.parse(userData) as UserData;
            if(parseUserData.userData.class !== 3){
                const changePage = new ChangePage();
                changePage.toIndex();
                this.navigationProgress.end();
                return;
            }
            const sendPost = new SendPost();
            const result = await sendPost.KeepLogin(parseUserData);
            if(!result){
                const changePage = new ChangePage();
                changePage.toIndex();
                this.navigationProgress.end();
                return;
            }
            if(parseUserData.userData.class !==3){
                const changePage = new ChangePage();
                changePage.toIndex();
                this.navigationProgress.end();
                return;
            }
            
            const contentDiv = document.createElement('contentDiv');
            contentDiv.className = 'contentDiv';
            contentDiv.id = 'contentDiv';

            const adminPageWrapper = this.CreateAdminPage();
            contentDiv.appendChild(adminPageWrapper);

            document.body.appendChild(contentDiv);
            this.navigationProgress.end();
        }

    }

    private CreateAdminPage(){
        const adminPageWrapper = document.createElement('div');
        adminPageWrapper.className = 'adminPageWrapper';
        adminPageWrapper.id = 'adminPageWrapper';

        const sideNavBarWrapper = this.createSideNavBar();
        const mainMain = this.MainMain();

        adminPageWrapper.appendChild(sideNavBarWrapper);

        adminPageWrapper.appendChild(mainMain);

        return adminPageWrapper;
    }

    
    private createSideNavBar(){
        const sideNavBarWrapper = document.createElement('div'); 
        sideNavBarWrapper.className = 'sideNavBarWrapper';
        sideNavBarWrapper.id = 'sideNavBarWrapper';

        const sideBarMainPageWrapper = this.sideBarMain();
        const sideBarSettingWrapper = this.sideBarSetting();

        sideNavBarWrapper.appendChild(sideBarMainPageWrapper);
        sideNavBarWrapper.appendChild(sideBarSettingWrapper);

        return sideNavBarWrapper;
    }

    private sideBarMain(){
        const sideBarMainPageWrapper = document.createElement('div');

        const sideBarMainPageButton = document.createElement('div');

        sideBarMainPageWrapper.classList.add('adminPageSideBarCommonBtnWrapper')

        sideBarMainPageButton.classList.add('adminPageSideBarCommonBtnActive')

        sideBarMainPageButton.innerText = 'Main';

        sideBarMainPageButton.onclick = (event) => {
            const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');

            activeElements.forEach((element) => {
                element.classList.remove('adminPageSideBarCommonBtnActive');
                element.classList.add('adminPageSideBarCommonBtn');
            });
            
            sideBarMainPageButton.classList.add('adminPageSideBarCommonBtnActive');
            this.addRippleEffect(sideBarMainPageButton, event);

            const adminPageWrapper = document.getElementById('adminPageWrapper');
            const mainMain = this.MainMain();
            adminPageWrapper?.appendChild(mainMain);

        }

        sideBarMainPageWrapper.appendChild(sideBarMainPageButton);

        return sideBarMainPageWrapper;
    }

    private sideBarSetting(){
        const sideBarSettingWrapper = document.createElement('div');

        const sideBarSettingButton = document.createElement('div');

        const SideBarSettingSubItem = this.SideBarParameterSubItem();

        sideBarSettingWrapper.classList.add('adminPageSideBarCommonBtnWrapper')

        sideBarSettingButton.classList.add('adminPageSideBarCommonBtn')

        sideBarSettingButton.innerText = 'Settings';

        sideBarSettingButton.onclick = (event) => {

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

    private SideBarParameterSubItem(){
        const loginAndRegister = () =>{
            const sideBarParameterChildButton = document.createElement('div');
            sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtn')
            sideBarParameterChildButton.classList.add('subItemBtn')
    
            sideBarParameterChildButton.innerText = 'Login And Register';
    
            sideBarParameterChildButton.onclick = async (event) => {
                const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');
    
                activeElements.forEach((element) => {
                    element.classList.remove('adminPageSideBarCommonBtnActive');
                    element.classList.add('adminPageSideBarCommonBtn');
                });
    
                sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtnActive');
                this.addRippleEffect(sideBarParameterChildButton, event);
                const adminPageWrapper = document.getElementById('adminPageWrapper');
                const mainLoginAndRegister = await this.MainLoginAndRegister();
                adminPageWrapper?.appendChild(mainLoginAndRegister);
            }
            return sideBarParameterChildButton;
        }

        const Email = () =>{
            const sideBarParameterChildButton = document.createElement('div');
            sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtn')
            sideBarParameterChildButton.classList.add('subItemBtn')
    
            sideBarParameterChildButton.innerText = 'Email';
    
            sideBarParameterChildButton.onclick = (event) => {
                const activeElements = document.querySelectorAll('.adminPageSideBarCommonBtnActive');
    
                activeElements.forEach((element) => {
                    element.classList.remove('adminPageSideBarCommonBtnActive');
                    element.classList.add('adminPageSideBarCommonBtn');
                });
    
                sideBarParameterChildButton.classList.add('adminPageSideBarCommonBtnActive');
                this.addRippleEffect(sideBarParameterChildButton, event);
            }
            return sideBarParameterChildButton;
        }

        const sideBarParameterChildWrapper = document.createElement('div');

        sideBarParameterChildWrapper.classList.add('adminPageSideBarCommonBtnWrapper')
        sideBarParameterChildWrapper.classList.add('subItemBtnWrapper')

        const LoginAndRegisterBtn = loginAndRegister();
        const EmailBtn = Email();

        sideBarParameterChildWrapper.appendChild(LoginAndRegisterBtn);
        sideBarParameterChildWrapper.appendChild(EmailBtn);

        return sideBarParameterChildWrapper;
    }

    private addRippleEffect(target: HTMLElement, e: MouseEvent) {
        // 创建水波纹元素
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
    
        // 计算水波纹的位置和大小
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        // 计算相对于按钮的坐标
        const x = e.clientX - rect.left - window.scrollX - size / 2;
        const y = e.clientY - rect.top - window.scrollY - size / 2;

        // 设置水波纹元素的样式和位置
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
    
        // 将水波纹元素添加到按钮中
        target.appendChild(ripple);
    
        // 使用动画结束事件来移除水波纹元素
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
    
    private MainMain(){
        const wrapper = document.getElementById('MainWrapper');
        if(wrapper){
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

    private async MainLoginAndRegister(){

        function CreateSwitchOption(Title: string, description: string, option: number, onChange: (newValue: number) => void){
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

            switchWrapper.onclick = () => {
                option = option === 0 ? 1 : 0;
                ChangeToSwitchRootActive(option, switchButtonWrapper, switchTrack)
                onChange(option);
            }

            ChangeToSwitchRootActive(option, switchButtonWrapper, switchTrack)

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

        function ChangeToSwitchRootActive(option:number, switchButtonWrapper:HTMLDivElement, switchTrack:HTMLDivElement){
                switchButtonWrapper.classList.toggle('switchButtonWrapperActive', option === 1);
                switchTrack.classList.toggle('switchTrackActive', option === 1);
        }

        const sendPost = new SendPost();

        const LoginAndRegisterSetting = await sendPost.getLoginAndRegisterSettings();

        const wrapper = document.getElementById('MainWrapper');
        if(wrapper){
            wrapper.remove();
        }
        const MainWrapper = document.createElement('div');
        MainWrapper.className = 'MainWrapper';
        MainWrapper.id = 'MainWrapper';

        if(LoginAndRegisterSetting){
            
            let allowNewUserRegister = LoginAndRegisterSetting.allowUserRegis;
            let emailVerification = LoginAndRegisterSetting.emailVerification;

            const Title = document.createElement('div');

            Title.className = 'Title';

            Title.innerText = 'Login And Register';

            const AllowNewUserToRegisterItem = CreateSwitchOption(
                'Allow new users to register',
                'If this option is off, new users will not be able to register',
                allowNewUserRegister,
                (newValue: number) => {
                    allowNewUserRegister = newValue;
                }
            );

            const EmailVerification = CreateSwitchOption(
                'Email Verification',
                'After the user registers, the system will send an email to the user to verify the email address. Please make sure that email setting is correct',
                emailVerification,
                (newValue: number) => {
                    emailVerification = newValue;
                }
            );

            MainWrapper.appendChild(Title);
            MainWrapper.appendChild(AllowNewUserToRegisterItem);
            MainWrapper.appendChild(EmailVerification);
        }
        return MainWrapper;

    }
    
}