import { ArrowBackIos, ArrowForwardIos, Edit, ExpandMore, WhatsApp } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context";
import { BillType, ContactType } from "../../../context/types";
import { monthNames } from "../../../utils";

type BillContact = ContactType & {
  bills: BillType[]
}


export default function DataList() {
  //Context
  const { user, contacts, bills, selMonth, selYear, changeMonth, changePaidBill } = useContext(AppContext);
  const navigate = useNavigate();
  //State
  const [billsByContact, setBillsByContact] = useState<BillContact[]>([] as BillContact[]);
  const [filteredBills, setFilteredBills] = useState<BillType[]>([] as BillType[]);

  //Effects
  useEffect(() => {
    if (bills && bills.length > 0) {
      const billsForSelectedMonth = bills.filter((bill) => bill.year === selYear && bill.month === selMonth);
      setFilteredBills(billsForSelectedMonth);
      if (billsForSelectedMonth.length > 0) {
        // [{...contact, bills: [{bill}, {bill}]}, {}, {}]
        const myContact: ContactType = {
          id: '',
          name: 'Meus gastos',
        }
        setBillsByContact(
          billsForSelectedMonth.reduce((result, bill) => {
            const targetContact = result.find((elm: BillContact) => elm.id === bill.idContact);
            if (targetContact) {
              targetContact.bills?.push(bill);
            } else {
              const newBillContact = {
                ...contacts.find((contact) => contact.id === bill.idContact) as ContactType,
                bills: [bill]
              }
              result.push(newBillContact);
            }
            return result;
          }, [{ ...myContact, bills: [] }] as BillContact[])
        )
      } else {
        setBillsByContact([]);
      }
    }

  }, [bills, contacts, selMonth, selYear, user?.email, user?.phone]);

  const nextMonth = () => {
    changeMonth(1);
  }

  // sdfsldkafj;

  const prevMonth = () => {
    changeMonth(-1);
    console.log(filteredBills);
  }



  const calcTotal = (bills: BillType[]) => {
    const total = bills.reduce((acc, bill) => {
      return acc + +bill.value;
    }, 0);
    return total.toFixed(2);
    // return 0;
  }

  const sendMessage = (billContact: BillContact) => {
    const { bills } = billContact;
    // console.log('contato encontrado',contacts.find((contact) => contact.id === +idContact).name)
    // return;
    const name = billContact.id !== '' ? billContact.name : user?.username;
    // console.log('idContact', +idContact);
    const headerMessage = `*Olá, ${name}!*
Espero que esteja bem 🙏🏼
Estou passando aqui para enviar os dados da fatura deste mês:\n`;
    let paid = 0;
    const bodyMessage = bills.map((bill) => {
      if (bill.paid) {
        paid += +bill.value;
        return `~[pago] ${bill.description} - ${bill.card.title} - R$ ${bill.value.toFixed(2)}~ \n`;
      } else {
        return `${bill.description} - ${bill.card.title} - R$ ${bill.value.toFixed(2)} \n`;
      }
    });
    const total = calcTotal(bills);
    const totalToReceive = +total - paid;
    const footerMessage =
      `Total dos lançamentos deste mês: *R$ ${total}*\n
*O valor em aberto é R$ ${totalToReceive.toFixed(2)}*\n
Qualquer coisa, é só me avisar 😉
Até a próxima!`;
    const finalMessage = `${headerMessage}\n${bodyMessage.join('')}\n${footerMessage}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    window.open(`https://api.whatsapp.com/send?&text=${encodedMessage}`, '_blank');
    //https://api.whatsapp.com/send?phone=5533998203838&text=Ol%C3%A1%20JhonaTec!%20Estou%20entrando%20em%20contato%20pelo%20site!
  }

  const handlePaidBild = (bill: BillType) => {
    changePaidBill(bill);
  }

  const handleEdit = (bill: BillType) => {
    navigate(`/edit/${bill.id}`);
  }

  const renderBills = () => {
    if (!billsByContact || billsByContact.length < 1) {
      return null;
    }
    console.log('renderBills', billsByContact);
    // return;
    return billsByContact.map((billContact, index) => (

      < Accordion key={index} >
        <AccordionSummary
          expandIcon={<ExpandMore color="primary" />}
        >
          <div className="AccordionSummary">
            <IconButton color="primary" onClick={() => sendMessage(billContact)}>{<WhatsApp />}</IconButton>
            <h3>{billContact.name} - R$ {calcTotal(billContact.bills)}</h3>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {billContact.bills.map((bill) => (
              <ListItem key={bill.id}
                secondaryAction={
                  <IconButton color="primary" onClick={() => handleEdit(bill)}><Edit /></IconButton>
                }
              >
                <ListItemButton onClick={() => handlePaidBild(bill)}>
                  <Checkbox checked={bill.paid} onChange={() => handlePaidBild(bill)} />
                  <p>{bill.description} - {bill.card?.title} - R$ {bill.value.toFixed(2)}</p>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion >
    ));
  } //renderBills


  return (
    <div className="DataList">
      <div className='CardResume'>
        <IconButton onClick={prevMonth}>
          <ArrowBackIos />
        </IconButton>
        <h3>{monthNames[selMonth]} / {selYear}</h3>
        <IconButton onClick={nextMonth}>
          <ArrowForwardIos />
        </IconButton>
      </div>
      <div className='Accordions'>
        {renderBills()}
      </div>
    </div>
  )
}
