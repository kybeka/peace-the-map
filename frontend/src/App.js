// src/App.js
import React from 'react';
import MapComponent from './components/MapComponent';
import MarkerForm from './components/MarkerForm';

const App = () => {
    return (
        <div>
            <h1>Queering the Map</h1>
            <MarkerForm />
            <MapComponent />
        </div>
    );
};

export default App;
