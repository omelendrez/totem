import HTTP from "./api";

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("products/totem")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
