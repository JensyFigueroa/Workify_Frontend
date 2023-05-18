import { useState } from "react";
import style from "../CreateService/CreateService.module.css";
import validate from "./validate";
export function CreateService(){

    const [inputs, setInputs] = useState({
        category: "",
        image: "",
        description: "",
        price: "",
        ubication: ""
      });
      const [touch, setTouch] = useState({
        category: false,
        image: false,
        description: false,
        price: false,
        ubication: false
    })
    const [errors, setErrors] = useState({
        category: "",
        image: "",
        description: "",
        price: "",
        ubication: ""
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
     <div className="form-floating">

     <div className="input-group mb-3">
        <span for="validationDefault01" className="input-group-text" id="inputGroup-sizing-default">Category</span>
        <input name = "category" value = {inputs.category} onChange={handleInputChange} type="text" className="form-control" id="validationDefault01" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
    </div>
    </div>

    <div className="mb-3">
        <label for="formFile" className="form-label">Image</label>
        <input name = "image" value={inputs.image} onChange={handleInputChange} className="form-control" type="file" id="formFile" aria-label="file example" required/>
        <div class="invalid-feedback">Example invalid form file feedback</div>
    </div>

    <div className="form-floating">
      <textarea  name = "description" value={inputs.description} onChange={handleInputChange}  id="validationTextarea" className="form-control" placeholder="Leave a comment here" required/>
      <label for="validationTextarea" >Description</label>
      
    </div>

    <div className="input-group mb-3">
        <span for="validationDefault01" className="input-group-text">Revisión Cost | $ </span>
        <input name = "price" value={inputs.price} onChange={handleInputChange} id="validationDefault01" type="text" className="form-control" aria-label="Amount (to the nearest dollar)" required/>
    <span className="input-group-text">.00</span>
    {touch.price && errors.price && <p className="text-danger">{errors.price}</p>}
    </div>

    <div className="input-group mb-3">
        <span for="validationDefault01" className="input-group-text" id="inputGroup-sizing-default">Ubication</span>
        <input name = "ubication" value={inputs.ubication} onChange={handleInputChange} id="validationDefault01"  type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
    </div>

    <div className="col-12">
        <button type="submit" className={`${style.myButton} btn btn-outline-secondary`}>Create Service</button>
    </div>
    
    </form>
</div>
</div>
    );
}