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
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import {
  BillType,
  CardType,
  ContactType,
  SignatureType,
} from "../../context/types";
import {
  MultipleInstallments,
  ResumeBill,
  Signature,
  SingleInstallment,
} from "./components";
import {
  MULTIPLE_INSTALLMENTS,
  SIGNATURE,
  SINGLE_INSTALLMENT,
} from "./constants/billTypes";

type FormValues = {
  id: string;
  installment: number;
  totalInstallments: number;
  value: number;
  selCard?: CardType;
  selContact?: ContactType | null;
  dueDate: string[];
  paid: boolean[];
  description: string;
  active?: boolean;
  totalMonths?: number;
};

const defaultValuesForm: FormValues = {
  id: uuidv4(),
  installment: 1,
  totalInstallments: 1,
  value: 0,
  dueDate: [dayjs().format("YYYY-MM-DD")],
  active: true,
  totalMonths: 1,
  description: "",
  paid: [false],
};

type IProps = {
  idToEdit?: string;
  handleClose?: () => void;
};

export default function EditBill({ idToEdit, handleClose }: IProps) {
  const navigate = useNavigate();
  const { idParam } = useParams();
  const id = idParam ?? idToEdit;
  const { enqueueSnackbar } = useSnackbar();
  const {
    addBills,
    contacts,
    cards,
    addContact,
    bills,
    signatures,
    addSignature,
  } = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState(SINGLE_INSTALLMENT);
  const [preBills, setPreBills] = useState<BillType[]>([]);
  const [preSignature, setPreSignature] = useState<SignatureType>();
  const methods = useForm<FormValues>({
    defaultValues: defaultValuesForm,
  });

  useEffect(() => {
    const getSignature = (id: string) => {
      return signatures.find((s) => s.id === id);
    };

    if (id) {
      const newBills = bills.filter((bill) => bill.id === id);
      console.log(newBills);
      setPreBills(newBills);
      const firstBill = newBills[0];
      const signature = getSignature(firstBill.id);
      const { setValue } = methods;
      setValue("id", firstBill.id);
      setValue("description", firstBill.description);
      setValue("value", firstBill.value * firstBill.totalInstallments);
      if (firstBill.idContact) {
        setValue(
          "selContact",
          contacts.find((c) => c.id === firstBill.idContact) as ContactType
        );
      }
      const billCard = cards.find(
        (card) => card.id === firstBill.idCard
      ) as CardType;
      setValue("selCard", billCard);
      setValue("totalInstallments", firstBill.totalInstallments);

      for (let i = 0; i < newBills.length; i++) {
        setValue(
          `dueDate.${i}`,
          dayjs(
            `${newBills[i].year}-${newBills[i].month + 1}-${billCard.dueDate}`
          ).format("YYYY-MM-DD")
        );
        setValue(`paid.${i}`, newBills[i].paid);
      }

      if (firstBill.totalInstallments > 1) {
        setSelectedType(MULTIPLE_INSTALLMENTS);
      } else if (signature) {
        setSelectedType(SIGNATURE);
        setValue("active", signature.active);
        setValue("totalMonths", newBills.length);
      } else {
        setSelectedType(SINGLE_INSTALLMENT);
      }
      setActiveStep(1);
    }
  }, [id]);

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
        paid: (data.paid && data.paid[i]) || false,
        idContact: data.selContact?.id || "",
        description: data.description,
        idCard: data.selCard.id,
      };
      // console.log(installment);
      newBills.push(installment);
    }
    setPreBills(newBills);
  };

  const setSignature = (data: any) => {
    console.log(data);
    const signature: SignatureType = {
      id: data.id,
      idContact: data.selContact?.id || "",
      value: +data.value,
      idCard: data.selCard.id,
      description: data.description,
      active: data.active,
      startDate: data.dueDate[0],
    };
    setPreSignature(signature);
    const newBills: BillType[] = [];
    for (let i = 0; i < data.totalMonths; i += 1) {
      const year = dayjs(data.dueDate[i]).year();
      const month = dayjs(data.dueDate[i]).month();

      const installment = {
        ...signature,
        year,
        month,
        installment: 1,
        totalInstallments: 1,
        paid: (data.paid && data.paid[i]) || false,
      };
      newBills.push(installment);
    }
    setPreBills(newBills);
  };

  const onSubmit = (data: any) => {
    if (selectedType === SIGNATURE) {
      setSignature(data);
    } else {
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
    if (activeStep === 1) {
      methods.reset();
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    addBills(preBills);
    //enviar a signtature para o context
    if (selectedType === SIGNATURE) {
      addSignature(preSignature as SignatureType);
    }
    const { getValues } = methods;
    const selContact = getValues("selContact");
    // console.log(selContact);
    if (selContact && !contacts.find((c) => c.id === selContact.id)) {
      addContact({
        id: selContact.id,
        name: selContact.name,
      });
    }

    enqueueSnackbar("Despesa salva com sucesso!", { variant: "success" });

    if (idParam) {
      navigate("/home");
    } else if(handleClose){
      handleClose();
    }
  };

  const shouldBackButtonBeVisible = () => {
    return (
      activeStep === 0 || (activeStep === 1 && id !== undefined && id !== "")
    );
  };

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
          <Header title="Editar despesa" />
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
                  {selectedType === SIGNATURE && <Signature />}
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
