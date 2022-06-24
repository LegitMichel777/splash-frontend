/*
 * @Author: zhouHui
 * @Date: 2022-06-21 11:37:24
 * @LastEditors: zhouHui
 * @LastEditTime: 2022-06-21 17:38:21
 * @Description: 
 * 
 * Copyright (c) 2022 by zhouHui, All Rights Reserved. 
 */
import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import Context from '@ckeditor/ckeditor5-core/src/context';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
class App extends Component {

    render() {
        return (
            <div >
                <CKEditor
                    className='snippet-inline-editor'
                    onReady={editor => {
                        // console.log('Editor is ready to use!', editor);

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        this.editor = editor;
                    }}
                    onError={(error, { willEditorRestart }) => {
                        // If the editor is restarted, the toolbar element will be created once again.
                        // The `onReady` callback will be called again and the new toolbar will be added.
                        // This is why you need to remove the older toolbar.
                        if (willEditorRestart) {
                            this.editor.ui.view.toolbar.element.remove();
                        }
                    }}

                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        console.log("data:",data)
                        if (data){
                            this.props.onChange(data)
                        }
                        // this.props.onChange(data)
                    }}
                    editor={DecoupledEditor}
                    data={this.props.value}
                    // {...this.props}
                    config={{

                        // plugins: [ Alignment ],
                        // style:{height:300},
                        toolbar: {
                            ckfinder: {

                            },
                        },
                        ckfinder: {
                            uploadUrl: '/api/user/ck_upload_file'

                        },
                    }}
                />
            </div>
        );
    }
}

export default App;
