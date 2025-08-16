import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  campaignName: string;
  userEmail: string;
}

const PaymentModal: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const campaignName = (state as LocationState)?.campaignName;
  const userEmail = (state as LocationState)?.userEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe.js not loaded");
      setLoading(false);
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/user-dashboard/payment-complete",
          receipt_email: userEmail,
        },
      });

      console.log(result);

      if (result.error) {
        setError(result.error.message || "Payment failed");
        toast.error("Payment failed");
      } else {
        toast.info("Payment processing, please wait for confirmation");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError("Failed to process payment");
      toast.error("Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-payment modal-open ">
      <div className="modal modal-box">
        <h2 className="mb-1">Enter Payment Details</h2>
        <label htmlFor="" className="text-gray-600 text-center mb-4">
          {campaignName}
        </label>
        <form onSubmit={handleSubmit}>
          <PaymentElement
            className="mb-4"
            options={{
              paymentMethodOrder: ["apple_pay", "google_pay", "card", "klarna"],
            }}
          />
          <div className="modal-action flex justify-around">
            <button
              type="submit"
              disabled={!stripe || loading}
              className="btnSubmit btn-primary"
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
            <button
              type="button"
              className="btnCancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
