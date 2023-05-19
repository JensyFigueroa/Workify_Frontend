import { useState } from 'react'
import styles from './SearchBar.module.css'
import { GrLocation } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa";
import Location from '../Location/Location';
// import { API_KEY } from './apiKey';

const SearchBar = () => {
    const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
    const [address, setAddress] = useState('');

    const getCurrentLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    getAddressFromCoordinates(latitude, longitude);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    const handleChange = (event) => {
      setAddress(event.target.value);
    };
  

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
            const data = await response.json();
            console.log(data)
            if (data.results && data.results.length > 0) {
                setAddress(data.results[0].formatted_address);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form className={styles.search}>
                <div className="input-group">
                    <span className={`${styles.inputGroupText} input-group-text`}>
                        <button type="button" className={`${styles.location} dropdown-toggle`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <GrLocation className={styles.icoLocation} /> Location
                        </button>
                    </span>

                    {/* <input type="text" className="form-control" placeholder="Place or area" aria-label="" /> */}
                    <input type="text" className={`${styles.inputSearch} form-control`} placeholder="Search service or worker" aria-label="Server" />
                    <span className={`${styles.inputGroupText} input-group-text`}><button className={styles.location}><i className="fa-solid fa-magnifying-glass"></i></button></span>
                </div>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Indicate your location</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Address:</label>
                                    <input type="text" className="form-control" id="recipient-name" onChange={handleChange} value={address} />
                                </div>
                            </div>
               
                            <div className="modal-body" onClick={getCurrentLocation}>
                                <Link className={styles.linkLocation}><FaLocationArrow /> Use my current location</Link>
                            </div>
                            <Location currentLocation={currentLocation} />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Find</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        </>
    )
}

export default SearchBar