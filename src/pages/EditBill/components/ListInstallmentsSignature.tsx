import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const now = dayjs();

const ListInstallmentsSignature = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [totalInstallments, value, selCard, dueDate, totalMonths] = watch([
    "totalInstallments",
    "value",
    "selCard",
    "dueDate",
    "totalMonths",
  ]);

  const [allPaid, setAllPaid] = useState(false);
  const [expandAcc, setExpandAcc] = useState(false);

  useEffect(() => {
    if (errors.dueDate) {
      setExpandAcc(true);
    }
  }, [errors.dueDate]);

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
  }, [dueDate, selCard, setValue, totalInstallments]);

  const getInstallmentValue = () => {
    return +value / +totalInstallments;
  };

  const handleDueDateChange = (e: any) => {
    const newDueDate = dayjs(e.target.value);
    setValue(`dueDate.0`, dayjs(`${newDueDate.year()}-${newDueDate.month() + 1}-${selCard.dueDate}`).format("YYYY-MM-DD"));
    let newTotalMonths = 1;
    let nextDueDate = newDueDate;
    while(nextDueDate.isBefore(now)) {
      nextDueDate = nextDueDate.add(1, "month");
      setValue(`dueDate.${newTotalMonths}`, nextDueDate.format("YYYY-MM-DD"));
      newTotalMonths += 1;
    }
    setValue("totalMonths", newTotalMonths);
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
    for (let i = 0; i < totalMonths; i += 1) {
      setValue(`paid.${i}`, newStatus);
    }
  };

  const renderDueDate = (index: number) => {
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
        fullWidth
      />
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Accordion expanded={expandAcc} onChange={() => setExpandAcc(!expandAcc)}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{totalMonths} Parcelas</h3>
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
            {totalMonths &&
              Array(totalMonths)
                .fill(0)
                .map((_, index: number) => (
                  <div key={index}>
                    <Divider sx={{ mb: 2 }}>
                      Parcela {index + 1}/{totalMonths}
                    </Divider>
                    <ListItem sx={{ minHeight: "90px", padding: "0" }}>
                      {/* onClick={() =>
                        setValue(`paid.${index}`, !watch(`paid.${index}`))
                      } */}
                      <div className="testes">
                        <Button
                          sx={{
                            paddingLeft: "0",
                          }}
                          onClick={() =>
                            setValue(`paid.${index}`, !watch(`paid.${index}`))
                          }
                          fullWidth
                          color={watch(`paid.${index}`) ? "success" : "warning"}
                          variant="outlined"
                        >
                          <Checkbox
                            onChange={(e) =>
                              setValue(`paid.${index}`, e.target.checked)
                            }
                            checked={watch(`paid.${index}`) || false}
                          />
                          <Typography>
                            {watch(`paid.${index}`) ? "Pago" : "Pendente"}- R${" "}
                            {getInstallmentValue().toFixed(2)}
                          </Typography>
                        </Button>
                        {renderDueDate(index)}
                      </div>
                    </ListItem>
                  </div>
                ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export { ListInstallmentsSignature };
