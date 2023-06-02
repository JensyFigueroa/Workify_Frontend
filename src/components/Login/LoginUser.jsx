import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from '../../config/firebase-config.js'
import { updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'

import validate from './validate'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions';
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalPassword, setShowModalPassword] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const dispatch = useDispatch();

    const userName = useSelector(state => state.currentUserNameLoggedIn)

    const [formLogin, setFormLogin] = useState({ email: '', password: '' });
    const [formPassword, setFormPassword] = useState({ emailForgot: ''});
    const [formUser, setFormUser] = useState({ firstName: '', lastName: '', phoneNumber: '', country: 'Your country', city: 'Your city', emailUser: '', emailConfirm: '', passwordUser: '', passwordConfirm: '' });
    const [errors, setErrors] = useState({});

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [currentForm, setCurrentForm] = useState('');

    const handleFormChange = (formName) => {
        setCurrentForm(formName);
    };

    const handleInputChangeLogin = (e) => {
        const { name, value } = e.target
        setFormLogin({ ...formLogin, [name]: value })

    }
    const handleInputChangePassword = (e) => {
        const { name, value } = e.target
        setFormPassword ({ ...formPassword, [name]: value })

    }

    const handleInputChangeUser = (e) => {
        const { name, value } = e.target
        setFormUser({ ...formUser, [name]: value })

    }

    const handleBlur = (e) => {
        handleInputChangeLogin(e);
        if (currentForm === 'formLogin') setErrors(validate(formLogin));
        if (currentForm === 'formPassword') setErrors(validate(formPassword));
        if (currentForm === 'formUser') setErrors(validate(formUser));
        // console.log('estoy en el blur')
    }

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

    const handleSubmitLogin = async (event) => {
        event.preventDefault();

        if (Object.keys(errors).length === 0 && currentForm === 'formLogin') {
            try {
                const res = await signInWithEmailAndPassword(auth, formLogin.email, formLogin.password);
                if (res && res.user) {
                    const uid = res.user.uid;
                    const name = res.user.displayName;
                    
                    const userPhoneLogin = await (await axios.get(`/user/${uid}`)).data.phone
                    const userEmail = await (await axios.get(`/user/${uid}`)).data.email
                    //console.log(userEmail, "useridata");
                    dispatch(loginUser(uid, name, userPhoneLogin, userEmail))
                    //console.log(res.user, "user en el signin with email and password");
                }
                console.log('Enviando el form Login ', formLogin);
                setFormLogin({ email: '', password: '' })
            } catch (error) {
                console.log(error);
            }

            setShowModalLogin(false);
        }

    }

    const handleSubmitPassword = async (event) => {
        event.preventDefault();
        toast.success('An email has been sent to your email')
        setShowModalPassword(false);
    }

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && currentForm === 'formUser') {
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
                    const userPhoneRegister = await (await axios.get(`/user/${uid}`)).data.phone
                    const userEmail = await (await axios.get(`/user/${uid}`)).data.email
                    dispatch(loginUser(uid, name, userPhoneRegister, userEmail))
                    //console.log(res.user, "user en el signin with email and password")
                }



            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    // Handle the specific error when email is already in use
                    toast.error('Email already in use')
                    // Display an error message to the user
                }
            }

            console.log('Enviando el form User', formUser);
            setFormUser({ firstName: '', lastName: '', phoneNumber: '', country: 'Your country', city: 'Your city', emailUser: '', emailConfirm: '', passwordUser: '', passwordConfirm: '' })
            setShowModalUser(false);
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
                const userPhone = await (await axios.get(`/user/${uid}`)).data.phone
                const userEmail = await (await axios.get(`/user/${uid}`)).data.email
                dispatch(loginUser(uid, name, userPhone, userEmail))
               
            }
        } catch (error) {
            console.log(error, "que gonorrea");
        }

        setShowModalLogin(false)
        
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
            dispatch(loginUser('', '', '',''))
        } catch (error) {
            console.log(error);
        }
    };

    const hideFormLogin = (bool) => {
        setShowModalLogin(bool)
        setFormLogin({ email: '', password: '' })
        setErrors({})
    }
    const hideFormPassword = (bool) => {
        setShowModalPassword(bool)
        setFormPassword({ email: ''})
        setErrors({})
    }
    const hideFormUser = (bool) => {
        setShowModalUser(bool)
        setFormUser({firstName: '', lastName: '', phoneNumber: '', country: 'Your country', city: 'Your city', emailUser: '', emailConfirm: '', passwordUser: '', passwordConfirm: '' })
        setErrors({})
    }

    return (
        <div className="btn-group " role="group">
            {userName[0].length > 0 ? <div className={styles.userName}>
                <p>Welcome</p>
                <h6>{userName[0]}</h6></div> : ''}
            
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
                    <Link className="dropdown-item" to="#" variant="primary" onClick={() => { setShowModalLogin(true), handleFormChange('formLogin') }} >
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#" onClick={logOut}>
                        Log Out
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#" style={{ color: 'blue' }} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => { setShowModalUser(true), handleFormChange('formUser') }} >
                        Create User
                    </Link>

                </li>
            </ul>

            <Modal className={styles.wrapper} show={showModalLogin} onHide={() => hideFormLogin(false)} >
                <Modal.Header className={styles.headerLogin} >
                    <Modal.Title className={styles.titleLogin} >Login Workify
                    </Modal.Title>
                    <Link className={styles.customCloseButton} onClick={() => setShowModalLogin(false)}>
                        X
                    </Link>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitLogin}>
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
                            <Link to={'#'} onClick={() => { setShowModalPassword(true), handleFormChange('formPassword') }}>Forgot password</Link>
                        </div>

                        <div className={styles.field}>
                            {/* <input type="submit" value="Login" /> */}
                            <Button className={styles.btnLogin} variant="primary" type="submit">
                                Sign in
                            </Button>
                        </div>

                        <div className={styles.signUpLink}>
                            Don`t have an account?
                            <div className={styles.typeAccount}>

                                <Link to={'#'} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => { setShowModalLogin(false), setShowModalUser(true), handleFormChange('formUser') }}>SignUp User</Link>
                            </div>
                        </div>

                    </Form>
                    <div className="modal-footer">
                        <button onClick={() => {loginWithGoogle(), setShowModalLogin(false)}} className={styles.btnGoogle}><FcGoogle className={styles.icoGoogle} /> Continue with Google</button>
                    </div>
                </Modal.Body>
            </Modal>

           
{/* ############################### FORM FORGOT PASSWORD ################################################## */}

<Modal className={styles.wrapper} show={showModalPassword} onHide={() => hideFormPassword(false)} size="lg">
                <Modal.Header className={styles.headerLogin} >
                    <Modal.Title className={styles.titleLogin} >Forgot Password Workify
                    </Modal.Title>
                    <Link className={styles.customCloseButton} onClick={() => setShowModalPassword(false)}>
                        X
                    </Link>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitPassword}>
                        <div className={styles.field}>
                            <input type="text" name='emailForgot' onChange={handleInputChangePassword} onBlur={handleBlur} value={formPassword.emailForgot} required />
                            <label htmlFor="">Email address</label>
                        </div>
                        {errors.emailForgot && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.emailForgot}</p>}
                  
                        <div className={styles.field}>
                            {/* <input type="submit" value="Login" /> */}
                            <Button className={styles.btnLogin} variant="primary" type="submit">
                                Recover password
                            </Button>
                        </div>

                        <Toaster position="bottom-right" reverseOrder={false} />
                    </Form>
             
                </Modal.Body>
            </Modal>


{/* ############################### FORM CREATE USER ################################################## */}
            <Modal className={styles.wrapper} show={showModalUser} onHide={() => hideFormUser(false)} size="lg">
                <Modal.Header className={styles.headerLogin} >
                    <Modal.Title className={styles.titleLogin} >Create User Workify</Modal.Title>
                    <Link className={styles.customCloseButton} onClick={() => setShowModalUser(false)}>
                        X
                    </Link>
                </Modal.Header>

                <Modal.Body>
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

                        <div className={styles.field}>
                            <Button className={styles.btnLogin} variant="primary" type="submit">
                                Create User
                            </Button>
                        </div>

                        <Toaster position="bottom-right" reverseOrder={false} />
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Login;