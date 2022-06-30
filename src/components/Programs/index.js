import React from 'react';
import "../HomePage/Programs.css";
import Cards from "../Cards";

export default function Programs() {
    return (
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
    )
}