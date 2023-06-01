import React from "react";
import styles from "./SuccessPayment.module.css";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const SuccessPayment = () => {
  const user = useSelector((state) => state.currentUserIdLoggedIn);

  return <div className={styles.container}>SuccessPayment</div>;
};

export default SuccessPayment;
