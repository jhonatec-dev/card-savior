import { Fab, Tooltip } from "@mui/material";
import React from "react";

interface FloatButtonProps {
  icon: React.ReactNode;
  text?: string;
  handleClick: () => void;
}

export default function InstallAppButton(props: FloatButtonProps) {
  const { text, handleClick, icon } = props;

  return (
    <Tooltip title={text} arrow placement="left">
      <Fab
        sx={{ position: "fixed", bottom: 16, left: 16, opacity: 0.8 }}
        onClick={handleClick}
        color="primary"
      >
        {icon}
      </Fab>
    </Tooltip>
  );
}
