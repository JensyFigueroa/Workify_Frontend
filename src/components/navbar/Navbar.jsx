import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const [clickBurguer, setClickBurguer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  if ((screenSize.width > 1023) & clickBurguer) {
    setClickBurguer(false);
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    setClickBurguer(!clickBurguer);
  };

  /* Fijamos el navbar */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClasses = `${isScrolled ? styles.fixed : styles.container}`;


  return (
    location.pathname !== "/" && (
      <>
        <nav className={navbarClasses}>
          <div className={styles.logo}>
            <MdHomeRepairService
              style={{ fontSize: "63px" }}
            ></MdHomeRepairService>
            <h1>Workify</h1>
          </div>

          <div className={styles.search}>
            <SearchBar />
          </div>

          <div className={`${styles.links} ${clickBurguer ? styles.show : ""} `}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              onClick={handleClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              onClick={handleClick}
            >
              About
            </NavLink>
            <NavLink
              to="/createService"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              onClick={handleClick}
            >
              Create Service
            </NavLink>
          </div>

          <div className="btn-group " role="group">
            <button
              type="button"
              className={`${styles.btn} `}
              style={{ color: "black" }}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsFillPersonLinesFill className={styles.loginIco} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Login
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Log Out
                </a>
              </li>
            </ul>
          </div>

          <div
            className={`${styles.btnBurguer} ${styles.navIcon} ${clickBurguer ? styles.open : ""
              }`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div
            className={`${styles.curtain} ${clickBurguer ? styles.showCurtain : ""
              }`}
          ></div>
        </nav>
      </>
    )
  );
};

export default Navbar;
