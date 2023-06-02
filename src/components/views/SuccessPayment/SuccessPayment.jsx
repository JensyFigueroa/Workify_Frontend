import React from "react";
import styles from "./SuccessPayment.module.css";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import { setCart } from "../../../redux/actions";

const SuccessPayment = () => {
  const user = useSelector((state) => state.currentUserNameLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    emailjs.init("7W9NT4oCDCiTSPAhs");

    const templateParams = {
      to_email: user[1],
      from_name: "Workify Services",
      subject: "Pago exitoso",
      message:
        "Hello ${user[0]},\n\nThe payment was successful. We have notified the service providers, and in the next few hours, the service providers will be notified and accepting or declining your offer.\n\nRegards,\nWorkify Services.",
    };
    emailjs
      .send("service_3iqa24w", "template_o4thiyt", templateParams)
      .then((response) => {
        console.log("Correo electrónico enviado exitosamente", response);
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico", error);
      });
  }, []);

  dispatch(setCart());

  return (
    <div className={styles.container}>
      "Your payment has been successfully processed."
    </div>
  );
};

export default SuccessPayment;
