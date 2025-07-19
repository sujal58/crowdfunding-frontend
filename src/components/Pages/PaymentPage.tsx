import stripePromise from "@/config/stripe.config";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import PaymentModal from "../common/modal/PaymentModal";
import type { Appearance } from "@stripe/stripe-js";

interface LocationState {
  clientSecret: string;
  email: string;
  campaignId: number;
}

const appearance: Appearance = {
  theme: "night",
  variables: {
    fontFamily: "Sohne, system-ui, sans-serif",
    fontWeightNormal: "500",
    borderRadius: "8px",
    colorBackground: "#0A2540",
    colorPrimary: "#EFC078",
    accessibleColorOnColorPrimary: "#1A1B25",
    colorText: "white",
    colorTextSecondary: "white",
    colorTextPlaceholder: "#ABB2BF",
    tabIconColor: "white",
    logoColor: "dark",
  },
  rules: {
    ".Input": {
      backgroundColor: "#212D63",
      border: "1px solid var(--colorPrimary)",
    },
  },
};

const PaymentPage: React.FC = () => {
  const { state } = useLocation();
  const clientSecret = (state as LocationState)?.clientSecret;

  if (!clientSecret) {
    return (
      <div className="text-red-500 text-center mt-10">
        Invalid payment data. Please try again.
      </div>
    );
  }

  return (
    <div className="h-auto flex justify-center">
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <PaymentModal />
      </Elements>
    </div>
  );
};

export default PaymentPage;
