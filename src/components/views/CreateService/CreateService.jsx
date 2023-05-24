import { useState } from "react";
import style from "../CreateService/CreateService.module.css";
import validate from "./validate";
import services from "./Services";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";



export function CreateService() {

  
  
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [inputs, setInputs] = useState({
    nameService: "",
    location: {
      pais: "",
      ciudad: "",
    },
    imageUrl: [],
    description: "",
    pricePerHour: 0,
    typeService: "",
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
    pricePerHour: 0,
    typeService: "",
  });

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    if (name === "imageUrl") {
      const file = event.target.files[0];
      const files = Array.from(event.target.files);
      const imagesSelected = files.map((file) => URL.createObjectURL(file));
      setSelectedImages(imagesSelected);
      
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'services_wfy');
        formData.append('api_key', '168773883428854');
  
        // Realiza una solicitud a Cloudinary para cargar la imagen
        try {
          const response = await axios.post('https://api.cloudinary.com/v1_1/Joaquin/image/upload', formData);
          const imageUrl = response.data.secure_url;
          setInputs({
            ...inputs,
            imageUrl: [imageUrl],
          });
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    //<---RUTA DEL POST--->
    try {
      await axios
        .post("http://localhost:3001/service/", inputs)
        .then((response) => toast.success(response.data));
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  return (
    <div className={style.container}>
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
            <input
              name="pais"
              value={inputs.location.pais}
              onChange={handleInputLocation}
              id="validationDefault01"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              required
            />
            <span
              htmlFor="validationDefault01"
              className="input-group-text"
              id="inputGroup-sizing-default"
            >
              City
            </span>
            <input
              name="ciudad"
              value={inputs.location.ciudad}
              onChange={handleInputLocation}
              id="validationDefault01"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              required
            />
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
              value={inputs.pricePerHour}
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
            >
              Create Service
            </button>
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </form>
      </div>
    </div>
  );
}
