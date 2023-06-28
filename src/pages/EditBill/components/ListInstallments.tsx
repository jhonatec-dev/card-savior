import { Expand } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

const ZERO = 0;

const ListInstallments = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [totalInstallments, value] = watch(["totalInstallments", "value"]);
  const [selCard, purchaseDate] = watch(["selCard", "purchaseDate"]);

  const getInstallmentValue = () => {
    return +value / +totalInstallments;
  };

  const renderDueDate = (index: number) => {
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
        ).add(1 + index, "month");
        console.log(newDueDate.format("YYYY-MM-DD"));
        setValue(`dueDate-${index}`, newDueDate.format("YYYY-MM-DD"));
      } else {
        // console.log("agora");
        const newDueDate = dayjs(
          `${purchaseYear}-${purchaseMonth}-${selCard.dueDate}`
        ).add(index, "month");
        setValue(`dueDate-${index}`, newDueDate.format("YYYY-MM-DD"));
      }
    }

    return (
      <TextField
        label="Vencimento"
        type="date"
        InputProps={{
          inputProps: {
            min: "2020-01-01",
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        {...register(`dueDate-${index}`, { required: true })}
        error={!!errors.dueDate}
        helperText={errors.dueDate && "Você precisa digitar uma data."}
        disabled={index > 0}
      />
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Button>Gerar</Button>
      <Accordion>
        <AccordionSummary
          expandIcon={<Expand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{totalInstallments} Parcelas</h3>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemButton>
                <Checkbox></Checkbox>
                <h3>Marcar todos como pago</h3>
              </ListItemButton>
            </ListItem>
            {totalInstallments &&
              Array(totalInstallments)
                .fill(0)
                .map((_, index: number) => (
                  <ListItem key={index} secondaryAction={renderDueDate(index)}>
                    <ListItemButton>
                      <Checkbox />
                      <h4>
                        Parcela {index + 1}/{totalInstallments} - R${" "}
                        {getInstallmentValue().toFixed(2)}
                      </h4>
                    </ListItemButton>
                  </ListItem>
                ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export { ListInstallments };
