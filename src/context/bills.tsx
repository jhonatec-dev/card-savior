import { ReactNode, createContext, useEffect, useState } from "react";
import { mockBills, mockContacts } from '../utils/mockData';

interface BillsContextType {
  bills: [];
  filteredBills: [];
  setDate: (date: Date) => void;
  date: Date;
  contacts: [];
  signatures: [];
}


export const BillsContext = createContext<BillsContextType>({} as BillsContextType);

export function BillsProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState(mockBills);
  const [filteredBills, setFilteredBills] = useState([]);
  const [date, setDate] = useState(new Date('2023-02-15'));
  const [contacts, setContacts] = useState(mockContacts);
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    setFilteredBills(bills[year][month]);
  }, [date, bills]);

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