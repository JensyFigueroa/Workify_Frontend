import { useParams } from "react-router-dom";
import {
  getServiceDetail,
  cleanDetail,
  addToCart,
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./Detail.module.css";
import Carousel from "./Carousel/Carousel";
import RatingStars from "react-rating-stars-component";
import { Form } from "react-bootstrap";
import { OtherServices } from "./OtherServices/OtherServices";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import def from "./Images/default.png";

export function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserNameLoggedIn = useSelector(
    (state) => state.currentUserNameLoggedIn
  );
  const serviceDetail = useSelector((state) => state.serviceDetail);
  const userInfo = useSelector(state => state.userInfo);
  let arrImage = Array.isArray(serviceDetail.imageUrl)
    ? [...serviceDetail.imageUrl]
    : [serviceDetail.imageUrl];
  const comments =
    serviceDetail && serviceDetail.reviews ? serviceDetail.reviews : [];
  const uidService = useSelector((state) => state.currentUserIdLoggedIn);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likes, setLikes] = useState({});
  const [inputs, setInputs] = useState({
    serviceId: id,
    name: currentUserNameLoggedIn[0],
    imageUrl: currentUserNameLoggedIn[3] ? currentUserNameLoggedIn[3] : def,
    rating: "",
    comment: "",
  });
  const handleLikeClick = (index) => {
    setLikes((prevLikes) => {
      if (prevLikes[index]) {
        // Si ya existe un like para este comentario, restamos 1
        return { ...prevLikes, [index]: prevLikes[index] - 1 };
      } else {
        // Si no existe un like para este comentario, sumamos 1
        return { ...prevLikes, [index]: 1 };
      }
    });
  };

  //<--CARGA DE ESTADO GLOBAL DETAIL-->
  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getServiceDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  //<--MANEJADOR DE INPUTS-->
  const handleInputChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };
  //<--MANEJADOR DE SUBMIT-->
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uidService.length === 0) {
      toast.error("Must be logged in to comment a service");
      setInputs({
        serviceId: id,
        name: currentUserNameLoggedIn[0],
        imageUrl: currentUserNameLoggedIn[3],
        rating: "",
        comment: "",
      });
    } 
    // else if (userInfo.buys.includes(id)){

    // }
    else{
      try {
        await axios
          .post("/service/review", inputs)
          .then((response) => toast.success(response.data));
        setIsSubmitting(true);
        setInputs({
          serviceId: id,
          name: currentUserNameLoggedIn[0],
          imageUrl: currentUserNameLoggedIn[3],
          rating: "",
          comment: "",
        });
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className={style.containerFather}>
      <div className={style.detailContainer}>
        <div className={style.featuredProjectsContainer}>
          {Array.isArray(serviceDetail.imageUrl) && arrImage.length > 0 && (
            <Carousel images={arrImage} />
          )}
        </div>

        <div className={style.serviceInfoContainer}>
          <div className={style.nameServiceContainer}>
            <h1 className={style.serviceName}>{serviceDetail.nameService}</h1>
            <p className={style.serviceType}>{serviceDetail.typeService}</p>
          </div>
          <div className={style.serviceTypeContainer}>
            <p className={style.serviceType}>
              Price per hour: ${serviceDetail.pricePerHour}
              {serviceDetail.reviews && serviceDetail.reviews.length > 0 ? (
                <div className={style.ratings}>
                  {(() => {
                    const sum = serviceDetail.reviews
                      .map((review) => parseFloat(review.rating))
                      .reduce(
                        (a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0)
                      );
                    const averageRating = sum / serviceDetail.reviews.length;
                    return isNaN(averageRating)
                      ? "Invalid ratings"
                      : averageRating.toFixed(1);
                  })()}
                  <RatingStars
                    count={5}
                    value={(() => {
                      const sum = serviceDetail.reviews
                        .map((review) => parseFloat(review.rating))
                        .reduce(
                          (a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0)
                        );
                      const averageRating = sum / serviceDetail.reviews.length;
                      return isNaN(averageRating) ? 0 : averageRating;
                    })()}
                    size={24} // Tamaño de las estrellas
                    color1={"#ddd"} // Color de las estrellas inactivas
                    color2={"#ffd700"} // Color de las estrellas activas
                    edit={false}
                  />
                </div>
              ) : (
                <p>Doesn't have rating.</p>
              )}
            </p>

            <p className={style.serviceLocation}>
              Location: {serviceDetail.location?.pais} -{" "}
              {serviceDetail.location?.ciudad}
            </p>
          </div>

          <div className={style.fatherDescription}>
            <div className={style.serviceDescriptionContainer}>
              <h2 className={style.serviceDescriptionTitle}>Description</h2>
              <p className={style.serviceDescription}>
                {serviceDetail.description}
              </p>
            </div>
            <div className={style.serviceProvider}>
              <h2 className={style.serviceDescriptionTitle}>
                Service Provider
              </h2>
              <p>{currentUserNameLoggedIn[0]}</p>
            </div>
          </div>
          <button
            className={`${style.myButton} btn btn-outline-secondary`}
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  nameService: serviceDetail.nameService,
                  pricePerHour: serviceDetail.pricePerHour,
                  emailUserService: serviceDetail.emailUserService,
                  quantity: 1,
                })
              )
            }
          >
            Add service
          </button>
        </div>
      </div>

      <div className={style.form}>
        <h3>Comments</h3>

        {comments.map((com, index) => (
          <section className={style.comments}>
            <div className={style.fatherComments}>
              <div className={style.name}>
                <img src={com.imageUrl} />
                <p>{com.name}</p>
              </div>
              <div className={style.ratingComment}>
                <div className={style.ratings}>
                  <RatingStars
                    key={index}
                    count={5} // Número total de estrellas
                    value={com.rating} // Valor del rating
                    size={24} // Tamaño de las estrellas
                    color1={"#ddd"} // Color de las estrellas inactivas
                    color2={"#ffd700"} // Color de las estrellas activas
                    edit={false}
                  />
                  <span>({com.rating}.0)</span>
                </div>
                <div className={style.spanComent}>
                  Comment: {com.comment}
                  <button onClick={() => handleLikeClick(index)}>
                    {likes[index] ? "Like" : "Like"}
                    {likes[index] > 0 && <div>{likes[index]}</div>}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ))}

        <div className={style.h4}>
          <h4>Leave a comment!</h4>
        </div>

        <form className={style.inputs} onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <div className={style.stars}>
              <p>Rating</p>
              <RatingStars
                classNames={style.star}
                count={5}
                name="rating"
                value={inputs.rating}
                onChange={(rating) => setInputs({ ...inputs, rating })}
                size={24}
                activeColor="#ffd700"
                required
              />
            </div>
          </Form.Group>
          <textarea
            id="validationTextarea"
            className={`form-control`}
            placeholder="Comment"
            value={inputs.comment}
            name="comment"
            onChange={handleInputChange}
            required
          ></textarea>
          <button
            className={`${style.myButton} btn btn-outline-secondary`}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send comment"}
          </button>
          <Toaster position="bottom-right" reverseOrder={false} />
        </form>
      </div>
      <div className={style.otherServices}>
        <h3>Other Services</h3>
        <OtherServices />
      </div>
    </div>
  );
}
//<---CODIGO DE LUIS--->
//  import toast, { Toaster } from "react-hot-toast";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// const [selectedDate, setSelectedDate] = useState(null);
// const [isButtonEnabled, setIsButtonEnabled] = useState(false);
// const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);
// const [startTime, setStartTime] = useState(null);
// const [endTime, setEndTime] = useState(null);
// const [hours, setHours] = useState(0);

// const handleDateChange = (date) => {
//   setSelectedDate(date);
// };

// const handleStartTimeChange = (time) => {
//   setStartTime(time);
// };

// const handleEndTimeChange = (time) => {
//   setEndTime(time);
//   const start = new Date(startTime);
//   const end = new Date(time);
//   const timeDiff = end - start;
//   const hoursDiff = Math.round(timeDiff / (1000 * 60 * 60));
//   setHours(hoursDiff);
//   setIsDateTimeSelected(true);
// };

// useEffect(() => {
//   setIsButtonEnabled(isDateTimeSelected);
// }, [isDateTimeSelected]);

// const handleReservation = () => {
//   const quantity = hours;
//   const date = new Date(selectedDate);
//   //fecha y hora de inicio reserva
//   const start = new Date(selectedDate);
//   start.setHours(startTime.getHours());
//   start.setMinutes(startTime.getMinutes());
//   //fecha y hora de finalizacion de reserav
//   const end = new Date(selectedDate);
//   end.setHours(endTime.getHours());
//   end.setMinutes(endTime.getMinutes());
//   //obj para enviar al carrito(x redux)
//   const reservation = {
//     idService: serviceDetail.id,
//     nameService: serviceDetail.nameService,
//     typeService: serviceDetail.typeService,
//     location: serviceDetail.location,
//     description: serviceDetail.description,
//     pricePerHour: serviceDetail.pricePerHour || null,
//     reservationData: {
//       date,
//       start,
//       end,
//       quantity,
//     },
//   };

//   console.log("Reservation", reservation);
//   console.log("Start Time:", start);
//   console.log("End Time:", end);
//   console.log("Hours:", hours);
//   console.log("queantity", quantity);
//   // notify();
// };

// <div className={style.reservationContainer}>
//     <div className={style.calendarContainer}>
//       <p className={style.selectDateLabel}>Select Date:</p>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         minDate={new Date()}
//         dateFormat="dd/MM/yyyy"
//         className={style.datePicker}
//         readOnlyInput
//       />
//     </div>
//     <div className={style.calendarContainer}>
//       <p className={style.selectTimeLabel}>Select Start Time:</p>
//       <DatePicker
//         selected={startTime}
//         onChange={handleStartTimeChange}
//         showTimeSelect
//         showTimeSelectOnly
//         timeIntervals={60}
//         timeCaption="Time"
//         dateFormat="HH:mm"
//         className={style.datePicker}
//         disabled={!selectedDate}
//         readOnlyInput
//       />
//     </div>
//     <div className={style.calendarContainer}>
//       <p className={style.selectTimeLabel}>Select End Time:</p>
//       <DatePicker
//         selected={endTime}
//         onChange={handleEndTimeChange}
//         showTimeSelect
//         showTimeSelectOnly
//         timeIntervals={60}
//         timeCaption="Time"
//         dateFormat="HH:mm"
//         className={style.datePicker}
//         disabled={!startTime}
//         minTime={
//           startTime
//             ? new Date(startTime.getTime() + 60 * 60 * 1000)
//             : new Date().setHours(23, 0)
//         }
//         maxTime={new Date().setHours(23, 0)}
//         readOnlyInput
//       />
//     </div>
//     <p>Hours Selected: {hours}</p>
//     <button
//       onClick={handleReservation}
//       className={`${style.reservationButton} ${
//         isButtonEnabled ? style.enabled : style.disabled
//       }`}
//       disabled={!isButtonEnabled}
//     >
//       Confirm Reservation
//     </button>
//   </div>
//   <Toaster
//     position="bottom-right"
//     toastOptions={{
//       className: "",
//       style: {
//         border: "1px solid #713200",
//         padding: "16px",
//         color: "#713200",
//       },
//     }}
//   />
