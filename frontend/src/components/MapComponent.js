// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/markers')
            .then(response => setMarkers(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map(marker => (
                <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
                    <Popup>
                        {marker.message}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
