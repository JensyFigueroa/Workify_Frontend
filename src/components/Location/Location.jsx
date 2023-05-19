import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { API_KEY } from '../searchBar/apiKey';

const Location = (props) => {

    const containerStyle = {
        width: '100%',
        height: '400px',
    };

    return (
        <>
            {props.currentLocation.logitude !== 0 && props.currentLocation.latitude !== 0 ?
                <LoadScript googleMapsApiKey='AIzaSyBT-R7lOIPDD6feX6Q_xIM2qyysZ9ELSS0'>
                    <GoogleMap mapContainerStyle={containerStyle} center={props.currentLocation} zoom={10}>
                        {props.currentLocation && <Marker position={props.currentLocation} />}
                    </GoogleMap>
                </LoadScript>
                : ''}
        </>
    )
}

export default Location