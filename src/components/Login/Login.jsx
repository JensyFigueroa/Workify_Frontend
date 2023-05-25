import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { BsFillPersonLinesFill } from "react-icons/bs";

const Login = () => {
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
                    <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#">
                        Log Out
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="#" style={{ color: 'blue' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Registration
                    </Link>
                </li>
            </ul>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`${styles.wrapper} modal-content`}>
                        <div className={`${styles.titleLogin} modal-header`}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Login Workify</h1>
                            <button type="button" className="btn" style={{ color: 'white', fontWeight: '600' }} data-bs-dismiss="modal">X</button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-6">
                                <form action="">
                                    <div className={styles.field}>
                                        <input type="text" required />
                                        <label htmlFor="">Email address</label>
                                    </div>
                                    <div className={styles.field}>
                                        <input type="text" required />
                                        <label htmlFor="">Password</label>
                                    </div>

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
                                        Don't have an account? <Link to={'#'}>Signup now</Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Login con Gmail</button>

                        </div>
                    </div>
                </div>
            </div>
            {/* 
    
    
    <div className={styles.wrapper}>
        <div className={styles.titleLogin}>
            <h1>Login Workify</h1>
        </div>

        <form action="">
            <div className={styles.field}>
                <input type="text" required/>
                <label htmlFor="">Email address</label>
            </div>
            <div className={styles.field}>
                <input type="text" required/>
                <label htmlFor="">Password</label>
            </div>

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
                Not a remember <Link to={'#'}>Signup now</Link>
            </div>
        </form>

        
    </div> */}
        </div>
    )
}

export default Login