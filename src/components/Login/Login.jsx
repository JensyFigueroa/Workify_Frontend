import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from 'react';
import { auth, googleProvider } from '../../config/firebase-config.js'
import { updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'

import validate from './validate'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions';
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [currentForm, setCurrentForm] = useState('');
    const handleFormChange = (formName) => {
        setCurrentForm(formName);
    };

    const [formLogin, setFormLogin] = useState({ email: '', password: '' });
    const [formUser, setFormUser] = useState({ firstName: '', lastName: '', phoneNumber: '', country: 'Your country', city: 'Your city', emailUser: '', emailConfirm: '', passwordUser: '', passwordConfirm: '' });
    const [errors, setErrors] = useState({});


    // NOTAS PARA JENSY DE DANIEL
    // - Cambiar palabras de boton de "Create User" y poner "Create User and Login"
    // - Cuando alguien de de click a "LOGIN" O "Create User and Login" O "CONTINUE WITH GOOGLE" se deberia salir del POPUP Y MANDARLO AL HOME. 
    // - No sirve el popup del login, cuando estamos en el view de CREATE USER
    // - Si alguien intetna rear otra cuenta con un correoq ue ya existe no deberia limpiarle todo el formulario. debe quedarse para que el puedo solo cambiar el email.
    // - mostrar el usuario que este logeado en el navmbar


    //<---SE MONTAN LOS PAISES-->
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://api.geonames.org/countryInfoJSON', {
                    params: {
                        username: 'joaquinsgro',
                        type: 'json'
                    }
                });
                const countries = response.data.geonames.map(country => ({
                    name: country.countryName
                }));
                // console.log(countries);
                setCountries(countries);
            } catch (error) {
                console.error('Error al obtener la lista de países', error);
            }
        };

        fetchCountries();
    }, []);

    //<---FUNCIÓN PARA TRAER LAS CIUDADES--->
    const searchCities = async (countryName) => {
        try {
            const response = await axios.get('http://api.geonames.org/searchJSON', {
                params: {
                    q: countryName,
                    username: 'joaquinsgro',
                    type: 'json',
                },
            });

            const city = response.data.geonames.map(state => ({
                name: state.name,
            }));
            // console.log(city);
            setCities(city);
        } catch (error) {
            console.error('Error al obtener la lista de estados', error);
        }
    };

    //<-- FUNCIÓN PARA ASIGNAR EL PAIS A LAS CIUDADES-->
    const handleCountryClick = (countryName) => {
        searchCities(countryName);
    };
    const handleInputChangeLogin = (e) => {
        const { name, value } = e.target
        setFormLogin({ ...formLogin, [name]: value })

    }

    const handleInputChangeUser = (e) => {
        const { name, value } = e.target
        setFormUser({ ...formUser, [name]: value })

    }

    const handleBlur = (e) => {
        handleInputChangeLogin(e);
        if (currentForm === 'formLogin') setErrors(validate(formLogin));
        if (currentForm === 'formUser') setErrors(validate(formUser));
        // console.log('estoy en el blur')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enviando el form Login ', formLogin);
        setFormLogin({ email: '', password: '' })

        try {
            const res = await signInWithEmailAndPassword(auth, formLogin.email, formLogin.password);
            if (res && res.user) {
                const uid = res.user.uid;
                const name = res.user.displayName;
                console.log(name, "namegoogle");
                const userPhonelogin =  await (await axios.get(`/user/${uid}`)).data.phone
                console.log(userPhonelogin,"login normal")
                dispatch(loginUser(uid, name, userPhonelogin))
                console.log(res.user, "user en el signin with email and password");
            }
        } catch (error) {
            console.log(error);
        }


    }

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        console.log('Enviando el form User', formUser);
        setFormUser({ firstName: '', lastName: '', phoneNumber: '', country: 'Your country', city: 'Your city', emailUser: '', emailConfirm: '', passwordUser: '', passwordConfirm: '' })
        try {
            const res = await createUserWithEmailAndPassword(auth, formUser.emailUser, formUser.passwordUser)

            await updateProfile(auth.currentUser, {
                displayName: formUser.firstName + " " + formUser.lastName
            });


            if (res && res.user) {
                const uid = res.user.uid;
                // setUID(uid);
                // console.log("entro al if");
                const name = formUser.firstName + " " + formUser.lastName

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
                toast.success('User Created!!')
                const userPhoneRegister =  await (await axios.get(`/user/${uid}`)).data.phone
                dispatch(loginUser(uid, name, userPhoneRegister))
                console.log(res.user, "user en el signin with email and password")
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                // Handle the specific error when email is already in use
                toast.error('Email already in use')
                // Display an error message to the user
            }
        }

    }



    const loginWithGoogle = async () => {
        try {

            await setPersistence(auth, browserSessionPersistence);
            const res = await signInWithPopup(auth, googleProvider);
            if (res && res.user) {

                const uid = res.user.uid;
                const name = res.user.displayName;
                // setUID(uid);
                // window.localStorage.setItem('uid', res.user.uid);
                console.log(res.user.displayName, "usuario logeado");
                const inputs = {
                    id: res.user.uid,
                    name: res.user.displayName,
                    email: res.user.email,
                    country: "",
                    city: "",
                    phone: res.user.providerData[0].phoneNumber,
                    credential: [""],
                    imagePublicId: "",
                    imageUrl: res.user.photoURL,
                    adminStatus: false,
                    description: "",
                    google: true,
                };
                await axios.post("/login/", inputs);
                const userPhone =  await (await axios.get(`/user/${uid}`)).data.phone
                console.log(userPhone,"telefono")
                dispatch(loginUser(uid, name, userPhonelogin));

            }
        } catch (error) {
            console.log(error, "que gonorrea");
        }
    };


    if (auth?.currentUser) {
        console.log("usuario esta logeado")
    }



    const logOut = async () => {
        try {
            await signOut(auth)
            // .then((res) => {
            //     setUID('');
            //     window.localStorage.removeItem('uid');
            // })
            console.log('logged out');
            dispatch(loginUser('', '',''))
        } catch (error) {
            console.log(error);
        }
    };

    const refLogin = useRef(null);
    const refUser = useRef(null);

    useEffect(() => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const elementId = mutation.target.id;
            const classList = mutation.target.classList;
            
            if (classList.contains('show')) {
              console.log(`Se agregó la clase 'show' al elemento con ID: ${elementId}`);
              if (elementId === 'exampleModalToggle') {
                setFormUser({ firstName: '', lastName: '', phoneNumber: '', country: 'Your country', city: 'Your city', emailUser: '', emailConfirm: '', passwordUser: '', passwordConfirm: '' })
                setErrors({})
              }else{
                setFormLogin({ email: '', password: '' })
                setErrors({})
              }
            } else {
                if (elementId === 'exampleModalToggle') {
                    setFormLogin({ email: '', password: '' })
                    setErrors({})
                }else{
                    setFormUser({firstName: '', lastName: '', phoneNumber: '', country: 'Your country', city: 'Your city', emailUser: '', emailConfirm: '', passwordUser: '', passwordConfirm: '' })
                    setErrors({})
                  }

              console.log(`Se quitó la clase 'show' del elemento con ID: ${elementId}`);
            }
          }
        }
      });
    
      if (refLogin.current) {
        observer.observe(refLogin.current, { attributes: true });
      }
      if (refUser.current) {
        observer.observe(refUser.current, { attributes: true });
      }
    
      return () => {
        if (refLogin.current) {
          observer.unobserve(refLogin.current);
        }
        if (refUser.current) {
          observer.unobserve(refUser.current);
        }
      };
    }, []);


    return (
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
                    <Link className="dropdown-item" to="#" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => handleFormChange('formLogin')}>
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#">
                        <button onClick={logOut}>Log Out</button>
                    </Link>
                    <Link className="dropdown-item" to="#">
                        Log Out
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#" style={{ color: 'blue' }} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => handleFormChange('formUser')} >
                        Create User
                    </Link>

                </li>
            </ul>


            <div ref={refLogin} className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">

                    <div className={`${styles.wrapper} modal-content`}>
                        <div className={`${styles.titleLogin} modal-header`}>

                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Login Workify</h1>
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal" name='btnLogin'>X</button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-6">
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.field}>
                                        <input type="text" name='email' onChange={handleInputChangeLogin} onBlur={handleBlur} value={formLogin.email} required />
                                        <label htmlFor="">Email address</label>
                                    </div>
                                    {errors.email && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.email}</p>}
                                    <div className={styles.field}>
                                        <input type="password" name='password' onChange={handleInputChangeLogin} onBlur={handleBlur} value={formLogin.password} required />
                                        <label htmlFor="">Password</label>
                                    </div>
                                    {errors.password && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.password}</p>}

                                    <div className={styles.content}>
                                        <div className={styles.checkbox}>
                                            <input type="checkbox" name="" id="rememberMe" />
                                            <label htmlFor="rememberMe">Remember Me</label>
                                        </div>
                                    </div>

                                    <div className={styles.passLink}>
                                        <Link to={'#'}>Forgot password</Link>
                                    </div>

                                    <div className={styles.field}>
                                        <input type="submit" value="Login" />
                                    </div>

                                    <div className={styles.signUpLink}>
                                        Don`t have an account?
                                        <div className={styles.typeAccount}>
                                            <Link to={'#'} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => handleFormChange('formUser')}>SignUp User</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button onClick={loginWithGoogle} className={styles.btnGoogle}><FcGoogle className={styles.icoGoogle} /> Continue with Google</button>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={refUser} className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className={`${styles.wrapper} modal-content`}>
                        <div className={`${styles.titleLogin} modal-header`}>
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Create User</h1>
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal" name='btnUser'>X</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitUser}>
                                <div className={styles.field}>
                                    <input type="text" name='firstName' onChange={handleInputChangeUser} onBlur={handleBlur} value={formUser.firstName} required />
                                    <label htmlFor="">Firstname </label>
                                </div>
                                {errors.firstName && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.firstName}</p>}
                                <div className={styles.field}>
                                    <input type="text" name='lastName' onChange={handleInputChangeUser} onBlur={handleBlur} value={formUser.lastName} required />
                                    <label htmlFor="">Lastname</label>
                                </div>
                                {errors.lastName && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.lastName}</p>}
                                <div className={styles.field}>
                                    <input type="text" name='phoneNumber' onChange={handleInputChangeUser} onBlur={handleBlur} required value={formUser.phoneNumber} />
                                    <label htmlFor="">Phone number</label>
                                </div>
                                {errors.phoneNumber && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.phoneNumber}</p>}

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
                                            onClick={() => { handleCountryClick(formUser.country) }}
                                            required>
                                            <option value="" >
                                                {formUser.country}
                                            </option>
                                            {countries.map((country, index) => (
                                                <option key={index} value={country.name}>
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
                                            required>
                                            <option value="" >
                                                {formUser.city}
                                            </option>
                                            {cities.length > 0 &&
                                                cities.map((city, index) => (
                                                    <option key={index}>{city.name}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <input type="text" name='emailUser' onChange={handleInputChangeUser} onBlur={handleBlur} value={formUser.emailUser} required />
                                    <label htmlFor="">Email address</label>
                                </div>
                                {errors.emailUser && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.emailUser}</p>}

                                <div className={styles.field}>
                                    <input type="text" name='emailConfirm' onChange={handleInputChangeUser} onBlur={handleBlur} value={formUser.emailConfirm} required />
                                    <label htmlFor="">Confirm email address</label>
                                </div>
                                {errors.emailConfirm && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.emailConfirm}</p>}

                                <div className={styles.field}>
                                    <input type="password" name='passwordUser' onChange={handleInputChangeUser} onBlur={handleBlur} required value={formUser.passwordUser} />
                                    <label htmlFor="">Password</label>
                                </div>
                                {errors.passwordUser && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.passwordUser}</p>}
                                <div className={styles.field}>
                                    <input type="password" name='passwordConfirm' onChange={handleInputChangeUser} onBlur={handleBlur} required value={formUser.passwordConfirm} />
                                    <label htmlFor="">Confirm Password</label>
                                </div>
                                {errors.passwordConfirm && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.passwordConfirm}</p>}
                                <button type="submit" className={`btn btn-primary ${styles.field}`}>Create User</button>
                                <Toaster position="bottom-right" reverseOrder={false} />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login