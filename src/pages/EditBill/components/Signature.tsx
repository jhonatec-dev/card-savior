import { Clear } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AutocompleteContacts } from "./AutocompleteContacts";
import { ListInstallmentsSignature } from "./ListInstallmentsSignature";
import { SelectCards } from "./SelectCards";

const Signature = () => {
  const {
    register,
    setValue,
    watch,
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

      {/* <TextField
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
      /> */}

      <Button
        onClick={() => setValue("active", !watch("active"))}
        variant="contained"
        color={watch("active") ? "success" : "warning"}
        sx={{ pl: 0 }}
        fullWidth
      >
        {/* <Checkbox
          checked={watch("paid.0") || false}
          onChange={(e) => setValue("paid.0", e.target.checked)}
        /> */}
        <Typography>{watch("active") ? "Ativa" : "Inativa"}</Typography>
      </Button>

      <ListInstallmentsSignature />
    </>
  );
};

export { Signature };
