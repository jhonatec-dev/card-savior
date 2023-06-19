import { FilterAlt, FilterAltOff } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import { BillsContext } from '../context/bills';

export default function Overdue() {
  // Context
  const { bills } = useContext(BillsContext);
  const { cards } = useContext(AppContext);

  //State
  const [showOverdue, setShowOverdue] = useState(false);
  const [total, setTotal] = useState('0,00');

  // Effects
  useEffect(() => {

      calculateTotal();
    
  }, [])

  const calculateTotal = () => {
    const now = new Date(Date.now());
    const yearNow = now.getFullYear();
    const monthNow = now.getMonth() + 1;
    if (!bills) return 0;
    //{year: {1: [{isPaid}, {}], 2: []}}
    let total = 0;
    Object.keys(bills).forEach((year) => {
      console.log(year, yearNow);
      if (+year < yearNow) {
        Object.keys(bills[year]).forEach((month) => {
          const monthBills = bills[year][month];
          console.log(monthBills);
          monthBills.forEach((bill) => {
            if (!bill.paid) {
              total += bill.value;
            }
          });
        }); // monthBills
      } else if(+year === yearNow) {
        Object.keys(bills[year]).forEach((month) => {
          if(+month < monthNow) {
            const monthBills = bills[year][month];
            monthBills.forEach((bill) => {
              if (!bill.paid) {
                total += bill.value;
              }
            });
          }
          
        }); // monthBills

      }

    }); // yearBills

    setTotal(total.toFixed(2));
  }


  const styleCard = {
    background: `linear-gradient(-90deg, #393939 2%, #893939 90%)`,
    filter: 'drop-shadow(0px 4px 4px white)',
  }

  const handleShowOverdue = () => {
    setShowOverdue(!showOverdue);
  }

  return (
    <div className='EditCreditCard' style={styleCard}>

      <div>
        <h4>Atrasados</h4>
        <h2>R$ {total}</h2>
      </div>

      <Button startIcon={showOverdue ? <FilterAlt /> : <FilterAltOff />}
        onClick={handleShowOverdue}>{showOverdue ? 'Mostrar somente atrasados' : 'Mostrar todos'}</Button>

    </div>
  )
}
