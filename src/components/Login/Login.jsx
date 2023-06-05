import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import validate from './validate'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from '../../config/firebase-config.js'
import { updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { loginUser } from '../../redux/actions';
import LoginUser from './LoginUser';
import ForgotPassword from './ForgotPassword';
import { set } from 'date-fns';

const Login = () => {
    let closeForm = false
    const dispatch = useDispatch();
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [formLogin, setFormLogin] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const hideLogin = () =>{
        console.log(showModalLogin)
        setShowModalLogin(false)
    }

    const [currentForm, setCurrentForm] = useState('');

    const handleFormChange = (formName) => {
        setCurrentForm(formName);
    };

    const handleInputChangeLogin = (e) => {
        const { name, value } = e.target
        setFormLogin({ ...formLogin, [name]: value })


    }

    const handleBlur = (e) => {
        handleInputChangeLogin(e);
        if (currentForm === 'formLogin') setErrors(validate(formLogin));

        // console.log('estoy en el blur')
    }

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
                    const userImg = await (await axios.get(`/user/${uid}`)).data.imageUrl
                    dispatch(loginUser(uid, name, userPhoneLogin, userEmail, userImg))
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
                const userImg = await (await axios.get(`/user/${uid}`)).data.imageUrl
                //console.log(userImg, "imagen de usarui");
                dispatch(loginUser(uid, name, userPhone, userEmail, userImg))

            }
        } catch (error) {
            console.log(error, "que gonorrea");
        }

        setShowModalLogin(false)

    };


    if (auth?.currentUser) {
        console.log("usuario esta logeado")
    }

    const hideFormLogin = (bool) => {
        setShowModalLogin(bool)
        setFormLogin({ email: '', password: '' })
        setErrors({})
    }

    const userName = useSelector(state => state.currentUserNameLoggedIn)

    return (
        <>
            <Link className="dropdown-item" to="#" variant="primary" onClick={() => { setShowModalLogin(true), handleFormChange('formLogin') }} >
                Login
            </Link>
            {!userName[0] ? <Modal className={styles.wrapper} show={showModalLogin} onHide={() => hideFormLogin(false)} >
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
                            <ForgotPassword />
                        </div>

                        <div className={styles.field}>
                            {/* <input type="submit" value="Login" /> */}
                            <Button className={styles.btnLogin} variant="primary" type="submit">
                                Sign in
                            </Button>
                        </div>

                        <div className={styles.signUpLink}>
                            Don`t have an account?
                            <div className={styles.typeAccount} >
                                <LoginUser onClick={()=>setFormLogin(false)}/>   
                            </div>
                        </div>

                    </Form>
                    <div className="modal-footer">
                        <button onClick={() => { loginWithGoogle(), setShowModalLogin(false) }} className={styles.btnGoogle}><FcGoogle className={styles.icoGoogle} /> Continue with Google</button>
                    </div>
                </Modal.Body>
            </Modal> : ''}
            
        </>
    )
}

export default Login