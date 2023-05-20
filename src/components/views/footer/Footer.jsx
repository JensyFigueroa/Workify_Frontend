import React from "react";
import style from "../footer/Footer.module.css";

const Footer = () => {
return (
    <footer>
  <div className={style.container}>
    <div className={style.footerLinks}>
      <a href="#">Inicio</a>
      <a href="#">Servicios</a>
      <a href="#">Productos</a>
      <a href="#">Contacto</a>
    </div>
    <div className={style.footerContact}>
      <p>Teléfono: (123) 456-7890</p>
      <p>Email: info@tuecommerce.com</p>
    </div>
  </div>
  <div class={style.footerBottom}>
    <p>&copy; 2023 Workify. Todos los derechos reservados.</p>
  </div>
</footer>
)};

export default Footer;
