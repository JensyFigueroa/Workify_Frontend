import React, { useState ,useEffect } from "react";
import styles from "./UserProfile.module.css";
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from "../../../redux/actions";
//icons Mui
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function UserProfile() {
 
  const [showServiceContent, setShowServiceContent] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [showEditProfile, setshowEditProfile] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const idUser = useSelector(state => state.currentUserIdLoggedIn)
  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  console.log(userInfo);

  useEffect(() => {
    dispatch(getUser(idUser));
  }, [dispatch, idUser])


  //<--MANEJADOR DE PERFIL-->
  const handleProfileClick = () => {
    setShowProfileSection(true);
    setShowServiceContent(false);
    setShowMyOrders(false);
    setshowEditProfile(false);
    setInitialLoad(false);

  };
  
  //<--MANEJADOR DE EDITOR DE PERFIL-->
  const handleEditProfileClick = () => {
    setShowProfileSection(false);
    setshowEditProfile(true);
    setShowServiceContent(false);
    setShowMyOrders(false);
    setInitialLoad(false);
  };

  //<--MANEJADOR DE SERVICIOS-->
  const handleServiceClick = () => {
    setShowServiceContent(true);
    setShowProfileSection(false);
    setShowMyOrders(false);
    setshowEditProfile(false);
    setInitialLoad(false);
  };

//<--MANEJADOR DE COMPRAS-->
  const handleMyOrdersClick = () => {
    setShowServiceContent(false);
    setShowProfileSection(false);
    setShowMyOrders(true);
    setshowEditProfile(false);
    setInitialLoad(false);
  };
  



  return (
  <div className={styles.containerPrincipal}>
      <h4>Account Settings</h4>
    <div className={styles.containerSecundary}>
      <div className={styles.containerLeftRight}>
        <div className={styles.columnLeft}>
            <h3 className={styles.name}>Profile Settings</h3>
        <button type="button" class="btn btn-primary btn-lg" value="My profile" onClick={handleProfileClick}>My profile</button>
        <button type="button" class="btn btn-primary btn-lg" value="My profile" onClick={handleEditProfileClick}>Edit profile</button>
        <button type="button" class="btn btn-primary btn-lg" value="Service" onClick={handleServiceClick}>Services</button>
        <button type="button" class="btn btn-primary btn-lg" value="Logout" onClick={handleMyOrdersClick}>Orders</button>
      </div>
      {(initialLoad) && (
      <div className={styles.infoProfileContainer}>
      <div className={styles.infoProfile}>
            <h5><strong>My profile</strong></h5>
            <div className={styles.profile1}>
              <img src={userInfo.imageUrl}/>
              <div className={styles.profileson}>
                <h5><strong>{userInfo.name}</strong></h5>
                <p>{userInfo.country ? userInfo.country : "Please confirm your country"}</p>
              </div>
            </div>
            <div className={styles.profile2}>
              <h5><strong>Personal information</strong></h5>
              <div className={styles.profilep} >
                <p>Full Name: <strong>{userInfo.name}</strong></p>
                <p>Email address: <strong>{userInfo.email}</strong></p>
              </div>
              <div className={styles.profilep1}>
                <p>Phone: <strong>{userInfo.phone ? userInfo.phone : "Please confirm your phone"}</strong></p>
              </div>
            </div>
            <div className={styles.profile3}>
              <h5><strong>Address</strong></h5>
              <div className={styles.profilep2}>
                <p>Country: <strong>{userInfo.country ? userInfo.country : "Please confirm your country"}</strong></p>
                <p>City: <strong>{userInfo.city ? userInfo.city : "Please confirm your city"}</strong></p>
              </div>
            </div>
      </div>
      </div>
      )}
    </div>
      <div className={styles.columnRight}>
        {showProfileSection && (
          <div className={styles.infoProfile}>
          <h5><strong>My profile</strong></h5>
          <div className={styles.profile1}>
            <img src={userInfo.imageUrl}/>
            <div className={styles.profileson}>
              <h5><strong>{userInfo.name}</strong></h5>
              <p>{userInfo.country ? userInfo.country : "Please confirm your country"}</p>
            </div>
          </div>
          <div className={styles.profile2}>
            <h5><strong>Personal information</strong></h5>
            <div className={styles.profilep} >
              <p>Full Name: <strong>{userInfo.name}</strong></p>
              <p>Email address: <strong>{userInfo.email}</strong></p>
            </div>
            <div className={styles.profilep1}>
              <p>Phone: <strong>{userInfo.phone ? userInfo.phone : "Please confirm your phone"}</strong></p>
            </div>
          </div>
          <div className={styles.profile3}>
            <h5><strong>Address</strong></h5>
            <div className={styles.profilep2}>
              <p>Country: <strong>{userInfo.country ? userInfo.country : "Please confirm your country"}</strong></p>
              <p>City: <strong>{userInfo.city ? userInfo.city : "Please confirm your city"}</strong></p>
            </div>
          </div>

    </div>
        )}

        {showEditProfile && (
          <>
            <div className={styles.title}>
              <p><strong>My information</strong></p>
            </div>
            <div className={styles.containerEditProfile}>

              <div>
                <p>Profile Image:</p>
                <p>Name:</p>
                <p>Email:</p>
                <p>Country:</p>
                <p>City:</p>
                <p>Phone:</p>
                <p>Description:</p>

              </div>
            </div>
          </>
        )}
        {showServiceContent && (
        <>
        <div className={styles.title}>
          <p><strong>My services</strong></p>
        </div>
       
          {userInfo.Services.map((service, index) => ( 
          <div key={index} className={styles.containerService}>
              <img src={service.imageUrl[0]}/>
              <div>
                <p><strong>{service.nameService}</strong></p>
                <p>{service.location?.pais} -{" "}
                {service.location?.ciudad}</p>
                <p>Price per hour: ${service.pricePerHour}</p>
            </div>
                <div className={styles.descriptionService}>
                  
                </div>
          </div>))}
        
          
          
         </>
        )}
        {showMyOrders && (
          <>
        <div className={styles.title}>
          <p><strong>My orders</strong></p>
        </div>
          <div className={styles.containerOrder}>ORDER
          
          </div>
          
          </>
        )}
        
        </div>
      </div>
  </div>
  );
}


