import history from "./history";
export const routeToUrl = async (url: string) => {
  history.push(url);
};
