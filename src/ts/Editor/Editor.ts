import { IToolbarConfig, createEditor, createToolbar, i18nChangeLanguage } from '@wangeditor/editor';
import { NewMenu } from './NewMenu';


export class Editor {
    constructor () {
        const newMenu = new NewMenu();
        i18nChangeLanguage('en')
        // newMenu.init();
    }

    createEditor () {
        const editorConfig = {
            placeholder: 'Enter your content'
        };

        const editor = createEditor({
            selector: '#editor-container',
            html: '<p><br></p>',
            config: editorConfig,
            mode: 'default' // or 'simple'
        });
        const toolbarConfig: Partial<IToolbarConfig> = {

        };

        // toolbarConfig.toolbarKeys = [

        //     // 菜单组，包含多个菜单
        //     {
        //         key: 'group-more-style', // 必填，要以 group 开头
        //         title: 'asd', // 必填
        //         iconSvg: '<svg>....</svg>', // 可选
        //         menuKeys: ['through', 'code', 'clearStyle'] // 下级菜单 key ，必填
        //     },
        //     // 继续配置其他菜单...
        // ]

        toolbarConfig.excludeKeys = [
            'emotion'
        ];

        // toolbarConfig.insertKeys = {
        //     index: 6,
        //     keys: [{
        //         key: 'group-more-style', // 必填，要以 group 开头
        //         title: 'Insert', // 必填
        //         menuKeys: ['insertFormula'] // 下级菜单 key ，必填
        //     }]

        // };

        // eslint-disable-next-line no-unused-vars
        const toolbar = createToolbar({
            editor,
            selector: '#toolbar-container',
            config: toolbarConfig,
            mode: 'default' // or 'simple'
        });
        const curToolbarConfig = toolbar.getConfig();    
        return editor;
    }
}
