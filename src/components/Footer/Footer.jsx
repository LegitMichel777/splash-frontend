import React, { } from "react";

const Footer = ({ styles }) => {
    let dstyles = {
        backgroundColor: "#1d2e56"
        , color: "white",
        width: "100%",
        height: 60,
        // clear: "both", 
        // position:'absolute',
        bottom: 0,
        position: 'absolute',
        textAlign: 'center',
    }
    return (
        <div className="footer" style={dstyles}>
            <p>Contact Us:<a href="mailto:team@splashstem.org">team@splashstem.org</a></p>
        </div>
    )
}
export default Footer;