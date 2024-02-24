import React from "react";
import { Grid } from "@mui/material";
import ChatList from "./ChatList";
import Chat from "./Chat";
import "../../assets/pages/chat/chat.scss";
const Main: React.FC = () => {
  return (
    <div className="chat-container">
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={4} md={3} xl={2}>
          <ChatList />
        </Grid>
        <Grid item xs={8} md={9} xl={10}>
          <Chat />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Main);
