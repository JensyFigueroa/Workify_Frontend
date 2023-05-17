import { useParams } from "react-router-dom";


export function Detail(props){
    const {id} = useParams();
    
    
    return (
    <div>
        <h1>Soy detail</h1>
    </div>)
    ;
}