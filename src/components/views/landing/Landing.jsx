import React from "react";
import "./Landing.css";

const Landing = () => {
  

  return (
    <div className="fondo">
      <h2 class="logo">
        <span class="gray">WORKIFY </span>
      </h2>
     
      <div 
      id="contenedor-principal" 
      className="w-100 p-4"
      
      >
        <p>
          <a
            class="d-flex flex-column align-items-center  "
            data-bs-toggle="collapse"
            href="#multiCollapseExample1"
            role="button"
            aria-expanded="true"
          >
            <p className="welcome">Welcome to Workify</p>
            {/* <h1 class="logo">
              <span>Workify</span>
            </h1> */}
            
          </a>
        </p>
        <div class="row">
          <div className="container-descripcion">
            <div id="multiCollapseExample1">
            
               <span className="description">
                 ¡Obtén el mejor servicio para tus necesidades en nuestra página
                 Workify! Ofrecemos una amplia variedad de
                servicios y proveedores seleccionados cuidadosamente para
                garantizar calidad y precios justos. Nuestro proceso de
                contratación es sencillo, seguro y sin csomplicaciones, solo
                ingresa tus necesidades en nuestro formulario en línea y te
                conectaremos con los proveedores que mejor se adapten a ti.
                ¡Comienza hoy mismo y descubre lo fácil que puede ser obtener el
                servicio que necesitas!
                </span>
            </div>
          </div>
        </div>
        
      </div>
      <a className="arrow" href="/home">
              <i class="bi bi-arrow-down-short "></i>
            </a>
    </div>
  );
};

export default Landing;
