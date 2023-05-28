import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

import validate from "./validate";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions";

const Login = () => {
    const [formLogin, setFormLogin] = useState(null);
    const [formUser, setFormUser] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChangeLogin = (e) => {
        const { name, value } = e.target
        setFormLogin({ ...formLogin, [name]: value })
        setFormUser(null)
    }
  }, [dispatch]);

  const handleInputChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
    setFormUser(null);
  };

    const handleInputChangeUser = (e) => {
        const { name, value } = e.target
        setFormUser({ ...formUser, [name]: value })
        setFormLogin(null)
    }

    const handleBlur = (e) => {
        handleInputChangeLogin(e);
        console.log(formLogin,formUser)
        console.log(formLogin)
        if (formLogin) setErrors(validate(formLogin));
        if (formUser) setErrors(validate(formUser));
        console.log('estoy en el blur')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enviar el form Login ', formLogin);
    }

    const handleSubmitUser = (e) => {
        e.preventDefault();
        console.log('Enviar el form User', formUser);
    }


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
                    <Link className="dropdown-item" to="#" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#">
                        Log Out
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#" style={{ color: 'blue' }} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" >
                        Create User
                    </Link>
            
                </li>
            </ul>


            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">

                    <div className={`${styles.wrapper} modal-content`}>
                        <div className={`${styles.titleLogin} modal-header`}>
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Login Workify</h1>
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal" name='btnLogin' >X</button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-6">
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.field}>
                                        <input type="text" name='email' onChange={handleInputChangeLogin} onBlur={handleBlur} required />
                                        <label htmlFor="">Email address</label>
                                    </div>
                                    {errors.email && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px' }}>{errors.email}</p>}
                                    <div className={styles.field}>
                                        <input type="password" name='passwordLogin' onChange={handleInputChangeLogin} onBlur={handleBlur} required />
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
                    <Link to={"#"}>Forgot password</Link>
                  </div>

                  <div className={styles.field}>
                    <input type="submit" value="Login" />
                  </div>

                                    <div className={styles.signUpLink}>
                                        Don`t have an account?
                                        <div className={styles.typeAccount}>
                                            <Link to={'#'} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" >SignUp User</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="modal-footer">

                            <button type='submit' className={styles.btnGoogle}><FcGoogle className={styles.icoGoogle} /> Continue with Google</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className={`${styles.wrapper} modal-content`}>
                        <div className={`${styles.titleLogin} modal-header`}>
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Create User</h1>
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal" name='btnUser'>X</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitUser}>
                                <div className={styles.field}>
                                    <input type="text" name='firstName' onChange={handleInputChangeUser} onBlur={handleBlur} required />
                                    <label htmlFor="">Firstname </label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" name='lastName' onChange={handleInputChangeUser} onBlur={handleBlur} required />
                                    <label htmlFor="">Lastname</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" name='phoneNumber' onChange={handleInputChangeUser} onBlur={handleBlur} required />
                                    <label htmlFor="">Phone number</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" name='country' onChange={handleInputChangeUser} onBlur={handleBlur} required />
                                    <label htmlFor="">Country</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" name='city' onChange={handleInputChangeUser} onBlur={handleBlur} required />
                                    <label htmlFor="">City</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" name='passwordUser' onChange={handleInputChangeUser} onBlur={handleBlur} required />
                                    <label htmlFor="">Password</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="passwordConfirmUser" required />
                                    <label htmlFor="">Confirm Password</label>
                                </div>
                                <button type="submit" className={`btn btn-primary ${styles.field}`}>Create User</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className={`${styles.wrapper} modal-content`}>
                        <div className={`${styles.titleLogin} modal-header`}>
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Create Lender</h1>
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal" name='btnLender' >X</button>
                        </div>

                        <div className="modal-body">
                            <form action="">
                                <div className={styles.boxCompany}>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">Company name </label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">Company address</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">Company email</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">Company phone</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">Country of the company</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">City of the company</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">Contact Fullname</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="text" required />
                                        <label htmlFor="">Contact phone number</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="passwordLender" required />
                                        <label htmlFor="">Password</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="passwordConfirmLender" required />
                                        <label htmlFor="">Confirm Password</label>
                                    </div>
                                </div>
                                <button type="submit" className={`btn btn-primary ${styles.field}`}>Create Lender</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
