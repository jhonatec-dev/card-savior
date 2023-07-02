import { Backspace, Clear } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import ColorPicker from "../../../components/ColorPicker";
import { AppContext } from "../../../context";
import { CardType } from "../../../context/types";

interface EditCreditCardProps {
  id: string;
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#fff",
      main: "#fff",
    },
  },
});

export default function EditCreditCard(props: EditCreditCardProps) {
  const { id } = props;

  // Context
  const { cards, updateCards, removeCard } = useContext(AppContext);
  const initialCard = cards.find((card: CardType) => card.id === id);
  //state
  const [editCard, setEditCard] = useState<CardType>(initialCard as CardType);

  useEffect(() => {
    if (editCard && editCard !== initialCard) {
      const cardNameValid = editCard?.title.length > 3;
      const cardDueDateValid = editCard?.dueDate !== 0;
      const cardClosingDateValid = editCard?.closingDate !== 0;
      if (cardNameValid && cardDueDateValid && cardClosingDateValid) {
        updateCards(editCard);
      }
    }
  }, [editCard, initialCard, updateCards]);

  const handleChange = (name: string, value: string | number) => {
    setEditCard({
      ...editCard,
      [name]: value,
    } as CardType);
  };

  const handleDueDate = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEditCard({
        ...editCard,
        dueDate: date.date(),
      } as CardType);
    }
  };

  const handleRemoveCard = async (id: string) => {
    const response = await Swal.fire({
      icon: "question",
      title: "Tem certeza que deseja remover esse cartão?",
      text: "Todas as despesas vinculadas a esse cartão serão apagadas [CORRIGINDO O IMPORT]",
      background: "#2424249f",
      color: "#86c6EB",
      confirmButtonColor: "#76b6cB",
      confirmButtonText: "Não",
      denyButtonText: "Sim",
      denyButtonColor: "#df5240",
      showDenyButton: true,
      // showCancelButton: true,
      // timer: 5500,
      timerProgressBar: true,
    });

    if (response.isDenied) {
      removeCard(id);
      enqueueSnackbar("Cartão removido com sucesso!", { variant: "success" });
    }
  };

  const handleClosingDate = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEditCard({
        ...editCard,
        closingDate: date.date(),
      } as CardType);
    }
  };

  const handleColorChange = (color: string) => {
    setEditCard({
      ...editCard,
      color,
    } as CardType);
  };

  const getDate = (day: number | string) => {
    if (day === 0) return null;
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const testando = dayjs(`${year}-${month}-${day}`);
    return testando;
  };

  const styleCard = {
    background: `linear-gradient(131deg,${editCard.color} 0%, #252525 100%)`,
  };

  return (
    <div className="EditCreditCard" style={styleCard}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ColorPicker
            selectedColor={editCard.color}
            handleColorChange={handleColorChange}
          />
          <IconButton
            sx={{ position: "absolute", right: 0, top: 0 }}
            color="primary"
            onClick={() => handleRemoveCard(id)}
          >
            <Clear />
          </IconButton>
          <TextField
            label="Nome do cartão"
            fullWidth
            value={editCard.title}
            onChange={(e) => handleChange("title", e.target.value)}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    onClick={() => handleChange("title", "")}
                    color="primary"
                  >
                    <Backspace />
                  </IconButton>
                </>
              ),
            }}
          />
          <DesktopDatePicker
            sx={{ width: "45%" }}
            className="DatePicker"
            label="Fechamento"
            views={["day"]}
            value={getDate(editCard.closingDate)}
            onChange={handleClosingDate}
          />
          <DesktopDatePicker
            sx={{ width: "45%" }}
            className="DatePicker"
            label="Vencimento"
            views={["day"]}
            value={getDate(editCard.dueDate)}
            onChange={handleDueDate}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
