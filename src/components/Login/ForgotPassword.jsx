import React from 'react';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap';
import toast, { Toaster } from "react-hot-toast";
import { auth } from '../../config/firebase-config.js'

import validate from './validate'
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const [showModalPassword, setShowModalPassword] = useState(false);
    const [formPassword, setFormPassword] = useState({ emailForgot: '' });
    const [errors, setErrors] = useState({});

    const [currentForm, setCurrentForm] = useState('');

    const handleFormChange = (formName) => {
        setCurrentForm(formName);
    };

    const handleInputChangePassword = (e) => {
        const { name, value } = e.target
        setFormPassword({ ...formPassword, [name]: value })
    }

    const handleBlur = (e) => {
        handleInputChangePassword(e);
        setErrors(validate(formPassword));
        // console.log('estoy en el blur')
    }

    const handleSubmitPassword = async (event) => {
        event.preventDefault();
try {
    await sendPasswordResetEmail(auth, formPassword.emailForgot)
    toast.success('An email has been sent to your email')
} catch (error) {
    toast.error(error.message)
}
    

    


        setShowModalPassword(false);
    }

    const hideFormPassword = (bool) => {
        setShowModalPassword(bool)
        setFormPassword({ email: '' })
        setErrors({})
    }


    return (
        <>

            <Link className="dropdown-item" to="#" variant="primary" onClick={() => { setShowModalPassword(true), handleFormChange('formLogin') }} >
                Forgot password
            </Link>

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

        </>
    )
}

export default ForgotPassword