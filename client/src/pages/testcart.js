import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Button, Spinner, Alert } from "reactstrap";

export default function Testcart({ show = false, onPaymentCompleted }) {
  const [clientToken, setClientToken] = useState(null);
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log("Rendering Testcart:", { show, clientToken, braintreeInstance });

  // Fetch client token from backend
  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        setErrorMessage(null); // Clear previous errors
        console.log("Fetching client token...");
        const { data } = await axios.get(
          "http://localhost:5020/api/product/braintree/token"
        );

        if (data?.clientToken) {
          console.log("Fetched Token:", data.clientToken);
          setClientToken(data.clientToken);
        } else {
          setErrorMessage("Failed to retrieve payment token.");
        }
      } catch (error) {
        setErrorMessage("Error fetching payment gateway.");
        console.error("Error fetching client token:", error);
      }
    };

    if (show) {
      fetchClientToken();
    }
  }, [show]);

  const handlePayment = async () => {
    if (!braintreeInstance) {
      alert("Braintree instance is not ready yet.");
      return;
    }

    try {
      setLoading(true);
      const { nonce } = await braintreeInstance.requestPaymentMethod();
      console.log("Payment method nonce:", nonce);

      // TODO: Send nonce to backend for processing
      alert(`Payment completed with nonce=${nonce}`);

      onPaymentCompleted();
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: show ? "block" : "none", padding: "20px" }}>
      <h2>Braintree Payment</h2>

      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

      {clientToken ? (
        <DropIn
          options={{ authorization: clientToken }}
          onInstance={(instance) => setBraintreeInstance(instance)}
        />
      ) : (
        <p>Loading payment gateway...</p>
      )}

      <Button
        className="braintreePayButton"
        color="primary"
        disabled={!braintreeInstance || loading}
        onClick={handlePayment}
      >
        {loading ? <Spinner size="sm" /> : "Pay Now"}
      </Button>
    </div>
  );
}
