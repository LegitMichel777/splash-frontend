import React, {Component} from 'react'
import common from "../../config/common";
import "./ResourcePage.css";
import {Button, Card, Space} from 'antd';
import cookie from 'react-cookies';
import isLoginOK from '../../config/variable';
import Editor from '../editor'
import Footer from "../Footer/Footer";


export default class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currValue: ''
        }
        this.urlpar = new URLSearchParams(window.location.search)
    }

    componentDidMount() {
        common.getMethod("/api/user/news").then(r => {
            this.setState({
                data: r.retlist
            })
        });
        common.postMethod("/api/user/getAbout").then(r => {
            console.log(r)
            const curr = r.retlist.find((e) => e.id == (this.urlpar.get('id') || 1))
            this.setState({
                currValue: curr.content,
                curr: curr
            })
            document.querySelector('#contentvalue').innerHTML = curr.content

        });


    }

    handleSave = () => {
        common.postMethod("/api/user/about", {
            content: this.state.currValue,
            id: this.urlpar.get('id') || 1
        }).then(r => {
            console.log(r)
        });
    }

    render() {
        let userInfo = cookie.load('isLoginOK');
        console.log(userInfo)
        if (userInfo || true) {
            const {Meta} = Card;
            return (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <div className="content" style={{textAlign:"center",paddingTop:50}}>
                        {/* <h2>Our Team</h2> */}
                        <div id="contentvalue"></div>
                    </div>
                    {
                        !isLoginOK.a && <div style={{textAlign:"center",background:"#e9f0f7",height:200,paddingTop:50}}>
                        {/*<Space direction={"vertical"} >*/}
                            <h2>Join Us:</h2>
                            <Button onClick={() => {
                                this.props.setIsLogin(false);
                                this.props.showModal(true)
                            }}
                                    type={"primary"}
                            >Reg</Button>
                        {/*</Space>*/}
                        </div>
                    }
                    {isLoginOK.role === 'admin' && <>
                        <p>Admin Edit</p>
                        <Editor
                            onChange={(val) => {
                                this.setState({
                                    currValue: val
                                })


                            }}
                            value={this.state.currValue}
                            //   isUp={isUp}
                            //   setIsUp={setIsUp}

                        />
                        <Button onClick={this.handleSave}>保存</Button>
                    </>}
                    <Footer
                        styles={{
                            position: "absolute",
                            bottom: 0
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div id="error">请登录账号！</div>
            )
        }
    }

}
