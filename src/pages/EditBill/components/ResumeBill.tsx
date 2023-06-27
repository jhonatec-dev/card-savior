import { List, ListItem, ListItemButton } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { AppContext } from "../../../context";
import { BillType } from "../../../context/types";

interface IProps {
  bills: BillType[];
  type: string;
}

const ResumeBill = ({ bills, type }: IProps) => {
  const { contacts } = useContext(AppContext);
  const { getValues } = useFormContext();
  const firstBill = bills[0];

  const getTotalBill = bills.reduce((acc, bill) => {
    return acc + +bill.value;
  }, 0);

  const getBuyerName = () => {
    const selContact = getValues("selContact");
    if(!selContact){
      return "Eu"
    }

    return selContact.name;
  }

  return (
    <div>
      <h4>{type}</h4>
      {/* <pre>{JSON.stringify(bills, null, 2)}</pre> */}
      <p>O que foi comprado: {firstBill.description}</p>
      <p>
        Data de compra: {dayjs(firstBill.purchaseDate).format("DD/MM/YYYY")}
      </p>
      <p>Quanto custou R$: {(+getTotalBill).toFixed(2)}</p>
      <p>
        Quem comprou: {getBuyerName()}
      </p>
      <p>No cartão: {firstBill.card?.title}</p>
      <h4>Parcelas</h4>
      <List>
        {bills.map((bill, index) => (
          <ListItem key={index}>
            <ListItemButton>
              <div>
                <p>Valor da parcela R$: {(+bill.value).toFixed(2)}</p>
                <p>
                  Data de vencimento:{" "}
                  {dayjs(
                    `${bill.year}-${bill.month + 1}-${bill.card.dueDate}`
                  ).format("DD/MM/YYYY")}
                </p>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export { ResumeBill };
