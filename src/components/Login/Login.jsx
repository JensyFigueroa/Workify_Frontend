import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

import validate from './validate'

const Login = () => {

    const [formLogin, setFormUser] = useState({ email: '', password: ''});
    const [errors, setErrors] = useState({});
    
    const handleInputChange = (e) => {
        console.log('handleInputChange ',e.target.value);
        const { name, value } = e.target
        
        setFormUser({...formLogin, [name]:value})
    } 
    
    const handleBlur = (e) => {
        handleInputChange(e);
        setErrors(validate(formLogin))
        console.log('estoy en el blur')
      }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enviar el form ', formLogin);
    
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
                    <Link className="dropdown-item" to="#" style={{ color: 'blue' }} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                        Create User
                    </Link>
                    <Link className="dropdown-item" to="#" style={{ color: 'blue' }} data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">
                        Create Lender
                    </Link>
                </li>
            </ul>


            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">

                    <div className={`${styles.wrapper} modal-content`}>
                        <div className={`${styles.titleLogin} modal-header`}>
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Login Workify</h1>
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal">X</button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-6">
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.field}>
                                        <input type="text" name='email' onChange={handleInputChange} onBlur={handleBlur} required />
                                        <label htmlFor="">Email address</label>
                                    </div>
                                        {errors.email && <p style={{ color: 'red', fontStyle: 'italic', fontSize: '18px'}}>{errors.email}</p>}
                                    <div className={styles.field}>
                                        <input type="password" name='password' onChange={handleInputChange} onBlur={handleBlur} required/>
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
                                            <Link to={'#'} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">SignUp User</Link>
                                            <Link to={'#'} data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">SignUp Lender</Link>

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
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal">X</button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className={styles.field}>
                                    <input type="text" required />
                                    <label htmlFor="">Firstname </label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" required />
                                    <label htmlFor="">Lastname</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" required />
                                    <label htmlFor="">Phone number</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" required />
                                    <label htmlFor="">Country</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="text" required />
                                    <label htmlFor="">City</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" required />
                                    <label htmlFor="">Password</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" required />
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
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600', fontSize: '30px' }} data-bs-dismiss="modal">X</button>
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
                                        <input type="password" required />
                                        <label htmlFor="">Password</label>
                                    </div>
                                    <div className={styles.fieldC}>
                                        <input type="password" required />
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

export default Login