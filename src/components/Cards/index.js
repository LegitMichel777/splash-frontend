import React from 'react';
import PropTypes from 'prop-types';
import './Cards.css';

export default function Cards(props) {
    return (
        <div className={"card-master-container"}>
            <div className={"card-image-container"} style={{backgroundImage: 'url('+props.imageUrl+')'}}>
            </div>
            <div className={"card-header"}>{props.title}</div>
            <div className={"card-description"}>{props.description}</div>
        </div>
    )
}
Cards.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};