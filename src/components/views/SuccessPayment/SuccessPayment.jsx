import React from "react";
import styles from "./SuccessPayment.module.css";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import { setCart } from "../../../redux/actions";
import axios from "axios";
import { useState } from "react";

const SuccessPayment = () => {
  const user = useSelector((state) => state.currentUserNameLoggedIn);
  const mailUser = user[1];
  const dispatch = useDispatch();

  const [mail, setMail] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    axios
      .get(`/payment/success?idSession=${sessionId}`)
      .then(({ data }) => setMail(data.map((ele) => Object.values(ele))));
  }, []);

  useEffect(() => {
    let mails = mail.flat(1).join(", ");
    emailjs.init("7W9NT4oCDCiTSPAhs");

    const templateParams = {
      to_email: mails,
      from_name: "Workify Services",
      subject: "Pago exitoso",
      message: `Holaaaaaaaaaaaaa,\n\nThe payment was successful. We have notified the service providers, and in the next few hours, the service providers will be notified and accepting or declining your offer.\n\nRegards,\nWorkify Servicessssssssssssssssssssssssssssssssssssssss.`,
    };
    emailjs
      .send("service_2vfi3xb", "template_2xk89xd", templateParams)
      .then((response) => {
        console.log("Correo electrónico enviado exitosamente", response);
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico", error);
      });
  }, []);

  useEffect(() => {
    emailjs.init("7W9NT4oCDCiTSPAhs");

    const templateParams = {
      to_email: mailUser,
      from_name: "Workify Services",
      subject: "Pago exitoso",
      message: `Hello ${user[0]},\n\nThe payment was successful. We have notified the service providers, and in the next few hours, the service providers will be notified and accepting or declining your offer.\n\nRegards,\nWorkify Services.`,
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
      <h1>"Your payment has been successfully processed."</h1>
    </div>
  );
};

export default SuccessPayment;
