import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import faceThink from "./face-think.png";
import RatingStars from "react-rating-stars-component";

export function Cards() {
  const dispatch = useDispatch();
  let allServices = useSelector((state) => state.allServices);
  const filterLocation = useSelector((state) => state.selectedLocation);
  const filterItem = useSelector((state) => state.selectedItem);
  const searchServices = useSelector((state) => state.searchServices);

  // let services = [];

  // if (searchServices.length > 0) {
  //   services = searchServices;
  // } else {
  //   services = allServices;
  // }
  let services = searchServices.length > 0 ? searchServices : allServices;

  useEffect(() => {
    if (filterLocation === null && filterItem === null) {
      dispatch(getServices());
    }
    // setNumServicesXpage([...services].splice(0, cardsXpage))
  }, []);

  /* ================== PAGINACION ======================*/

  const cardsXpage = 10;
  const totalPages = Math.ceil(services.length / cardsXpage);

  useEffect(() => {
    
    setCurrentPage(0);
    setNumServicesXpage([...services].splice(0, cardsXpage));
  }, [services, cardsXpage]);

  let pageNum = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNum.push(i)
  }

  const [numServicesXpage, setNumServicesXpage] = useState([...services].splice(0, cardsXpage));
  const [currentPage, setCurrentPage] = useState(0);

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;

    const firstIndex = prevPage * cardsXpage;

    setNumServicesXpage([...services].splice(firstIndex, cardsXpage));
    setCurrentPage(prevPage)
  }

  const handlerPage = (e) => {
    const nextPage = e.target.value - 1;
    const firstIndex = nextPage * cardsXpage;

    if (firstIndex === services.length) return;

    setNumServicesXpage([...services].splice(firstIndex, cardsXpage));
    setCurrentPage(nextPage)
  }

  const nextHandler = () => {
    let nextPage;
    if (currentPage < totalPages) {
      nextPage = totalPages - 1
    } else {
      nextPage = currentPage + 1
    }

    const firstIndex = nextPage * cardsXpage;
    if (firstIndex === services.length) {
      setCurrentPage(5);
      return
    }

    setNumServicesXpage([...services].splice(firstIndex, cardsXpage));
    setCurrentPage(nextPage)
  }
  console.log(numServicesXpage);
  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {numServicesXpage.length > 0 ? (
          numServicesXpage.map((serv, index) => {
            return (
              <Card
                id={serv.id}
                key={index}
                image={serv.imageUrl[0]}
                nameService={serv.nameService}
                typeService={serv.typeService}
                pricePerHour={serv.pricePerHour}
                emailUserService={serv.emailUserService}
                nameUserService = {serv.nameUserService}
                enabled={serv.enabled}
                rating={
                  serv.reviews && serv.reviews.length > 0 ? (
                    <div className={styles.ratings}>
                      {(() => {
                        const sum = serv.reviews
                          .map((review) => parseFloat(review.rating))
                          .reduce(
                            (a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0)
                          );
                        const averageRating = sum / serv.reviews.length;
                        return isNaN(averageRating)
                          ? "Invalid ratings"
                          : averageRating.toFixed(1);
                      })()}
                      <RatingStars
                        count={1}
                        value={(() => {
                          const sum = serv.reviews
                            .map((review) => parseFloat(review.rating))
                            .reduce(
                              (a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0)
                            );
                          const averageRating = sum / serv.reviews.length;
                          return isNaN(averageRating) ? 0 : averageRating;
                        })()}
                        size={24} // Tamaño de las estrellas
                        color1={"#ddd"} // Color de las estrellas inactivas
                        color2={"#ffd700"} // Color de las estrellas activas
                        edit={false}
                      />
                    </div>
                  ) : (
                    <p className={styles.zeroStar}>
                      0
                      <RatingStars
                        count={1}
                        size={24} // Tamaño de las estrellas
                        color1={"#ddd"} // Color de las estrellas inactivas
                        color2={"#ffd700"} // Color de las estrellas activas
                        edit={false}
                      />
                    </p>
                  )
                }
              />
            );
          })
        ) : (
          <div className={styles.msgBox}>
            <p className={styles.msg}>No services found with that name</p>
            <img src={faceThink} alt="" />
          </div>
        )}
      </div>


      <div className={styles.containerPagination}>
        <button className={styles.btnPagination} onClick={prevHandler}>{'<< '}</button>
        <div>
          {pageNum.map((num, i) => <button className={currentPage === i ? styles.btnActive : styles.btnPagination} key={i} style={{ marginRight: '5px' }} onClick={(e) => handlerPage(e)} value={num}>{num}</button>)}
        </div>
        <button className={styles.btnPagination} onClick={nextHandler}>{' >>'}</button>
      </div>

    </div>
  );
}
