/*
 * @Author: zhouHui
 * @Date: 2022-06-21 11:37:24
 * @LastEditors: zhouHui
 * @LastEditTime: 2022-06-21 11:39:52
 * @Description: 
 * 
 * Copyright (c) 2022 by zhouHui, All Rights Reserved. 
 */

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
    // if (styles) {
    //     dstyles = {
    //         ...dstyles,
    //         ...styles
    //     }
    // }
    return (
        <div className="footer" style={dstyles}>
            <p>Contact Us:<a href="mailto:team@splashstem.org">team@splashstem.org</a></p>
        </div>
    )
}
export default Footer;