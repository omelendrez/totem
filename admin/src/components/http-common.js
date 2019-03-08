import axios from "axios";
import backendURL from "@/config";

const HTTP = axios.create({ baseURL: backendURL });

export { HTTP as default };
