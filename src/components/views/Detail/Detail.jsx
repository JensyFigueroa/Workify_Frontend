import { useParams } from "react-router-dom";
import { getServiceDetail, cleanDetail, addServiceInCart } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./Detail.module.css";
import  Carousel  from "./Carousel/Carousel";
import RatingStars from 'react-rating-stars-component';
import { Form } from 'react-bootstrap';







export function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    raiting: "",
    comment: "",
  })
  const currentUserNameLoggedIn = useSelector(state => state.currentUserNameLoggedIn);
  const serviceDetail = useSelector((state) => state.serviceDetail);
  let arrImage = Array.isArray(serviceDetail.imageUrl) ? [...serviceDetail.imageUrl] : [serviceDetail.imageUrl];
  const { nameService, pricePerHour } = serviceDetail;
  const comments = serviceDetail && serviceDetail.reviews ? serviceDetail.reviews : [];
  
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
      const { name, value } = event.target.elements;
      setInputs({
          ...inputs,
          [name]: value,
        })
     
    }
   
  } 
  //<--MANEJADOR DE SUBMIT-->
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      
    } catch (error) {
      
    }
  }
  

  return (
    <div className={style.containerFather}>
    <div className={style.detailContainer}>

       <div className={style.featuredProjectsContainer}>
          {Array.isArray(serviceDetail.imageUrl) &&
          arrImage.length > 0 && <Carousel images={arrImage} />}
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
              serviceDetail.reviews.map((review, index) => (
                <RatingStars 
                count={5}
                key={index} 
                value={review.raiting} 
                size={24} // Tamaño de las estrellas
                color1={'#ddd'} // Color de las estrellas inactivas
                color2={'#ffd700'} // Color de las estrellas activas
                />
              ))
            ) : (
              <p>No hay comentarios o valoraciones disponibles.</p>
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
            <div className= {style.serviceProvider}>
              <h2 className={style.serviceDescriptionTitle}>Service Provider</h2>
              <p>{currentUserNameLoggedIn}</p>
            </div>
        </div>
        <button className={`${style.myButton} btn btn-outline-secondary`}
            onClick={() =>
              dispatch(addServiceInCart(id, nameService, pricePerHour))
            }
          >
            Add to cart
          </button>
      </div>
      </div>
      <div className={style.serviceReviewsContainer}>
          <h1 className={style.serviceReviewsTitle}>Reviews</h1>
          <p>Customers rated this pro highly for work quality, professionalism, and responsiveness.</p>
        </div>
        <div>

    <div className={style.form}>
      <h3>Comments</h3>
      
        {comments.map((com, index) => (
          <section className={style.comments}>
            <span key={index}>
            <RatingStars
              count={5} // Número total de estrellas
              value={com.raiting} // Valor del rating
              size={24} // Tamaño de las estrellas
              color1={'#ddd'} // Color de las estrellas inactivas
              color2={'#ffd700'} // Color de las estrellas activas
            />
            </span>
            <div className={style.spanComent}>
              Comment: {com.comment}
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
                value={inputs.raiting}
                onChange={handleInputChange}
                size={24}
                activeColor="#ffd700"
              />
            </div>
        </Form.Group>
              <textarea
                id="validationTextarea"
                className={`form-control`}
                placeholder="Comment"
                value={inputs.comment}
                name = "comment"
                onChange={handleInputChange}
                required
              ></textarea>
              <button className={`${style.myButton} btn btn-outline-secondary`} type="submit">Send comment</button>
        </form>
          
      </div>
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