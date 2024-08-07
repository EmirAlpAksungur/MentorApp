import React, { useState, useEffect } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import SendIcon from "@mui/icons-material/Send";
import { MyTextField } from "../../components";
import { asyncLoadText } from "../../services/actions/translations";
import { TextListClass } from "../../utils/textContent";
import { ChatWebSocketClient } from "../../services/webSocket/chat";
interface MessagesType {
  client: ChatWebSocketClient | null;
}
const Main: React.FC<MessagesType> = ({ client }) => {
  const userId = useAppSelector((state: RootState) => state.auth.user?.user);
  const [value, setValue] = useState("");
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1675]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  const handleChangeFunc = (val: any) => {
    setValue(val);
  };

  const handleSendMessage = () => {
    if (client) client.sendMessage(value, userId);
    setValue("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container__body__msg-box" onKeyDown={handleKeyPress}>
      <MyTextField
        handleChangeFunc={handleChangeFunc}
        value={value}
        placeholder={text?.getText(1675)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSendMessage}>
                <SendIcon className="end-adorment" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default React.memo(Main);
