import style from "../CreateService/CreateService.module.css";

export function CreateService(){
    return (
<div>
    <form>
     <div class="form-floating">
        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
            <option selected>Elegir categoría</option>
            <option value="1">Electricidad</option>
            <option value="2">Plomeria</option>
            <option value="3">Jardineria</option>
        </select>
        <label for="floatingSelect">Categorías</label>
    </div>
    <div class="mb-3">
        <label for="formFile" class="form-label">Imagen</label>
        <input class="form-control" type="file" id="formFile"></input>
    </div>
    <div class="form-floating">
      <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
      <label for="floatingTextarea">Descripcion</label>
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"></input>
    <span class="input-group-text">.00</span>
    </div>
    <div class="col-md-6">
        <label for="inputCity" class="form-label">City</label>
        <input type="text" class="form-control" id="inputCity"></input>
    </div>
    <div class="col-md-4">
        <label for="inputState" class="form-label">State</label>
        <select id="inputState" class="form-select">
            <option selected>Choose...</option>
            <option>...</option>
        </select>
    </div>
    <div class="col-md-2">
        <label for="inputZip" class="form-label">Zip</label>
        <input type="text" class="form-control" id="inputZip"></input>
    </div>
    <div class="col-12">
        <button type="submit" class="btn btn-primary">Crear Servicio</button>
    </div>
    
    </form>
</div>
    );
}