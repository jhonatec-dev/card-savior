import {
  Backspace,
  Close,
  Save,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  IconButton,
  TextField
} from "@mui/material";
import { closeSnackbar, useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import FloatButton from "../../components/FloatButton";
import { AppContext } from "../../context/index";
import { getFromLS } from "../../utils";
import { Welcome } from "./components/Welcome";

type FormValues = {
  id: string;
  name: string;
  // email: string;
  // phone: string;
  password: string;
  passwordConfirm: string;
};

export default function EditProfile() {
  // Navigate
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateUserData, userLogin } =
    useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(true);
  const { width } = useWindowSize();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({});

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
      // TODO
      // configurar para o hookform depois
      setValue("name", user.username);
      setValue("password", user.password);
      setValue("passwordConfirm", user.password);
    }
  }, [user]);



  const handleSave = (data: any) => {
    // salvar
    const newUser = {
      username: data.name,
      password: data.password,
    };
    updateUserData(newUser);
    enqueueSnackbar("Salvo com sucesso!", {
      variant: "success",
      style: {
        maxWidth: "300px",
      },
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} size="small">
          <Close />
        </IconButton>
      ),
    });
    navigate("/home");
  };


  const onError = () => {
    return;
  };

  return (
    <div className="Wrapper">
      {pathname === "/register" && (
        <Dialog
          open={open}
          fullScreen={width < 768}
          onClose={() => setOpen(false)}
        >
          <Welcome handleClose={() => setOpen(false)} />
        </Dialog>
      )}
      <form
        onSubmit={handleSubmit(handleSave, onError)}
        className="UserProfile"
      >
        <Avatar sx={{ width: 100, height: 100 }}></Avatar>
        <h4>
          {pathname === "/register"
            ? "Cadastre suas informações e seus cartões"
            : "Edite suas informações"}
        </h4>
        <TextField
          label="Nome"
          placeholder="Nome"
          fullWidth
          {...register("name", {
            required: "Nome obrigatório",
            minLength: { value: 3, message: "Nome muito curto" },
          })}
          error={!!errors.name}
          helperText={!!errors.name && errors.name.message}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setValue("name", "")} color="primary">
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
          {...register("password", {
            required: "Senha obrigatória",
            minLength: { value: 4, message: "Senha muito curta" },
          })}
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
                  onClick={() => setValue("password", "")}
                  color="primary"
                >
                  <Backspace />
                </IconButton>
              </>
            ),
          }}
          error={!!errors.password}
          helperText={!!errors.password && errors.password.message}
        />
        <TextField
          placeholder="Confirme sua senha"
          label="Confirme sua senha"
          fullWidth
          type={showPassword ? "text" : "password"}
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
                  onClick={() => setValue("passwordConfirm", "")}
                  color="primary"
                >
                  <Backspace />
                </IconButton>
              </>
            ),
          }}
          {...register("passwordConfirm", {
            required: "Confirmação de senha obrigatória",
            validate: (value) => value === watch("password"),
          })}
          error={!!errors.passwordConfirm}
          helperText={
            !!errors.passwordConfirm && errors.passwordConfirm.message
          }
        />
        <FloatButton
          handleClick={() => {
            console.log("preciso");
          }}
          icon={<Save />}
          text="Salvar"
          type="submit"
        />
      </form>

    </div>
  );
}
