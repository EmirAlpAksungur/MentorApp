import React from "react";
import { Grid } from "@mui/material";

import ChatList from "./chatList/ChatList";
import Chat from "./Chat";
import "../../assets/pages/chat/chat.scss";

const Main: React.FC = () => {
  return (
    <div className="chat-container">
      <Grid
        container
        sx={{ height: "100%" }}
        className="chat-container__media-query card-container"
      >
        <Grid item xs={4} md={3}>
          <ChatList />
        </Grid>
        <Grid item xs={8} md={9}>
          <Chat />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Main);
