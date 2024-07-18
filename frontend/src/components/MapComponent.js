// src/components/MapComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import axios from 'axios';
import './MapComponent.css';
import markerPic from '../assets/small-marker.png';
import TitleComponent from './TitleComponent';

const MapComponent = () => {
    const [markers, setMarkers] = useState([]);
    const [newMarker, setNewMarker] = useState(null);
    const [message, setMessage] = useState("");
    const mapRef = useRef(null);

    const customMarker = new L.icon({
        iconUrl: markerPic,
        //iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
      });

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
             <TitleComponent text="Peacing the Map" />
            <MapContainer center={[51.505, -0.09]} zoom={13} ref={mapRef} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map(marker => (
                    <Marker  icon={customMarker} key={marker.id} position={[marker.latitude, marker.longitude]}>
                        <Popup>
                            {marker.message}
                        </Popup>
                    </Marker>
                ))}
                {newMarker && (
                    <Marker icon={customMarker} position={[newMarker.latitude, newMarker.longitude]}>
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
