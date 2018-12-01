import HTTP from "./api";

export const saveOrder = basket => {
  return new Promise((resolve, reject) => {
    HTTP.post("orders", { basket })
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
