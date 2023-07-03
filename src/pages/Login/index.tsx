import { ArrowForward, GitHub, LinkedIn, YouTube } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import jhonatecBk from "../../assets/images/jhonatec-black.png";
import jhonatec from "../../assets/images/jhonatec.png";
import { AppContext } from "../../context";
import { correctPassword, getFromLS } from "../../utils";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = getFromLS("user");
    if (!user) {
      navigate("/register");
    } else {
      setUsername(user.username);
    }
  }, [navigate]);

  const {palette:{mode}} = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const { userLogin } = useContext(AppContext);

  const handleLogin = () => {
    if (correctPassword(password)) {
      userLogin();
      navigate("/home");
    } else {
      setWrongPassword(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <>
      <div className="Wrapper">
        <div className="Login">
          <Avatar sx={{ width: 100, height: 100 }}></Avatar>
          <h2>Olá novamente!</h2>
          <h4>{username}</h4>
          <TextField
            className={wrongPassword ? "InputPassword" : ""}
            placeholder="Senha"
            label="Senha"
            size="small"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            onAnimationEnd={() => setWrongPassword(false)}
            InputProps={{
              endAdornment: password.length > 0 && (
                <IconButton onClick={handleLogin} color="primary">
                  <ArrowForward />
                </IconButton>
              ),
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={jhonatec} alt="jhonatec" width={"200px"} style={ mode === "dark" ? {filter: "invert(0)" } : {filter: "invert(0.7)"}} />
        <ToggleButtonGroup exclusive>
          <ToggleButton
            href="https://linkedin.com/in/jhonatec"
            target="_blank"
            color="primary"
            value="linkedin"
          >
            <LinkedIn /> Linkedin
          </ToggleButton>
          <ToggleButton
            href="https://github.com/jhonatec-dev"
            target="_blank"
            color="primary"
            value="github"
          >
            <GitHub /> Github
          </ToggleButton>
          <ToggleButton
            href="https://youtube.com/c/jhonatec"
            target="_blank"
            color="primary"
            value="youtube"
          >
            <YouTube /> Youtube
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </>
  );
}
