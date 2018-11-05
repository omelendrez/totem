import HTTP from "./api";

export const getBasket = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("basket")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
