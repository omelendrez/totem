import axios from "axios";
import backendURL from "@/config";

const HTTP = axios.create({ baseURL: backendURL.posnet });

export { HTTP as default };
