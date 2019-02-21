import axios from "axios";

const { CONFIG } = require("@/config");
const HTTP = axios.create({ baseURL: CONFIG.url });

export { HTTP as default };
