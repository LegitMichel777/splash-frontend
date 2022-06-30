// @ts-ignore
import React from 'react';
// @ts-ignore
import {advisorMembers, teamMembers} from "./AboutUsData.ts";
// @ts-ignore
import AboutMemberElement from "./AboutMemberElement.tsx";
import "./AboutUs.css";
// @ts-ignore
import AdvisorMemberElement from "./AdvisorMemberElement.tsx";
export type MemberData = {
    id: string,
    name: string,
    title: string,
    description: string
}
export default function AboutUs() {
    return (
        <div id={"about-us-container"}>
            <div id={"team-members-container"}>
                <h1>Team Members</h1>
                <div id={"team-members-grid"}>
                    {teamMembers.map(function(object) {
                        return <AboutMemberElement data={object}></AboutMemberElement>
                    })}
                </div>
            </div>
            <div id={"advisor-members-container"}>
                <h1>Advisors</h1>
                <div id={"advisor-members-grid"}>
                    {advisorMembers.map(function(object) {
                        return <AdvisorMemberElement data={object}></AdvisorMemberElement>
                    })}
                </div>
            </div>
        </div>
    )
}
