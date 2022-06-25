import React, {Component} from "react";
import common from "../../config/common";
import {Button, Col, Form, Input, Modal, Tag} from "antd";
import "./HomePage.css";
import "./BigSplash.css";
import "./WorldMap.css";
import "./Programs.css";
import "./Resources.css";
import "./Partners.css";
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

        return (
            <div id={"master-container"}>
                <div id={"mission-statement-container"}>
                    <h1 id={"mission-statement-message"}>Helping High School STEM Clubs globally for local charity</h1>
                </div>

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
                    <div id={"programs-preview"}>
                        <Cards imageUrl={"/images/program-placeholder.jpg"} title={"Club Fairs"}
                               description={"blahblah little desc about club fairsblahblah little desc about club fairsdfsafdsfasfdasfs"}/>
                        <Cards imageUrl={"/images/program-placeholder.jpg"} title={"Club Fairs"}
                               description={"blahblah little desc about club fairsblahblah little desc about club fairs"}/>
                        <Cards imageUrl={"/images/program-placeholder.jpg"} title={"Club Fairs"}
                               description={"blahblah little desc about club fairsblahblah little desc about club fairs"}/>
                    </div>
                </div>

                <div id={"resources-container"}>
                    <div id={"resources-description"}>
                        <div id={"resources-description-inner-container"}>
                            <h1>Resources</h1>
                            <div id={"resources-description"}>yadayadayada, talk about our resources and stuff.
                                yadayadayada, talk about our resources and stuff. yadayadayada, talk about our our our
                                our our our our resources and stuff.
                            </div>
                            <div id={"resources-view-more"}>
                                See our resources
                                <img id={"resources-view-more-plus"} src={"/images/plus-icon.svg"}>
                                </img>
                            </div>
                        </div>
                    </div>
                    <div id={"resources-image"} style={{backgroundImage: 'url(images/resources.png)'}}>
                    </div>
                </div>

                <div id={"partner-container"}>
                    <h1>Our Partners</h1>
                    <div id={"partner-inner-container"}>
                        <img style={{width: 217, height: 121}} className={"partner-inner-container-item"} src={"/images/sponsor-global-youth-logo.jpg"}/>
                        <img style={{width: 227, height: 196}} src={"/images/sponsor-jiu-qian-logo.jpg"}/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
