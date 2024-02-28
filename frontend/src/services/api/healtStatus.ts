import { instance, unAuthConfig } from "./baseUnit";

const checkBackendServices = () => {
  return instance.get("/healt-check/", unAuthConfig);
};

const HealtStatusService = {
  checkBackendServices,
};

export default HealtStatusService;
