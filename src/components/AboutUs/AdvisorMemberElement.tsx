// @ts-ignore
import React from 'react';
// @ts-ignore
import PropTypes from 'prop-types';
import {MemberData} from "./index";
import "./AdvisorMemberElement.css"
export default function AdvisorMemberElement(props) {
    let data: MemberData = props.data;
    return (
        <div className={"about-advisor-element"}>
            <img src={require("/public/images/about-us/"+data.id+".jpg")} className={"about-advisor-image"} />
            <div className={"about-advisor-data"}>
                <div className={"about-advisor-name"}>{data.name}</div>
                <div className={"about-advisor-title"}>{data.title}</div>
                <div className={"about-advisor-description"}>{data.description}</div>
            </div>
        </div>
    )
}
AdvisorMemberElement.propTypes = {
    data: PropTypes.object.isRequired
}