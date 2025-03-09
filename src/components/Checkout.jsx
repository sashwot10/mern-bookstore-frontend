import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Method Selected: ${paymentMethod}`);
    navigate("/thank-you"); // Redirect after selection
  };

  return (
    <div className="max-w-md mx-30  py-50 ">
      <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={() => setPaymentMethod("Cash on Delivery")}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="Online Payment"
              checked={paymentMethod === "Online Payment"}
              onChange={() => setPaymentMethod("Online Payment")}
            />
            <span>Online Payment</span>
          </label>
        </div>
        <button
          type="submit"
         
        >
          Confirm 
        </button>
      </form>
    </div>
  );
};

export default Checkout;
