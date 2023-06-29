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
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuiv4 } from "uuid";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { BillType, CardType } from "../../context/types";
import { showError } from "../../utils";
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
  const { id } = useParams();
  const { addBills, contacts, cards, addContact, bills, signatures } =
    useContext(AppContext);

  const [activeStep, setActiveStep] = useState(0);
  const [preBills, setPreBills] = useState<BillType[]>([]);

  const methods = useForm({
    defaultValues: {
      // purchaseDate: dayjs().format("YYYY-MM-DD"),
      value: 0,
      id: uuiv4(),
      selContact: null,
      totalInstallments: 1,
      selCard: null,
      dueDate: [ dayjs().format("YYYY-MM-DD")],
      paid: [],
      description: "",
      installment: 1,
      year: dayjs().year(),
      month: dayjs().month(),
    },
  });

  useEffect(() => {
    const isSignature = (id: string) => {
      return signatures.some((s) => s.id === id);
    };

    if (id) {
      const newBills = bills.filter((bill) => bill.id === id);
      setPreBills(newBills);
      const firstBill = newBills[0];
      // console.log(firstBill);
      const { setValue } = methods;
      setValue("id", firstBill.id);
      setValue("description", firstBill.description);
      // setValue(
      //   "purchaseDate",
      //   dayjs(firstBill.purchaseDate).format("YYYY-MM-DD")
      // );
      setValue("value", firstBill.value * firstBill.totalInstallments);
      if (firstBill.idContact)
        setValue(
          "selContact",
          contacts.find((c) => c.id === firstBill.idContact)
        );
      const billCard = cards.find((card) => card.id === firstBill.idCard) as CardType;
      setValue("selCard", billCard || null);
      setValue("totalInstallments", firstBill.totalInstallments);

      for (let i = 0; i < firstBill.totalInstallments; i++) {
        setValue(`dueDate.${i}`, dayjs(`${newBills[i].year}-${newBills[i].month + 1}-${billCard.dueDate}`).format("YYYY-MM-DD"));
        setValue(`paid.${i}`, newBills[i].paid);
      }

      if (firstBill.totalInstallments > 1) {
        setSelectedType(MULTIPLE_INSTALLMENTS);
      } else if (isSignature(firstBill.id)) {
        setSelectedType(SIGNATURE);
      } else {
        setSelectedType(SINGLE_INSTALLMENT);
      }
      setActiveStep(1);

    }
  }, [id]);

  const [selectedType, setSelectedType] = useState(SINGLE_INSTALLMENT);
  // const [instalments, setInstalments] = useState<BillType[]>([]);


  const setMultipleInstallments = (data: any) => {
    const newBills: BillType[] = [];
    for (let i = 0; i < data.totalInstallments; i += 1) {
      const year = dayjs(data.dueDate[i]).year();
      const month = dayjs(data.dueDate[i]).month();

      const installment = {
        id: data.id,
        value: +data.value / +data.totalInstallments,
        // purchaseDate: data.purchaseDate,
        year,
        month,
        installment: i + 1,
        totalInstallments: data.totalInstallments,
        paid: data.paid && data.paid[i] || false,
        idContact: data.selContact?.id || "",
        description: data.description,
        idCard: data.selCard.id,
      };
      // console.log(installment);
      newBills.push(installment);
    }
    setPreBills(newBills);
  };

  const onSubmit = (data: any) => {
    // console.log(data);
    if(selectedType === SIGNATURE){
      showError('ASSINATURA AINDA NÃO IMPLEMENTADA');
    } else{
      setMultipleInstallments(data);
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
    addBills(preBills);
    const { getValues } = methods;
    const selContact = getValues("selContact");
    // console.log(selContact);
    if (selContact && !contacts.find((c) => c.id === selContact.id)) {
      addContact({
        id: selContact.id,
        name: selContact.name,
      });
    }

    navigate("/home");
  };

  const shouldBackButtonBeVisible = () => {
    return (activeStep === 0 || (activeStep === 1 && id !== undefined));
  }

  const divButtonsNav = (isSubmit = false) => (
    <div>
      <Button onClick={handleBack} disabled={shouldBackButtonBeVisible()}>
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
                  <ResumeBill bills={preBills} type={selectedType} />
                  <div>
                    <Button onClick={handleBack}>Voltar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
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
