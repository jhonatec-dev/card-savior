import { v4 as uuidv4 } from "uuid";
import { colors } from ".";
import { BillType, CardType, ContactType, SignatureType } from "../context/types";

console.log(uuidv4())

export const cardVoid: CardType = {
  id: uuidv4(),
  title: "Cartão de exemplo",
  dueDate: 10,
  closingDate: 1,
  color: "#ccc",
}

export const mockContacts: ContactType[] = [
  {
    id: '0fb1c8b1-6ad0-4eb8-8ec5-a0f1bf25990f',
    name: 'Michael Scott',
  },
  {
    id: 'cea323e7-46d2-4d78-b1fe-92144a9debc5',
    name: 'Ronaldo',
  },
  {
    id: '14db3125-21b9-4feb-aab1-85eb8c8cd1f4',
    name: 'Márcia',
  }
]
export const mockCards: CardType[] = [
  {
    id: 'd9ea4ead-14f0-4f77-b6a1-e13b7bf2d6fd',
    title: 'PicPay',
    closingDate: 1,
    dueDate: 10,
    color: colors[5],
  },
  {
    id: '708c4155-c376-44bb-8d41-306344b0a128',
    title: 'Mercado Pago',
    closingDate: 18,
    dueDate: 25,
    color: colors[3],
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
