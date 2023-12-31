import dayjs from "dayjs";
import { ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { colors, decryption, encryption, getFromLS, saveToLS } from "../utils";
import {
  BillType,
  CardType,
  ContactType,
  SignatureType,
  UserType,
} from "./types";

interface ContextType {
  user: UserType | null;
  cards: CardType[];
  bills: BillType[];
  selYear: number;
  selMonth: number;
  contacts: ContactType[];
  signatures: SignatureType[];
  changeMonth: (month: number) => void;
  updateCards: (card: CardType) => void;
  createCard: () => void;
  removeCard: (id: string) => void;
  updateUserData: (user: UserType) => void;
  userLogin: () => void;
  changePaidBill: (bill: BillType) => void;
  addBills: (newBills: BillType[]) => void;
  addContact: (newContact: ContactType) => void;
  addSignature: (newSignature: SignatureType) => void;
  removeBill: (id: string) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<ContextType>({} as ContextType);

export function AppProvider({ children }: ProviderProps) {
  const [cards, setCards] = useState<CardType[]>([] as CardType[]);
  const [user, setUser] = useState<UserType | null>(null);
  const [selYear, setSelYear] = useState<number>(new Date().getFullYear());
  const [selMonth, setSelMonth] = useState<number>(new Date().getMonth());
  const [bills, setBills] = useState<BillType[]>([] as BillType[]);
  const [contacts, setContacts] = useState<ContactType[]>([] as ContactType[]);
  const [signatures, setSignatures] = useState<SignatureType[]>(
    [] as SignatureType[]
  );

  useEffect(() => {
    //gravar no LS os dados novos
    if (user) {
      saveToLS("bills", bills);
      saveToLS("contacts", contacts);
      saveToLS("signatures", signatures);
      saveToLS("cards", cards);
    }
  }, [bills, contacts, signatures, cards]);

  useEffect(() => {
    if (signatures) {
      signatures.forEach((s) => {
        const { startDate, active, id } = s;
        const selDate = dayjs(`${selYear}-${selMonth + 1}-01`);
        if (active && selDate.isAfter(dayjs(startDate))) {
          //tenta recuperar uma bill com essa data e id
          const bill = bills.find(
            (b) => b.id === id && b.year === selYear && b.month === selMonth
          );
          if (!bill) {
            let newBill: BillType;
            if (selDate.isAfter(dayjs().add(1, "month"))) {
              newBill = {
                ...s,
                description: `[DEMO] - ${s.description}`,
                year: selYear,
                month: selMonth,
                paid: false,
                installment: 1,
                totalInstallments: 1,
              };
            } else {
              newBill = {
                ...s,
                year: selYear,
                month: selMonth,
                paid: false,
                installment: 1,
                totalInstallments: 1,
              };
            }

            setBills([...bills, newBill]);
          }
        }
      });
    }
  }, [selMonth, selYear]);

  const updateCards = (card: CardType) => {
    setCards(cards.map((c) => (c.id === card.id ? card : c)));
  };

  const getNewColor = () => {
    if (cards.length === 0) {
      return colors[0];
    }
    return (
      colors.find((c) => !cards.some((card) => card.color === c)) || colors[0]
    );
  };

  const createCard = () => {
    const newCards = [
      ...cards,
      {
        id: uuidv4(),
        title: `Cartão ${cards.length + 1}`,
        closingDate: 1,
        dueDate: 10,
        color: getNewColor(),
      },
    ];

    setCards(newCards);

    // console.log('createCard, context', newCards);
  };

  const removeCard = (id: string) => {
    setSignatures(signatures.filter((s) => s.idCard !== id));
    setBills(bills.filter((b) => b.idCard !== id));
    setCards(cards.filter((card) => card.id !== id));
  };

  const removeBill = (id: string) => {
    setBills(bills.filter((b) => b.id !== id));
    setSignatures(signatures.filter((s) => s.id !== id));
  }

  const updateUserData = (user: UserType) => {
    setUser(user);
    const userToLS = { ...user, password: encryption(user.password) };
    saveToLS("user", userToLS);
  };

  const userLogin = () => {
    const userFromLS = getFromLS("user");
    if (userFromLS) {
      setUser({ ...userFromLS, password: decryption(userFromLS.password) });
    }
    // Descomentar após mock
    const cardsLS = getFromLS("cards");
    if (cardsLS) {
      setCards(cardsLS);
    }
    const billsLS = getFromLS("bills");
    if (billsLS) {
      setBills(billsLS);
    }
    const signaturesLS = getFromLS("signatures");
    if (signaturesLS) {
      setSignatures(signaturesLS);
    }
    const contactsLS = getFromLS("contacts");
    if (contactsLS) {
      setContacts(contactsLS);
    }
  };

  const addSignature = (signature: SignatureType) => {
    if (signatures.length === 0) {
      setSignatures([signature]);
      return;
    }
    // console.log("addSignature", signature);
    const newSignatures = signatures.filter((s) => s.id !== signature.id);
    setSignatures([...newSignatures, signature]);
  };

  const changeMonth = (month: number) => {
    if (month === -2) {
      const nowYear = dayjs().year();
      const nowMonth = dayjs().month();
      setSelYear(nowYear);
      setSelMonth(nowMonth);
    } else if (month === -1) {
      if (selMonth === 0) {
        setSelMonth(11);
        setSelYear(selYear - 1);
      } else {
        setSelMonth(selMonth - 1);
      }
    } else {
      if (selMonth === 11) {
        setSelMonth(0);
        setSelYear(selYear + 1);
      } else {
        setSelMonth(selMonth + 1);
      }
    }
  };

  const changePaidBill = (bill: BillType) => {
    const newBills = bills.map((b) => {
      if (b.id === bill.id && b.year === bill.year && b.month === bill.month) {
        return { ...b, paid: !b.paid };
      }
      return b;
    });
    setBills(newBills);
  };

  const addContact = (newContact: ContactType) => {
    setContacts([...contacts, newContact]);
  };

  // Bills Area ************************************
  const addBills = (newBills: BillType[]) => {
    //remover bills antigas
    const oldBills = bills.filter((b) => b.id !== newBills[0].id);
    setBills([...oldBills, ...newBills]);
  };

  const values = {
    user,
    cards,
    bills,
    selYear,
    selMonth,
    signatures,
    contacts,
    updateCards,
    createCard,
    removeCard,
    updateUserData,
    userLogin,
    changeMonth,
    changePaidBill,
    addBills,
    addContact,
    addSignature,
    removeBill,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
