import {
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuiv4 } from "uuid";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { BillType } from "../../context/types";
import { SingleInstallment } from "./components";
import { MultipleInstallments } from "./components/MultipleInstallments";
import { ResumeBill } from "./components/ResumeBill";
import {
  MULTIPLE_INSTALLMENTS,
  SIGNATURE,
  SINGLE_INSTALLMENT,
} from "./constants/billTypes";

// Lógica: se tiver parametros, então é edição...
export default function EditBill() {
  const navigate = useNavigate();
  const { addBills, contacts, addContact } = useContext(AppContext);

  const [activeStep, setActiveStep] = useState(0);
  const [bills, setBills] = useState<BillType[]>([]);

  const methods = useForm({
    defaultValues: {
      purchaseDate: dayjs().format("YYYY-MM-DD"),
      value: 0,
      id: uuiv4(),
      selContact: null,
      totalInstallments: 1,
    },
  });

  const [selectedType, setSelectedType] = useState(SINGLE_INSTALLMENT);
  // const [instalments, setInstalments] = useState<BillType[]>([]);

  const setSingleInstallment = (data: any) => {
    const year = dayjs(data.dueDate).year();
    const month = dayjs(data.dueDate).month();
    
    const installment = {
      id: data.id,
      value: +data.value,
      purchaseDate: data.purchaseDate,
      year,
      month,
      installment: 1,
      totalInstallments: 1,
      paid: data.paid,
      idContact: data.selContact?.id || "",
      description: data.description,
      card: data.selCard,
    };

    setBills([installment as BillType]);
  };

  const setMultipleInstallments = (data: any) => {
    const newBills: BillType[] = [];
    for (let i = 0; i < data.totalInstallments; i += 1) {
      const year = dayjs(data.dueDate[i]).year();
      const month = dayjs(data.dueDate[i]).month();

      const installment = {
        id: data.id,
        value: +data.value / +data.totalInstallments,
        purchaseDate: data.purchaseDate,
        year,
        month,
        installment: 1,
        totalInstallments: 1,
        paid: data.paid[i] || false,
        idContact: data.selContact?.id || "",
        description: data.description,
        card: data.selCard,
      };
      console.log(installment);
      newBills.push(installment);
    }
    setBills(newBills);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    switch (selectedType) {
      case SINGLE_INSTALLMENT:
        setSingleInstallment(data);
        break;
      case MULTIPLE_INSTALLMENTS:
        setMultipleInstallments(data);
        break;
      default:
        return;
    }
    handleNext();
  };

  const onError = () => {
    return;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    addBills(bills);
    const { getValues } = methods;
    const selContact = getValues("selContact");
    // console.log(selContact);
    if (selContact && !contacts.find((c) => c.id === selContact?.id)) {
      addContact({
        id: selContact.id,
        name: selContact.name,
      });
    }

    navigate("/home");
  };

  const divButtonsNav = (isSubmit = false) => (
    <div>
      <Button onClick={handleBack} disabled={activeStep === 0}>
        Voltar
      </Button>
      <Button
        onClick={isSubmit ? onError : handleNext}
        type={isSubmit ? "submit" : "button"}
      >
        Próximo
      </Button>
    </div>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form
          className="Form"
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <Header title="Editar despesa" showGoBack />
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Tipo de Despesa</StepLabel>
              <StepContent sx={{ gap: "60px" }}>
                <div className="StepContent">
                  <h3>Escolha o tipo de despesa</h3>
                  <ToggleButtonGroup
                    exclusive
                    onChange={(_e, value: string) => setSelectedType(value)}
                    value={selectedType}
                  >
                    <ToggleButton value={SINGLE_INSTALLMENT}>
                      Única
                    </ToggleButton>
                    <ToggleButton value={MULTIPLE_INSTALLMENTS}>
                      Parcelada
                    </ToggleButton>
                    <ToggleButton value={SIGNATURE}>Assinatura</ToggleButton>
                  </ToggleButtonGroup>
                  {divButtonsNav()}
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Detalhes da Despesa</StepLabel>
              <StepContent>
                <div className="StepContent">
                  {selectedType === SINGLE_INSTALLMENT && <SingleInstallment />}
                  {selectedType === MULTIPLE_INSTALLMENTS && (
                    <MultipleInstallments />
                  )}
                  {divButtonsNav(true)}
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Confirmação</StepLabel>
              <StepContent>
                <div className="StepContent">
                  <ResumeBill bills={bills} type={selectedType} />
                  <div>
                    <Button onClick={handleBack}>Voltar</Button>
                    <Button onClick={handleSave}>
                      Salvar
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
