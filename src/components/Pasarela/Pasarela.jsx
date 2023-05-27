import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import styles from "./Pasarela.module.css";

// const promiseStripe = loadStripe(
//   "pk_test_51NBQA0BpeRt7rcmet7zt0iDB39vFiEWAF1fC9g0mXU9UWuG5E50VE5j5o8AgcsZkeUv9iD4fWK4cUu9kKOqwhzKn00aWDy85Vh"
// );

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#252525",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Pasarela = () => {
  const stripe = useStripe();

  const elements = useElements();

  const handlePaySubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post("http://localhost:3001/payment", {
        id,
        amount: 10000,
      });
      console.log("Message error: ", data);
    }
  };
  //<Elements stripe={promiseStripe}>
  //</Elements>
  return (
    <form className={styles.formContainer} onSubmit={handlePaySubmit}>
      <CardElement className={styles.cardElement} options={cardStyle} />
      <div className={styles.containerButton}>
        <button className={styles.payButton}>Pay</button>
      </div>
    </form>
  );
};

export default Pasarela;
