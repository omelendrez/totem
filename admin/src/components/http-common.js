import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://totem-be:3000/",
  headers: {
    // Authorization: 'Bearer {token}'
  }
});

export { HTTP as default };
