import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";

import { Avatar, Grid } from "@mui/material";
import { ChatListType } from "../../services/reducers/chat";
import { changeSelectedChat } from "../../services/actions/chat";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "../../assets/pages/chat/chat.scss";

const MsgType: React.FC<{
  is_sent: boolean;
  is_delivered: boolean;
  is_read: boolean;
  contact: number;
}> = (props) => {
  const { is_sent, is_delivered, is_read, contact } = props;
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);
  if (userId !== contact && !is_read) {
    return (
      <FiberManualRecordIcon className="chat-container__chat-list__item__msg-type__contact-unread" />
    );
  } else if (userId === contact && is_read) {
    return (
      <DoneAllIcon className="chat-container__chat-list__item__msg-type__read" />
    );
  } else if (userId === contact && is_delivered) {
    return (
      <DoneAllIcon className="chat-container__chat-list__item__msg-type__delivered" />
    );
  } else if (userId === contact && is_sent) {
    return (
      <DoneIcon className="chat-container__chat-list__item__msg-type__sent" />
    );
  }
  return <></>;
};

function formatTimestamp(timestamp: number) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);

  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // getMonth 0'dan başladığı için +1 ekliyoruz
    const year = inputDate.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }
}

const ChatAvatar: React.FC<{
  photo: string | null;
  name: string;
  surname: string;
}> = ({ photo, name, surname }) => {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")?.[0]?.[0]}${name.split(" ")?.[1]?.[0]}`,
    };
  }

  return (
    <Avatar
      src={`data:image/jpeg;base64,${photo}`}
      {...stringAvatar(name + " " + surname)}
    ></Avatar>
  );
};

const Main: React.FC<ChatListType> = ({ id, last_message, participants }) => {
  const userId = useAppSelector((state: RootState) => state.auth?.user?.user);
  const selected = useAppSelector(
    (state: RootState) => state.chat?.selectedChat
  );
  const dispatch = useAppDispatch();
  return (
    <div
      className={`chat-container__chat-list__item ${
        selected === id && "chat-container__chat-list__item-selected"
      }`}
      onClick={() => {
        dispatch(changeSelectedChat(id));
      }}
    >
      <Grid
        container
        alignItems={"center"}
        flexWrap={"nowrap"}
        columnGap={2}
        width={"100%"}
      >
        <Grid item xs={3}>
          <ChatAvatar
            photo={participants.find((e) => e.id != userId)!.profil?.photo}
            name={participants.find((e) => e.id != userId)!.first_name}
            surname={participants.find((e) => e.id != userId)!.last_name}
          />
        </Grid>

        <Grid item xs={9}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <Grid item xs={9} className="chat-container__chat-list__item__name">
              {participants.find((e) => e.id != userId)!.first_name}{" "}
              {participants.find((e) => e.id != userId)!.last_name}
            </Grid>

            <Grid
              item
              xs={3}
              className="chat-container__chat-list__item__timestamp"
            >
              {formatTimestamp(last_message?.timestamp)}
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={9} className="chat-container__chat-list__item__msg">
              {last_message?.content}
            </Grid>
            <Grid
              item
              xs={3}
              className="chat-container__chat-list__item__msg-type"
            >
              <MsgType
                is_delivered={last_message?.is_delivered}
                is_sent={last_message?.is_sent}
                is_read={last_message?.is_read}
                contact={last_message?.contact}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Main);
