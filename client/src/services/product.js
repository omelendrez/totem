import { HTTP } from "@/components/http-common";

export default {
  fetchProducts() {
    return HTTP.get("products?status=1");
  }
};
