import React from "react";
import styles from "./SuccessPayment.module.css";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const SuccessPayment = () => {
  const user = useSelector((state) => state.currentUserNameLoggedIn);
  console.log(user);

  const persona = { email: "carlitossaul.h@gmail.com" };

  useEffect(() => {
    // Configura las credenciales de email.js
    emailjs.init("7W9NT4oCDCiTSPAhs");

    // Configura el mensaje de correo electrónico
    const templateParams = {
      to_email: persona.email, // Reemplaza "user.email" con la propiedad correcta del objeto user que contiene el correo electrónico del usuario
      from_name: "Workify Services", // Nombre del remitente del correo electrónico
      subject: "Pago exitoso", // Asunto del correo electrónico
      message: `Hola ${user[0]},\n\nEl pago ha sido exitoso. Gracias por utilizar nuestros servicios.\n\nSaludos, \nWorkify Services`, // Cuerpo del correo electrónico
    };

    // Envía el correo electrónico
    emailjs
      .send("service_3iqa24w", "template_o4thiyt", templateParams)
      .then((response) => {
        console.log("Correo electrónico enviado exitosamente", response);
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico", error);
      });
  }, []);

  return <div className={styles.container}>SuccessPayment</div>;
};

export default SuccessPayment;
