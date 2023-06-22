import { ArrowBackIos, ArrowForwardIos, Edit, ExpandMore, WhatsApp } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { BillType } from "../context/types";
import { monthNames, showError } from "../utils";

export default function DataList() {
  //Context
  const { cards, user, bills, selMonth, selYear, changeMonth } = useContext(AppContext);

  //State
  const [billsByContact, setBillsByContact] = useState([]);
  const [filteredBills, setFilteredBills] = useState<BillType[]>([] as BillType[]);

  //Effects
  useEffect(() => {
    if (bills && bills.length > 0) {
      setFilteredBills(bills.filter((bill) => bill.year === selYear && bill.month === selMonth));
    }

  }, [bills, selMonth, selYear])

  const nextMonth = () => {
    changeMonth(1);
  }

  const prevMonth = () => {
    changeMonth(-1);
  }

  const getBillsPerContact = () => {
    const objBillsByContact = {};
    // console.log('começando', filteredBills);
    filteredBills.forEach((bill) => {
      if (!objBillsByContact[bill.idContact]) {
        objBillsByContact[bill.idContact] = [];
      }
      objBillsByContact[bill.idContact].push({
        ...bill,
        card: cards.find((card) => card.id === bill.idCard),
      });
      // console.log('dentro do foreche', objBillsByContact[bill.idContact]);
    });
    const billsEntries = Object.entries(objBillsByContact);
    console.table('billsEntries',billsEntries);
    setBillsByContact(billsEntries);
  }

  const calcTotal = (indexBills: number) => {
    const billsContact = billsByContact[indexBills][1];
    const total = billsContact.reduce((acc, bill) => {
      return acc + +bill.value;
    }, 0);
    return total.toFixed(2);
  }

  const sendMessage = (indexBills: number) => {
    const [idContact, bills] = billsByContact[indexBills];
    // console.log('contato encontrado',contacts.find((contact) => contact.id === +idContact).name)
    // return;
    const name = idContact > 0 ? contacts.find((contact) => contact.id === +idContact).name : user?.username;
    const phone = idContact > 0 ? contacts.find((contact) => contact.id === +idContact).phone : user?.phone;
    console.log('idContact', +idContact);
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
    const total = calcTotal(indexBills);
    const totalToReceive = +total - paid;
    const footerMessage =
      `Total dos lançamentos deste mês: *R$ ${total}*\n
*O valor em aberto é R$ ${totalToReceive.toFixed(2)}*\n
Qualquer coisa, é só me avisar 😉
Até a próxima!`;
    const finalMessage = `${headerMessage}\n${bodyMessage.join('')}\n${footerMessage}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    window.open(`https://api.whatsapp.com/send?phone=55${phone}&text=${encodedMessage}`, '_blank');
    //https://api.whatsapp.com/send?phone=5533998203838&text=Ol%C3%A1%20JhonaTec!%20Estou%20entrando%20em%20contato%20pelo%20site!
  }

  const handlePaidBild = (bill) => {
    console.log('handlePaidBild', bill);
  }
  
  const renderBills = () => {
    if (!billsByContact || !billsByContact.length) {
      return null;
    }
    // console.log('renderBills', billsByContact);
    // return;
    return billsByContact.map(([idContact, bills], index) => (

      < Accordion key={idContact} >
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <h3>{idContact > 0 ? contacts.find((contact) => contact.id === +idContact)?.name : 'Meus gastos'} - R$ {calcTotal(index)}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Button startIcon={<WhatsApp />} onClick={() => sendMessage(index)}>Enviar cobrança por WhatsApp</Button>
          <List>
            {bills.map((bill) => (
              <ListItem key={bill.id}
                secondaryAction={
                  <IconButton><Edit /></IconButton>
                }
              >
                <ListItemButton>
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

  const teste = async () => {
    try {
      const contacts = await navigator.contacts.select(['name', 'phone']);
      console.log(contacts);
    } catch (error) {
      showError('Erro ao selecionar contato:' + error.message);
    }
  }


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
      <button onClick={teste}>Teste</button>
    </div>
  )
}
