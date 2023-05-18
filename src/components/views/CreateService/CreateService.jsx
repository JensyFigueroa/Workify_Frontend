import style from "../CreateService/CreateService.module.css";

export function CreateService(){
    return (
<div className={style.container}>
<div className={style.form}>
    <h1>Crear Servicio</h1>
    <form>
     <div class="form-floating">
     <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Categoria</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
    </div>
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
        <span class="input-group-text">Costo de Revisión | $</span>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"></input>
    <span class="input-group-text">.00</span>
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Ubicación</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
    </div>
    <div class="col-12">
        <button type="submit" class="btn btn-primary">Crear Servicio</button>
    </div>
    
    </form>
</div>
</div>
    );
}