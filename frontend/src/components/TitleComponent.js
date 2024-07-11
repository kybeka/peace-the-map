import React from 'react';
import './TitleComponent.css';

const TitleComponent = ({ text }) => {
    return (
        <div className="title">
            {text}
        </div>
    );
};

export default TitleComponent;
