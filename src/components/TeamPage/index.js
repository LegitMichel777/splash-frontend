import React, {Component} from 'react'
import common from "../../config/common";
import cookie from 'react-cookies';
import isLoginOK from '../../config/variable';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, List, message, Modal, Upload} from 'antd';
import './TeamPage.css'
import Footer from "../Footer/Footer";
import {notification} from "antd";

const {Meta} = Card;

export default class TeamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            isShowModel: false,
            curr: null
        }

    }

    componentDidMount() {
        const that = this
        this.uploadProps = {
            name: 'file',
            action: '/api/user/uploadRes',
            headers: {
                authorization: 'authorization-text',
            },
            // crossOrigin: 'use-credentials',

            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }

                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    that.setState({isShowModel: true, curr: info.file.response.obj})
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        this.init()
    }

    init = () => {
        common.postMethod("/api/user/getRes").then(r => {
            console.log(r)
            this.setState({
                res: r.retlist
            })

        });
    }
    handleDel = (id) => {
        common.postMethodRes("/api/user/delRes", {id: id}).then(r => {
            notification['success']({
                message: 'delete success'
            });
            this.init()
        });
    }

    render() {
        let userInfo = cookie.load('isLoginOK');
        console.log(userInfo)
        return (
            <>
                <div className='content team' style={{padding: 50}}>

                    <h2>Resources List</h2>
                    <List
                        size="small"

                        bordered
                        dataSource={this.state.res || []}
                        renderItem={item => <Card

                            style={{width: 300, margin: 10}}
                            cover={
                                <img
                                    alt="example"
                                    style={{
                                        height: 200,
                                        width: "100%"
                                    }}
                                    src={item.url.search(/(\.png)|(\.jpeg)/) !== -1 ? item.url : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                                />
                            }
                            actions={[
                                isLoginOK.role === 'admin' &&
                                <span onClick={() => this.setState({isShowModel: true, curr: item})}>edit</span>,
                                userInfo ? <span><a href={item.url} download={item.url}>download</a></span> :
                                    <span><a onClick={() => {
                                        this.props.setIsLogin(true);
                                        this.props.showModal(true)
                                    }}>download</a></span>,
                                // <span onClick={() => this.setState({isShowModel: true, curr: item})}>edit</span>,
                                isLoginOK.role === 'admin' &&
                                <span onClick={this.handleDel.bind(null, item.id)}>delete</span>
                                // <span>del</span>
                            ]}
                            des
                        >
                            <Meta
                                title={item.title || item.url}
                                description={item.content}
                            />
                        </Card>
                        }
                        // renderItem={item => <List.Item>
                        // 	<span href={item.url} download={item.url}>{item.url}</span>
                        // 	<div>
                        // 	{userInfo&& <Button><a href={item.url} download={item.url}>下载</a></Button>}
                        // 	{isLoginOK.role === 'admin' && <Button><span onClick={this.handleDel.bind(null,item.id)}>删除</span></Button>}
                        // 	</div>
                        // </List.Item>}

                    />
                    {isLoginOK.role === 'admin' && <Upload {...this.uploadProps}>
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>}
                    {this.state.isShowModel && <Modal
                        visible={true}
                        footer={false}
                        onCancel={() => this.setState({
                            isShowModel: false
                        })}

                    >
                        <Form
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            initialValues={{remember: true}}
                            onFinish={(value) => {
                                common.postMethodRes('/api/user/setRes', {...this.state.curr, ...value}).then((r) => {
                                    this.init()
                                    this.setState({
                                        isShowModel: false
                                    })
                                })
                            }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="title"
                                name="title"
                                // initialValue={this.state.curr.title}

                            >
                                <Input defaultValue={this.state.curr.title}/>
                            </Form.Item>

                            <Form.Item
                                label="content"
                                name="content"
                                // initialValue={this.state.curr.content}
                            >
                                <Input.TextArea defaultValue={this.state.curr.content}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>}
                </div>
                <Footer
                    styles={{
                        position: "absolute",
                        bottom: 0
                    }}
                />
            </>

        )
    }

}
