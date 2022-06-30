// @ts-ignore
import React from 'react';
// @ts-ignore
import PropTypes from 'prop-types';
import {MemberData} from "./index";
import "./AboutMemberElement.css"
export default function AboutMemberElement(props) {
    let data: MemberData = props.data;
    return (
        <div className={"about-member-element"}>
            <img src={"/images/about-us/"+data.id+".jpg"} className={"about-member-image"} />
            <div className={"about-member-name"}>{data.name}</div>
            <div className={"about-member-title"}>{data.title}</div>
            <div className={"about-member-description"}>{data.description}</div>
        </div>
    )
}
AboutMemberElement.propTypes = {
    data: PropTypes.object.isRequired
}