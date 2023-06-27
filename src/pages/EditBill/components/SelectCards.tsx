import { MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AppContext } from "../../../context";

interface IProps {
  label: string;
}

const SelectCards = ({ label }: IProps) => {
  const { cards } = useContext(AppContext);
  const [selCardId, setSelCardId] = useState("");
  const {setValue} = useFormContext();

  const handleChange = (e) => {
    setSelCardId(e.target.value);
    const selCard = cards.find((card) => card.id === e.target.value);
    setValue("selCard", selCard);
  }

  return (
    <>
      <Select
        fullWidth
        label={label}
        value={selCardId}
        onChange={handleChange}
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
    </>
  );
};

export { SelectCards };
