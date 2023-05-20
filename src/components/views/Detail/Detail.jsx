import { useParams } from "react-router-dom";
import { clearFilter, getServiceDetail } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Detail.module.css";
import toast, { Toaster } from "react-hot-toast";

export function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const notify = () =>
    toast.success(
      "Your reservation has been successfully completed. We have sent you a confirmation email with the details of your reservation."
    );

  useEffect(() => {
    dispatch(getServiceDetail(id));
    console.log("UseEffect");
  }, [dispatch, id]);

  const serviceDetail = useSelector((state) => state.serviceDetail);
  let arrImage = [serviceDetail.imageUrl];

  return (
    <div className={`${style.container} `}>
      <div>
        <div className={style.smallContainer}>
          <p className={style.nameService}>
            Service: {serviceDetail.nameService}
          </p>
          <p>Type: {serviceDetail.typeService}</p>
          <p>Location: {serviceDetail.location?.pais}</p>
        </div>
        <div className={style.mediumContainer}>
          <p>Trabajos realizados</p>
          {arrImage.length > 0 &&
            arrImage.map((image) => (
              <img className={style.img} src={image} alt={`${image}`} />
            ))}
          {/* <img src={serviceDetail.imageUrl} alt="img" /> */}
        </div>
      </div>
      <div className={style.largeContainer}>
        <div className={style.abilities}>
          <p>Description: {serviceDetail.description}</p>
          <p>Reviews: {serviceDetail.reviews}</p>
        </div>
        <div className={`${style.reserv} btn btn-outline-secondary`}>
          <p onClick={notify}>Reserva</p>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "",
              duration: 6000,
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
