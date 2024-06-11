import LinearProgress from "@mui/material/LinearProgress";

import "../../assets/components/loading.scss";
const Loader = () => (
  <div className="loader-wrapper">
    <LinearProgress className="loader-wrapper__progress" />
  </div>
);

export default Loader;
