import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Pasarela = () => {
  const promiseStripe = loadStripe(
    "pk_test_51NBQA0BpeRt7rcmet7zt0iDB39vFiEWAF1fC9g0mXU9UWuG5E50VE5j5o8AgcsZkeUv9iD4fWK4cUu9kKOqwhzKn00aWDy85Vh"
  );

  return (
    <Elements stripe={promiseStripe}>
      <form>
        <CardElement />
      </form>
    </Elements>
  );
};

export default Pasarela;
