import { Fab, Tooltip } from "@mui/material";
import React from "react";

interface FloatButtonProps {
  icon: React.ReactNode;
  text?: string;
  handleClick: () => void;
  type?: "submit" | "reset" | "button";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export default function FloatButton(props: FloatButtonProps) {
  const { text, handleClick, icon, color, type } = props;

  return (
    <Tooltip title={text} arrow placement="left">
      <Fab
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleClick}
        color={color ?? "primary"}
        type={type}
      >
        {icon}
      </Fab>
    </Tooltip>
  );
}
