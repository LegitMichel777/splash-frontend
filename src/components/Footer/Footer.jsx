import React, { } from "react";
import "./footer.css"

const Footer = ({ styles }) => {
    return (
        <div id="footer-container">
            <div id={"footer-inner-container"}>
                <div id={"upper-footer"}>
                    <div id={"footer-inquiries"}>Any inquiries? Contact us at splashemail@splash.org</div>
                    <div id={"footer-social-media"}>
                        <a href={"https://www.youtube.com"} className={"footer-social-media-item"}>
                            <img src={"/images/icons/social-media/youtube-icon.png"} style={{width: 40, height: 28}}/>
                        </a>
                        <a href={"https://www.instagram.com"} className={"footer-social-media-item"}>
                            <img src={"/images/icons/social-media/instagram-icon.png"} style={{width: 28, height: 28}}/>
                        </a>
                        <a href={"https://www.twitter.com"} >
                            <img src={"/images/icons/social-media/twitter-icon.png"} style={{width: 34, height: 28}}/>
                        </a>
                    </div>
                </div>
                <div id={"footer-copyright"}>© 2022 SPLASH. All Rights Reserved.</div>
            </div>
        </div>
    )
}
export default Footer;