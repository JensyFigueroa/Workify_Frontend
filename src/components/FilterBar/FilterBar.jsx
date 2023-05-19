import styles from "./FilterBar.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff, MdOutlineClose } from "react-icons/md";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearFilter } from "../../redux/actions";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState("All");
  const [orderBy, setOrderBy] = useState("rating");
  const [orderType, setOrderType] = useState("up");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const carouselRef = useRef(null);

  const handleItemChange = (e) => {
    let value = e.target.value;
    setItems(value);
  };

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  const handleCarouselLeft = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleCarouselRight = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleOrderByName = (e) => {
    const { value } = e.target;
    setOrderBy(value);
  };

  const handleOrderType = (e) => {
    const { value } = e.target;
    setOrderType(value);
  };

  const handleClearfilter = () => {
    dispatch(clearFilter());
  };

  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.carouselContainer}>
        <button className={styles.carouselButton} onClick={handleCarouselLeft}>
          <FaChevronLeft />
        </button>
        <div className={styles.itemContainer} ref={carouselRef}>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Gardening")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/jardineria.png"
                alt="Gardening"
              />
              <span>Gardening</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Carpentry")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/herramientas.png"
                alt="Carpentry"
              />
              <span>Carpentry</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Plumbing")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/plomeria.png"
                alt="Plumbing"
              />
              <span>Plumbing</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Locksmithing")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/llaves.png"
                alt="Locksmithing"
              />
              <span>Locksmithing</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Cleaning")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/limpieza.png"
                alt="Cleaning"
              />
              <span>Cleaning</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Pool")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/piscina.png"
                alt="Pool"
              />
              <span>Pool</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Gas")}
          >
            <div className={styles.buttonIcon}>
              <img className={styles.icon} src="/Icons/fuego.png" alt="Gas" />
              <span>Gas</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Masonry")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/enladrillado.png"
                alt="Masonry"
              />
              <span>Masonry</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Electrical")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/Electric.png"
                alt="Electrical"
              />
              <span>Electrical work</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Painting")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/pintura.png"
                alt="Painting"
              />
              <span>Painting</span>
            </div>
          </button>
          <button
            className={styles.buttonItem}
            onClick={() => handleItemChange("Veterinary")}
          >
            <div className={styles.buttonIcon}>
              <img
                className={styles.icon}
                src="/Icons/veterinario.png"
                alt="Veterinary"
              />
              <span>Veterinary</span>
            </div>
          </button>
        </div>
        <button className={styles.carouselButton} onClick={handleCarouselRight}>
          <FaChevronRight />
        </button>
      </div>
      <div className={styles.filterButtonsContainer}>
        <button className={styles.filterButton} onClick={handleToggleFilters}>
          <MdFilterAlt />
        </button>
        <button className={styles.filterButton} onClick={handleClearfilter}>
          <MdFilterAltOff />
        </button>
      </div>
      {isFiltersOpen && (
        <div className={styles.filterPopup}>
          <div className={styles.filterContent}>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="orderBy">
                Order by:
              </label>
              <select
                id="orderBy"
                value={orderBy}
                onChange={handleOrderByName}
                className={styles.select}
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="orderType">
                Order direction:
              </label>
              <select
                id="orderType"
                value={orderType}
                onChange={handleOrderType}
                className={styles.select}
              >
                <option value="up">Up</option>
                <option value="down">Down</option>
              </select>
              <button
                className={styles.closeButton}
                onClick={handleCloseFilters}
              >
                <MdOutlineClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
