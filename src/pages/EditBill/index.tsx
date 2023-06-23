import { Backspace, Save } from "@mui/icons-material";
import { Autocomplete, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Step, StepContent, StepLabel, Stepper, Switch, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { BillType, CardType } from "../../context/types";
const idInstallments = uuidv4();


// Lógica: se tiver parametros, então é edição...
export default function EditBill() {
  const { contacts, bills, selMonth, selYear, cards } = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedContact, setSelectedContact] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [self, setSelf] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [selectedTotalInstallments, setSelectedTotalInstallments] = useState(1);
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const [instalments, setInstalments] = useState<BillType[]>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const divButtonsNav = (
    <div>
      <Button onClick={handleBack} disabled={activeStep === 0}>Voltar</Button>
      <Button onClick={handleNext}>Próximo</Button>
    </div>
  );

  const divInstallments = (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} >
      <h4>Parcela</h4>
      <TextField size="small" type="number" value={selectedInstallment} onChange={(e) => setSelectedInstallment(parseInt(e.target.value))} />
      <h4>de</h4>
      <TextField size="small" type="number" value={selectedTotalInstallments} onChange={(e) => setSelectedTotalInstallments(parseInt(e.target.value))} />
    </div>
  )

  const selectCards = (
    <Select fullWidth value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)}>
      {cards.map((card) => (
        <MenuItem key={card.id} value={card.id}>
          <div style={{ width: '100%', borderRadius: '10px', padding: '10px', background: `linear-gradient(131deg,${card.color} 0%, #252525 100%)` }} >
            <h3>{card.title}</h3>
            <p>Fechamento: {card.dueDate} - Vencimento: {card.closingDate}</p>
          </div>
        </MenuItem>
      ))}
    </Select>
  )

  const renderListInstallments = () => {
    if(selectedTotalInstallments === 1) return null;
    //CRIAR UMA LISTA DE PARCELAS
    let arrayInstallments = Array(selectedTotalInstallments).fill(0);
        // const newDate = selectedDate ;    
    arrayInstallments = arrayInstallments.map((_i, index) => {
      const newDate = selectedDate.add(index, 'month');
      // console.log('newDate',newDate)
      const newBill: BillType = {
        id: idInstallments,
        description: selectedDescription,
        value: selectedValue,
        paid: false,
        idContact: selectedContact,
        installment: selectedInstallment,
        totalInstallments: selectedTotalInstallments,
        card: cards.find((c) => c.id === selectedCard) as CardType,
        year: newDate.year(),
        month: newDate.month()
      }
      return newBill
    })
    setInstalments(arrayInstallments);

    console.log(arrayInstallments);

    return null;

    return (
      <List>
        <ListItem>
          <ListItemButton>
            <Checkbox checked={arrayInstallments.every((i) => i.paid)}/>
            <ListItemText>Marcar todas como pagas</ListItemText>
          </ListItemButton>
        </ListItem>
        {
          arrayInstallments.map((i) => (
            <ListItem key={i.id}>
              <ListItemButton>
                <Checkbox checked={i.paid}/>
                <ListItemText>{i.value}</ListItemText>
                {/* DatePicker */}
              </ListItemButton>
            </ListItem>
          ))
        }

      </List>

    )

  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <div>
        <Header title="Editar despesa" showGoBack />
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Tipo de Despesa</StepLabel>
            <StepContent sx={{ gap: "60px" }}>
              <div className="StepContent">
                <h3>Escolha o tipo de despesa</h3>
                <ToggleButtonGroup exclusive onChange={(_e, value: number) => setSelectedType(value)} value={selectedType}>
                  <ToggleButton value={0}>Única</ToggleButton>
                  <ToggleButton value={1}>Parcelada</ToggleButton>
                  <ToggleButton value={2}>Assinatura</ToggleButton>
                </ToggleButtonGroup>
                {divButtonsNav}
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Detalhes da Despesa</StepLabel>
            <StepContent>
              <div className="StepContent">
                <h3>Agora é hora de detalhar a despesa</h3>
                <FormControlLabel control={<Switch checked={self} onChange={(e) => setSelf(e.target.checked)} />} label="Meus gastos" />
                {!self && (
                  <Autocomplete freeSolo fullWidth disablePortal options={contacts.map((c) => c.name)}
                    value={selectedContact} onChange={(_event, value) => setSelectedContact(value as string)}
                    renderInput={(params) => <TextField {...params} label="Nome" helperText="Escolha quem comprou ou digite um novo nome." />} />
                )}
                <TextField label="O que foi comprado?" type="text" fullWidth multiline maxRows={2}
                  InputProps={{ endAdornment: <IconButton onClick={() => setSelectedDescription('')} color="primary"><Backspace /></IconButton> }}
                  value={selectedDescription} onChange={(e) => setSelectedDescription(e.target.value)} />
                <DesktopDatePicker sx={{ width: '100%' }} value={selectedDate} format="DD/MM/YYYY" label="Quando foi?" onChange={(date) => setSelectedDate(date as dayjs.Dayjs)} />
                <TextField label="Valor nessa fatura" type="number" value={selectedValue} onChange={(e) => setSelectedValue(Number(e.target.value))}
                  InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} fullWidth />
                {selectCards}
                {selectedType === 1 && divInstallments}
                {divButtonsNav}
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Parcelas</StepLabel>
            <StepContent>
              <div className="StepContent">
                <h3>Ajuste as parcelas</h3>
                {renderListInstallments()}
                {divButtonsNav}
              </div>
            </StepContent>
          </Step>
        </Stepper>
        {activeStep === 2 && (
          <div className="StepContent">
            <Button onClick={handleBack}>Voltar</Button>
            <h2>Informações</h2>
            <Button startIcon={<Save />} fullWidth>Salvar</Button>
          </div>
        )}
      </div>
    </LocalizationProvider>
  )
}
