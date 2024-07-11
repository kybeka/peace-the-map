// src/App.js
import React from 'react';
import MapComponent from './components/MapComponent';
import TitleComponent from './components/TitleComponent';
// import MarkerForm from './components/MarkerForm';

const App = () => {
    return (
        <div>
            <TitleComponent />
            <MapComponent />
        </div>
    );
};

export default App;
