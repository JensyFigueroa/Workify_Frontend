import React, { useState ,useEffect } from "react";
import styles from "./UserProfile.module.css";
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from "../../../redux/actions";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

export default function UserProfile() {
 
  const [showServiceContent, setShowServiceContent] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [showEditProfile, setshowEditProfile] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enabledInputs, setEnabledInputs] = useState({
    input1: false,
    input2: false,
    input3: false,
    input4: false,
    input5: false,
    input6: false,
  });
  const idUser = useSelector(state => state.currentUserIdLoggedIn)
  const userInfo = useSelector(state => state.userInfo);
  const [services, setServices] = useState(userInfo.Services);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    imageUrl: "",
    name: "", 
    country: "",
    city: "",
    email: "", 
    description: "",
    phone: "",
  });
  
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
  
  //<--MANEJADOR DE BOTON SWITCH-->
  const handleSwitchChange = (serviceId) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, enabled: !service.enabled }
          : service
      )
    );
  };
  //<--MANEJADOR DE CLICK EN FLECHA PARA HABILITAR INPUT-->
  const handleArrowClick = (inputName) => {
    setEnabledInputs(prevState => ({
      ...prevState,
      [inputName]: !prevState[inputName] 
    }));
  };

  //<--MANEJADOR DE INPUTS-->
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    if (name === "imageUrl") {
      const file = event.target.files[0];
      const imageSelected = URL.createObjectURL(file);
      setSelectedImages([imageSelected]);
    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "services_wfy");
      formData.append("api_key", "168773883428854");
    
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/Joaquin/image/upload",
          formData
        );
    
        const imageUrl = response.data.secure_url;
        
    
        setInputs({
          ...inputs,
          imageUrl: [...inputs.imageUrl, imageUrl],
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else{
      
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  }
  //<--MANEJADOR DEL SUBMIT-->
  const handleSubmit = async(event) => {
      event.preventDefault();

    //<--RUTA DEL POST-->
    try {
      await axios
        .put(`/${userInfo.id}`, inputs)
        .then((response) => toast.success(response.data));
       
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
  <div className={styles.containerPrincipal}>
      <h4>Account Settings</h4>
    <div className={styles.containerSecundary}>
      <div className={styles.containerLeftRight}>
        <div className={styles.columnLeft}>
        <button type="button" className={`${styles.buttonLeft}`}  onClick={handleProfileClick}>My profile</button>
        <button type="button" className={`${styles.buttonLeft}`}  onClick={handleEditProfileClick}>Edit profile</button>
        <button type="button" className={`${styles.buttonLeft}`}  onClick={handleServiceClick}>Services</button>
        <button type="button" className={`${styles.buttonLeft}`}  onClick={handleMyOrdersClick}>Orders</button>
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
           <form
            className="row g-3 needs-validation"
            onSubmit={handleSubmit}
            novalidate
          >
            <div className={styles.title1}>
              <p><strong>My personal information</strong></p>
              <p className={styles.titlep}>You can modify the information if you wish by clicking on the arrow</p>

            </div>
            <div className={styles.containerEditProfile}>

              <div>
                <div className={styles.subtitle}>
                  <p><strong>Basic information</strong></p>
                </div>
               
                <div className={styles.imageProfile}>
                  <p><strong>Profile Image</strong> </p>
                  <p>A profile photo helps personalize your account</p>
                  <div className={styles.inputImage}>
                    <img src={selectedImages.length > 0 ? selectedImages[0] : userInfo.imageUrl} alt="Profile" />
                    <input
                      name="imageUrl"
                      type="file" 
                      onChange={handleInputChange}
                    />
                </div>
              
                 
                </div>
                <div className={styles.imageProfile}>
                  <p><strong>Name</strong></p>
                  <p>{userInfo.name}</p>
                  <i className={`${styles.arrow} && bi bi-caret-right-fill`} onClick={() => handleArrowClick('input1')}></i>
                  <input
                  name="name" 
                  value={inputs.name}
                  onChange={handleInputChange}
                  type="name" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New name"
                  disabled={!enabledInputs.input1}
                  >
                  </input>
                </div>

                <div className={styles.imageProfile}>
                  <p><strong>Country</strong></p>
                  <p>{userInfo.country ? userInfo.country : "Please confirm your country"}</p>
                  <i className={`${styles.arrow5} && bi bi-caret-right-fill`} onClick={() => handleArrowClick('input2')}></i>
                  <input 
                  name="country" 
                  value={inputs.country}
                  onChange={handleInputChange}
                  type="text" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New country"
                  disabled={!enabledInputs.input2}></input>
                </div>

                <div className={styles.imageProfileCity}>
                  <p><strong>City</strong></p>
                  <p>{userInfo.city ? userInfo.city : "Please confirm your country"}</p>
                  <i className={`${styles.arrow1} && bi bi-caret-right-fill`} onClick={() => handleArrowClick('input3')} ></i>
                  <input 
                  name="city" 
                  value={inputs.city}
                  onChange={handleInputChange}
                  type="text" 
                  className={`${styles.inputControl1} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New city"
                  disabled={!enabledInputs.input3}></input>
                </div>

              </div>
            </div>
              <div className={styles.newInfo}>
              <div>
              <div className={styles.subtitle}>
                  <p><strong>Contact information</strong></p>
                </div>
                <div className={styles.imageProfile}>
                  <p><strong>Email</strong></p>
                  <p>{userInfo.email}</p>
                  <i className={`${styles.arrow2} && bi bi-caret-right-fill`} onClick={() => handleArrowClick('input4')} ></i>
                  <input 
                  name="email" 
                  value={inputs.email}
                  onChange={handleInputChange}
                  type="email" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New email"
                  disabled={!enabledInputs.input4}></input>
                </div>

                <div className={styles.imageProfile}>
                  <p><strong>Description</strong></p>
                  <p className={styles.pAlign}>{userInfo.description ? userInfo.description : "Please confirm a description"}</p>
                  <i className={`${styles.arrow3} && bi bi-caret-right-fill`} onClick={() => handleArrowClick('input5')} ></i>
                  <input 
                  name="description" 
                  value={inputs.description}
                  onChange={handleInputChange}
                  type="text" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New description"
                  disabled={!enabledInputs.input5}></input>
                </div>

                <div className={styles.imageProfileCity}>
                  <p><strong>Phone</strong></p>
                  <p>{userInfo.phone ? userInfo.phone: "Please confirm your phone"}</p>
                  <i className={`${styles.arrow4} && bi bi-caret-right-fill`} onClick={() => handleArrowClick('input6')}></i>
                  <input 
                  name="phone" 
                  value={inputs.phone}
                  onChange={handleInputChange}
                  type="name" 
                  className={`${styles.inputControl1} && form-control`} 
                  id="exampleFormControlInput1"
                  placeholder="New phone"
                  disabled={!enabledInputs.input6}></input>
                </div>

                </div>
              </div>
              <div className="col-12">
            <button
              type="submit"
              className={`${styles.myButton} btn btn-outline-secondary`} 
              disabled={isSubmitting}>
               {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
              </form>
          </>
        )}
        {showServiceContent && (
        <>
        <div className={styles.title}>
          <p><strong>My services</strong></p>
        </div>
       
          {userInfo.Services && userInfo.Services.map((service, index) => ( 
          <div key={index} className={styles.containerService}>
              <img src={service.imageUrl[0]}/>
              <div>
                <p><strong>{service.nameService}</strong></p>
                <p>{service.location?.pais} -{" "}
                {service.location?.ciudad}</p>
                <p>Price per hour: ${service.pricePerHour}</p>
            </div>
                <div className={styles.descriptionService}>
                <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id={`switchButton-${service.id}`}
                checked={service.enabled}
                onChange={() => handleSwitchChange(service.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`switchButton-${service.id}`}
              >
                {service.enabled ? 'Enabled' : 'Disabled'}
              </label>
            </div>
                  
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


