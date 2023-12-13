import { Boot, DomEditor, IDomEditor, IModalMenu, IModuleConf, SlateElement, SlateNode } from '@wangeditor/editor';
import { h, VNode } from 'snabbdom';
import formulaModule from '@wangeditor/plugin-formula';

export class NewMenu {
    init () {
        const menu2Conf = {
            key: 'fileHide',
            factory () {
                return new MyModalMenu();
            }
        };
        const module: Partial<IModuleConf> = {

            menus: [menu2Conf]

            // 其他功能，下文讲解...
        };
        Boot.registerModule(module);
    }
}

class MyModalMenu implements IModalMenu {
    title: string;

    tag: string;

    showModal: boolean;

    modalWidth: number;

    constructor () {
        this.title = '插入下载文件(隐藏内容)';
        // this.iconSvg = '<svg >...</svg>'
        this.tag = 'button';
        this.showModal = true;
        this.modalWidth = 300;
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive (editor: IDomEditor): boolean {
        return false;
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue (editor: IDomEditor): string | boolean {
        return '';
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled (editor: IDomEditor): boolean {
        return false;
    }

    // 点击菜单时触发的函数
    exec (editor: IDomEditor, value: string | boolean) {
        // Modal menu ，这个函数不用写，空着即可
    }

    // 弹出框 modal 的定位：1. 返回某一个 SlateNode； 2. 返回 null （根据当前选区自动定位）
    getModalPositionNode (editor: IDomEditor): SlateNode | null {
        return null;
    }

    // 定义 modal 内部的 DOM Element
    getModalContentElem (editor: IDomEditor): HTMLElement {
        const Component: string[][] = [
            ['网盘名称:'],
            ['文件名称:'],
            ['链接:'],
            ['提取码:'],
            ['解压密码:']
        ];
        const content = document.createElement('div');
        const button = document.createElement('button');
        console.log(Component.length);
        content.style.display = 'block';
        for (let i = 0; i < Component.length; i++) {
            const driveLabel = document.createElement('label');
            const driveSpan = document.createElement('span');
            const driveInput = document.createElement('input');
            driveSpan.textContent = Component[i][0];
            driveSpan.style.marginBottom = '10px';
            driveSpan.style.display = 'block';

            driveInput.style.display = 'block';
            driveInput.style.width = '100%';

            driveLabel.style.display = 'block';
            driveLabel.style.marginBottom = '15px';

            driveLabel.appendChild(driveSpan);
            driveLabel.appendChild(driveInput);
            content.appendChild(driveLabel);
        }

        content.appendChild(button);

        button.textContent = '确定';
        button.style.display = 'block';
        button.style.marginBottom = '15px';
        button.addEventListener('click', () => {
            this.insertText(editor);
        });

        return content;
    }

    insertText (editor: IDomEditor) {
        console.log('dasdas');
        const paragraph = { type: 'paragraph', children: [{ text: '' }] };
        console.log(editor);
        editor.insertNode(hideForPoint);
        editor.insertNode(paragraph);
    }
}

type EmptyText = {
    text: ''
}

type AttachmentElement = {
    type: 'hideDriveContent',
    contentType: string,
    children: EmptyText[],
}

const hideForPoint: AttachmentElement = {
    type: 'hideDriveContent',
    contentType: '隐藏内容（积分）',
    children: [{ text: '' }]// void 元素必须有一个 children ，其中只有一个空字符串，重要！！！
};

function withAttachment<T extends IDomEditor> (editor: T) {
    const { isVoid } = editor;
    const newEditor = editor;

    // newEditor.isInline = elem => {
    //     const type = DomEditor.getNodeType(elem);
    //     if (type === 'attachment') return true;
    //     return isInline(elem);
    // };

    newEditor.isVoid = elem => {
        const type = DomEditor.getNodeType(elem);
        if (type === 'attachment') return true;
        return isVoid(elem);
    };

    return newEditor;
}

// /**
//  * 渲染“附件”元素到编辑器
//  * @param elem 附件元素，即上文的 myResume
//  * @param children 元素子节点，void 元素可忽略
//  * @param editor 编辑器实例
//  * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
//  */
// function renderAttachment (elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
//     const { contentType = '' } = elem;
//     const selected = DomEditor.isNodeSelected(editor, elem);
//     const vnode = h(
//         'div',
//         {
//             props: {
//                 contentEditable: true,
//             },
//             attrs: {
//                 id: 'hideElement', // 设置元素的 ID
//                 // 'data-slate-node': 'text', // 设置自定义属性 data-slate-string
//             },
//             style: {
//                 display: 'block', // inline
//                 marginLeft: '3px',
//                 marginRight: '3px',
//                 height: '100px',
//                 width: '100%',
//                 border: '2px solid',
//                 outline: selected ? '2px solid var(--w-e-textarea-selected-border-color)' : 'none',
//                 borderRadius: '2px',
//                 backgroundColor: '#f1f1f1',
//                 padding: '6px'
//             },
//         },
//         [
//             h('p',
//                 {
//                     props: {
//                         contentEditable: false, // 不可编辑
//                     },
//                     style: {
//                         width: '100%',
//                     },
//                 },
//                 [
//                     h('p', {
//                         props: {},
//                         style: {
//                             width: '100%',
//                             margin: '0',
//                             border: 'none', // 先将整体边框设为 none
//                             borderBottom: '2px solid', // 底部边框
//                         },
//                     }, contentType)
//                 ]
//             ),
//             h('p', {
//                 props: {},
//                 style: {
//                     width: '100%',
//                     marginLeft: '2px',
//                     marginRight: '2px',
//                 },
//                 attrs: {
//                     // 'data-slate-leaf': 'true', // 设置自定义属性 data-slate-string
//                 },
//             },
//             [
//                 h('span', {
//                     props: {
//                         contentEditable: true,
//                     },
//                     attrs: {
//                         // 'data-slate-zero-width': 'n', // 设置自定义属性 data-slate-string
//                         // 'data-slate-length': '0', // 设置自定义属性 data-slate-string
//                     },
//                     style: {
//                         marginLeft: '2px',
//                         marginRight: '2px',
//                         width: '100%',
//                         margin: '0',
//                     },
//                 }, 'sdadas')
//             ]),
//         ]
//     );

//     return vnode;
// }

// const renderElemConf = {
//     type: 'hideDriveContent', // 新元素 type ，重要！！！
//     renderElem: renderAttachment,
// };

Boot.registerPlugin(withAttachment);
// Boot.registerRenderElem(renderElemConf);
Boot.registerModule(formulaModule);
