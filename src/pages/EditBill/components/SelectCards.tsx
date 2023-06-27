import { FormHelperText, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AppContext } from "../../../context";

interface IProps {
  label: string;
}

const SelectCards = ({ label }: IProps) => {
  const { cards } = useContext(AppContext);
  const [selCardId, setSelCardId] = useState("");
  const {setValue, register, formState:{errors}, clearErrors, getValues} = useFormContext();

  register("selCard", { required: true });

  useEffect(() => {
    if(getValues("selCard"))
    setSelCardId(getValues("selCard").id);
  }, [getValues]);

  const handleChange = (e: any) => {
    setSelCardId(e.target.value);
    const selCard = cards.find((card) => card.id === e.target.value);
    setValue("selCard", selCard);
    clearErrors("selCard");
  }

  return (
    <>
      <Select
        fullWidth
        label={label}
        value={selCardId}
        onChange={handleChange}
        error={!!errors.selCard}
      >
        {cards.map((card) => (
          <MenuItem key={card.id} value={card.id}>
            <div
              style={{
                width: "100%",
                borderRadius: "10px",
                padding: "10px",
                background: `linear-gradient(131deg,${card.color} 0%, #252525 100%)`,
              }}
            >
              <h3>{card.title}</h3>
              <p>
                Fechamento: {card.closingDate} - Vencimento: {card.dueDate}
              </p>
            </div>
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!errors.selCard}>{errors.selCard && "Selecione um cartão"}</FormHelperText>
    </>
  );
};

export { SelectCards };
