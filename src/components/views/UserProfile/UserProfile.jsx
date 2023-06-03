import React, { useState ,useEffect } from "react";
import styles from "./UserProfile.module.css";
import {useSelector} from 'react-redux'
import axios from 'axios'

//icons Mui
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showServiceContent, setShowServiceContent] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [showChangeProfile, setshowChangeProfile] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const idUser = useSelector(state => state.currentUserIdLoggedIn)
  
  

  useEffect(async () => {
    // const objUser =  () => {
      const user =(await axios.get(`/user/${idUser}`)).data
      console.log(user)
      return user
    // }
    // console.log(objUser,'user')
  },[])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceClick = () => {
    setShowForm(false);
    setShowServiceContent(true);
    setShowProfileSection(false);
    setShowLogoutMessage(false);
   
  };

  const handleProfileClick = () => {
    setShowForm(true);
    setShowProfileSection(true);

    setShowServiceContent(false);
    setShowLogoutMessage(false);
  };

  const handleLogoutClick = () => {
    setShowForm(false);
    setShowServiceContent(false);
    setShowProfileSection(false);
    setShowLogoutMessage(true);
  
  };
  const handleChangesProfile = () => {
    setShowForm(false);
    setShowServiceContent(false);
    setShowProfileSection(false);
    setShowLogoutMessage(false);

  };



  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.columnLeft}>
        <h2 className={styles.name}>Name</h2>
        <div className={styles.imageSubmit}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{ width: "250px", height: "250px" }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <button type="button" class="btn btn-primary btn-lg" value="My profile" onClick={handleProfileClick}>My profile</button>
        <button type="button" class="btn btn-primary btn-lg" value="Service" onClick={handleServiceClick}>Service</button>
        <button type="button" class="btn btn-primary btn-lg" value="Logout" onClick={handleLogoutClick}>Logout</button>
      </div>
      <div className={styles.columnRight}>
        {showProfileSection && (
          <div className={styles.containerForm}>
            <h3>My Profile date</h3>
            <form>
              <div class="form-row ">
                <div class="form-group col-md-6">
                  <label>Name</label>
                  <input
                    type="name"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Gonzalo"
                   
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Last name</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Last name..."
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6 ">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email..."
                  />
                </div>
                <div class="form-group col-md-6 ">
                  <label for="inputPassword4">Phone</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Phone..."
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6 ">
                  <label for="inputEmail4">Country</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Country..."
                  />
                </div>
                <div class="form-group col-md-6 ">
                  <label for="inputPassword4">City</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="City..."
                  />
                </div>
              </div>
         
              <button type="submit" class="btn btn-success btn-lg btn-block">
                Save changes
              </button>
            </form>

          </div>
        )}
        {showServiceContent && (
          <div className="list-group">
            <a
              href="#"
              class="list-group-item list-group-item-action flex-column align-items-start "
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small>3 days ago</small>
              </div>
              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam seget risus varius blandit.
              </p>
              <small>Donec id elit non mi porta.</small>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>
              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>
              <small class="text-muted">Donec id elit non mi porta.</small>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>
              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>
              <small class="text-muted">Donec id elit non mi porta.</small>
            </a>
          </div>
        )}
        {showLogoutMessage && <div className={styles.message}>Ya te quieres ir? :(</div>}
      </div>
    </div>
  );
}


/* 

<div className={styles.containerForm}>
            <h2 className={styles.h3info}>My personal information</h2>
            <form>
              <div class="form-row ">
                <div class="form-group col-md-6">
                  <label>Name</label>
                  <input
                    type="name"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Name..."
                   
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Last name</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Last name..."
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6 ">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email..."
                  />
                </div>
                <div class="form-group col-md-6 ">
                  <label for="inputPassword4">Phone</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Phone..."
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6 ">
                  <label for="inputEmail4">Country</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Country..."
                  />
                </div>
                <div class="form-group col-md-6 ">
                  <label for="inputPassword4">City</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="City..."
                  />
                </div>
              </div>
         
              <button type="submit" class="btn btn-success btn-lg btn-block">
                Save changes
              </button>
            </form>
          </div>



*/