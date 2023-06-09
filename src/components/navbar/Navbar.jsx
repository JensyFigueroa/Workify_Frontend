import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { useLocation } from "react-router-dom";
import logo from "../views/landing/img/logo.png";
import LoginUser from "../Login/LoginUser";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/Login";
import { getCart, loginUser, setCart } from "../../redux/actions";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config.js";
import axios from "axios";
// import {cantCart} from '../../NewCart/NewCart'

const Navbar = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  const [cantCart, setCantCart] = useState(
    JSON.parse(window.localStorage.getItem("cartItems"))
  );

  // console.log(cantCart)

  useEffect(() => {
    setCantCart(JSON.parse(window.localStorage.getItem("cartItems")));
  }, []);

  const [clickBurguer, setClickBurguer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  if ((screenSize.width > 1023) & clickBurguer) {
    setClickBurguer(false);
  }

  useEffect(() => {
    // dispatch(getCart);
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
  }, []);

  // const cart = useSelector((state) => state.cart);
  const userName = useSelector((state) => state.currentUserNameLoggedIn);
  const idUser = useSelector((state) => state.currentUserIdLoggedIn);

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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = `${isScrolled ? styles.fixed : styles.container}`;

  const logOut = async () => {
    try {
      await signOut(auth);
      const cartItems = JSON.parse(window.localStorage.getItem("cartItems")); //aca estoy mandando el carrito al back cuando me deslogueo
      console.log("saliendo", cartItems);
      axios
        .put(`/user/updateCart/${idUser}`, cartItems)
        .then((response) => console.log(`se envio el carrito`, response))
        .catch((error) => console.log(`error al enviar el carrito`, error));
      // .then((res) => {
      //     setUID('');
      //     window.localStorage.removeItem('uid');
      // })
      console.log("logged out");
      dispatch(loginUser("", "", "", "", ""));
      window.localStorage.removeItem("cartItems");
      console.log(JSON.parse(window.localStorage.getItem("cartItems")));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    location.pathname !== "/" && (
      <>
        <nav className={navbarClasses}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="logo" />
          </Link>

          <div className={styles.search}>
            <SearchBar />
          </div>

          <div
            className={`${styles.links} ${clickBurguer ? styles.show : ""} `}
          >
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              onClick={handleClick}
            >
              <i className="fa-solid fa-house-chimney" />
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              onClick={handleClick}
            >
              <i className="fa-solid fa-circle-info" />
              About
            </NavLink>
            <NavLink
              to="/createService"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              onClick={handleClick}
            >
              <i className="fa-solid fa-address-card" />
              Publish your service
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              onClick={handleClick}
            >
              {cantCart?.length ? (
                <span className={styles.cantCart}>{cantCart.length}</span>
              ) : (
                ""
              )}

              <MdHomeRepairService style={{ fontSize: "40px" }} />
            </NavLink>
          </div>

          <div className="btn-group " role="group">
            {userName[0].length > 0 ? (
              <div className={styles.userName}>
                <p>Welcome</p>
                <h6>{userName[0]}</h6>
              </div>
            ) : (
              ""
            )}

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
              {userName[0].length > 0 ? (
                <li>
                  <Link
                    className="dropdown-item"
                    to="/UserProfile"
                    variant="primary"
                  >
                    Profile
                  </Link>
                </li>
              ) : (
                ""
              )}
              {userName[0].length === 0 ? (
                <li>
                  <Login />
                </li>
              ) : (
                ""
              )}

              {userName[0].length > 0 ? (
                <li>
                  <Link className="dropdown-item" to="#" onClick={logOut}>
                    Log Out
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li>
                <LoginUser />
              </li>
            </ul>
          </div>

          <div
            className={`${styles.btnBurguer} ${styles.navIcon} ${
              clickBurguer ? styles.open : ""
            }`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div
            className={`${styles.curtain} ${
              clickBurguer ? styles.showCurtain : ""
            }`}
          ></div>
        </nav>
      </>
    )
  );
};

export default Navbar;
