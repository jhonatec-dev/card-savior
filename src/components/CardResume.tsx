import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext, CardType } from '../context';
import { BillsContext } from '../context/bills';
import { mockCard } from '../utils/mockData';

export default function CardResume() {
  // Context
  const {filteredBills} = useContext(BillsContext);
  const {cards} = useContext(AppContext);

  //State
  const [selectedCard, setSelectedCard] = useState<CardType>(mockCard as CardType);
  const [selectIndex, setSelectIndex] = useState(-1);

  // Effects
  useEffect(() => {
    if(cards.length > 0){
      setSelectedCard(cards[0]);
      setSelectIndex(0);
    }
  }, []);

  const calculateTotal = () => {
    if(!filteredBills) return 0;
    const billsForSelectedCard = filteredBills.filter((bill) => bill.idCard === selectedCard.id);
    const total = billsForSelectedCard.reduce((acc, bill) => acc + +bill.value, 0);
    return total.toFixed(2);
  }


  const styleCard = {
    background: `linear-gradient(-90deg, #393939 2%, ${selectedCard.color} 90%)`,
    filter: 'drop-shadow(0px 4px 4px white)',
  }

  const nextCard = () => {
    if(cards.length < 1) return;
    const nextIndex = cards.length - 1 === selectIndex ? 0 : selectIndex + 1;
    setSelectedCard(cards[nextIndex]);
    setSelectIndex(nextIndex);
  }

  const prevCard = () => {
    if(cards.length < 1) return;
    const prevIndex = selectIndex === 0 ? cards.length - 1 : selectIndex - 1;
    setSelectedCard(cards[prevIndex]);
    setSelectIndex(prevIndex);
  }

  return (
    <div className='EditCreditCard' style={styleCard}>
      <div className='CardResume'>
        <IconButton onClick={prevCard}>
          <ArrowBackIos/>
        </IconButton>
        <div >
          <h4>{selectedCard.title}</h4>
          <h2>R$ {calculateTotal()}</h2>
        </div>
        <IconButton onClick={nextCard}>
          <ArrowForwardIos/>
        </IconButton>

      </div>
    </div>
  )
}
