import React, { ReactNode, useEffect, useState } from "react";
import HealtStatusService from "../../services/api/healtStatus";
import Loader from "../loading/Loader";
import NetworkError from "../../pages/utils/NetworkError";

export interface NetworkCheckProps {
  children: ReactNode;
}

const NetworkCheck: React.FC<NetworkCheckProps> = ({ children }) => {
  const [isWork, setIsWork] = useState<boolean | null>(null);

  const asyncFunc = async () => {
    try {
      await HealtStatusService.checkBackendServices();
      setIsWork(true);
    } catch (err) {
      setIsWork(false);
    }
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  return isWork === null ? <Loader /> : isWork ? children : <NetworkError />;
};

export default React.memo(NetworkCheck);
