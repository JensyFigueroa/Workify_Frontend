import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config.js";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

import validate from "./validate";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";
import { getCartDataBase } from "../../redux/actions";

const LoginUser = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.currentUserNameLoggedIn);

  const [formUser, setFormUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "Your country",
    city: "Your city",
    emailUser: "",
    emailConfirm: "",
    passwordUser: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [currentForm, setCurrentForm] = useState("");

  const handleFormChange = (formName) => {
    setCurrentForm(formName);
  };

  const handleInputChangeUser = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const handleBlur = (e) => {
    handleInputChangeUser(e);
    if (currentForm === "formUser") setErrors(validate(formUser));
    // console.log('estoy en el blur')
  };

  //<---SE MONTAN LOS PAISES-->
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/location/country', {
          params: {
            username: 'joaquinsgro',
            type: 'json'
          }
        });
        setCountries(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de países', error);
      }
    };

    fetchCountries();
  }, []);

  //<---FUNCIÓN PARA TRAER LAS CIUDADES--->
  const searchCities = async (countryCode) => {
    try {
      const response = await axios.get('/location/city', {
        params: {
          q: countryCode,
          username: 'joaquinsgro',
          type: 'json',
        },
      });
      
      console.log(response.data);
      setCities(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de estados', error);
    }
  };

  //<-- FUNCIÓN PARA ASIGNAR EL PAIS A LAS CIUDADES-->
  const handleCountryClick = (countryName) => {
    searchCities(countryName);
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0 && currentForm === "formUser") {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          formUser.emailUser,
          formUser.passwordUser
        );

        await updateProfile(auth.currentUser, {
          displayName: formUser.firstName + " " + formUser.lastName,
        });

        if (res && res.user) {
          const uid = res.user.uid;
          // setUID(uid);
          // console.log("entro al if");
          const name = formUser.firstName + " " + formUser.lastName;

          const inputs = {
            id: res.user.uid,
            name: formUser.firstName + " " + formUser.lastName,
            email: formUser.emailUser,
            country: formUser.country,
            city: formUser.city,
            phone: formUser.phoneNumber,
            credential: [""],
            imagePublicId: "",
            imageUrl: "",
            adminStatus: false,
            description: "",
            google: false,
          };
          await axios.post("/login/", inputs);
          toast.success("User Created!!");
          const userPhoneRegister = await (
            await axios.get(`/user/${uid}`)
          ).data.phone;
          const userEmail = await (await axios.get(`/user/${uid}`)).data.email;
          const userImg = await (await axios.get(`/user/${uid}`)).data.imageUrl;
          //console.log(userImg, "imagen de usarui");
          dispatch(loginUser(uid, name, userPhoneRegister, userEmail, userImg));
          //console.log(res.user, "user en el signin with email and password")
          dispatch(getCartDataBase(uid));
        }
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          // Handle the specific error when email is already in use
          toast.error("Email already in use");
          // Display an error message to the user
        }
      }

      console.log("Enviando el form User", formUser);
      setFormUser({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        country: "Your country",
        city: "Your city",
        emailUser: "",
        emailConfirm: "",
        passwordUser: "",
        passwordConfirm: "",
      });
      setShowModalUser(false);
    }
  };

  const hideFormUser = (bool) => {
    setShowModalUser(bool);
    setFormUser({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "Your country",
      city: "Your city",
      emailUser: "",
      emailConfirm: "",
      passwordUser: "",
      passwordConfirm: "",
    });
    setErrors({});
  };

  return (
    <>
      <Link
        className="dropdown-item"
        to="#"
        style={{ color: "blue" }}
        onClick={() => {
          setShowModalUser(true), handleFormChange("formUser");
        }}
      >
        Register user
      </Link>

      <Modal
        className={styles.wrapper}
        show={showModalUser}
        onHide={() => hideFormUser(false)}
        size="lg"
      >
        <Modal.Header className={styles.headerLogin}>
          <Modal.Title className={styles.titleLogin}>
            Create User Workify
          </Modal.Title>
          <Link
            className={styles.customCloseButton}
            onClick={() => setShowModalUser(false)}
          >
            X
          </Link>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmitUser}>
            <div className={styles.field}>
              <input
                type="text"
                name="firstName"
                onChange={handleInputChangeUser}
                onBlur={handleBlur}
                value={formUser.firstName}
                required
              />
              <label htmlFor="">Firstname </label>
            </div>
            {errors.firstName && (
              <p
                style={{ color: "red", fontStyle: "italic", fontSize: "18px" }}
              >
                {errors.firstName}
              </p>
            )}
            <div className={styles.field}>
              <input
                type="text"
                name="lastName"
                onChange={handleInputChangeUser}
                onBlur={handleBlur}
                value={formUser.lastName}
                required
              />
              <label htmlFor="">Lastname</label>
            </div>
            {errors.lastName && (
              <p
                style={{ color: "red", fontStyle: "italic", fontSize: "18px" }}
              >
                {errors.lastName}
              </p>
            )}
            <div className={styles.field}>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleInputChangeUser}
                onBlur={handleBlur}
                required
                value={formUser.phoneNumber}
              />
              <label htmlFor="">Phone number</label>
            </div>
            {errors.phoneNumber && (
              <p
                style={{ color: "red", fontStyle: "italic", fontSize: "18px" }}
              >
                {errors.phoneNumber}
              </p>
            )}

            <div className={styles.field}>
              <div className="input-group mb-3">
                <span
                  htmlFor="validationDefault01"
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Country
                </span>
                <select
                  name="country"
                  value={formUser.country}
                  onChange={handleInputChangeUser}
                  id="validationDefault01"
                  type="select"
                  className="form-select"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onClick={() => {
                    handleCountryClick(formUser.country);
                  }}
                  required
                >
                  <option value="">{formUser.country}</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <span
                  htmlFor="validationDefault01"
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  City
                </span>
                <select
                  name="city"
                  value={formUser.city}
                  onChange={handleInputChangeUser}
                  id="validationDefault02"
                  type="select"
                  className="form-select"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  required
                >
                  <option value="">{formUser.city}</option>
                  {cities.length > 0 &&
                    cities.map((city, index) => (
                      <option key={index}>{city.name}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <input
                type="text"
                name="emailUser"
                onChange={handleInputChangeUser}
                onBlur={handleBlur}
                value={formUser.emailUser}
                required
              />
              <label htmlFor="">Email address</label>
            </div>
            {errors.emailUser && (
              <p
                style={{ color: "red", fontStyle: "italic", fontSize: "18px" }}
              >
                {errors.emailUser}
              </p>
            )}

            <div className={styles.field}>
              <input
                type="text"
                name="emailConfirm"
                onChange={handleInputChangeUser}
                onBlur={handleBlur}
                value={formUser.emailConfirm}
                required
              />
              <label htmlFor="">Confirm email address</label>
            </div>
            {errors.emailConfirm && (
              <p
                style={{ color: "red", fontStyle: "italic", fontSize: "18px" }}
              >
                {errors.emailConfirm}
              </p>
            )}

            <div className={styles.field}>
              <input
                type="password"
                name="passwordUser"
                onChange={handleInputChangeUser}
                onBlur={handleBlur}
                required
                value={formUser.passwordUser}
              />
              <label htmlFor="">Password</label>
            </div>
            {errors.passwordUser && (
              <p
                style={{ color: "red", fontStyle: "italic", fontSize: "18px" }}
              >
                {errors.passwordUser}
              </p>
            )}
            <div className={styles.field}>
              <input
                type="password"
                name="passwordConfirm"
                onChange={handleInputChangeUser}
                onBlur={handleBlur}
                required
                value={formUser.passwordConfirm}
              />
              <label htmlFor="">Confirm Password</label>
            </div>
            {errors.passwordConfirm && (
              <p
                style={{ color: "red", fontStyle: "italic", fontSize: "18px" }}
              >
                {errors.passwordConfirm}
              </p>
            )}

            <div className={styles.field}>
              <Button
                className={styles.btnLogin}
                variant="primary"
                type="submit"
              >
                Register User
              </Button>
            </div>

            <Toaster position="bottom-right" reverseOrder={false} />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginUser;
