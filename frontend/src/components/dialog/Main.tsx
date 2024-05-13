import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";
import "../../assets/components/dialog/dialog.scss";
export interface ElementProps {
  handleClose: Function;
  height: number;
  width: number;
  [key: string]: any;
}

export interface SimpleDialogProps {
  Button: React.FC;
  Element: React.FC<ElementProps>;
  closeProtection: boolean;
  defaultWH: number[];
  defaultOpen: boolean;
  hideBackdrop: boolean;
  [key: string]: any;
}

function PaperComponent(props: any) {
  const nodeRef = React.useRef(null);
  console.log(props);

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const {
    Button = false,
    Element,
    closeProtection = false,
    defaultWH = [500, 300],
    defaultOpen = false,
    hideBackdrop = false,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  const [width, setWidth] = useState(defaultWH[0]);
  const [height, setHeight] = useState(defaultWH[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ): void => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const backgroundClick = () => {
    if (hideBackdrop)
      return {
        height: "0px",
        "& .MuiDialog-container": {
          top: window.innerHeight / 2,
          left: window.innerWidth / 2 - width / 2,
          position: " absolute !important",
        },
      };
    return {};
  };

  React.useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  return (
    <>
      {Button && (
        <span onClick={handleClickOpen}>
          <Button />
        </span>
      )}
      <Dialog
        onClose={(event: any) => {
          console.log(event);
          if (!closeProtection) handleClose();
        }}
        open={open}
        PaperComponent={PaperComponent}
        // disableScrollLock={true}
        // disableEnforceFocus={true}
        hideBackdrop={hideBackdrop}
        sx={{
          "& .MuiPaper-elevation": {
            overflow: "hidden",
            maxWidth: window.innerWidth - 200,
            maxHeight: window.innerHeight - 200,
            margin: "0px",
          },
          ...backgroundClick(),
        }}
        className="my-dialog"
      >
        <ResizableBox
          width={width}
          height={height}
          resizeHandles={["n", "e", "s", "w", "ne", "sw", "se", "nw"]}
          minConstraints={[250, 250]}
          maxConstraints={[window.innerWidth - 200, window.innerHeight - 200]}
          onResize={handleResize}
        >
          <Element
            handleClose={handleClose}
            height={height}
            width={width}
            {...rest}
          />
        </ResizableBox>
      </Dialog>
    </>
  );
}
