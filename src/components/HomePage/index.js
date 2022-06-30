import React, {Component} from "react";
import common from "../../config/common";
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
import Link from "react-router-dom/es/Link";

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
            <div id={"home-page-container"}>
                <div id={"mission-statement-container"}>
                    <h1 id={"mission-statement-message"}>Helping High School STEM Clubs globally for local charity</h1>
                </div>

                <div id={"big-splash-container"}>
                    <h1 id={"big-splash-heading"}>A Big Splash.</h1>
                    <div className={"splash-stats-container"}>
                        <div className={"splash-stats"}>
                            <h1 className={"stat-number"}>2</h1>
                            <div className={"stat-name"}>High School STEM Clubs</div>
                        </div>
                        <div className={"splash-stats center-splash-stat"}>
                            <h1 className={"stat-number"}>50</h1>
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
                        <Cards imageUrl={"/images/program-local_charity.jpg"} title={"STEM Clubs for local charities"}
                               description={"We empower STEM clubs and students to educate underprivileged members of their communities and ignite a passion for STEM by providing STEM camps and activities resources."}/>
                        <Cards imageUrl={"/images/program-seminar.jpg"} title={"Seminars & Workshops"}
                               description={"In our seminars and workshops, SPLASH members, professionals in STEM fields, and experienced philanthropists share their valuable experiences in leadership, charity, or curriculum design."}/>
                        <Cards imageUrl={"/images/program-club_fair.jpg"} title={"Club Fairs"}
                               description={"SPLASH holds club fairs where students can network with their peers and meet similarly passionate people about STEM and STEM education."}/>
                    </div>
                </div>

                <div id={"resources-container"}>
                    <div id={"resources-description"}>
                        <div id={"resources-description-inner-container"}>
                            <h1>Resources</h1>
                            <div id={"resources-description"}>
                                Through our resources, we empower STEM clubs and students to educate underprivileged members of their communities and ignite a passion for STEM. Our resources include STEM camps, activities, and learning resources that enable other students to learn and teach STEM.
                            </div>
                            <Link to="/resources">
                                <div id={"resources-view-more"}>
                                    See our resources
                                    <img id={"resources-view-more-plus"} src={"/images/plus-icon.svg"}>
                                    </img>
                                </div>
                            </Link>
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
            </div>
        );
    }
}
