export const SIGNATURE = 'Assinatura';
export const SINGLE_INSTALLMENT = 'Parcela única';
export const MULTIPLE_INSTALLMENTS = 'Parcelado';

export const DESC_BILLS = (type: string) => {
  switch (type) {
    case SINGLE_INSTALLMENT:
      return 'Despesa com apenas uma parcela.';
    case MULTIPLE_INSTALLMENTS:
      return 'Despesa com valor parcelado entre 1 e 360 vezes.';
    case SIGNATURE:
      return 'Despesa cobrada todos os meses enquanto estiver ativa.';
  }
}