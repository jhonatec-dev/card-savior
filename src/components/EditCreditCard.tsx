import { Clear } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { AppContext, CardType } from '../context';
import ColorPicker from './ColorPicker';

interface EditCreditCardProps {
  id: number;
}

export default function EditCreditCard(props: EditCreditCardProps) {
  const { id } = props;

  // Context
  const { cards, updateCards, removeCard } = useContext(AppContext);
  const initialCard = cards.find((card: CardType) => card.id === id);
  //state
  const [editCard, setEditCard] = useState<CardType>(initialCard as CardType);

  useEffect(() => {
    if (editCard && editCard !== initialCard) {
      const cardNameValid = editCard?.title.length > 3;
      const cardDueDateValid = editCard?.dueDate !== 0;
      const cardClosingDateValid = editCard?.closingDate !== 0;
      if (cardNameValid && cardDueDateValid && cardClosingDateValid) {
        console.log('edit', editCard);
        updateCards(editCard);
      }
    }
  }, [editCard, initialCard, updateCards]);

  const handleChange = (name: string, value: any) => {
    setEditCard({
      ...editCard,
      [name]: value,
    } as CardType);
  }

  const handleDueDate = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEditCard({
        ...editCard,
        dueDate: date.date(),
      } as CardType);
    }

  }

  const handleClosingDate = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEditCard({
        ...editCard,
        closingDate: date.date(),
      } as CardType);
    }
  }

  const handleColorChange = (color: string) => {
    setEditCard({
      ...editCard,
      color,
    } as CardType);
  }

  const getDate = (day: number) => {
    if (day === 0) return null;
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const testando = dayjs(`${year}-${month}-${day}`);
    return testando;
  }

  const styleCard = {
    background: `linear-gradient(-90deg, #393939 2%, ${editCard.color} 90%)`,
    filter: 'drop-shadow(0px 4px 4px white)',
  }

  return (
    <div className='EditCreditCard' style={styleCard}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ColorPicker selectedColor={editCard.color} handleColorChange={handleColorChange} />
        <IconButton
          sx={{ position: 'absolute', right: 0, top: 0 }}
          color='primary'
          onClick={() => removeCard(id)}
        >
          <Clear />
        </IconButton>
        <TextField
          label='Nome do cartão'
          fullWidth
          value={editCard.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <DesktopDatePicker
          sx={{ width: '45%' }}
          className='DatePicker'
          label='Fechamento'
          views={['day']}
          value={getDate(editCard.closingDate)}
          onChange={handleClosingDate}
        />
        <DesktopDatePicker
          sx={{ width: '45%' }}
          className='DatePicker'
          label='Vencimento'
          views={['day']}
          value={getDate(editCard.dueDate)}
          onChange={handleDueDate}
        />
        
      </LocalizationProvider>
    </div>
  )
}
