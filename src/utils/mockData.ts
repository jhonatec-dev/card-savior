import { v4 as uuidv4 } from "uuid";
import { colors } from ".";
import { BillType, CardType, ContactType, SignatureType } from "../context/types";

console.log(uuidv4())

export const cardVoid: CardType = {
  id: uuidv4(),
  title: "Cartão de exemplo",
  dueDate: 1,
  closingDate: 10,
  color: "#ccc",
}

export const mockContacts: ContactType[] = [
  {
    id: '0fb1c8b1-6ad0-4eb8-8ec5-a0f1bf25990f',
    name: 'Gel',
    phone: '81 8955-7512'
  },
  {
    id: 'cea323e7-46d2-4d78-b1fe-92144a9debc5',
    name: 'Ronaldo',
    phone: '+7 (999) 999-99-99'
  },
  {
    id: '14db3125-21b9-4feb-aab1-85eb8c8cd1f4',
    name: 'Márcia',
    phone: '+7 (999) 999-99-99'
  }
]
export const mockCards: CardType[] = [
  {
    id: 'd9ea4ead-14f0-4f77-b6a1-e13b7bf2d6fd',
    title: 'Cartão de crédito',
    closingDate: 10,
    dueDate: 1,
    color: colors[2],
  },
  {
    id: '708c4155-c376-44bb-8d41-306344b0a128',
    title: 'Cartão de débito',
    closingDate: 10,
    dueDate: 1,
    color: colors[1],
  }
];

export const mockSignatures: SignatureType[] = [
  {
    id: '593700c5-507d-4c61-be46-dff9fc25dc25',
    idContact: '0fb1c8b1-6ad0-4eb8-8ec5-a0f1bf25990f',
    value: 20,
    startDate: '2022-10-01',
    active: true,
    description: 'Netflix',
    card: mockCards[0]
  }
];

export const mockBills: BillType[] = [
  {
    ...mockSignatures[0],
    year: 2023,
    month: 0,
    paid: true,
    installment: 1,
    totalInstallments: 1,
  },
  {
    ...mockSignatures[0],
    year: 2023,
    month: 1,
    paid: true,
    installment: 1,
    totalInstallments: 1,
  },
  {
    ...mockSignatures[0],
    year: 2023,
    month: 2,
    paid: false,
    installment: 1,
    totalInstallments: 1,
  },
  {
    ...mockSignatures[0],
    year: 2023,
    month: 3,
    paid: true,
    installment: 1,
    totalInstallments: 1,
  },
  {
    ...mockSignatures[0],
    year: 2023,
    month: 4,
    paid: false,
    installment: 1,
    totalInstallments: 1,
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 0,
    paid: true,
    description: 'Sapato',
    card: mockCards[1],
    installment: 1,
    totalInstallments: 4,
    value: 40,
    idContact: '',
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 1,
    paid: true,
    description: 'Sapato',
    card: mockCards[1],
    installment: 2,
    totalInstallments: 4,
    value: 40,
    idContact: '',
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 2,
    paid: true,
    description: 'Sapato',
    card: mockCards[1],
    installment: 3,
    totalInstallments: 4,
    value: 40,
    idContact: '',
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 3,
    paid: false,
    description: 'Sapato',
    card: mockCards[1],
    installment: 4,
    totalInstallments: 4,
    value: 40,
    idContact: '',
  }

]
