import { Button, Divider } from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { AppContext } from "../../../context";
import { BillType } from "../../../context/types";
import { SIGNATURE } from "../constants/billTypes";

interface IProps {
  bills: BillType[];
  type: string;
}

const ResumeBill = ({ bills, type }: IProps) => {
  const { cards } = useContext(AppContext);
  const { getValues } = useFormContext();
  const firstBill = bills[0];
  const billCard = cards.find((card) => card.id === firstBill?.idCard);

  const getTotalBill = () => {
    if (type === SIGNATURE) {
      return firstBill?.value;
    }
    return bills.reduce((acc, bill) => {
      return acc + +bill.value;
    }, 0);
  };

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
        Quanto custou: <strong>R$ {getTotalBill().toFixed(2)}</strong>
      </p>
      <p>
        Quem comprou: <strong>{getBuyerName()}</strong>
      </p>
      <p>
        No cartão: <strong>{billCard?.title}</strong>
      </p>
      {type === SIGNATURE && (
        <p>
          Status: <strong>{getValues("active") ? "Ativa" : "Inativa"}</strong>
        </p>
      )}
      {type === SIGNATURE && (
        <p>
          Data inicial:{" "}
          <strong>
            {dayjs(
              `${firstBill.year}-${firstBill.month + 1}-${billCard?.dueDate}`
            ).format("DD/MM/YYYY")}
          </strong>
        </p>
      )}
      <Divider sx={{ my: 2, fontSize: "1.2rem" }}>
        {bills && bills.length} Parcelas
      </Divider>
      <div className="testes">
        {bills.map((bill, index) => (
          <Button
            key={index}
            variant="outlined"
            color={bill.paid ? "success" : "warning"}
            fullWidth
          >
            <div>
              <p>
                Parcela {index + 1}/{bills.length}:
              </p>
              <p>R$: {(+bill.value).toFixed(2)}</p>
              <p>
                Vencimento:{" "}
                {dayjs(
                  `${bill.year}-${bill.month + 1}-${billCard?.dueDate}`
                ).format("DD/MM/YYYY")}
              </p>
              <p>{bill.paid ? "[PAGO]" : "[PENDENTE]"}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export { ResumeBill };
