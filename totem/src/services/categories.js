import HTTP from "./api";

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("categories")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
