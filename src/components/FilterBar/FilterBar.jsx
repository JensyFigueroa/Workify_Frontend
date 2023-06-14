import { useEffect, useState, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  selectItem,
  selectLocation,
  orderResult,
  cleanSearch,
} from "../../redux/actions";
import styles from "./FilterBar.module.css";

import services from "../views/CreateService/Services";

const FilterBar = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState(null);
  const [location, setLocation] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("nameService");
  const [orderType, setOrderType] = useState("up");
  const [isFiltersCleared, setIsFiltersCleared] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);
  // const [buttonWidth, setButtonWidth] = useState(100);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

  const itemContainerRef = useRef(null);

  const allcities = useSelector((state) => state.allCities);
  const allItems = useSelector((state) => state.allItems);

  const icoCategory = [
    {
      name: 'Plumbing',
      ico: '<i class="fa-solid fa-wrench"></i>'
    },
    {
      name: 'Electricity',
      ico: '<i class="fa-solid fa-plug"></i>'
    },
    {
      name: 'Gardening',
      ico: '<i class="fa-solid fa-tree-city"></i>'
    },
    {
      name:'Home Cleaning',
      ico:'<i class="fa-solid fa-broom"></i>'
    },
    {
      name:'Carpentry',
      ico:'<i class="fa-solid fa-screwdriver-wrench"></i>'
    },
    {
      name:'Painting',
      ico:'<i class="fa-solid fa-brush"></i>'
    },
    {
      name:'Masonry',
      ico:'<i class="fa-solid fa-trowel-bricks"></i>'
    },
    {
      name:'Childcare',
      ico:'<i class="fa-solid fa-children"></i>'
    },
    {
      name:'Pet Care',
      ico:'<i class="fa-solid fa-paw"></i>'
    },
    {
      name:'Appliance Repair',
      ico:'<i class="fa-solid fa-toolbox"></i>'
    },
    {
      name:'Moving Service',
      ico:'<i class="fa-solid fa-truck"></i>'
    },
    {
      name:'Window Cleaning',
      ico:'<i class="fa-brands fa-windows"></i>'
    },
    {
      name:'Laundry and Ironing',
      ico:'<i class="fa-solid fa-jug-detergent"></i>'
    },
    {
      name:'Computer and Electronics Repair',
      ico:'<i class="fa-solid fa-computer"></i>'
    },
    {
      name:'Interior Design and Decoration',
      ico:'<i class="fa-solid fa-holly-berry"></i>'
    },
    {
      name:'Security System Installation',
      ico:'<i class="fa-solid fa-shield-halved"></i>'
    },
    {
      name:'Automobile Repair',
      ico:'<i class="fa-solid fa-car"></i>'
    },
    {
      name:'Catering and Event Service',
      ico:'<i class="fa-solid fa-wand-sparkles"></i>'
    },
    {
      name:'Personal Training and Fitness',
      ico:'<i class="fa-solid fa-dumbbell"></i>'
    },
    {
      name:'Translation and Interpretation Service',
      ico:'<i class="fa-solid fa-book-open-reader"></i>'
    },

  ]

  // useEffect(() => {
  //   const updateButtonWidth = () => {
  //     if (itemContainerRef.current) {
  //       const containerWidth = itemContainerRef.current.offsetWidth;
  //       const buttonCount = Math.floor(containerWidth / 100);

  //       if (buttonCount === 0) {
  //         setButtonWidth(100);
  //       } else {
  //         setButtonWidth(containerWidth / buttonCount);
  //       }
  //     }
  //   };

  //   window.addEventListener("resize", updateButtonWidth);
  //   updateButtonWidth();

  //   return () => {
  //     window.removeEventListener("resize", updateButtonWidth);
  //   };
  // }, []);

  const visibleItems = allItems
    .sort()
    .slice(carouselPosition, carouselPosition + 5);

  const handleItemChange = (e) => {
    const { value } = e.target;
    setItems(value);
    setIsFiltersOpen(true);
    dispatch(selectItem(value));
    if (value === "ALL" && (location === "ALL" || location === null))
      setIsFiltersOpen(false);
  };

  const handleCarouselLeft = () => {
    setCarouselPosition(carouselPosition - 5);
    setIsRightArrowVisible(true);
    if (carouselPosition - 5 === 0) {
      setIsLeftArrowVisible(false);
    }
  };

  const handleCarouselRight = () => {
    setCarouselPosition(carouselPosition + 5);
    setIsLeftArrowVisible(true);

    console.log(carouselPosition);

    if (carouselPosition + 5 >= allItems.length - 4) {
      setIsRightArrowVisible(false);
    }
  };

  // const handleToggleFilters = () => {
  //   setIsFiltersOpen(!isFiltersOpen);
  // };

  // const handleFilters = (e) => {
  //   const { value } = e.target;
  //   if (value === "location") {
  //     setLocation("ALL");
  //   }

  //   if (value === "items") {
  //     setItems("ALL");
  //     dispatch(selectItem(value));
  //   }
  // };

  const handleOrderByName = (e) => {
    const { value } = e.target;
    if (value === "rating") {
      setOrderBy(value);
      console.log(value, "rating en handler de order");
      dispatch(orderResult(value, orderType));
    } else {
      console.log(value, "en handler de order");
      setOrderBy(value);
      dispatch(orderResult(value, orderType));
    }
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
    setIsFiltersOpen(true);
    dispatch(selectLocation(value));
    if (value === "ALL" && (items === "ALL" || items === null))
      setIsFiltersOpen(false);
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

        <div className={styles.itemContainer} ref={itemContainerRef}>
          {/* <button
            className={styles.buttonItem}
            key="ALL"
            value="ALL"
            onClick={handleItemChange}
          >
            All Categories
          </button> */}
          {visibleItems?.map((item, index) => (
            <label
              key={index}
              className={`${styles.buttonItem} ${item === items ? styles.selected : ""
                }`}
            >

              {/* {icoCategory.find(category => category.name === item && category.ico)} */}
              {/* {icoCategory.find(category => category.name === item)?.ico} */}
              <span className={styles.icon} dangerouslySetInnerHTML={{ __html: icoCategory.find(category => category.name === item)?.ico }} />

              {console.log(icoCategory[item], 'filterbar') }
              <button value={item} onClick={handleItemChange}>
                {item}
              </button>
            </label>
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
      <div className={styles.orderContainer}>
        <div className={styles.selectContainer}>
          <label className={styles.selectLabel} htmlFor="orderBy">
            City:
          </label>
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
        </div>
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
            <option value="pricePerHour">Price</option>

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
        <div className={styles.selectContainer}>
          {/* <button
            className={styles.btnFilter}
            key="ALL"
            value="ALL"
            onClick={handleItemChange}
          >
            All Categories
          </button> */}

          <button className={styles.btnFilter} onClick={handleClearfilter}>
            Clean
          </button>
          {isFiltersOpen && (
            <div>
              {location !== "ALL" && location !== null && (
                <button
                  className={styles.btnFilter}
                  value="ALL"
                  onClick={handleLocation}
                >
                  X {location}
                </button>
              )}
              {items !== "ALL" && items !== null && (
                <button
                  className={styles.btnFilter}
                  value="ALL"
                  onClick={handleItemChange}
                >
                  X {items}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
