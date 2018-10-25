import { HTTP } from "@/utils";

export default {
  fetchCategories() {
    return HTTP.get("categories");
  }
};
