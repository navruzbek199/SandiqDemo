import axios from "axios";

const apiRoot = axios.create({
  baseURL: `https://e-work.up.railway.app/`,
});

export default apiRoot;


