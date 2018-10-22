import HTTP from "@/components/http-common";

export default {
  checkUpdates() {
    return HTTP.get("config");
  },
  sendAknowledge() {
    return HTTP.put("config");
  }
};
