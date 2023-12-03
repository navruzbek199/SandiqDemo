import axios from "axios";

const apiRoot = axios.create({
  baseURL: `https://e-work-backend-production.up.railway.app/`,
});

export default apiRoot;


