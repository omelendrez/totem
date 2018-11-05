import HTTP from "./api";

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("products?status=1")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
