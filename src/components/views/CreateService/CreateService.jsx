import { useState } from "react";
import style from "../CreateService/CreateService.module.css";
import validate from "./validate";
import services from "./Services";

export function CreateService(){

    const [inputs, setInputs] = useState({
        nameService: "",
        location: {
            pais: "",
            ciudad: ""
        },
        imageUrl: [],
        pricePerHour: 0,
        typeService: ""
      });
      const [touch, setTouch] = useState({
        nameService: false,
        location: {
            pais: false,
            ciudad:  false
        },
        imageUrl: false,
        pricePerHour: false,
        typeService: false
    })
    const [errors, setErrors] = useState({
        nameService: "",
        location: {
            pais: "",
            ciudad: ""
        },
        imageUrl: [],
        pricePerHour: 0,
        typeService: ""
    });

      const handleInputChange = (event) => {
        const {name, value} = event.target;
         setInputs({
             ...inputs,
             [name]: value
         })
         setErrors(validate({
             ...inputs,
             [name]: value
         }))
         setTouch({
             ...touch,
             [name]: true
         })
     }

     const handleSubmit = async (event) => {
        event.preventDefault();
        //<---RUTA DEL POST--->
        // try {
        //     await axios.post("/activities", inputs)
        //     console.log("Agregado correctamente");
        // } catch (error) {
        //     console.log("Error al agregar la actividad", error.message);
        // }
       
    }
    return (
<div className={style.container}>
<div className={style.form}>
    <h1>Crear Servicio</h1>

    <form className="row g-3 needs-validation" novalidate>
     
    <div className="mb-3">
        <label for="validationDefault04" className="form-label">Categories</label>
        <select className="form-select" name = "category" value={inputs.category} onChange={handleInputChange} id="validationDefault04" required>
            <option selected disabled value="">Select a category</option>
            {services.map((serv, index) => (<option key={index} value={serv}>{serv}</option>))}
    </select>
    <div class="invalid-feedback">Example invalid select feedback</div>
    </div>

    <div className="input-group mb-3">
        <span for="validationDefault01" className="input-group-text" id="inputGroup-sizing-default">Ubication</span>
        <input name = "ubication" value={inputs.ubication} onChange={handleInputChange} id="validationDefault01"  type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
    </div>

    <div className="mb-3">
        <label for="basic-url" class="form-label">Your image URL</label>
        <div class="input-group">
    <span class="input-group-text" id="basic-addon3">https://...</span>
        <input name = "image" value={inputs.image} onChange={handleInputChange} className="form-control" type="text" id="basic-url" aria-describedby="basic-addon3 basic-addon4" required/>
    </div>
    </div>

    <div className="form-floating">
      <textarea  name = "description" value={inputs.description} onChange={handleInputChange}  id="validationTextarea" className="form-control" placeholder="Leave a comment here" required/>
      <label for="validationTextarea" >Description</label>
      
    </div>

    <label for="basic-url" class="form-label">Price per hour</label>
    <div className="input-group mb-3">
        <span for="validationDefault01" className="input-group-text">$</span>
        <input name = "price" value={inputs.price} onChange={handleInputChange} id="validationDefault01" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" required/>
    <span className="input-group-text">.00</span>
    {touch.price && errors.price && <p className="text-danger">{errors.price}</p>}
    </div>

    <div className="input-group mb-3">
        <span for="validationDefault01" className="input-group-text" id="inputGroup-sizing-default">Type of service</span>
        <input name = "ubication" value={inputs.type} onChange={handleInputChange} id="validationDefault01"  type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
    </div>

    

    <div className="col-12">
        <button type="submit" className={`${style.myButton} btn btn-outline-secondary`}>Create Service</button>
    </div>
    
    </form>
</div>
</div>
    );
}