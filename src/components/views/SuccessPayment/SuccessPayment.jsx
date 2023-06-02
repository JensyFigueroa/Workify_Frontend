import React from "react";
import styles from "./SuccessPayment.module.css";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const SuccessPayment = () => {
  const user = useSelector((state) => state.currentUserNameLoggedIn);

  useEffect(() => {
    emailjs.init("7W9NT4oCDCiTSPAhs");

    const templateParams = {
      to_email: user[1],
      from_name: "Workify Services",
      subject: "Pago exitoso",
      message: `Hola ${user[0]},\n\nEl pago ha sido exitoso. Hemos notificado a los prestadores de servicios, en las proximas horas los proveedores de servicios estaran siendo notificados y aceptando o declinando su oferta.\n\nSaludos, \nWorkify Services`,
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

  return <div className={styles.container}>SuccessPayment</div>;
};

export default SuccessPayment;
