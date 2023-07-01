import { FilterAlt, FilterAltOff } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { CardType } from "../../../context/types";
import { monthNames } from "../../../utils";

export default function Overdue() {
  // Context
  const { bills, cards } = useContext(AppContext);

  //State
  const [showOverdue, setShowOverdue] = useState(false);
  const [total, setTotal] = useState("0,00");

  // Effects
  useEffect(() => {
    if (!bills) return;
    const calculateTotal = () => {
      if (!bills) return 0;
      const now = new Date(Date.now());
      const yearNow = now.getFullYear();
      const monthNow = now.getMonth() + 1;
      const overduedBills = bills.filter((bill) => {
        const billCard = cards.find(
          (card) => card.id === bill.idCard
        ) as CardType;
        if (
          bill.year < yearNow ||
          (bill.year === yearNow && bill.month < monthNow)
        ) {
          return !bill.paid;
        } else if (bill.year === yearNow && bill.month === monthNow) {
          if (!bill.paid) {
            return billCard.closingDate >= now.getDate();
          }
        }
        return false;
      });
      if (!overduedBills) return 0;
      const total = overduedBills.reduce((acc, bill) => {
        return acc + +bill.value;
      }, 0);

      setTotal(total.toFixed(2));
    };
    calculateTotal();
  }, [bills]);

  const styleCard = {
    background: `linear-gradient(131deg, #893939 0%, #252525 100%)`,
  };

  const handleShowOverdue = () => {
    setShowOverdue(!showOverdue);
  };

  const getActualDate = () => {
    const now = new Date(Date.now());
    const yearNow = now.getFullYear();
    const monthNow = monthNames[now.getMonth()];
    return `${monthNow}/${yearNow}`;
  };

  return (
    <div className="EditCreditCard" style={styleCard}>
      <div>
        <h4>Atrasados até {getActualDate()}</h4>
        <h2>R$ {total}</h2>
      </div>
      <Button
        startIcon={showOverdue ? <FilterAlt /> : <FilterAltOff />}
        onClick={handleShowOverdue}
        disabled
      >
        {showOverdue ? "Mostrar somente atrasados" : "Mostrar todos"}
      </Button>
    </div>
  );
}
