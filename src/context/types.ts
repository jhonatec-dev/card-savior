export type CardType = {
  id: string,
  title: string,
  dueDate: number | string,
  closingDate: number | string,
  color: string,
}

export type ContactType = {
  id: string,
  name: string,
  email?: string,
  phone: string,
}

export type UserType = {
  name: string,
  email: string,
  password: string,
  phone: string,
}

export type SignatureType = {
  id: string,
  idContact: string,
  card: CardType,
  value: number,
  startDate: number | string,
  active: boolean,
  description: string,
}

export type BillType = {
  id: string,
  idContact: string,
  card: CardType,
  value: number,
  year: number,
  month: number,
  paid: boolean,
  description: string,
  installment: number,
  totalInstallments: number,
}