import React from 'react';

function Payment({ checkInDate, checkOutDate, numGuests, totalAmount }) {
  const handlePayment = () => {
    fetch("http://localhost:8080/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkInDate,
        checkOutDate,
        numGuests,
        totalAmount,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };
  
  return (
    <div>
      {/* Your payment-related JSX */}
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
}

export default Payment;
