import { HTTP } from "@/utils";

export default {
  fetchProducts() {
    return HTTP.get("products?status=1");
  }
};
