import history from "./history";
export const routeToUrl = async (url: string) => {
  console.log(url);
  history.push(url);
};
