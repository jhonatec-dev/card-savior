import { Clear } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AutocompleteContacts } from "./AutocompleteContacts";
import { ListInstallments } from "./ListInstallments";
import { SelectCards } from "./SelectCards";

const MultipleInstallments = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

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
        inputProps={{
          step: 0.01,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
        {...register("value", { required: true, min: 0.1 })}
        error={!!errors.value}
        helperText={errors.value && "Você precisa digitar um valor válido."}
      />

      <AutocompleteContacts />

      {/* <TextField
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
          errors.purchaseDate
            ? "Você precisa digitar uma data válida."
            : "Se não souber, a gente preenche com a data aproximada relacionado ao vencimento da primeira parcela"
        }
      /> */}

      <SelectCards label="Em qual cartão" />

      <TextField
        label="Parcelas"
        type="number"
        fullWidth
        InputProps={{
          inputProps: {
            min: 1,
            defaultValue: 1,
            max: 360,
          },
        }}
        {...register("totalInstallments", {
          required: true,
          valueAsNumber: true,
        })}
        error={!!errors.totalInstallments}
        helperText={errors.totalInstallments && "Você precisa digitar um valor entre 1 e 360."}
      />

      <ListInstallments />
    </>
  );
};

export { MultipleInstallments };
