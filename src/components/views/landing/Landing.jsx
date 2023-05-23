import React from "react";
import style from "../landing/Landing.module.css";
import { MdHomeRepairService } from "react-icons/md";

const Landing = () => {
  

  return (
    <div className={style.fondo}>
      <h2 className={style.logo}>
      <MdHomeRepairService
              style={{ fontSize: "63px" }}
            ></MdHomeRepairService>
        <span className={style.gray}>WORKIFY </span>
      </h2>
     
      <div className={style.contenedorPrincipal}>

        <p className={style.welcome}>Welcome to Workify</p>
        
        <div class={style.row}>
          <div className={style.containerDescripcion}>
            <div id="multiCollapseExample1">
            
               <span className={style.description}>
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
      <a className={style.arrow} href="/home">
              <i class="bi bi-arrow-down-short "></i>
            </a>
    </div>
  );
};

export default Landing;
