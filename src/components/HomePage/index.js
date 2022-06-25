import React, {Component} from "react";
import common from "../../config/common";
import {Button, Col, Form, Input, Modal, Row, Table, Tag} from "antd";
import "./HomePage.scss";
import WorldMap from "react-svg-worldmap";
import cookie from 'react-cookies';
import isLoginOK from '../../config/variable';
import Footer from "../Footer/Footer";
import EventCards from "../NewsPage/EventCards";

const columns = [
    {
        title: "国家",
        dataIndex: "country",
        key: "country",
    },

    {
        title: "数量",
        key: "value",
        dataIndex: "value",
        render: (text) => (
            <Tag color={"blue"} key={text}>
                {text}
            </Tag>
        ),
    },
];


export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            config: {}
        }

    }

    componentDidMount() {
        common.getMethod("/api/user/group").then(r => {
            // console.log("接口返回值：" + r.retlist)
            this.setState({
                data: r.retlist,
            })
        });
        this.init()
    }

    init = () => {
        common.postMethodRes('/api/user/getConfig').then((r) => {
            this.setState({
                config: r.value,
            })
        })
    }

    render() {
        const {data} = this.state
        console.log(data)

        let userInfo = cookie.load('isLoginOK');
        console.log(userInfo)
        if (userInfo || true) {

            return (
                <div>
                    <div style={{height: 400, background: "#d3dfea", padding: 150,}}>
                        <p className="text"><h1>Mission Statement</h1>{this.state.config.statement}</p>
                    </div>

                    {isLoginOK.role === 'admin' &&
                        <Button onClick={() => this.setState({isShowModel: true})}>编辑</Button>}

                    <div style={{height: 480, paddingTop: 50}}>
                        <h1>Programs</h1>
                        <EventCards history={this.props.history}/>
                    </div>

                    <div style={{height: 200, padding: 50}}>
                        <h1>Members</h1>
                        <p className="text">
                            {this.state.config.members}
                        </p>
                    </div>
                    <div style={{padding: 50}}>
                        {/* <h1>Word Map</h1> */}
                        <Row justify={"space-between"}>
                            <Col span={18}>
                                <WorldMap
                                    color="yellow"
                                    tooltipBgColor="black"
                                    // title="世界各国注册人数展示"
                                    valuePrefix=":"
                                    size="xxl"
                                    data={data}
                                    frame
                                />
                            </Col>
                            <Col span={5}>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    bordered={true}
                                >
                                </Table>
                            </Col>
                        </Row>
                    </div>

                    <div style={{height: 300, padding: 50, background: "#d3dfea"}}>
                        <h1>Partners</h1>
                        <div className="partners" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <img
                                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F3b87e950352ac65cb39ee6b9f3f2b21192138a65&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657876487&t=f39d7c888769cf9b3d56843672ee9d8c"></img>
                            <img
                                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F3b87e950352ac65cb39ee6b9f3f2b21192138a65&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657876487&t=f39d7c888769cf9b3d56843672ee9d8c"></img>
                        </div>
                    </div>

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
                                common.postMethodRes('/api/user/setConfig', {...this.state.config, ...value}).then((r) => {
                                    this.init()
                                    this.setState({
                                        isShowModel: false
                                    })
                                })
                            }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Mission Statement"
                                name="statement"
                            >
                                <Input.TextArea defaultValue={this.state.config.statement}/>
                            </Form.Item>

                            <Form.Item
                                label="Members"
                                name="members"

                            >
                                <Input.TextArea defaultValue={this.state.config.members}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    }
                    <Footer/>
                </div>
            );
        } else {
            return (
                <div id="error">请登录账号！</div>
            )
        }
    }
}
