import React from "react";
import styles from "./SuccessPayment.module.css";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import axios from "axios";

const SuccessPayment = () => {
  const user = useSelector((state) => state.currentUserNameLoggedIn);
  const mailUser = user[1];

  const idUser = useSelector((state) => state.currentUserIdLoggedIn);

  useEffect(() => {
    axios
      .get(`/user/vacateCart/${idUser}`)
      .then((response) => console.log(response, `salio todo bien`))
      .catch((error) => console.log(`salio todo mal`, error));
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    axios
      .get(`/payment/success?idSession=${sessionId}&idUser=${idUser}`)
      .then(({ data }) => {
        console.log(data);
        const emailPromises = data.map((service) => {
          const { nameService, emailService, hours } = service;
          const templateParams = {
            to_email: emailService,
            from_name: "Workify Services",
            subject: "You have been hired via workify.",
            message: `Hello! A client from Workify has requested your ${nameService} service for a total of ${hours} hours.
            You have been hired by ${user[0]}. Please contact the person to coordinate the visit. Their email is ${user[1]}.
            \n\nRegards,\nWorkify Services.`,
          };
          return emailjs.send(
            "service_2vfi3xb",
            "template_2xk89xd",
            templateParams
          );
        });

        return Promise.all(emailPromises);
      })
      .then((responses) => {
        console.log("Correos electrónicos enviados exitosamente", responses);
      })
      .catch((error) => {
        console.error("Error al enviar los correos electrónicos", error);
      });
  }, []);

  useEffect(() => {
    emailjs.init("7W9NT4oCDCiTSPAhs");

    const templateParams = {
      to_email: mailUser,
      from_name: "Workify Services",
      subject: "Successful payment",
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

  window.localStorage.removeItem("cartItems");

  return (
    <div className={styles.container}>
      <h1>"Your payment has been successfully processed."</h1>
      <button className={styles.myButton} onClick={() => navigate("/home")}>
        {" "}
        Return to home{" "}
      </button>
    </div>
  );
};

export default SuccessPayment;
