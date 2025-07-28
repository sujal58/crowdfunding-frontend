import { useEffect, useState } from "react";
import "./DonationFeed.css";
import type { AxiosResponse } from "axios";
import type { GetResponse } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllDonationByUser } from "@/apis/Donation.api";
import type { IDonationResponse } from "@/interfaces/donation.interface";
import { useLocation } from "react-router-dom";

function DonationFeed() {
  const [donations, setDonations] = useState<IDonationResponse[]>([]);
  const [userLogged, setUserLogged] = useState(false);
  const location = useLocation();

  useEffect(() => {
    location.pathname.includes("user-dashboard") && setUserLogged(true);
    const fetchDonation = async () => {
      try {
        const response: AxiosResponse<GetResponse<IDonationResponse>> =
          await getAllDonationByUser();
        console.log(response);
        if (response.status == 200) {
          setDonations(response.data.data);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.data || "Error while fetching donation.";
          toast.error(message);
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { background: "#fef2f2", color: "#ef4444" },
          });
        }
      }
    };

    fetchDonation();
  }, []);
  const donation = [
    { donor: "John", amount: 20, time: "2 min ago" },
    { donor: "Alice", amount: 50, time: "10 min ago" },
    { donor: "Michael", amount: 100, time: "30 min ago" },
    { donor: "Sara", amount: 10, time: "1 hour ago" },
  ];

  console.log(donations);

  return (
    <>
      {!userLogged ? (
        <div
          className="donation-feed"
          aria-live="polite"
          aria-relevant="additions"
        >
          <h1 className="text-center text-2xl mb-6 font-bold text-blue-600">
            Donation
          </h1>
          {donations &&
            donation.map((d, index) => (
              <div key={index} className="donation-feed-item">
                {d.donor} donated ${d.amount}, {d.time}
              </div>
            ))}
        </div>
      ) : (
        <div
          className="donation-feed"
          aria-live="polite"
          aria-relevant="additions"
        >
          <h1 className="text-center text-2xl mb-6 font-bold text-blue-600 shadow-sm">
            Your Donation
          </h1>
          {donations.map((d, index) => (
            <div key={index} className="donation-feed-item">
              you have donated ${d.amount} to {d.campaignName} on{" "}
              {d.createdAt.split("T")[0]}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DonationFeed;
