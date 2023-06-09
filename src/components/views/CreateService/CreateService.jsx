import { useEffect, useState } from "react";
import style from "../CreateService/CreateService.module.css";
import validate from "./validate";
import services from "./Services";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import service1 from "../CreateService/Images/Services (1).png";
import service2 from "../CreateService/Images/Services (2).png";
import service3 from "../CreateService/Images/Services (3).png";
import service4 from "../CreateService/Images/Services (4).png";
import service5 from "../CreateService/Images/Services (5).png";
import service6 from "../CreateService/Images/Services (6).png";
import service7 from "../CreateService/Images/Services (7).png";


export function CreateService() {


  
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cities, setCities] = useState([]);
  const [notification, setNotification] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  //daniel toco linea 23 y 24
    const uidService = useSelector((state) => state.currentUserIdLoggedIn);
    console.log(uidService, 'uid desde createservice con use selector');
  const [inputs, setInputs] = useState({
    nameService: "",
    location: {
      pais: "",
      ciudad: "",
    },
    imageUrl: [],
    description: "",
    pricePerHour: "",
    typeService: "",
    UserId: uidService,
  });
  const [touch, setTouch] = useState({
    nameService: false,
    location: {
      pais: false,
      ciudad: false,
    },
    imageUrl: false,
    description: false,
    pricePerHour: false,
    typeService: false,
  });
  const [errors, setErrors] = useState({
    nameService: "",
    location: {
      pais: "",
      ciudad: "",
    },
    imageUrl: [],
    description: "",
    pricePerHour: "",
    typeService: "",
  });

//<---SE MONTAN LOS PAISES-->
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/location/country', {
          params: {
            username: 'joaquinsgro',
            type: 'json'
          }
        });
        setCountries(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de países', error);
      }
    };

    fetchCountries();
  }, []);

  //<---FUNCIÓN PARA TRAER LAS CIUDADES--->
  const searchCities = async (countryCode) => {
    try {
      const response = await axios.get('/location/city', {
        params: {
          q: countryCode,
          username: 'joaquinsgro',
          type: 'json',
        },
      });
      
      console.log(response.data);
      setCities(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de estados', error);
    }
  };

//<-- FUNCIÓN PARA ASIGNAR EL PAIS A LAS CIUDADES-->
const handleCountryClick = (countryName) => {
  searchCities(countryName);
};

//<--MANEJADOR DE INPUTS Y CLOUDINARY-->
const handleInputChange = async (event) => {
  const { name, value } = event.target;

  if (name === "imageUrl") {
    const files = Array.from(event.target.files);
    const imagesSelected = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(imagesSelected);

    const formDataArray = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "services_wfy");
      formData.append("api_key", "168773883428854");
      return formData;
    });

    try {
      const uploadPromises = formDataArray.map((formData) =>
        axios.post(
          "https://api.cloudinary.com/v1_1/Joaquin/image/upload",
          formData
        )
      );

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.map((response) => response.data.secure_url);

      setInputs({
        ...inputs,
        imageUrl: [...inputs.imageUrl, ...imageUrls],
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  } else if (name === "pricePerHour" && parseFloat(value) < 0) {
    // No actualizar el estado si el valor es menor a 0
    return;
  } else {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  setErrors(
    validate({
      ...inputs,
      [name]: value,
    })
  );

  setTouch({
    ...touch,
    [name]: true,
  });
};


  //<--MANEJADOR DE INPUT LOCATION-->
  const handleInputLocation = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  //<--FUNCIÓN SUBMIT-->
  const handleSubmit = async (event) => {
    event.preventDefault();
   if(uidService.length === 0){
  toast.error('Must be logged in to create a Service')
   }else{
    //<---RUTA DEL POST--->
     try {
      await axios
        .post("/service/", inputs)
        .then((response) => toast.success(response.data));
        setIsSubmitting(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
   }
    
   
    
  };

  
  return (
    <div className={style.container}>
      <div className={style.containerform}>
      <div className={style.brother}>
        <p className={style.title}>WORKIFY</p>
        <h2>Start your journey with us</h2>
        <p>Expand your network of clients and let them discover your talented work by creating a service now!</p>
      <div className={style.imgs}>
          <img src={service1} alt= "services"/>
          <img src={service2} alt= "services"/>
          <img src={service3} alt= "services"/>
          <img src={service4} alt= "services"/>
          <img src={service5} alt= "services"/>
          <img src={service6} alt= "services"/>
          <img src={service7} alt= "services"/>

      </div>
      </div>
      <div className={style.form}>
        <h1>Create Service</h1>
        <form
          className="row g-3 needs-validation"
          onSubmit={handleSubmit}
          novalidate
        >
          <div className="mb-3">
            <label htmlFor="validationDefault04" className="form-label">
              Categories
            </label>
            <select
              className="form-select"
              name="typeService"
              value={inputs.typeService}
              onChange={handleInputChange}
              id="validationDefault04"
              required
            >
              <option disabled value="" >
                Select a category
              </option>
              {services.map((serv, index) => (
                <option key={index} value={serv}>
                  {serv}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="validationDefault04" className="form-label">
            Location
          </label>
          <div className="input-group mb-3">
            <span
              htmlFor="validationDefault01"
              className="input-group-text"
              id="inputGroup-sizing-default"
            >
              Country
            </span>
            <select
            name="pais"
            value={inputs.location.pais}
            onChange={handleInputLocation}
            id="validationDefault01"
            type="select"
            className="form-select"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onClick={() => {handleCountryClick(inputs.location.pais)}} 
            required>
              <option disabled value="" >
              Your country
              </option>
               {countries.map((country, index) => (
                <option key={index} value={country.code}>
                      {country.name}
                </option>
              ))}
            </select>
            <span
              htmlFor="validationDefault01"
              className="input-group-text"
              id="inputGroup-sizing-default"
            >
              City
            </span>
            <select
              name="ciudad"
              value={inputs.location.ciudad}
              onChange={handleInputLocation}
              id="validationDefault01"
              type="select"
              className="form-select"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              required>
            <option disabled value="" >
              Your city
              </option>
              {cities.length > 0 &&
              cities.map((city, index) => (
               <option key={index}>{city.name}</option>
                ))}
            </select>
          </div>
        
          <div className="mb-3">
             <label htmlFor="formFileMultiple" className="form-label">Your image or images</label>
             <input 
             name="imageUrl" 
             onChange={handleInputChange} 
             className="form-control" 
             type="file" 
             id="formFileMultiple" 
             multiple 
             required/>
          </div>
       
          {selectedImages.length > 0 && (
            <div>

            <p>Preview:</p>
            {selectedImages.map((imageUrl, index) => (
            <img className = {style.preview} key={index} src={imageUrl} alt="preview" />
                 ))}
          </div>
      )} 

          <div className="form-floating">
            <textarea
              name="description"
              value={inputs.description}
              onChange={handleInputChange}
              id="validationTextarea"
              className="form-control"
              placeholder="Leave a comment here"
              required
            />
            <label htmlFor="validationTextarea">Description</label>
            {touch.description && errors.description && (
              <p className="text-danger">{errors.description}</p>
            )}
          </div>

          <label htmlFor="basic-url" className="form-label">
            Price per hour
          </label>
          <div className={`${style.priceInput} input-group mb-3`}>
            <span htmlFor="validationDefault01" className="input-group-text">
              $
            </span>
            <input
              name="pricePerHour"
              value={inputs.pricePerHour === "0" ? "" : inputs.pricePerHour}
              onChange={handleInputChange}
              id="validationDefault01"
              type="number"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              required
            />
            <span className="input-group-text">.00</span>
            {touch.pricePerHour && errors.pricePerHour && (
              <p className="text-danger">{errors.pricePerHour}</p>
            )}
          </div>

          <div className="input-group mb-3">
            <span
              htmlFor="validationDefault01"
              className="input-group-text"
              id="inputGroup-sizing-default"
            >
              Name of Service:
            </span>
            <input
              name="nameService"
              value={inputs.nameService}
              onChange={handleInputChange}
              id="validationDefault01"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              required
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className={`${style.myButton} btn btn-outline-secondary`} 
              disabled={isSubmitting}>
               {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </form>
        </div>  
      </div>
    </div>
  );
}
