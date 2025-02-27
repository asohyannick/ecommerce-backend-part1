import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Step 1: Request a PaymentIntent from the backend
            const response = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 1000, currency: "usd" }), // Amount in cents
            });

            const { clientSecret } = await response.json();

            // Step 2: Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement)! },
            });

            if (result.error) {
                setError(result.error.message ?? "Payment failed");
            } else if (result.paymentIntent?.status === "succeeded") {
                setSuccess("Payment successful!");
            }
        } catch (err) {
            setError("An error occurred during payment.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
    );
};

export default CheckoutForm;
