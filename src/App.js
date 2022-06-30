import React, {useEffect, useState} from "react";
import "./App.css";
import {Link, Route, withRouter} from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs/index.tsx";
import common from "./config/common";
import isLoginOK from './config/variable';
import cookie from 'react-cookies';
import {cyList} from "./data/CountryData";
import Footer from "./components/Footer/Footer";
import Programs from "./components/Programs";
import Resources from "./components/Resources";

const layout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};
const App = (props) => {
    const {location} = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [type, setType] = useState(null);
    useEffect(() => {
        const ck = cookie.loadAll()
        global.Nickname = ck.nickname
        global.role = ck.role
        isLoginOK.a = !!ck.nickname ? 1 : 0
        isLoginOK.account = ck.account
        isLoginOK.nickname = ck.nickname
        isLoginOK.role = ck.role
        isLoginOK.user_id = ck.user_id
        setIsLogin(!!ck.isLogin)
    }, [])
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = formData => {
        console.log("注册表单：" + formData)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = formData => {
        console.log("表单数据：", formData)
        if (isLogin) {
            common.postMethodRes("/api/user/login", formData).then(resp => {
                console.log("登录接口返回值：", resp)
                // resp.ret==0?message.success(resp.desc) : message.error(resp.desc);
                if (resp.ret === 0) {
                    global.Nickname = resp.nickname
                    isLoginOK.a = 1
                    isLoginOK.account = formData.account
                    isLoginOK.nickname = resp.nickname
                    isLoginOK.user_id = resp.user_id
                    let expires = new Date(new Date().getTime() + 15 * 60 * 1000);//15分钟

                    cookie.save('isLoginOK', isLoginOK.a, 'true', {path: '/', expires})
                    cookie.save('account', formData.account, 'true', {path: '/', expires})
                    cookie.save('nickname', resp.nickname, 'true', {path: '/', expires})
                    cookie.save('user_id', resp.user_id, 'true', {path: '/', expires})
                    cookie.save('role', resp.role, 'true', {path: '/', expires})
                    setTimeout(() => {
                        window.location.reload();  // 强制刷新
                    }, 300);

                } else {

                }
            })
        } else {
            common.postMethodRes("/api/user/register", formData).then(resp => {
                console.log("注册接口返回值：", resp)
                if (resp.ret === 0) {
                    // notification['success']({
                    //     message: resp.desc
                    // });
                    setTimeout(() => {
                        window.location.reload();  // 强制刷新
                    }, 500);
                } else {
                    // notification['error']({
                    //     message: resp.desc
                    // });
                }
            })
        }
        setIsModalVisible(false);
    }
    return (
        <div className="master-container">
            <header className="main-header">
                <div className="header-container">
                    <div className="main-nav">
                        <Link to="/" >
                            <div className={"splash-logo"}>
                                <img style={{width: 35, height: 35}} src="/images/logo.png"></img>
                                <p>SPLASH</p>
                            </div>
                        </Link>
                        <Link to="/">
                            <p className={location.pathname === "/" ? "nav-selected" : null}>
                                Home
                            </p>
                        </Link>
                        <Link to="/team">
                            <p className={location.pathname === "/team" ? "nav-selected" : null}>
                                About Us
                            </p>
                        </Link>
                        <Link to="/resources">
                            <p className={location.pathname === "/resources" ? "nav-selected" : null}>
                                Resources
                            </p>
                        </Link>
                        <Link to="/programs">
                            <p className={location.pathname === "/programs" ? "nav-selected" : null}>
                                Programs & Events
                            </p>
                        </Link>
                    </div>
                    <div className="user-nav">
                        <p
                            onClick={() => {
                                if (isLoginOK.a == 1) {
                                    setIsLogin(false);
                                } else {
                                    console.log("登录")
                                    setIsLogin(true);
                                    showModal();
                                }
                            }}
                            className={"user-login "+(isLoginOK.a ? "nickname-text" : "header-sign-clickable")}
                        >
                            {isLoginOK.a ? global.Nickname : "Login"}
                        </p>
                        <p
                            onClick={() => {
                                if (isLoginOK.a == 1) {
                                    common.postMethodRes("/api/user/logout").then(resp => {
                                        // notification['success']({
                                            // message: '退出成功'
                                        // });
                                        isLoginOK.a = 0
                                        cookie.remove('isLoginOK', {path: '/'})
                                        cookie.remove('account', {path: '/'})
                                        cookie.remove('nickname', {path: '/'})
                                        cookie.remove('role', {path: '/'})
                                        setTimeout(() => {
                                            window.location.reload();  // 强制刷新
                                        }, 500);

                                    })
                                } else {
                                    console.log("注册");
                                    setIsLogin(false);
                                    showModal();
                                }
                            }}
                            className={"header-sign-clickable"}
                        >
                            {isLoginOK.a ? "Sign out" : "Sign up"}
                        </p>
                    </div>
                </div>
            </header>
            <div className={"header-separator"}></div>
            <section style={{height: "100%"}}>
                <Route path="/" exact component={HomePage}/>
                <Route path="/team" exact component={AboutUs}/>
                <Route path="/programs" exact component={Programs}/>
                <Route path="/resources" exact component={Resources}/>
            </section>
            <Footer/>
            {/*<div><Modal*/}
            {/*    title={isLogin ? "登录" : "注册"}*/}
            {/*    visible={isModalVisible}*/}
            {/*    onOk={handleOk}*/}
            {/*    onCancel={handleCancel}*/}
            {/*    footer={null}*/}
            {/*    // bodyStyle={{backgroundColor: "#E0DECA", fontWeight: "bolder"}}*/}
            {/*    getContainer={false}*/}
            {/*>*/}
            {/*    <Form*/}
            {/*        name="basic"*/}
            {/*        initialValues={{remember: true}}*/}
            {/*        labelWrap*/}
            {/*        onFinish={onFinish}*/}
            {/*        autoComplete="off"*/}
            {/*        labelAlign="left"*/}
            {/*        {...layout}*/}
            {/*    >*/}

            {/*        {!isLogin && (<Form.Item*/}
            {/*            label="Register as Individual User or as Club"*/}
            {/*            name="role"*/}
            {/*            rules={[{required: true, message: "Please input your type!"}]}*/}
            {/*            // style={{backgroundColor: "#E0DECA"}}*/}
            {/*            initialvalues="Individual User"*/}
            {/*        >*/}
            {/*            <Select onChange={setType}>*/}
            {/*                <Select.Option value="single">Individual User</Select.Option>*/}
            {/*                <Select.Option value="club">club</Select.Option>*/}

            {/*            </Select>*/}
            {/*        </Form.Item>)}*/}

            {/*        {!isLogin && type && (*/}
            {/*            <>*/}

            {/*                /!* <Form.Item*/}
            {/*                    label="nickname"*/}
            {/*                    name="nickname"*/}
            {/*                    rules={[{ required: true, message: "Please input your nickname!" }]}*/}
            {/*                >*/}
            {/*                    <Input />*/}
            {/*                </Form.Item> *!/*/}

            {/*                {type === 'single' && <>*/}
            {/*                    <Form.Item*/}
            {/*                        label="First Name"*/}
            {/*                        name="firstName"*/}
            {/*                        rules={[{required: true}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="Last Name"*/}
            {/*                        name="lastName"*/}
            {/*                        rules={[{required: true}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="Email"*/}
            {/*                        name="email"*/}
            {/*                        rules={[{required: true}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="Country"*/}
            {/*                        name="country"*/}
            {/*                        rules={[*/}
            {/*                            {required: true, message: "Please input your password!"},*/}
            {/*                        ]}*/}
            {/*                    >*/}
            {/*                        <Select initialvalues="0" showSearch optionFilterProp="label"*/}
            {/*                                data>*/}
            {/*                            {cyList.filter((i) => i.ab).map((i) => {*/}
            {/*                                return <Select.Option value={i.ab.toLocaleLowerCase()}*/}
            {/*                                                      label={i.country_name_en}>{i.country_name_en}</Select.Option>*/}
            {/*                            })}*/}
            {/*                        </Select>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="City"*/}
            {/*                        name="city"*/}
            {/*                        rules={[{required: true, message: "Please input your city!"}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                </>}*/}
            {/*                {type === 'club' && <>*/}
            {/*                    /!* <h3>Contact</h3> *!/*/}

            {/*                    <Form.Item*/}
            {/*                        label="Club Leader’s name"*/}
            {/*                        name="leader"*/}
            {/*                        rules={[{required: true}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="Club Leader’s email"*/}
            {/*                        name="leaderEmail"*/}
            {/*                        rules={[{required: true}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                    /!* <h3>Club information</h3> *!/*/}
            {/*                    <Form.Item*/}
            {/*                        label="School"*/}
            {/*                        name="school"*/}
            {/*                        rules={[{required: true}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="Country"*/}

            {/*                        name="country"*/}
            {/*                        rules={[*/}
            {/*                            {required: true, message: "Please input your password!"},*/}
            {/*                        ]}*/}
            {/*                    >*/}
            {/*                        <Select*/}
            {/*                            initialvalues="0"*/}
            {/*                            // style={{width: 120}}*/}
            {/*                            showSearch*/}
            {/*                            optionFilterProp="label"*/}
            {/*                        >*/}
            {/*                            {cyList.filter((i) => i.ab).map((i) => {*/}
            {/*                                return <Select.Option value={i.ab.toLocaleLowerCase()}*/}
            {/*                                                      label={i.country_name_en}>{i.country_name_en}</Select.Option>*/}
            {/*                            })}*/}

            {/*                        </Select>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="City"*/}
            {/*                        name="city"*/}
            {/*                        rules={[{required: true, message: "Please input your city!"}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        label="More about"*/}
            {/*                        name="moreAbout"*/}
            {/*                        rules={[{required: true}]}*/}
            {/*                    >*/}
            {/*                        <Input/>*/}
            {/*                    </Form.Item>*/}

            {/*                </>}*/}
            {/*                <Form.Item*/}
            {/*                    label="Username"*/}
            {/*                    name="account"*/}
            {/*                    rules={[{required: true, message: "Please input your username!"}, {*/}
            {/*                        max: 30,*/}
            {/*                        message: "Up to 30 characters!"*/}
            {/*                    }]}*/}
            {/*                    // style={{backgroundColor: "#E0DECA"}}*/}
            {/*                >*/}
            {/*                    <Input/>*/}
            {/*                </Form.Item>*/}

            {/*                <Form.Item*/}
            {/*                    label="Password"*/}
            {/*                    name="password"*/}
            {/*                    rules={[{required: true, message: "Please input your password!"},*/}
            {/*                        {*/}
            {/*                            pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/),*/}
            {/*                            message: "At least 8 digits, upper and lower case and numbers!"*/}
            {/*                        }]}*/}
            {/*                    // style={{backgroundColor: "#E0DECA"}}*/}
            {/*                >*/}
            {/*                    <Input.Password/>*/}
            {/*                </Form.Item>*/}

            {/*            </>*/}
            {/*        )}*/}


            {/*        {isLogin && (*/}
            {/*            <>*/}
            {/*                <Form.Item*/}
            {/*                    label="username"*/}
            {/*                    name="account"*/}
            {/*                    rules={[{required: true, message: "Please input your username!"}, {*/}
            {/*                        max: 30,*/}
            {/*                        message: "Up to 30 characters!"*/}
            {/*                    }]}*/}
            {/*                    // style={{backgroundColor: "#E0DECA"}}*/}
            {/*                >*/}
            {/*                    <Input/>*/}
            {/*                </Form.Item>*/}

            {/*                <Form.Item*/}
            {/*                    label="password"*/}
            {/*                    name="password"*/}
            {/*                    rules={[{required: true, message: "Please input your password!"},*/}
            {/*                    ]}*/}
            {/*                    // style={{backgroundColor: "#E0DECA"}}*/}
            {/*                >*/}
            {/*                    <Input.Password/>*/}
            {/*                </Form.Item>*/}
            {/*                <Form.Item>*/}
            {/*                    <Button type="primary" htmlType="submit"*/}
            {/*                            style={{marginRight: "25px", marginLeft: "200px"}}*/}
            {/*                    >*/}
            {/*                        登录*/}
            {/*                    </Button>*/}
            {/*                </Form.Item>*/}
            {/*            </>*/}
            {/*        )}*/}

            {/*        {!isLogin && (*/}
            {/*            <Form.Item>*/}
            {/*                <Button type="primary" htmlType="submit"*/}
            {/*                        style={{marginRight: "25px", marginLeft: "200px"}}>*/}
            {/*                    注册*/}
            {/*                </Button>*/}
            {/*            </Form.Item>*/}
            {/*        )}*/}
            {/*    </Form>*/}
            {/*</Modal>*/}
            {/*</div>*/}
        </div>
    );
};

export default withRouter(App);