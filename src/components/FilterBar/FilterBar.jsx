import styles from "./FilterBar.module.css";
import { MdOutlineClose } from "react-icons/md";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  selectItem,
  selectLocation,
  orderResult,
} from "../../redux/actions";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState("ALL");
  const [location, setLocation] = useState("ALL");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("nameService");
  const [orderType, setOrderType] = useState("up");
  const allcities = useSelector((state) => state.allCities);
  const allItems = useSelector((state) => state.allItems);

  const carouselRef = useRef(null);

  useEffect(() => {
    console.log(items);
    dispatch(selectItem(items));
  }, [items, dispatch]);

  useEffect(() => {
    dispatch(selectLocation(location));
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(orderResult(orderBy, orderType));
  }, [orderBy, orderType, dispatch]);

  const handleItemChange = (e) => {
    const { value } = e.target;
    console.log(value, "handler");
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

  const handleLocation = (e) => {
    const { value } = e.target;
    setLocation(value);
  };

  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.carouselContainer}>
        {/* <button className={styles.carouselButton} onClick={handleCarouselLeft}>
          <FaChevronLeft />
        </button> */}
        <div className={styles.itemContainer} ref={carouselRef}>
          <button
            className={styles.buttonItem}
            key="ALL"
            value="ALL"
            onClick={handleItemChange}
          >
            ALL
          </button>
          {allItems?.map((item, index) => (
            <button
              className={styles.buttonItem}
              key={index}
              value={item}
              onClick={handleItemChange}
            >
              {item}
            </button>
          ))}
        </div>
        {/* <button className={styles.carouselButton} onClick={handleCarouselRight}>
          <FaChevronRight />
        </button> */}
      </div>
      <div className={styles.filterButtonsContainer}>
        <button className={styles.filterButton} onClick={handleToggleFilters}>
          Order
        </button>

        <select
          id="location"
          value={location}
          onChange={handleLocation}
          className={styles.select}
        >
          <option key="ALL" value="ALL">
            All Cities
          </option>

          {allcities?.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
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
                <option value="nameService">Name</option>
                <option value="typeService">Type Service</option>
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
