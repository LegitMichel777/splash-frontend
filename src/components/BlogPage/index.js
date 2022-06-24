import React, { useEffect, useState } from "react";
import common from "../../config/common";
import "./BlogPage.scss";
import cookie from 'react-cookies';
import isLoginOK from '../../config/variable';
import {Avatar, Button, Comment, Form, Input, List, notification, Tooltip, Typography} from "antd";
import moment from "moment";
import CKEditor from '../editor'
import RenderParagraph from './RenderParagraph'
import { Message } from '@arco-design/web-react';

import Footer from "../Footer/Footer";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import {convert} from 'html-to-text'

// export const BlogPage=()=>{
// 	return <div>这是交流论坛页面</div>
// }
const { Paragraph, Text } = Typography;
export default function BlogPage() {
    // common.getInterface("/api/user/group");
    const [activedId, setId] = useState(0);
    const [form] = Form.useForm();
    const [replyForm] = Form.useForm();
    const [currValue, setCurrValue] = useState('');
    const [datasource, setDatasource] = useState([]);
    const { TextArea } = Input;
    const { Search } = Input;

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        common.getInterface("/api/user/info_list?pagesize=100&pagenum=1", {
            pagenum: 1,
            pagesize: 100
        }).then(resp => {
            console.log("info_list", resp)
            const data = resp.retlist.map((it) => ({
                raw: it,
                id: it.id,
                pid: it.pid,
                actions: [<span key="comment-list-reply-to-0">reply</span>],
                author: it.user_id,
                avatar: "https://joeschmoe.io/api/v1/" + it.user_id,
                content: it.content,
                datetime: (
                    <Tooltip
                        title={moment(it.releaseTime).format("YYYY-MM-DD HH:mm:ss")}
                    >
                        <span>{moment(it.modifyTime).fromNow()}</span>
                    </Tooltip>
                ),
            }))
            const treeData = []
            const cache = []
            const map = {}
            data.sort((a, b) => a.pid > b.pid ? 1 : -1).forEach((e) => {
                map[e.id] = e
                if (!e.pid) {
                    treeData.push(e)
                } else {
                    const par = map[e.pid]
                    if (!par) {
                        console.log(e)
                    } else if (par?.children) {
                        par.children.push(e)
                    } else {
                        par.children = [e]
                    }
                }
            })
            setDatasource(treeData.sort((a, b) => a.id > b.id ? -1 : 1))
        })
    }


    const onFinish = formData => {
        console.log('formData:', formData)

        let data = {
            "account": isLoginOK.account,
            "nickname": isLoginOK.nickname,
            "title": formData.title,
            "content": formData.content
        }

        common.postMethodRes("/api/user/info_release", data).then(resp => {
            console.log("发布接口返回值：", resp)
            if (resp.ret === 0) {
                // Message.success('提交成功');
                notification['success']({
                    message: 'post success',
                });
                // Message.success(resp.desc)

                form.resetFields()
                init()
            } else {
                notification['error']({
                    message: resp.desc,
                });
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const data = [
        {
            id: 1,
            actions: [<span kesy="comment-list-reply-to-0">reply</span>],
            author: "Han Solo",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high
                    quality design resources (Sketch and Axure), to help people create
                    their product prototypes beautifully and efficiently.
                </p>
            ),
            datetime: (
                <Tooltip
                    title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
                >
                    <span>{moment().subtract(1, "days").fromNow()}</span>
                </Tooltip>
            ),
        },
        {
            id: 2,
            actions: [<span key="comment-list-reply-to-0">reply</span>],
            author: "Han Solo",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high
                    quality design resources (Sketch and Axure), to help people create
                    their product prototypes beautifully and efficiently.
                </p>
            ),
            datetime: (
                <Tooltip
                    title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
                >
                    <span>{moment().subtract(2, "days").fromNow()}</span>
                </Tooltip>
            ),
        },

    ];
    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>
            <Form
                form={replyForm}
                onFinish={(v) => {
                    console.log(v)
                    let data = {
                        "account": isLoginOK.account,
                        "nickname": isLoginOK.nickname,
                        "content": v?.content,
                        pid: activedId
                    }

                    common.postMethodRes("/api/user/info_release", data).then(resp => {
                        console.log("发布接口返回值：", resp)
                        if (resp.ret == 0) {
                            // Message.success(resp.desc)
                            setCurrValue('')
                            replyForm.resetFields()
                            init()
                        } else {
                            // Message.error(resp.desc)
                        }
                    })
                }}

            >
                <Form.Item name="content">
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        添加评论
                    </Button>
                </Form.Item>
            </Form>
        </>
    );

    let userInfo = cookie.load('isLoginOK');
    if (userInfo || true) {
        const renderItem = (item, isLoginOK) => (
            <>
                <Comment
                    key={item.id}
                    actions={userInfo ? [
                        <span
                            key="comment-list-reply-to-0"
                            onClick={() => {
                                let zhan = (item.zhan || '').split(',')
                                zhan.push(isLoginOK.account)
                                zhan = Array.from(new Set(zhan.filter(Boolean)))
                                common.postMethod("/api/user/info_update", {
                                    ...item.raw,
                                    zhan: zhan.join(',')
                                }).then(resp => {
                                    init()
                                })
                            }}
                        >
                            like({item.raw.zhan && item.raw.zhan.split(',').length || 0})
                        </span>,
                        <span
                            key="comment-list-reply-to-0"
                            onClick={() => {
                                setId(item.id);
                            }}
                        >
                            reply
                        </span>,
                        isLoginOK.role === 'admin' || item.raw.user_id == isLoginOK.user_id ? <span
                            key="comment-list-reply-to-0"
                            onClick={() => {
                                common.getMethod("/api/user/info_delete?id=" + item.id, { id: item.id }).then(resp => {
                                    if (resp?.ret === 0) {
                                        notification['success']({
                                            message: 'delete success',
                                        });
                                    }
                                    init()
                                })
                            }}
                        >
                            del
                        </span> : <span></span>
                    ] : []}
                    author={item.author}
                    avatar={item.avatar}
                    // ren
                    content={<RenderParagraph longStr={item.content} />}
                    // content={RenderParagraph(item.content)}
                    // content={<div dangerouslySetInnerHTML={{ __html: '<div style="max-height:600px">' + item.content + '</div>' }}></div>}
                    datetime={item.datetime}
                >
                    {item?.children && item?.children.map((item2, i) => <div key={i + 'child'}>{renderItem(item2, isLoginOK)}</div>)}
                </Comment>
                {activedId == item.id && (
                    <Comment
                        key={item.id}
                        avatar={
                            <Avatar
                                src="https://joeschmoe.io/api/v1/random"
                                alt="Han Solo"
                            />
                        }
                        content={<Editor />}
                    />
                )}
            </>
        )
        return (
            <>
                <div id="content">
                    {/* <div id="left">
    <List
      className="comment-list"
      header={
		  <Search style={{width:"98%",height:"100%",marginLeft:"8px"}}
		  placeholder={`${datasource.length} replies`} onSearch={onSearch} enterButton />
		  }
      itemLayout="horizontal"
      dataSource={datasource}
      renderItem={renderItem}
    />
	</div> */}
                    <div id="right" style={{ marginBottom: 70 }}>

                        <div id="right2">
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={datasource}
                                // renderItem={(i) => renderItem(i, isLoginOK)}
                                renderItem={(item, i) => (
                                    <li key={i + 'right2'} >
                                        {renderItem(item, isLoginOK)}
                                    </li>
                                )}
                            />
                        </div>
                        {isLoginOK.role === 'admin' && <div id="right1">
                            <Form
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                form={form}
                            >

                                {/* <Form.Item
			name="title"
			rules={[{ required: true,Message: 'Please input your title!'}]}
			style={{width:"100%",borderRadius:"10px",paddingBottom:"2px"}}
			>
			<Input style={{width:"100%",borderRadius:"10px",backgroundColor:"#B8F1B0",paddingBottom:"2px",border:"35px"}}/>
			</Form.Item> */}

                                <Form.Item
                                    name="content"
                                    rules={[{ required: true, Message: 'Please input your content!' }]}
                                    style={{ width: "100%", borderRadius: "10px", marginTop: "0px" }}
                                >
                                    <CKEditor
                                        onChange={(val) => {
                                            setCurrValue(val)
                                        }}
                                        value={currValue}
                                    //   isUp={isUp}
                                    //   setIsUp={setIsUp}

                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: "100%", height: "35px" }}>
                                        发布
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>}
                    </div>
                    <Footer
                        styles={{
                            position: "absolute",
                            bottom: 0
                        }}
                    />
                </div>

            </>
        );
    } else {
        return (
            <div id="error">请登录账号！</div>
        )
    }
}
