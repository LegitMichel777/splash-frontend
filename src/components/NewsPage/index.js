import React from 'react'
import "./NewsPage.scss";
import EventCards from "./EventCards";
import Footer from "../Footer/Footer";

const NewsPage = (props) => {
    return (
        <div>
            <EventCards />
            <Footer
               styles={{
                position: "absolute",
                bottom: 0
            }}
            />
        </div>
    )
}

export default NewsPage;