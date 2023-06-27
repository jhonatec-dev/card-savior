import { Backspace } from "@mui/icons-material";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { AppContext } from "../../../context";
import { SelectCards } from "./SelectCards";

const SingleInstallment = () => {
  const { register, setValue, watch } = useFormContext();
  const { contacts } = useContext(AppContext);
  const [selCard, purchaseDate] = watch(["selCard", "purchaseDate"]);

  const renderDueDate = () => {
    const purchaseDay = dayjs(purchaseDate).date();
    const purchaseMonth = dayjs(purchaseDate).month() + 1;
    const purchaseYear = dayjs(purchaseDate).year();

    console.log(purchaseDay, selCard);

    if (selCard) {
      if (purchaseDay > selCard.closingDate) {
        console.log("mes que vem");
        const newDueDate = dayjs(`${purchaseYear}-${purchaseMonth}-${selCard.dueDate}`).add(1, "month");
        setValue("dueDate", newDueDate.format("YYYY-MM-DD"));
      } else {
        console.log("agora");
        const newDueDate = dayjs(`${purchaseYear}-${purchaseMonth}-${selCard.dueDate}`);
        setValue("dueDate", newDueDate.format("YYYY-MM-DD"));
      }
    }

    return (
      <TextField
        label="Vencimento"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        {...register("dueDate")}
      />
    );
  };

  return (
    <>
      <h3>Agora é hora de detalhar a despesa</h3>
      <TextField
        label="O que foi comprado"
        type="text"
        fullWidth
        multiline
        maxRows={2}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setValue("description", "")}
              color="primary"
            >
              <Backspace />
            </IconButton>
          ),
        }}
        {...register("description")}
      />

      <TextField
        label="Quanto custou"
        type="number"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
        {...register("value")}
      />

      <Autocomplete
        freeSolo
        fullWidth
        disablePortal
        options={contacts.map((c) => c.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            {...register("contact")}
            label="Quem comprou"
            helperText="Escolha quem comprou ou digite um novo nome. Deixe em branco para registrar como seus gastos."
          />
        )}
      />

      <TextField
        type="date"
        fullWidth
        label="Quando foi?"
        InputLabelProps={{
          shrink: true,
        }}
        {...register("purchaseDate")}
      />

      <SelectCards label="Em qual cartão" />
      {renderDueDate()}
    </>
  );
};

export { SingleInstallment };
