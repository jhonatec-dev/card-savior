import { Button } from "@mui/material";
import logo from "../../../assets/images/logo512.png";

type IProps = {
  handleClose: () => void;
};

const Welcome = ({ handleClose }: IProps) => {
  return (
    <div className="Welcome">
      <img src={logo} alt="logo" width={"200px"} />
      <h3>Olá, este é o App Card Savior!</h3>
      <p>
        Preencha a tela a seguir com seu nome e uma senha para acessar o App.
      </p>
      <p>
        Cadastre seus cartões de créditos e organizaremos as suas despesas
        levando em consideração a data de vencimento informada.
      </p>
      <p>
        Este é um aplicativo <strong>BETA</strong>, que significa estar sempre
        recebendo novidades.{" "}
      </p>
      <Button onClick={handleClose} variant="contained" color="primary">Registrar</Button>
    </div>
  );
};

export { Welcome };
