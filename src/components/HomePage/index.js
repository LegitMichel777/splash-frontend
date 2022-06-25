import React, {Component} from "react";
import common from "../../config/common";
import {Button, Col, Form, Input, Modal, Tag} from "antd";
import "./HomePage.css";
import "./BigSplash.css";
import "./WorldMap.css";
import "./Programs.css";
import WorldMap from "react-svg-worldmap";
import cookie from 'react-cookies';
import isLoginOK from '../../config/variable';
import Footer from "../Footer/Footer";
import Cards from "../Cards";

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
                <div id={"master-container"}>
                    <div id={"mission-statement-container"}>
                        <h1 id={"mission-statement-message"}>Helping high School STEM Clubs globally for local charity</h1>
                    </div>

                    {/*{isLoginOK.role === 'admin' && <Button onClick={() => this.setState({isShowModel: true})}>Edit</Button>}*/}
                    <div id={"big-splash-container"}>
                        <h1 id={"big-splash-heading"}>A Big Splash.</h1>
                        <div className={"splash-stats-container"}>
                            <div className={"splash-stats"}>
                                <h1 className={"stat-number"}>23</h1>
                                <div className={"stat-name"}>High School STEM Clubs</div>
                            </div>
                            <div className={"splash-stats center-splash-stat"}>
                                <h1 className={"stat-number"}>562</h1>
                                <div className={"stat-name"}>Children serviced</div>
                            </div>
                            <div className={"splash-stats"}>
                                <h1 className={"stat-number"}>31</h1>
                                <div className={"stat-name"}>Hours of courses</div>
                            </div>
                        </div>
                    </div>
                    <div id={"worldmap-main-container"}>
                        <h1>SPLASH Members Globally</h1>
                        <WorldMap
                            color="#C5DAFA"
                            backgroundColor={"#040E1D"}
                            borderColor={"#395072"}
                            tooltipBgColor="black"
                            valuePrefix=":"
                            size="xxl"
                            data={data}
                            id={"worldmap"}
                        />
                    </div>
                    <div id={"programs-container"}>
                        <h1>Explore Programs</h1>
                        <Cards imageUrl={"/images/program-placeholder.jpg"} title={"Club Fairs"} description={"blahblah little desc about club fairsblahblah little desc about club fairs"}/>
                        <Cards imageUrl={"/images/program-placeholder.jpg"} title={"Club Fairs"} description={"blahblah little desc about club fairsblahblah little desc about club fairs"}/>
                        <Cards imageUrl={"/images/program-placeholder.jpg"} title={"Club Fairs"} description={"blahblah little desc about club fairsblahblah little desc about club fairs"}/>
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
