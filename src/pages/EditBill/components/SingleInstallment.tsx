import { Clear } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
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

  const [selCard, dueDate] = watch(["selCard", "dueDate"]);

  useEffect(() => {
    if (selCard) {
      const previousDueDate = dayjs(dueDate[0]);
      const test = {
        target: {
          value: dayjs(
            `${previousDueDate.year()}-${previousDueDate.month() + 1}-${
              selCard.dueDate
            }`
          ).format("YYYY-MM-DD"),
        },
      };
      handleDueDateChange(test);
    }
  }, [dueDate, selCard, setValue]);

  const handleDueDateChange = (e: any) => {
    const newDueDate = dayjs(e.target.value);
    setValue(
      `dueDate.0`,
      dayjs(
        `${newDueDate.year()}-${newDueDate.month() + 1}-${selCard.dueDate}`
      ).format("YYYY-MM-DD")
    );
  };

  const renderDueDate = () => {
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
        {...register("dueDate.0", { required: true })}
        onChange={handleDueDateChange}
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
          errors.purchaseDate && "Você precisa digitar uma data válida."
        }
      /> */}

      <SelectCards label="Em qual cartão" />
      {renderDueDate()}
      <Button
        onClick={() => setValue("paid.0", !watch("paid.0"))}
        variant="contained"
        color={watch("paid.0") ? "success" : "warning"}
        sx={{pl: 0}}
        fullWidth
      >
        {/* <Checkbox
          checked={watch("paid.0") || false}
          onChange={(e) => setValue("paid.0", e.target.checked)}
        /> */}
        <Typography>{watch("paid.0") ? "Pago" : "Pendente"}</Typography>
      </Button>
    </>
  );
};

export { SingleInstallment };
