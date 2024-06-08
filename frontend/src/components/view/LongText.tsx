import React, { useEffect } from "react";
import $ from "jquery";
import { Box, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../assets/components/view/longtext.scss";
import { uuidv4 } from "../../utils/uuidGenerator";
interface LongTextProps {
  text: string | null;
}

const LongText: React.FC<LongTextProps> = ({ text }) => {
  function toggleClass() {
    $(".long-text-view__text-container").toggleClass(
      "long-text-view__text-container-full"
    );
  }
  useEffect(() => {
    var textContainer = $(".long-text-view__text-container");
    var moreIcon = $(".long-text-view__more-icon");

    if (textContainer.height() && textContainer.height()! < 145) {
      moreIcon.hide();
    }
  }, [text]);

  return (
    text && (
      <Box className="long-text-view" key={uuidv4()}>
        <Box className="long-text-view__text-container">
          {text.split("\n").map((str: string, i: number) => (
            <React.Fragment key={`paragraph-${i}`}>
              <br />
              <Box className="long-text-view__text-container__content">
                {str}
              </Box>
            </React.Fragment>
          ))}
        </Box>
        <Box className="long-text-view__more-icon" onClick={toggleClass}>
          <IconButton className="long-text-view__more-icon__btn">
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Box>
    )
  );
};

export default React.memo(LongText);
