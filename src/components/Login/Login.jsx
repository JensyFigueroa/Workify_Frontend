import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import validate from "./validate";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../config/firebase-config.js";
import {
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { loginUser } from "../../redux/actions";
import LoginUser from "./LoginUser";
import ForgotPassword from "./ForgotPassword";
import { set } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import UpdateCartOnLogin from "../../NewCart/updateCartOnLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let closeForm = false;
  const dispatch = useDispatch();
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const hideLogin = () => {
    console.log(showModalLogin);
    setShowModalLogin(false);
  };

  const [currentForm, setCurrentForm] = useState("");

  const handleFormChange = (formName) => {
    setCurrentForm(formName);
  };

  const handleInputChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleBlur = (e) => {
    handleInputChangeLogin(e);
    if (currentForm === "formLogin") setErrors(validate(formLogin));

    // console.log('estoy en el blur')
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
  
    if (Object.keys(errors).length === 0 && currentForm === "formLogin") {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          formLogin.email,
          formLogin.password
        );
  
        if (res && res.user) {
          const uid = res.user.uid;
          const name = res.user.displayName;
          const user = (await axios.get(`/user/${uid}`)).data;
          console.log(user, "user en el signin with email and password");
          let { enabled, phone, email, imageUrl } = user;
          
          console.log(enabled, "enabled login normallll");
          
          if (!enabled) {
            await signOut(auth);
            toast.error("Please contact Support, your account has been disabled");
            throw new Error("User not enabled");
          }
  
          dispatch(loginUser(uid, name, phone, email, imageUrl));
          dispatch(getCartDataBase(uid));
          //console.log(res.user, "user en el signin with email and password");
        }
  
        console.log("Enviando el form Login ", formLogin);
        setFormLogin({ email: "", password: "" });
        setShowModalLogin(false);
        UpdateCartOnLogin(uid);
        window.location.reload();
      } catch (error) {
        console.log(error.message);
        if (error.message.includes("auth/wrong-password")) {
          toast.error("Email or Password Incorrect!! Try Again!");
        }
        if (error.message.includes("auth/user-not-found")) {
          toast.error("Email or Password Incorrect!! Try Again!");
        }
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const res = await signInWithPopup(auth, googleProvider);
      if (res && res.user) {
        const uid = res.user.uid;
        const name = res.user.displayName;
        console.log(res.user.displayName, "usuario logeado");
        const userEnabledGoogle = (await axios.get(`/user/${uid}`)).data.enabled;
        console.log(userEnabledGoogle, "enabled login google");
        if (!userEnabledGoogle) {
          await signOut(auth);
          toast.error("Please contact Support, your account has been disabled");
          throw new Error("User not enabled");
        }
  
        const inputs = {
          id: uid,
          name: name,
          email: res.user.email,
          country: "",
          city: "",
          phone: res.user.providerData[0]?.phoneNumber || "",
          credential: [""],
          imagePublicId: "",
          imageUrl: res.user.photoURL,
          adminStatus: false,
          description: "",
          google: true,
        };
  
        await axios.post("/login/", inputs);
  
        const user = (await axios.get(`/user/${uid}`)).data;
        const userPhone = user.phone;
        const userEmail = user.email;
        const userImg = user.imageUrl;
        dispatch(loginUser(uid, name, userPhone, userEmail, userImg));
        UpdateCartOnLogin(uid);
        toast("Welcome");
        setShowModalLogin(false);
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    } catch (error) {
      console.log(error);
    }
  
  };
  
  if (auth?.currentUser) {
    console.log("usuario esta logeado");
  }

  const hideFormLogin = (bool) => {
    setShowModalLogin(bool);
    setFormLogin({ email: "", password: "" });
    setErrors({});
  };

  const userName = useSelector((state) => state.currentUserNameLoggedIn);

  return (
    <>
      <Link
        className="dropdown-item"
        to="#"
        variant="primary"
        onClick={() => {
          setShowModalLogin(true), handleFormChange("formLogin");
        }}
      >
        Login
      </Link>
      {!userName[0] ? (
        <Modal
          className={styles.wrapper}
          show={showModalLogin}
          onHide={() => hideFormLogin(false)}
        >
          <Modal.Header className={styles.headerLogin}>
            <Modal.Title className={styles.titleLogin}>
              Login Workify
            </Modal.Title>
            <Link
              className={styles.customCloseButton}
              onClick={() => setShowModalLogin(false)}
            >
              X
            </Link>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitLogin}>
              <div className={styles.field}>
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChangeLogin}
                  onBlur={handleBlur}
                  value={formLogin.email}
                  required
                />
                <label htmlFor="">Email address</label>
              </div>
              {errors.email && (
                <p
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    fontSize: "18px",
                  }}
                >
                  {errors.email}
                </p>
              )}
              <div className={styles.field}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleInputChangeLogin}
                  onBlur={handleBlur}
                  value={formLogin.password}
                  required
                />
                <label htmlFor="">Password</label>
                <i className={`${styles.eye} fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} `} onClick={togglePasswordVisibility}></i>
              </div>
              {errors.password && (
                <p
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    fontSize: "18px",
                  }}
                >
                  {errors.password}
                </p>
              )}

              <div className={styles.content}>
                <div className={styles.checkbox}>
                  <input type="checkbox" name="" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
              </div>

              <div className={styles.passLink}>
                <ForgotPassword />
              </div>

              <div className={styles.field}>
                {/* <input type="submit" value="Login" /> */}
                <Button
                  className={styles.btnLogin}
                  variant="primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </div>

              <div className={styles.signUpLink}>
                Don`t have an account?
                <div className={styles.typeAccount}>
                  <LoginUser onClick={() => setFormLogin(false)} />
                </div>
              </div>
            </Form>
            <div className="modal-footer">
              <button
                onClick={() => {
                  loginWithGoogle(), setShowModalLogin(false);
                }}
                className={styles.btnGoogle}
              >
                <FcGoogle className={styles.icoGoogle} /> Continue with Google
              </button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
