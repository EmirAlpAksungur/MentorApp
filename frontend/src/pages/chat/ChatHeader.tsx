import React from "react";
import { Grid } from "@mui/material";
import { MyAvatar } from "../../components";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import ProfileService from "../../services/api/profile";
import { CardPropType } from "../community/card/Card";
import DialogContent from "../community/card/details/DialogContent";
import { MyDialog } from "../../components";
const ChatHeader: React.FC<{
  chatId: string;
}> = ({ chatId }) => {
  const [data, setData] = React.useState<CardPropType | null>(null);
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const id = useAppSelector((state: RootState) => state.auth?.user?.user);
  const asyncHelper = async () => {
    try {
      if (chatId) {
        const user_id = chatId?.split("_").find((e) => e != id);
        if (user_id) {
          let res = await ProfileService.getUserById(user_id, token);
          console.log(data);

          setData(res.data[0]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    asyncHelper();
  }, [chatId]);
  return (
    <div className="chat-container__header">
      {data && (
        <MyDialog
          Element={DialogContent}
          closeProtection={false}
          Button={() => {
            return (
              <Grid container columnGap={2} alignItems={"center"}>
                <MyAvatar
                  photo={data?.photo}
                  first_name={data?.user?.first_name}
                  last_name={data?.user?.last_name}
                />
                <span className="chat-container__header__name">
                  {data?.user?.first_name} {data?.user?.last_name}
                </span>
              </Grid>
            );
          }}
          defaultWH={[750, 600]}
          defaultOpen={false}
          hideBackdrop={false}
          {...data}
        />
      )}
    </div>
  );
};

export default ChatHeader;
