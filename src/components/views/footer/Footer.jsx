import { useLocation } from "react-router-dom";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    location.pathname !== "/" && (
      <footer className={style.containerPrincipal}>
        <div className={style.container}>
          <div className={style.footerLinks}>
            <Link to={"/home"}>Home</Link>
            <Link to={"/about"}>About</Link>
          </div>
        </div>
        <div className={style.footerBottom}>
          <p>&copy; 2023 Workify. Todos los derechos reservados.</p>
        </div>
      </footer>
    )
  );
};

export default Footer;

// import style from "./Footer.module.css";

// const Footer = () => {
// return (
//     <footer>
//       <div className={style.contenedor}>
//         <span>Empresa N°1 a nivel Nacional</span>
//         <span>WORKIFY</span>
//         <span>Contactanos</span>
//       </div>

//     </footer>
// )};

// export default Footer;
