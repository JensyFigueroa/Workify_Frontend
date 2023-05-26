import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Pasarela = () => {
  const promiseStripe = loadStripe(
    "pk_test_51NBQA0BpeRt7rcmet7zt0iDB39vFiEWAF1fC9g0mXU9UWuG5E50VE5j5o8AgcsZkeUv9iD4fWK4cUu9kKOqwhzKn00aWDy85Vh"
  );

  const stripe = useStripe();

  const elements = useElements();

  const handlePaySubmit = async (e)=>{
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error){
      const {id} = paymentMethod;
      const {data} = await axios.post('http://localhost:3001/payment',{id, amount:10000})
    }

  }

  return (
    <Elements stripe={promiseStripe}>
      <form onSubmit={handlePaySubmit}>
        <CardElement />
        <button>
          Pay
        </button>
      </form>
    </Elements>
  );
};

export default Pasarela;
