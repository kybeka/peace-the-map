// src/components/MarkerForm.js
import React, { useState } from 'react';
import axios from 'axios';

const MarkerForm = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/markers', { latitude, longitude, message });
        setLatitude('');
        setLongitude('');
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message"></textarea>
            <button type="submit">Add Marker</button>
        </form>
    );
};

export default MarkerForm;
