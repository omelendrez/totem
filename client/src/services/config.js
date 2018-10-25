import { HTTP } from "@/utils";

export default {
  checkUpdates() {
    return HTTP.get("config");
  },
  sendAknowledge() {
    return HTTP.put("config");
  }
};
