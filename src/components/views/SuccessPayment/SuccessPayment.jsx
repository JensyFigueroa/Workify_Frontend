import React from "react";
import styles from "./SuccessPayment.module.css";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserNameLoggedIn);
  const mailUser = user[1];

  const idUser = useSelector((state) => state.currentUserIdLoggedIn);

  const cartItems = useSelector((state) => state.cart);

  console.log(cartItems, "cartitems en payment");
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
    return () => {
      window.localStorage.removeItem("cartItems");
    };
  }, []);

  const calculateSubtotal = (item) => {
    return item.quantity * item.pricePerHour;
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  return (
    <div className={styles.container}>
      {/* <h2>Your payment has been successfully processed</h2> */}

      <img
        className={styles.animation}
        src="https://cdn.dribbble.com/users/422385/screenshots/1762044/media/8c5787d2ef3df0d27daac4fce23c17b2.gif"
      ></img>
      <h3>Congratulations! You have paid for the following services:</h3>
      <div className={styles.cartItems}>
        <ul className={styles.list}>
          <li className={styles.listHeader}>
            <span>Name</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </li>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <span>{item.nameService}</span>
              <span>${item.pricePerHour}</span>
              <span>{item.quantity}</span>
              <span>${calculateSubtotal(item)}</span>
            </li>
          ))}
        </ul>
        <div className={styles.totalContainer}>
          <h2>Total: ${calculateTotal()}</h2>
        </div>
      </div>
      <button className={styles.myButton} onClick={() => navigate("/home")}>
        {" "}
        Return to home{" "}
      </button>
    </div>
  );
};

export default SuccessPayment;
