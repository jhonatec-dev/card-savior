import { Edit, ExpandMore, WhatsApp } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { BillType, CardType, ContactType } from "../../../context/types";

type BillContact = ContactType & {
  bills: BillType[];
};

type IProps = {
  handleEdit: (id: string) => void;
};

const DataListOverdue = ({ handleEdit }: IProps) => {
  //Context
  const {
    user,
    contacts,
    bills,
    cards,
    changePaidBill,
  } = useContext(AppContext);
  //State
  const [billsByContact, setBillsByContact] = useState<BillContact[]>(
    [] as BillContact[]
  );
  // const [filteredBills, setFilteredBills] = useState<BillType[]>(
  //   [] as BillType[]
  // );

  //Effects
  useEffect(() => {
    if (bills && bills.length > 0) {
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
      if (!overduedBills) return;
      // setFilteredBills(overduedBills);
      if (overduedBills.length > 0) {
        // [{...contact, bills: [{bill}, {bill}]}, {}, {}]
        const myContact: ContactType = {
          id: "",
          name: "Meus gastos",
        };
        setBillsByContact(
          overduedBills.reduce(
            (result, bill) => {
              const targetContact = result.find(
                (elm: BillContact) => elm.id === bill.idContact
              );
              if (targetContact) {
                targetContact.bills?.push(bill);
              } else {
                const newBillContact = {
                  ...(contacts.find(
                    (contact) => contact.id === bill.idContact
                  ) as ContactType),
                  bills: [bill],
                };
                result.push(newBillContact);
              }
              return result;
            },
            [{ ...myContact, bills: [] }] as BillContact[]
          )
        );
      } else {
        setBillsByContact([]);
      }
    }
  }, [bills, cards, contacts]);


  // sdfsldkafj;


  const calcTotal = (bills: BillType[]) => {
    const total = bills.reduce((acc, bill) => {
      return acc + +bill.value;
    }, 0);
    return total.toFixed(2);
    // return 0;
  };

  const sendMessage = (billContact: BillContact) => {
    const { bills } = billContact;
    const name = billContact.id !== "" ? billContact.name : user?.username;
    const headerMessage = `*Olá, ${name}!*
Espero que esteja bem 🙏🏼
Estou passando aqui para enviar os lançamentos do cartão que estão em atraso\n`;
    let paid = 0;
    const bodyMessage = bills.map((bill) => {
      const billCard = cards.find(
        (card) => card.id === bill.idCard
      ) as CardType;
      if (bill.paid) {
        paid += +bill.value;
        return `~[pago] ${bill.description} - ${
          billCard.title
        } - R$ ${bill.value.toFixed(2)}~ \n`;
      } else {
        return `${bill.description} - ${
          billCard.title
        } - R$ ${bill.value.toFixed(2)} \n`;
      }
    });
    const total = calcTotal(bills);
    const totalToReceive = +total - paid;
    const footerMessage = `Total dos lançamentos deste mês: *R$ ${total}*\n
*O valor em aberto é R$ ${totalToReceive.toFixed(2)}*\n
Qualquer coisa, é só me avisar 😉
Até a próxima!`;
    const finalMessage = `${headerMessage}\n${bodyMessage.join(
      ""
    )}\n${footerMessage}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    window.open(
      `https://api.whatsapp.com/send?&text=${encodedMessage}`,
      "_blank"
    );
  };

  const handlePaidBild = (bill: BillType) => {
    changePaidBill(bill);
  };

  const renderBills = () => {
    if (!billsByContact || billsByContact.length < 1) {
      return null;
    }
    // console.log("renderBills", billsByContact);
    // return;
    return billsByContact.map((billContact, index) => (
      <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
          <div className="AccordionSummary">
            <IconButton
              color="primary"
              onClick={() => sendMessage(billContact)}
            >
              {<WhatsApp />}
            </IconButton>
            <h3>
              {billContact.name} - R$ {calcTotal(billContact.bills)}
            </h3>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ padding: 0 }}>
            {billContact.bills.map((bill) => {
              const billCard = cards.find((card) => card.id === bill.idCard);
              return (
                <ListItem
                  key={bill.id}
                  sx={{ padding: 0 }}
                  secondaryAction={
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(bill.id)}
                    >
                      <Edit />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    onClick={() => handlePaidBild(bill)}
                    sx={{ padding: 0 }}
                  >
                    <Checkbox
                      checked={bill.paid}
                      onChange={() => handlePaidBild(bill)}
                    />
                    <p>
                      {bill.installment}/{bill.totalInstallments} -
                      {bill.description} - {billCard?.title} - R${" "}
                      {bill.value.toFixed(2)}
                    </p>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    ));
  }; //renderBills


  return (
    <div className="DataList">
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Lançamentos em atraso</h3>

      <div className="Accordions">{renderBills()}</div>
    </div>
  );
};

export { DataListOverdue };
