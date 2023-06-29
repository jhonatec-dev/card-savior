import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context';
import { CardType } from '../../../context/types';
import { cardVoid } from '../../../utils/mockData';

export default function CardResume() {
  // Context
  const { cards, bills, selYear, selMonth } = useContext(AppContext);

  //State
  const [selectedCard, setSelectedCard] = useState<CardType>(cardVoid);
  const [selectIndex, setSelectIndex] = useState(-1);

  // Effects
  useEffect(() => {
    if (cards.length > 0) {
      setSelectedCard(cards[0]);
      setSelectIndex(0);
    }
  }, []);

  const calculateTotal = () => {
    if (!bills) return 0;
    const filteredBills = bills.filter(
      (bill) => bill.year === selYear && bill.month === selMonth);
    // console.log(selYear, selMonth, filteredBills);
    if (!filteredBills) return 0;

    const billsForSelectedCard = filteredBills.filter((bill) => bill.idCard === selectedCard.id);
    const total = billsForSelectedCard.reduce((acc, bill) => acc + +bill.value, 0);
    return total.toFixed(2);
  }


  const styleCard = {
    background: `linear-gradient(131deg,${selectedCard.color} 0%, #252525 100%)`
  }

  const nextCard = () => {
    if (cards.length < 1) return;
    const nextIndex = cards.length - 1 === selectIndex ? 0 : selectIndex + 1;
    setSelectedCard(cards[nextIndex]);
    setSelectIndex(nextIndex);
  }

  const prevCard = () => {
    if (cards.length < 1) return;
    const prevIndex = selectIndex === 0 ? cards.length - 1 : selectIndex - 1;
    setSelectedCard(cards[prevIndex]);
    setSelectIndex(prevIndex);
  }

  return (
    <div className='EditCreditCard' style={styleCard}>
      <div className='CardResume'>
        <IconButton onClick={prevCard}>
          <ArrowBackIos />
        </IconButton>
        <div >
          <h4>{selectedCard.title}</h4>
          <h2>R$ {calculateTotal()}</h2>
        </div>
        <IconButton onClick={nextCard}>
          <ArrowForwardIos />
        </IconButton>

      </div>
    </div>
  )
}
