import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // Set the API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
