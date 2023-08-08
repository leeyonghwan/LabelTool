import { Editor, IConfirmOption, StatusType } from 'editor';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

export default function injectConfirm(editor: Editor) {
    editor.showConfirm = (config = {} as IConfirmOption) => {
        let { title = '', subTitle = '' } = config;
        editor.state.status = StatusType.Confirm;
        return new Promise<void>((resolve, reject) => {
            Modal.confirm({
                title: () => title,
                content: () =>
                    createVNode(
                        'div',
                        { style: 'font-size:12px;color: rgb(161 161 161);' },
                        subTitle,
                    ),
                onOk() {
                    editor.state.status = StatusType.Default;
                    resolve();
                },
                onCancel() {
                    editor.state.status = StatusType.Default;
                    reject();
                },
            });
        });
    };
}
