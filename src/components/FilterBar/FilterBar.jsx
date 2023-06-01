import { useEffect, useState, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  selectItem,
  selectLocation,
  orderResult,
  cleanSearch
} from "../../redux/actions";
import styles from "./FilterBar.module.css";

const FilterBar = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState(null);
  const [location, setLocation] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("nameService");
  const [orderType, setOrderType] = useState("up");
  const [isFiltersCleared, setIsFiltersCleared] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(100);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  const itemContainerRef = useRef(null);

  const allcities = useSelector((state) => state.allCities);
  const allItems = useSelector((state) => state.allItems);

  useEffect(() => {
    const updateButtonWidth = () => {
      if (itemContainerRef.current) {
        const containerWidth = itemContainerRef.current.offsetWidth;
        const buttonCount = Math.floor(containerWidth / 100);

        if (buttonCount === 0) {
          setButtonWidth(100);
        } else {
          setButtonWidth(containerWidth / buttonCount);
        }
      }
    };

    window.addEventListener("resize", updateButtonWidth);
    updateButtonWidth();

    return () => {
      window.removeEventListener("resize", updateButtonWidth);
    };
  }, []);

  const visibleItems = allItems
    .sort()
    .slice(carouselPosition, carouselPosition + 4);

  const handleItemChange = (e) => {
    const { value } = e.target;
    setItems(value);
    dispatch(selectItem(value));
  };

  const handleCarouselLeft = () => {
    setCarouselPosition(carouselPosition - 1);
    setIsRightArrowVisible(true);
    if (carouselPosition - 1 === 0) {
      setIsLeftArrowVisible(false);
    }
  };

  const handleCarouselRight = () => {
    setCarouselPosition(carouselPosition + 1);
    setIsLeftArrowVisible(true);

    if (carouselPosition + 1 === allItems.length - 4) {
      setIsRightArrowVisible(false);
    }
  };

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  const handleOrderByName = (e) => {
    const { value } = e.target;
    setOrderBy(value);
    dispatch(orderResult(value, orderType));
  };

  const handleOrderType = (e) => {
    const { value } = e.target;
    setOrderType(value);
    dispatch(orderResult(orderBy, value));
  };

  const handleClearfilter = () => {
    dispatch(clearFilter());
    dispatch(cleanSearch());
    setLocation("ALL");
    setItems("ALL");
    setIsFiltersCleared(!isFiltersCleared);
  };

  const handleLocation = (e) => {
    const { value } = e.target;
    setLocation(value);
    dispatch(selectLocation(value));
  };

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.carouselContainer}>
        <div className={styles.buttonArrowContainer}>
          {isLeftArrowVisible && (
            <button className={styles.buttonArrow} onClick={handleCarouselLeft}>
              <FaChevronLeft />
            </button>
          )}
        </div>
        <button
          className={styles.buttonItem}
          key="ALL"
          value="ALL"
          onClick={handleItemChange}
        >
          All
        </button>
        <div className={styles.itemContainer} ref={itemContainerRef}>
          {visibleItems?.map((item, index) => (
            <button
              className={`${styles.buttonItem} ${
                item === items ? styles.selected : ""
              }`}
              key={index}
              value={item}
              onClick={handleItemChange}
            >
              {item}
            </button>
          ))}
        </div>
        <div className={styles.buttonArrowContainer}>
          {isRightArrowVisible && (
            <button
              className={styles.buttonArrow}
              onClick={handleCarouselRight}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
      <div className={styles.filterButtonsContainer}>
        <select
          id="location"
          value={isFiltersCleared ? "ALL" : location || ""}
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
        <button className={styles.filterButton} onClick={handleToggleFilters}>
          Order
        </button>
        <button className={styles.filterButton} onClick={handleClearfilter}>
          Clean
        </button>
      </div>
      {isFiltersOpen && (
        <div className={styles.filterPopup} onClick={handleCloseFilters}>
          <div className={styles.filterContent} onClick={handlePopupClick}>
            <button className={styles.closeButton} onClick={handleCloseFilters}>
              <MdOutlineClose />
            </button>
            <div className={styles.orderContainer}>
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
                  <option value="pricePerHou">Price</option>
                  <option value="reviews">Reviews</option>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
