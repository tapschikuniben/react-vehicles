import axios from "axios";

export default axios.create({
  baseURL: "http://18.130.223.87:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});