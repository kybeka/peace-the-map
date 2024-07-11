// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './MapComponent.css';
import TitleComponent from './TitleComponent';

const MapComponent = () => {
    const [markers, setMarkers] = useState([]);
    const [newMarker, setNewMarker] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/markers')
            .then(response => setMarkers(response.data))
            .catch(error => console.error(error));
    }, []);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setNewMarker({
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng
                });
            }
        });
        return null;
    };

    const handleSaveMarker = () => {
        if (newMarker && message) {
            axios.post('http://localhost:5000/markers', {
                latitude: newMarker.latitude,
                longitude: newMarker.longitude,
                message: message
            })
            .then(response => {
                setMarkers([...markers, response.data]);
                setNewMarker(null);
                setMessage("");
            })
            .catch(error => console.error(error));
        }
    };

    return (
        <div>
             <TitleComponent text="Queering the Map" />
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
                {newMarker && (
                    <Marker position={[newMarker.latitude, newMarker.longitude]}>
                        <Popup>
                            <div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message"
                                />
                                <button onClick={handleSaveMarker}>Save</button>
                            </div>
                        </Popup>
                    </Marker>
                )}
                <MapEvents />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
