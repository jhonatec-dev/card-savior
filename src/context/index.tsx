import { ReactNode, createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { colors, decryption, encryption, getFromLS, saveToLS } from "../utils";
import { mockBills, mockCards, mockContacts } from "../utils/mockData";
import { BillType, CardType, ContactType, UserType } from "./types";

interface ContextType {
  user: UserType | null;
  cards: CardType[];
  bills: BillType[];
  selYear: number;
  selMonth: number;
  contacts: ContactType[];
  changeMonth: (month: number) => void;
  updateCards: (card: CardType) => void;
  createCard: () => void;
  removeCard: (id: string) => void;
  updateUserData: (user: UserType) => void;
  userLogin: () => void;
  changePaidBill: (bill: BillType) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<ContextType>({} as ContextType);

export function AppProvider({ children }: ProviderProps) {
  const [cards, setCards] = useState<CardType[]>(mockCards);
  const [user, setUser] = useState<UserType | null>(null);
  const [selYear, setSelYear] = useState<number>(new Date().getFullYear());
  const [selMonth, setSelMonth] = useState<number>(0);
  const [bills, setBills] = useState<BillType[]>(mockBills);
  const [contacts] = useState<ContactType[]>(mockContacts);

  const updateCards = (card: CardType) => {
    setCards(cards.map((c) => c.id === card.id ? card : c));
  }

  const getNewColor = () => {
    if (cards.length === 0) {
      return colors[0];
    }
    return colors.find((c) => !cards.some((card) => card.color === c)) || colors[0];
  }

  const createCard = () => {
    setCards([...cards, {
      id: uuidv4(),
      title: '',
      closingDate: 1,
      dueDate: 10,
      color: getNewColor(),
    }])
  }

  const removeCard = (id: string) => {
    return console.warn('desabilitado por enquanto');
    setCards(cards.filter((card) => card.id !== id));
  }

  const updateUserData = (user: UserType) => {
    setUser(user);
    const userToLS = { ...user, password: encryption(user.password) };
    saveToLS('user', userToLS);
    saveToLS('cards', cards);
  }

  const userLogin = () => {
    const userFromLS = getFromLS('user');
    if (userFromLS) {
      setUser({ ...userFromLS, password: decryption(userFromLS.password) });
    }
    // Descomentar após mock
    // const cards = getFromLS('cards');
    // if (cards) {
    //   setCards(cards);
    // }
  }

  const changeMonth = (month: number) => {
    if(month === -1){
      if(selMonth === 0){
        setSelMonth(11);
        setSelYear(selYear - 1);
      } else{
        setSelMonth(selMonth - 1);
      }
    } else{
      if(selMonth === 11){
        setSelMonth(0);
        setSelYear(selYear + 1);
      } else{
        setSelMonth(selMonth + 1);
      }
    }
  }

  const changePaidBill = (bill: BillType) => {
    const newBills = bills.map((b) => {
      if (b.id === bill.id && b.year === bill.year && b.month === bill.month) {
        return { ...b, paid: !b.paid };
      }
      return b;
    });
    setBills(newBills);
  }

  const values = { //useMemo(() => ({
    user,
    cards,
    bills,
    selYear,
    selMonth,
    contacts,
    updateCards,
    createCard,
    removeCard,
    updateUserData,
    userLogin,
    changeMonth,
    changePaidBill
  };
  // }), [user, cards, updateCards, createCard, removeCard, updateUserData]);

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
}