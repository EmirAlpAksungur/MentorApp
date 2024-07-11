import React, { ReactNode, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { RootState } from "../store/configureStore";
import { AllChatWebSocketClient } from "../services/webSocket/allChats";
import { Grid } from "@mui/material";
import { loadChatList } from "../services/actions/chat";
import Header from "./headers/Main";
interface MainProps {
  children: ReactNode;
}
const Main: React.FC<MainProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);

  const [client, setClient] = useState<AllChatWebSocketClient | null>(null);
  const refreshFunc = (data: any) => {
    dispatch(loadChatList(data));
  };
  useEffect(() => {
    let ws: AllChatWebSocketClient | null = null;

    if (userId) {
      ws = new AllChatWebSocketClient(userId, refreshFunc);
      setClient(ws);
      ws.openWs(true);
    }
    return () => {
      if (ws) ws.closeWs();
    };
  }, [userId]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header></Header>
      </Grid>
      {children}
    </Grid>
  );
};

export default React.memo(Main);
