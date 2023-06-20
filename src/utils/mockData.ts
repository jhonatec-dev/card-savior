import { colors } from ".";
import { CardType } from "../context";

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
    id: 1,
    idWho: 1,
    value: 20,
    start: '2020-01-01',
    active: true,
    description: 'Netflix',
  }
];

export type MockBillsType = {
  year: {
    [month: number]: {
      id: number;
      idContact: number;
      idSignature: number;
      description: string;
      when: string;
      value: number;
      installment: number;
      totalInstallments: number;
      totalValue: number;
      paid: boolean;
    };
  };
}

export const mockBills = {
  2020: {
    5: [
      {
        id: 1,
        idContact: 1,
        idSignature: 1,
        description: 'Netflix',
        when: '2020-01-01',
        value: 20,
        installment: 1,
        totalInstallments: 1,
        totalValue: 20,
        paid: false,
        idCard: 1,
      }
    ]
  },
  2023: {
    1: [
      {
        id: 1,
        idContact: 1,
        idSignature: 1,
        description: 'Netflix',
        when: '2020-01-01',
        value: 20,
        installment: 1,
        totalInstallments: 1,
        totalValue: 20,
        paid: false,
        idCard: 1,
      },
      {
        id: 2,
        idContact: 0,
        idSignature: 0,
        description: 'Sapato',
        when: '2023-01-01',
        value: 160,
        installment: 1,
        totalInstallments: 2,
        totalValue: 320,
        paid: true,
        idCard: 2,
      }

    ],
    2: [
      {
        id: 1,
        idContact: 2,
        description: 'Viagem',
        when: '2023-02-12',
        value: 100,
        installment: 1,
        totalInstallments: 10,
        totalValue: 1000,
        paid: false,
        idCard: 1,
      },
      {
        id: 2,
        idSignature: 1,
        idContact: 1,
        description: 'Netflix',
        when: '2020-01-01',
        value: 20,
        installment: 1,
        totalInstallments: 1,
        totalValue: 20,
        paid: false,
        idCard: 1,
      },
      {
        id: 3,
        idContact: 0,
        idSignature: 0,
        description: 'Sapato',
        when: '2023-01-01',
        value: 160,
        installment: 2,
        totalInstallments: 2,
        totalValue: 320,
        paid: false,
        idCard: 2,
      },
      {
        id: 4,
        idContact: 0,
        idSignature: 0,
        description: 'Lanche',
        when: '2023-01-01',
        value: 55.60,
        installment: 1,
        totalInstallments: 1,
        totalValue: 55.60,
        paid: false,
        idCard: 1,
      },
      {
        id: 5,
        idContact: 0,
        idSignature: 0,
        description: 'Presente para alguém',
        when: '2023-01-01',
        value: 39.90,
        installment: 1,
        totalInstallments: 1,
        totalValue: 39.90,
        paid: true,
        idCard: 2,
      }
    ],
  }
}


export const mockCard: CardType = {
  id: 0,
  title: 'Cartão de crédito',
  closingDate: 10,
  dueDate: 1,
  color: colors[0],
}
