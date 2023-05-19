import style from "../Cards/Cards.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from "../../redux/actions";
import { Card } from "../Card/Card";
import { useEffect } from 'react';

export function Cards (){
    const dispatch = useDispatch();
    const allServices = useSelector(state => state.allServices);

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch])

    return (
    <div className={style.container}>
        {allServices && allServices.map((serv, index) =>{
            return <Card
            id = {serv.id}
            key = {index}
            image = {serv.imageUrl}
            nameService = {serv.nameService}
            typeService = {serv.typeService}
            />
        } )}
    </div>
    );
}