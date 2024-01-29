import LinearProgress from "@mui/material/LinearProgress";

import "../../assets/components/loading.scss";
const Loader = () => (
  <div className="loader-wrapper">
    <LinearProgress sx={{ backgroundColor: "#ababab" }} />
  </div>
);

export default Loader;
