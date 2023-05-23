import style from "../Loading/Loading.module.css";
import 'transition-style';
import logo from "../../components/views/Landing/img/logo.png";
import 'animate.css';
export function Loading(){
    return (
        
        
        <div className={style.circles} >
            {/* <img className="animate__animated animate__zoomIn" src={logo} alt="logo"/> */}
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
      </div>
      
      );
}