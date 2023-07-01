import {
  Add,
  Backspace,
  Save,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Avatar, Button, Divider, IconButton, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import validator from "validator";
import FloatButton from "../../components/FloatButton";
import { AppContext } from "../../context/index";
import { getFromLS } from "../../utils";
import EditCreditCard from "./components/EditCreditCard";

export default function EditProfile() {
  // Navigate
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { enqueueSnackbar } = useSnackbar();
  const { cards, createCard, user, updateUserData, userLogin } =
    useContext(AppContext);
  // States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // useReff
  const bottomCardRef = useRef<HTMLButtonElement>(null);
  // useEffect
  useEffect(() => {
    const userLS = getFromLS("user");
    if (pathname === "/register") {
      if (userLS) {
        navigate("/home");
      }
    } else {
      if (!userLS) {
        navigate("/register");
      } else {
        userLogin();
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setPassword(user.password);
      setPasswordConfirm(user.password);
    }
  }, [user]);

  useEffect(() => {
    if (cards.length > 0)
      bottomCardRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cards]);
  
  const handleSave = () => {
    // variáveis de conferência
    const usernameValid = username.length >= 3;
    const emailValid = validator.isEmail(email);
    const passwordValid = password.length > 3;
    const passwordConfirmValid = password === passwordConfirm;
    // const cardsValid = !cards.some((card) => card.id === -1);
    if (usernameValid && emailValid && passwordValid && passwordConfirmValid) {
      // salvar
      const newUser = {
        username,
        email,
        phone,
        password,
      };
      updateUserData(newUser);
      enqueueSnackbar("Salvo com sucesso!", { variant: "success" });
      navigate("/home");

    } else {
      enqueueSnackbar("Preencha todos os campos corretamente", {
        variant: "error",
      })
    }
  };

  const handleAddCard = () => {
    console.log("cheguei aqui");
    createCard();
  };

  return (
    <div className="Wrapper">
      <div className="UserProfile">
        <Avatar sx={{ width: 100, height: 100 }}></Avatar>
        <h4>
          {pathname === "/register"
            ? "Cadastre suas informações e seus cartões"
            : "Edite suas informações"}
        </h4>
        <TextField
          label="Nome"
          placeholder="Nome"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={username.length < 3}
          helperText={username.length < 3 ? "Nome muito curto" : ""}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setUsername("")} color="primary">
                <Backspace />
              </IconButton>
            ),
          }}
        />
        <TextField
          placeholder="Email"
          label="Email"
          fullWidth
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!validator.isEmail(email)}
          helperText={!validator.isEmail(email) ? "Email inválido" : ""}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setEmail("")} color="primary">
                <Backspace />
              </IconButton>
            ),
          }}
        />
        <TextField
          placeholder="Telefone"
          label="Telefone"
          fullWidth
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setPhone("")} color="primary">
                <Backspace />
              </IconButton>
            ),
          }}
        />
        <TextField
          placeholder="Senha"
          label="Senha"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          InputProps={{
            endAdornment: (
              <>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  color="primary"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton onClick={() => setPassword("")} color="primary">
                  <Backspace />
                </IconButton>
              </>
            ),
          }}
          required
          error={password.length < 4}
          helperText={password.length < 4 ? "Senha muito curta" : ""}
        />
        <TextField
          placeholder="Confirme sua senha"
          label="Confirme sua senha"
          id="confirm-password"
          error={password !== passwordConfirm}
          fullWidth
          type={showPassword ? "text" : "password"}
          value={passwordConfirm}
          onChange={({ target }) => setPasswordConfirm(target.value)}
          InputProps={{
            endAdornment: (
              <>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  color="primary"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton
                  onClick={() => setPasswordConfirm("")}
                  color="primary"
                >
                  <Backspace />
                </IconButton>
              </>
            ),
          }}
          helperText={password !== passwordConfirm ? "Senhas não conferem" : ""}
        />
      </div>
      <div className="CardsWrapper">
        <Divider
          sx={{ margin: "20px 0", fontSize: "20px", fontWeight: "bold" }}
        >
          Cartões
        </Divider>
        <div className="Fluid">
          {cards.map((card) => (
            <EditCreditCard key={card.id} id={card.id} />
          ))}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Add />}
            onClick={handleAddCard}
            ref={bottomCardRef}
          >
            Adicionar Cartão - {cards && cards.length}
          </Button>
        </div>
      </div>
      <FloatButton handleClick={handleSave} icon={<Save />} text="Salvar" />
    </div>
  );
}
