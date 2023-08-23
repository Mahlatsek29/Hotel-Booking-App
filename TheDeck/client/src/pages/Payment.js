import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [billingDetail, setBillingDetail] = useState({
    billingEmail: "",
    billingMobile: "",
    amount: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnchange = (text, input) => {
    setBillingDetail((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSubmit = async () => {
    try {
      // Check if terms are accepted
      if (!termsAccepted) {
        setErrorMessage("Please accept the Terms and Conditions.");
        return;
      }

      // Input validation
      if (!billingDetail.billingEmail || !billingDetail.billingMobile || !billingDetail.amount) {
        setErrorMessage("All fields are required.");
        return;
      }

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: billingDetail.billingEmail,
          amount: billingDetail.amount * 100,
        },
        {
          headers: {
            Authorization: "Bearer YOUR_PAYSTACK_SECRET_KEY",
          },
        }
      );

      window.location.href = response.data.data.authorization_url;
    } catch (error) {
      console.error("Error creating transaction:", error);
      setErrorMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div className="card w-50">
      <div className="card-body">
        <h5 className="card-title">Payment</h5>
        <div className="card-text">
          <input
            placeholder="Billing Email"
            onChange={(e) => handleOnchange(e.target.value, "billingEmail")}
            value={billingDetail.billingEmail}
          /> <br/>
          <input
            placeholder="Billing Mobile"
            onChange={(e) => handleOnchange(e.target.value, "billingMobile")}
            value={billingDetail.billingMobile}
          /> <br/>
          <input
            placeholder="Amount"
            onChange={(e) => handleOnchange(e.target.value, "amount")}
            value={billingDetail.amount}
            type="number"
          /> <br/>

          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>
          </label>
          
          <button onClick={handleSubmit} disabled={!termsAccepted}>
            Pay Now
          </button>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
