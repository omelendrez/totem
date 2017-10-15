import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://server:3000/',
  headers: {
    // Authorization: 'Bearer {token}'
  }
});

export {
  HTTP as
  default
};
