import { Expand } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ZERO = 0;

const ListInstallments = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [totalInstallments, value, selCard, purchaseDate] = watch([
    "totalInstallments",
    "value",
    "selCard",
    "purchaseDate",
  ]);

  const [allPaid, setAllPaid] = useState(false);

  const getInstallmentValue = () => {
    return +value / +totalInstallments;
  };

  const handleDueDateChange = (e: any) => {
    const newDueDate = dayjs(e.target.value);
    for (let i = 0; i < totalInstallments; i += 1) {
      setValue(`dueDate.${i}`, newDueDate.add(i, "month").format("YYYY-MM-DD"));
    }
  };

  const handleAllPaid = (e: any) => {
    let newStatus;
    if (e.type === "checkbox") {
      newStatus = e.target.checked;
      setAllPaid(newStatus);
    } else {
      newStatus = !allPaid;
      setAllPaid(!allPaid);
    }
    for (let i = 0; i < totalInstallments; i += 1) {
      setValue(`paid.${i}`, newStatus);
    }
  };

  const renderDueDate = (index: number) => {
    const purchaseDay = dayjs(purchaseDate).date();
    const purchaseMonth = dayjs(purchaseDate).month() + 1;
    const purchaseYear = dayjs(purchaseDate).year();

    if (selCard) {
      if (purchaseDay > selCard.closingDate) {
        const newDueDate = dayjs(
          `${purchaseYear}-${purchaseMonth}-${selCard.dueDate}`
        ).add(1 + index, "month");
        setValue(`dueDate.${index}`, newDueDate.format("YYYY-MM-DD"));
      } else {
        const newDueDate = dayjs(
          `${purchaseYear}-${purchaseMonth}-${selCard.dueDate}`
        ).add(index, "month");
        setValue(`dueDate.${index}`, newDueDate.format("YYYY-MM-DD"));
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
        {...register(`dueDate.${index}`, { required: true })}
        onChange={handleDueDateChange}
        error={!!errors.dueDate}
        helperText={errors.dueDate && "Você precisa digitar uma data."}
        disabled={index > 0}
        sx={{ width: "250px" }}
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
            <ListItem
              sx={{
                paddingLeft: "0",
              }}
            >
              <Button
                sx={{
                  paddingLeft: "0",
                }}
                onClick={handleAllPaid}
              >
                <Checkbox checked={allPaid} onChange={handleAllPaid} />
                <h3>Marcar todos como {allPaid ? "Pendente" : "Pago"}</h3>
              </Button>
            </ListItem>
            {totalInstallments &&
              Array(totalInstallments)
                .fill(0)
                .map((_, index: number) => (
                  <ListItem key={index} sx={{ minHeight: "90px", padding: "0" }}>
                    {/* onClick={() =>
                        setValue(`paid.${index}`, !watch(`paid.${index}`))
                      } */}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                      }}
                    >
                      <Button
                      sx={{
                        paddingLeft: "0",
                      }}
                        onClick={() =>
                          setValue(`paid.${index}`, !watch(`paid.${index}`))
                        }
                      >
                        <Checkbox
                          onChange={(e) =>
                            setValue(`paid.${index}`, e.target.checked)
                          }
                          checked={watch(`paid.${index}`) || false}
                        />
                        Parcela {index + 1}/{totalInstallments} - R${" "}
                        {getInstallmentValue().toFixed(2)}
                      </Button>
                      {renderDueDate(index)}
                    </div>
                  </ListItem>
                ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export { ListInstallments };
