import { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import type { GetSingleResponse } from "@/types";
import type { IPaymentVerificationResponse } from "@/interfaces/payment.interface";
import { verifyPayment } from "@/apis/payment.api";

interface LocationState {
  campaignId: string;
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { campaignId } = (state as LocationState) || { campaignId: "" };

  useEffect(() => {
    if (!paymentIntent) {
      setStatus("failed");
      setMessage("Payment intent not found in the URL.");
      return;
    }

    const checkPayment = async () => {
      try {
        const response: AxiosResponse<
          GetSingleResponse<IPaymentVerificationResponse>
        > = await verifyPayment(paymentIntent);

        if (response.status == 200) {
          const { success, donationId, message } = response.data.data;
          if (success) {
            setStatus("success");
            setMessage(
              `Thank you for your donation! 🎉 Your donation ID: ${donationId}`
            );
            toast.success(`Payment succeeded for donation ID: ${donationId}`);
          } else {
            setStatus("failed");
            setMessage(message || "Payment was not successful.");
            toast.error(message || "Payment was not successful.");
          }
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data ||
            "Unable to verify your payment. Please contact support.";
          toast.error(message);
          setStatus("failed");
          setMessage(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    checkPayment();
  }, [paymentIntent]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        {status === "loading" ? (
          <div className="flex flex-col items-center gap-4">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
              />
            </svg>
            <p className="text-lg text-gray-600">
              Verifying your payment, please wait...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {status === "success" ? (
              <>
                <svg
                  className="h-16 w-16 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="alert alert-success">
                  <span className="text-lg text-green-800">{message}</span>
                </div>
              </>
            ) : (
              <>
                <svg
                  className="h-16 w-16 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="alert alert-error">
                  <span className="text-lg text-red-800">{message}</span>
                </div>
              </>
            )}
            <button
              className="btn btn-primary mt-4"
              onClick={() =>
                navigate(
                  campaignId
                    ? `/campaign/${campaignId}`
                    : "/user-dashboard/campaigns"
                )
              }
              //   disabled={!campaignId}
            >
              {campaignId ? "Back to Campaign" : "Go to Home"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
