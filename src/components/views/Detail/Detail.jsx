import { useParams } from "react-router-dom";
import { getServiceDetail, cleanDetail } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./Detail.module.css";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const notify = () =>
    toast.success("Your reservation has been successfully completed.");

  useEffect(() => {
    dispatch(getServiceDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const serviceDetail = useSelector((state) => state.serviceDetail);
  console.log(serviceDetail);
  let arrImage = [serviceDetail.imageUrl];

  const [selectedDate, setSelectedDate] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [hours, setHours] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    const start = new Date(startTime);
    const end = new Date(time);
    const timeDiff = end - start;
    const hoursDiff = Math.round(timeDiff / (1000 * 60 * 60));
    setHours(hoursDiff);
    setIsDateTimeSelected(true);
  };

  useEffect(() => {
    setIsButtonEnabled(isDateTimeSelected);
  }, [isDateTimeSelected]);

  const handleReservation = () => {
    const quantity = hours;
    const date = new Date(selectedDate);
    //fecha y hora de inicio reserva
    const start = new Date(selectedDate);
    start.setHours(startTime.getHours());
    start.setMinutes(startTime.getMinutes());
    //fecha y hora de finalizacion de reserav
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours());
    end.setMinutes(endTime.getMinutes());
    //obj para enviar al carrito(x redux)
    const reservation = {
      idService: serviceDetail.id,
      nameService: serviceDetail.nameService,
      typeService: serviceDetail.typeService,
      location: serviceDetail.location,
      description: serviceDetail.description,
      pricePerHour: serviceDetail.pricePerHour || null,
      reservationData: {
        date,
        start,
        end,
        quantity,
      },
    };

    console.log("Reservation", reservation);
    console.log("Start Time:", start);
    console.log("End Time:", end);
    console.log("Hours:", hours);
    console.log("queantity", quantity);
    // notify();
  };

  return (
    <div className={style.detailContainer}>
      <div className={style.serviceInfoContainer}>
        <h1 className={style.serviceName}>{serviceDetail.nameService}</h1>
        <p className={style.serviceType}>{serviceDetail.typeService}</p>
        <p className={style.serviceLocation}>
          Location: {serviceDetail.location?.pais} -{" "}
          {serviceDetail.location?.ciudad}
        </p>
        <p className={style.serviceType}>
          Price per hour: {serviceDetail.pricePerHour}
        </p>

        <div className={style.featuredProjectsContainer}>
          <h2 className={style.featuredProjectsTitle}>Featured Projects</h2>
          {arrImage.length > 0 &&
            arrImage.map((image, index) => (
              <img
                className={style.featuredProjectImage}
                src={image}
                alt={`Featured Project ${index + 1}`}
                key={index}
              />
            ))}
        </div>
        <div className={style.serviceDescriptionContainer}>
          <h2 className={style.serviceDescriptionTitle}>Description</h2>
          <p className={style.serviceDescription}>
            {serviceDetail.description}
          </p>
        </div>
        <div className={style.serviceReviewsContainer}>
          <h2 className={style.serviceReviewsTitle}>Reviews</h2>
          <p className={style.serviceReviews}>{serviceDetail.reviews}</p>
        </div>
      </div>
      <div className={style.reservationContainer}>
        <div className={style.calendarContainer}>
          <p className={style.selectDateLabel}>Select Date:</p>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className={style.datePicker}
            readOnlyInput
          />
        </div>
        <div className={style.calendarContainer}>
          <p className={style.selectTimeLabel}>Select Start Time:</p>
          <DatePicker
            selected={startTime}
            onChange={handleStartTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="HH:mm"
            className={style.datePicker}
            disabled={!selectedDate}
            readOnlyInput
          />
        </div>
        <div className={style.calendarContainer}>
          <p className={style.selectTimeLabel}>Select End Time:</p>
          <DatePicker
            selected={endTime}
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="HH:mm"
            className={style.datePicker}
            disabled={!startTime}
            minTime={
              startTime
                ? new Date(startTime.getTime() + 60 * 60 * 1000)
                : new Date().setHours(23, 0)
            }
            maxTime={new Date().setHours(23, 0)}
            readOnlyInput
          />
        </div>
        <p>Hours Selected: {hours}</p>
        <button
          onClick={handleReservation}
          className={`${style.reservationButton} ${
            isButtonEnabled ? style.enabled : style.disabled
          }`}
          disabled={!isButtonEnabled}
        >
          Confirm Reservation
        </button>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        }}
      />
    </div>
  );
}
