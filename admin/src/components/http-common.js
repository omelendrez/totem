import axios from "axios";
import backendURL from "@/config";

const HTTP = axios.create({ baseURL: backendURL.data });

export { HTTP as default };
