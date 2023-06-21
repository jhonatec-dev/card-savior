import { ReactNode, createContext, useState } from "react";
import { mockBills, mockContacts } from '../utils/mockData';

interface BillsContextType {
  bills: [] ;
  filteredBills: [];
  setDate: (date: Date) => void;
  date: Date;
  contacts: [];
  signatures: [];
}


export const BillsContext = createContext<BillsContextType>({} as BillsContextType);

export function BillsProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState(mockBills);
  const [selYear, setSelYear] = useState(new Date().getFullYear());
  const [selMonth, setSelMonth] = useState(new Date().getMonth() + 1);
  const [contacts, setContacts] = useState(mockContacts);
  const [signatures, setSignatures] = useState([]);



  return (
    <BillsContext.Provider value={{
      bills,
      filteredBills,
      setDate,
      date,
      contacts,
      signatures,
    }}>
      {children}
    </BillsContext.Provider>
  )
}