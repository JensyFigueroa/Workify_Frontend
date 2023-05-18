import React from "react";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="fondo">
      <h2 class="logo">
        <span class="gray">WEB </span>
        <span class="white">SERVICE</span>
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
            <span className="welcome">Welcome to</span>
            <h1 class="logo">
              <span class="gray">WEB </span>
              <span class="white">SERVICE</span>
            </h1>
            
          </a>
        </p>
        <div class="row">
          <div>
            <div id="multiCollapseExample1">
              <div class="card text-center  w-75 p-3 ">
                ¡Obtén el mejor servicio para tus necesidades en nuestra página
                'nombre de la pagina'! Ofrecemos una amplia variedad de
                servicios y proveedores seleccionados cuidadosamente para
                garantizar calidad y precios justos. Nuestro proceso de
                contratación es sencillo, seguro y sin csomplicaciones, solo
                ingresa tus necesidades en nuestro formulario en línea y te
                conectaremos con los proveedores que mejor se adapten a ti.
                ¡Comienza hoy mismo y descubre lo fácil que puede ser obtener el
                servicio que necesitas!
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <a className="arrow" href="">
              <i class="bi bi-arrow-down-short "></i>
            </a>
    </div>
  );
};

export default Landing;
