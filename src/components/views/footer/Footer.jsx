import React from "react";
import "./Footer.css";

const Footer = () => {
return (
    <footer className="container-principal">
  <div class="container">
    <div class="footer-links">
      <a href="#">Inicio</a>
      <a href="#">Servicios</a>
      <a href="#">Productos</a>
      <a href="#">Contacto</a>
    </div>
    <div class="footer-contact">
      <p>Teléfono: (123) 456-7890</p>
      <p>Email: info@tuecommerce.com</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2023 Workify. Todos los derechos reservados.</p>
  </div>
</footer>
)};

export default Footer;
