import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard, FaCheck } from "react-icons/fa";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Method Selected: ${paymentMethod}`);
    navigate("/thank-you"); // Redirect after selection
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Choose Payment Method</h2>
      <form onSubmit={handleSubmit}>
        {/* Cash on Delivery Option */}
        <div className="mb-4 p-3 border rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100 transition">
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={() => setPaymentMethod("Cash on Delivery")}
            className="w-5 h-5"
          />
          <FaMoneyBillWave className="text-green-500" />
          <span className="text-gray-700">Cash on Delivery</span>
        </div>

        {/* Online Payment Option */}
        <div className="mb-4 p-3 border rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100 transition">
          <input
            type="radio"
            name="payment"
            value="Online Payment"
            checked={paymentMethod === "Online Payment"}
            onChange={() => setPaymentMethod("Online Payment")}
            className="w-5 h-5"
          />
          <FaCreditCard className="text-blue-500" />
          <span className="text-gray-700">Online Payment</span>
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <FaCheck className="mr-2" />
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;