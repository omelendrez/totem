import HTTP from "@/components/http-common";

export default {
  fetchCategories() {
    return HTTP.get("categories");
  }
};
