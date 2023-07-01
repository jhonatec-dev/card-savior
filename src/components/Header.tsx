import { ArrowBack } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  showGoBack?: boolean;
  handleClick?: () => void;
}

export default function Header(props: Props) {
  const navigate = useNavigate();
  const { title, showGoBack, handleClick } = props;

  return (
    <div className="Header">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {showGoBack && (
          <IconButton onClick={handleClick}>
            <ArrowBack />
          </IconButton>
        )}
        <h2>{title ?? "Card Savior"}</h2>
      </div>
      <Tooltip title="Editar Perfil" arrow placement="left">
        <IconButton onClick={() => navigate("/editProfile")}>
          <Avatar />
        </IconButton>
      </Tooltip>
    </div>
  );
}
