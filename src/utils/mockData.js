import { v4 as uuidv4 } from "uuid";

console.log(uuidv4())

export const mockContacts = [
  {
    id: 1,
    name: 'Gel',
    phone: '81 8955-7512'
  },
  {
    id: 2,
    name: 'Ronaldo',
    phone: '+7 (999) 999-99-99'
  },
  {
    id: 3,
    name: 'Márcia',
    phone: '+7 (999) 999-99-99'
  }
]

export const mockSignatures = [
  {
    id: '593700c5-507d-4c61-be46-dff9fc25dc25',
    idContact: 1,
    value: 20,
    start: '2022-10-01',
    active: true,
    description: 'Netflix',
    card: mockCards[0]
  }
];


export const mockBills = [
  {
    ...mockSignatures[0],
    year: 2023,
    month: 1,
    paid: true,
  },
  {
    ...mockSignatures[0],
    year: 2023,
    month: 2,
    paid: false,
  },
  {
    ...mockSignatures[0],
    year: 2023,
    month: 3,
    paid: true,
  },
  {
    ...mockSignatures[0],
    year: 2023,
    month: 4,
    paid: false,
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 1,
    paid: true,
    description: 'Sapato',
    card: mockCards[1],
    installment: 1,
    totalInstallments: 4,
    value: 40,
    idContact: 0,
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 2,
    paid: true,
    description: 'Sapato',
    card: mockCards[1],
    installment: 2,
    totalInstallments: 4,
    value: 40,
    idContact: 0,
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 3,
    paid: true,
    description: 'Sapato',
    card: mockCards[1],
    installment: 3,
    totalInstallments: 4,
    value: 40,
    idContact: 0,
  },
  {
    id: '9ffb340b-09fc-4578-a48e-35c268b91b00',
    year: 2023,
    month: 4,
    paid: true,
    description: 'Sapato',
    card: mockCards[1],
    installment: 4,
    totalInstallments: 4,
    value: 40,
    idContact: 0,
  }

]


export const mockCards = [{
  id: 'd9ea4ead-14f0-4f77-b6a1-e13b7bf2d6fd',
  title: 'Cartão de crédito',
  closingDate: 10,
  dueDate: 1,
  color: '#888',
},
{
  id: '708c4155-c376-44bb-8d41-306344b0a128',
  title: 'Cartão de débito',
  closingDate: 10,
  dueDate: 1,
  color: '#888',
}
]
