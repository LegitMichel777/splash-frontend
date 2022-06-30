import React from "react";
import "../HomePage/Resources.css";

export default function Resources() {
    return (
        <div id={"resources-container"}>
            <div id={"resources-description"}>
                <div id={"resources-description-inner-container"}>
                    <h1>Resources</h1>
                    <div id={"resources-description"}>
                        Through our resources, we empower STEM clubs and students to educate underprivileged members of their communities and ignite a passion for STEM. Our resources include STEM camps, activities, and learning resources that enable other students to learn and teach STEM.
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
    )
}