import { useSelector } from "react-redux";
import style from "../OtherServices/OtherServices.module.css";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import { FaStar } from 'react-icons/fa';

export const OtherServices = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const allServices = useSelector((state) => state.allServices);
    const itemsPerPage = 4;

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };

    const paginatedServices = allServices.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

      
    
    return (
    <div className={style.fatherContainer}>
            <ReactPaginate
            pageCount={Math.ceil(allServices.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageClassName={style.pageLink}
            onPageChange={handlePageChange}
            containerClassName={style.paginationContainer}
            activeClassName={style.activePage}
            previousLabel={<div className={style.paginationArrowPre}>&lsaquo;</div>}
            nextLabel={<div className={style.paginationArrowNext}>&rsaquo;</div>}
            previousClassName={style.paginationButton}
            nextClassName={style.paginationButton}
            disabledClassName={style.disabledPaginationButton}
            />

        <div className={style.container}>
        {paginatedServices.map((service) => (
          <div className={style.son} key={service.id}>
            <Link to={`/detail/${service.id}`}>
              <img src={service.imageUrl[0]} />
            </Link>
            <h5>{service.nameService}</h5>
            <div className={style.price}>
                <p>${service.pricePerHour}</p>
                <p className={style.starRating}>
                {service.reviews[0].raiting} <FaStar className={style.starIcon} />
                </p>
                
            </div>
          </div>
        ))}
        </div>
    </div>
    );
}