import { DeleteForever } from "@mui/icons-material";
import { Button, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { v4 as uuidv4 } from "uuid";
import FloatButton from "../../components/FloatButton";
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
  SelectTypeBill,
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
    selMonth,
    selYear,
    removeBill,
  } = useContext(AppContext);
  const defaultValuesForm: FormValues = {
    id: uuidv4(),
    installment: 1,
    totalInstallments: 1,
    value: 0,
    dueDate: [dayjs(`${selYear}-${selMonth + 1}-01`).format("YYYY-MM-DD")],
    active: true,
    totalMonths: 1,
    description: "",
    paid: [false],
    selContact: null,
  };
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState(SINGLE_INSTALLMENT);
  const [preBills, setPreBills] = useState<BillType[]>([]);
  const [preSignature, setPreSignature] = useState<SignatureType>();
  const methods = useForm<FormValues>({
    defaultValues: defaultValuesForm,
  });

  const handleNoCardsFound = () => {
    Swal.fire({
      icon: "info",
      title: "Nenhum cartão cadastrado",
      text: "Você não possui nenhum cartão cadastrado. Estamos redirecionando para o cadastro de cartões.",
      // customClass: "glass",
      background: "#242424",
      color: "#86c6EB",
      confirmButtonColor: "#76b6cB",
      confirmButtonText: "Ok",
      timer: 5500,
      timerProgressBar: true,
    });
    navigate("/editProfile");
  };

  useEffect(() => {
    //verificar cartões
    if (cards.length === 0) {
      handleNoCardsFound();
    }

    if (id) {
      const getSignature = (id: string) => {
        return signatures.find((s) => s.id === id);
      };
      const newBills = bills.filter((bill) => bill.id === id);
      // console.log(newBills);
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
    // console.log(data);
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
    console.log(data);
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
    const { getValues } = methods;
    const selContact = getValues("selContact");
    // console.log(selContact);
    if (selContact && selContact.id === "") {
      const newIdContact = uuidv4();
      addContact({
        id: newIdContact,
        name: selContact.name,
      });
      addBills(preBills.map((b) => ({ ...b, idContact: newIdContact })));
      if (selectedType === SIGNATURE) {
        addSignature({...preSignature, idContact: newIdContact} as SignatureType);
      }
    } else {
      addBills(preBills);
      //enviar a signtature para o context
      if (selectedType === SIGNATURE) {
        addSignature(preSignature as SignatureType);
      }
    }

    enqueueSnackbar("Despesa salva com sucesso!", { variant: "success" });

    if (idParam) {
      navigate("/home");
    } else if (handleClose) {
      handleClose();
    }
  };

  const shouldBackButtonBeVisible = () => {
    return (
      activeStep === 0 || (activeStep === 1 && id !== undefined && id !== "")
    );
  };

  const handleRemoveBill = async () => {
    const response = await Swal.fire({
      icon: "question",
      title: "Tem certeza que deseja remover essa despesa?",
      text: "Todas os lançamentos mensais vinculados serão apagados",
      // customClass: "glass",
      background: "#242424",
      color: "#86c6EB",
      confirmButtonColor: "#76b6cB",
      confirmButtonText: "Não",
      denyButtonText: "Sim",
      denyButtonColor: "#df5240",
      showDenyButton: true,
      // showCancelButton: true,
      timer: 5500,
      timerProgressBar: true,
    });

    if (response.isDenied && id) {
      removeBill(id);
      if (handleClose) {
        handleClose();
      } else {
        navigate("/home");
      }
      enqueueSnackbar("Despesa removida com sucesso!", { variant: "success" });
    }
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
          <Header
            title="Editar despesa"
            showGoBack
            handleClick={handleClose ?? handleBack}
          />
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Tipo de Despesa</StepLabel>
              <StepContent sx={{ gap: "60px" }}>
                <div className="StepContent">
                  <SelectTypeBill
                    setSelectedType={setSelectedType}
                    selectedType={selectedType}
                  />
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
        {id && (
          <FloatButton
            handleClick={handleRemoveBill}
            icon={<DeleteForever />}
            text="Remover"
          />
        )}
      </FormProvider>
    </LocalizationProvider>
  );
}
