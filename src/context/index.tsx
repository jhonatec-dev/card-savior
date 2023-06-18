import { ReactNode, createContext, useState } from "react";
import { colors } from "../utils/helpers";

export interface CardType {
  id: number;
  title: string;
  closingDate: number;
  dueDate: number;
  color: string;
}

interface UserType {
  username: string;
  password: string;
  email: string;
  telefone: string;
}

interface ContextType {
  user: UserType;
  cards: CardType[];
  updateCards: (card: CardType) => void;
  createCard: () => void;
  removeCard: (id: number) => void;
  setUser: (user: UserType) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<ContextType>({} as ContextType);

export function AppProvider({ children }: ProviderProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [user, setUser] = useState<UserType>({
    username: '',
    password: '',
    email: '',
    telefone: '',
  })

  const updateCards = (card: CardType) => {
    let newCards;
    if (card.id === -1) {
      const newId = cards.length > 1 ? Math.max(...new Set(cards.map(({ id }) => id))) + 1 : 1;
      newCards = cards.map((c) => {
        if (c.id === card.id) {
          return { ...card, id: newId };
        }
        return c;
      });
    } else {
      newCards = cards.map((c) => (c.id === card.id ? card : c));
    }
    setCards(newCards);
  }

  const getNewColor = () => {
    if(cards.length === 0) {
      return colors[0];
    }
    return colors.find((c) => !cards.some((card) => card.color === c)) || colors[0];
    
  }

  const createCard = () => {
    setCards([...cards, {
      id: -1,
      title: '',
      closingDate: 0,
      dueDate: 0,
      color: getNewColor(),
    }])
  }

  const removeCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  }

  return (
    <AppContext.Provider value={{ user,setUser, cards, updateCards, createCard, removeCard  }}>
      {children}
    </AppContext.Provider>
  );
}