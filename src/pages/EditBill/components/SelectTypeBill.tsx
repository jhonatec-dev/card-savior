import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DESC_BILLS, MULTIPLE_INSTALLMENTS, SIGNATURE, SINGLE_INSTALLMENT } from "../constants/billTypes";

type IProps = {
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const SelectTypeBill = ({selectedType, setSelectedType}: IProps) => {
  return (
    <>
      <h3>Escolha o tipo de despesa</h3>
      <ToggleButtonGroup
        exclusive
        onChange={(_e, value: string) => setSelectedType(value)}
        value={selectedType}
      >
        <ToggleButton value={SINGLE_INSTALLMENT}>Única</ToggleButton>
        <ToggleButton value={MULTIPLE_INSTALLMENTS}>Parcelada</ToggleButton>
        <ToggleButton value={SIGNATURE}>Assinatura</ToggleButton>
      </ToggleButtonGroup>
      <Typography>{DESC_BILLS(selectedType)}</Typography>

    </>
  );
};

export { SelectTypeBill };
