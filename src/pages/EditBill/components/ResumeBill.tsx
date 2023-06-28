import { Divider, List, ListItem } from "@mui/material";
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
    if (!selContact) {
      return "Eu";
    }

    return selContact.name;
  };

  return (
    <div style={{ width: "100%" }}>
      <h3>{type}</h3>
      {/* <pre>{JSON.stringify(bills, null, 2)}</pre> */}
      <p>
        O que foi comprado: <strong>{firstBill?.description}</strong>
      </p>
      <p>
        Data de compra:{" "}
        <strong>{dayjs(firstBill?.purchaseDate).format("DD/MM/YYYY")}</strong>
      </p>
      <p>
        Quanto custou: <strong>R$ {(+getTotalBill).toFixed(2)}</strong>
      </p>
      <p>Quem comprou: <strong>{getBuyerName()}</strong></p>
      <p>No cartão: <strong>{firstBill?.card?.title}</strong></p>
      <Divider sx={{ my: 2, fontSize: "1.2rem" }} >{bills && bills.length} Parcelas</Divider>
      <List sx={{ width: "100%", bgcolor: "background.paper"}}>
        {bills.map((bill, index) => (
          <ListItem key={index}>
            <div style={{textAlign: "center" }}>
              <p>Valor da parcela R$: {(+bill.value).toFixed(2)}</p>
              <p>
                Data de vencimento:{" "}
                {dayjs(
                  `${bill.year}-${bill.month + 1}-${bill.card.dueDate}`
                ).format("DD/MM/YYYY")}
              </p>
              <p>{bill.paid ? "[PAGO]" : "[PENDENTE]"}</p>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export { ResumeBill };
