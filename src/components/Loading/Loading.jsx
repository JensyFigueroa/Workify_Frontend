import style from "../Loading/Loading.module.css";
import 'transition-style';
import 'animate.css';
export function Loading(){
    return (
        
        <div className={style.circles} >
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
        <div className={style.circle}></div>
      </div>
      
      );
}