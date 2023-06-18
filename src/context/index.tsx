import { ReactNode, createContext, useState } from "react";
import { colors, decryption, encryption, getFromLS, saveToLS } from "../utils";

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
  user: UserType | null;
  cards: CardType[];
  updateCards: (card: CardType) => void;
  createCard: () => void;
  removeCard: (id: number) => void;
  updateUserData: (user: UserType) => void;
  userLogin: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<ContextType>({} as ContextType);

export function AppProvider({ children }: ProviderProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [user, setUser] = useState<UserType | null>(null)

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
      title: 'Novo Cartão',
      closingDate: 0,
      dueDate: 0,
      color: getNewColor(),
    }])
  }

  const removeCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  }

  const updateUserData = (user: UserType) => {
    setUser(user);
    const userToLS = {...user, password: encryption(user.password)};
    saveToLS('user', userToLS);
    saveToLS('cards', cards);
  }

  const userLogin = () => {
    const userFromLS = getFromLS('user');
    if (userFromLS) {
      setUser({...userFromLS, password: decryption(userFromLS.password)});
    }
    const cards = getFromLS('cards');
    if(cards) {
      setCards(cards);
    }
  }

  return (
    <AppContext.Provider value={{ user, updateUserData, userLogin, cards, updateCards, createCard, removeCard  }}>
      {children}
    </AppContext.Provider>
  );
}