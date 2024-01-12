import { IToolbarConfig, createEditor, createToolbar, i18nChangeLanguage } from '@wangeditor/editor';
import { NewMenu } from './NewMenu';
export class Editor
{
    constructor()
    {
        new NewMenu();
        i18nChangeLanguage('en');
        // newMenu.init();
    }

    createEditor(html: string | null = null)
    {
        const editorConfig = {
            placeholder: 'Enter your content'
        };
        let editor;
        if (html)
        {
            editor = createEditor({
                selector: '#editor-container',
                html: html,
                config: editorConfig,
                mode: 'default' // or 'simple'
            });
        } else
        {
            editor = createEditor({
                selector: '#editor-container',
                html: '<p><br></p>',
                config: editorConfig,
                mode: 'default' // or 'simple'
            });
        }

        const toolbarConfig: Partial<IToolbarConfig> = {

        };

        toolbarConfig.excludeKeys = [
            'uploadImage',
            'uploadVideo'
        ];

        createToolbar({
            editor,
            selector: '#toolbar-container',
            config: toolbarConfig,
            mode: 'default' // or 'simple'
        });

        return editor;
    }
}
