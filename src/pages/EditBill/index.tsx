import { Save } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { BillType, CardType } from "../../context/types";
import { SingleInstallment } from "./components";
const idInstallments = uuidv4();

// Lógica: se tiver parametros, então é edição...
export default function EditBill() {
  const { contacts, cards } = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm( {
    defaultValues: {
      purchaseDate: dayjs().format("YYYY-MM-DD"),
    }
  });

  const [selectedType, setSelectedType] = useState(0);
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [self, setSelf] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [selectedTotalInstallments, setSelectedTotalInstallments] = useState(1);
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  // const [instalments, setInstalments] = useState<BillType[]>([]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const divButtonsNav = (
    <div>
      <Button onClick={handleBack} disabled={activeStep === 0}>
        Voltar
      </Button>
      <Button onClick={handleNext}>Próximo</Button>
    </div>
  );

  const divInstallments = (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <h4>Parcela</h4>
      <TextField
        size="small"
        type="number"
        value={selectedInstallment}
        onChange={(e) => setSelectedInstallment(parseInt(e.target.value))}
      />
      <h4>de</h4>
      <TextField
        size="small"
        type="number"
        value={selectedTotalInstallments}
        onChange={(e) => setSelectedTotalInstallments(parseInt(e.target.value))}
      />
    </div>
  );


  const renderListInstallments = () => {
    if (selectedTotalInstallments === 1) return null;
    //CRIAR UMA LISTA DE PARCELAS
    let arrayInstallments = Array(selectedTotalInstallments).fill(0);
    // const newDate = selectedDate ;
    arrayInstallments = arrayInstallments.map((_i, index) => {
      const newDate = selectedDate.add(index, "month");
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
        month: newDate.month(),
      };
      return newBill;
    });
    // setInstalments(arrayInstallments);

    console.log(arrayInstallments);

    return null;

    return (
      <List>
        <ListItem>
          <ListItemButton>
            <Checkbox checked={arrayInstallments.every((i) => i.paid)} />
            <ListItemText>Marcar todas como pagas</ListItemText>
          </ListItemButton>
        </ListItem>
        {arrayInstallments.map((i) => (
          <ListItem key={i.id}>
            <ListItemButton>
              <Checkbox checked={i.paid} />
              <ListItemText>{i.value}</ListItemText>
              {/* DatePicker */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header title="Editar despesa" showGoBack />
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Tipo de Despesa</StepLabel>
              <StepContent sx={{ gap: "60px" }}>
                <div className="StepContent">
                  <h3>Escolha o tipo de despesa</h3>
                  <ToggleButtonGroup
                    exclusive
                    onChange={(_e, value: number) => setSelectedType(value)}
                    value={selectedType}
                  >
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
                  <SingleInstallment />
                  {divButtonsNav}
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Parcelas</StepLabel>
              <StepContent>
                <div className="StepContent">
                  <h3>Ajuste as parcelas</h3>
                  {divButtonsNav}
                </div>
              </StepContent>
            </Step>
          </Stepper>
          <Button type="submit" variant="outlined">
            Salvar Teste
          </Button>
          {activeStep === 2 && (
            <div className="StepContent">
              <Button onClick={handleBack}>Voltar</Button>
              <h2>Informações</h2>
              <Button startIcon={<Save />} fullWidth>
                Salvar
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
