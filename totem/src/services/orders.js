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

export const loadOrders = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("orders/orders")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const loadItems = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("orders/items")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const loadOrderItems = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("orders/order_items")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const loadOrderTurns = () => {
  return new Promise((resolve, reject) => {
    HTTP.get("orders/order_turns")
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const changeOrderStatus = data => {
  return new Promise((resolve, reject) => {
    HTTP.put(`orders/${data.orderId}`, { status_id: data.statusId })
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const changeItemStatus = data => {
  return new Promise((resolve, reject) => {
    HTTP.put(`orders/items/${data.itemId}`, { status_id: data.statusId })
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err);
      });
  });
};
