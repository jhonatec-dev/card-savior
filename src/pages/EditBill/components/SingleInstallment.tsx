import { Clear } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { AutocompleteContacts } from "./AutocompleteContacts";
import { SelectCards } from "./SelectCards";

const SingleInstallment = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [selCard, purchaseDate] = watch(["selCard", "purchaseDate"]);

  const renderDueDate = () => {
    const purchaseDay = dayjs(purchaseDate).date();
    const purchaseMonth = dayjs(purchaseDate).month() + 1;
    const purchaseYear = dayjs(purchaseDate).year();

    // console.log(purchaseDay, selCard);
    // console.log('errors no formulario', {errors})

    if (selCard) {
      if (purchaseDay > selCard.closingDate) {
        // console.log("mes que vem");
        const newDueDate = dayjs(
          `${purchaseYear}-${purchaseMonth}-${selCard.dueDate}`
        ).add(1, "month");
        setValue("dueDate", newDueDate.format("YYYY-MM-DD"));
      } else {
        // console.log("agora");
        const newDueDate = dayjs(
          `${purchaseYear}-${purchaseMonth}-${selCard.dueDate}`
        );
        setValue("dueDate", newDueDate.format("YYYY-MM-DD"));
      }
    }

    return (
      <TextField
        label="Vencimento"
        type="date"
        fullWidth
        InputProps={{
          inputProps: {
            min: "2020-01-01",
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        {...register("dueDate", { required: true })}
        error={!!errors.dueDate}
        helperText={errors.dueDate && "Você precisa digitar uma data."}
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
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setValue("description", "")}>
              <Clear />
            </IconButton>
          ),
        }}
        {...register("description", { required: true })}
        error={!!errors.description}
        helperText={errors.description && "Você precisa digitar uma descrição."}
      />

      <TextField
        label="Quanto custou"
        type="number"
        inputMode="decimal"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
        {...register("value", { required: true, min: 0 })}
        error={!!errors.value}
        helperText={errors.value && "Você precisa digitar um valor válido."}
      />

      <AutocompleteContacts />

      <TextField
        type="date"
        fullWidth
        label="Quando foi?"
        InputProps={{
          inputProps: {
            min: "2020-01-01",
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        {...register("purchaseDate", { required: true })}
        error={!!errors.purchaseDate}
        helperText={
          errors.purchaseDate && "Você precisa digitar uma data válida."
        }
      />

      <SelectCards label="Em qual cartão" />
      {renderDueDate()}
    </>
  );
};

export { SingleInstallment };
