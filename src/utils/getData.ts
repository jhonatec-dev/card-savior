/*
user : {name, email, telefone, senha}
cards: [{id, title, closingDate, limit, dueDate }, {...}]
bills: {
  2023 : {
    1 : [
      {id, isPaid ,who, what, when, value, status, idCard, details?:{ isSignature, currInstallment, countInstallments, firstInstallment}
    ]
  }
}
*/

import { showError } from ".";

const getFromLS = (key: string) =>{
  const item = localStorage.getItem(key);
  if(item){
    return JSON.parse(item);
  }

  return null;
}

const saveToLS = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));


export const getUser = () => {
  try {
    const user = getFromLS("user");
    return user;
  } catch (error: any) {
    showError(error.message);
  }
};

export const getCards = () => {
  try {
    const cards = getFromLS("cards");
    return cards;
  } catch (error: any) {
    showError(error.message);
  }
}