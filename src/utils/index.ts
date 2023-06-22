import CryptoJS, { AES } from "crypto-js";
import Swal from 'sweetalert2';

export const showError = (message: string) =>
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    customClass: 'glass',
    color: '#f27474',
    confirmButtonColor: '#f27474',
    timer: 3000,
    timerProgressBar: true,
  })

export const showInfo = (message: string, title: string) =>
  Swal.fire({
    icon: 'info',
    title,
    text: message,
    customClass: 'glass',
    color: '#96D6EB',
    confirmButtonColor: '#96D6EB',
    timer: 3000,
    timerProgressBar: true,
  })

export const colors = [
  '#72AEAF',
  '#C0779B',
  '#ACA680',
  '#4a30f2',
  '#705cf2',
  '#3bbf8f',
  '#d96055',
  '#d1a48f',
];

export const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const SECRET_KEY = 'JHONATEC';

export const saveToLS = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}
export const encryption = (password: string) => {
  const hashedPassword = AES.encrypt(password, SECRET_KEY).toString();
  return hashedPassword;
}

export const decryption = (password: string) => {
  const hashedPassword = AES.decrypt(password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return hashedPassword;
}

export const correctPassword = (password: string) => {
  const user = getFromLS('user');
  const hashedPassword = encryption(password);
  if (user) {
    return decryption(hashedPassword) === decryption(user.password);
  }
  return false;
}

export const hasUser = () => {
  const user = getFromLS('user');
  if (user) {
    return true;
  }
  return false;
}