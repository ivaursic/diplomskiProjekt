import { useState } from "react";
import axios from "axios";

const ErrorSender = () => {
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/add-error", {
        error,
      });

      setResponseMessage(response.data.message);
      setError(""); // Clear the input field
    } catch (err) {
      setResponseMessage("Failed to send data");
    }
  };

  return (
    <div>
      <h3>Send Error to Backend</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter error message"
          value={error}
          onChange={(e) => setError(e.target.value)}
        />
        <button type="submit">Send Error</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
};

export default ErrorSender;
