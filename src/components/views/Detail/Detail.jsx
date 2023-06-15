import { useParams } from "react-router-dom";
import {
  getServiceDetail,
  cleanDetail,
  addToCart,
  getUser,
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

  const currentUserIdLoggedIn = useSelector(
    (state) => state.currentUserIdLoggedIn
  );
  const serviceDetail = useSelector((state) => state.serviceDetail);
  const userInfo = useSelector((state) => state.userInfo);
  const allServices = useSelector((state) => state.allServices);

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(getUser(currentUserIdLoggedIn));
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
    } else if (
      !userInfo.buys.some(
        (obj) => obj.nameService === serviceDetail.nameService
      )
    ) {
      toast.error("You must pay for this service to comment on it");
    } else if (
      serviceDetail.reviews.some((obj) => obj.name === userInfo.name)
    ) {
      toast.error("You have already commented on this service");
    } else {
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
              {allServices.find(
                (obj) => obj.nameService === serviceDetail.nameService
              ) && (
                <p>
                  {
                    allServices.find(
                      (obj) => obj.nameService === serviceDetail.nameService
                    ).nameUserService
                  }
                </p>
              )}
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
