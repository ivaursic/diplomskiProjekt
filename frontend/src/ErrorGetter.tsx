import React, { useEffect, useState } from "react";
import axios from "axios";

interface ErrorDocument {
  _id: string; // MongoDB _id field (usually it's a string or ObjectId)
  error: string;
  timestamp: string;
}

const ErrorGetter: React.FC = () => {
  const [data, setData] = useState<ErrorDocument[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/errors")
      .then((response) => setData(response.data))
      .catch((error) =>
        console.error("There was an error fetching data!", error)
      );
  }, []);

  return (
    <div>
      <h3>Errors from Backend</h3>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.error} - {item.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorGetter;
