import { Add, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Button, Divider, FilledInput, IconButton } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCreditCard from "../components/EditCreditCard";
import FloatButton from "../components/FloatButton";
import { AppContext } from "../context/index";

export default function EditProfile() {
  // Navigate
  const navigate = useNavigate();
  // Context
  const {cards, createCard} = useContext(AppContext);
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // useReff
  const bottomCardRef = useRef<HTMLButtonElement>(null);
  const handleSave = () => {
    console.log('save');
  }
  // useEffect
  useEffect(()=>{
    if(cards.length > 1)
    bottomCardRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [cards]);

  const handleAddCard = () => {
    createCard();
  }

  const shouldBeDisabled = () => {
    if(cards.length === 0)
      return false
    else
    {
      return cards.some((card) => card.id === -1);
    }
  }

  return (
    <div className="Wrapper">
      <div className="UserProfile">
        <Avatar sx={{ width: 100, height: 100 }} />
        <FilledInput
        placeholder="Username"
        fullWidth value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <FilledInput
          placeholder="Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          // maxLength={20}
          onChange={({ target }) => setPassword(target.value)}
          endAdornment={
            <IconButton onClick={() => setShowPassword(!showPassword)} color="primary">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }/>
      </div>
      <Divider>Cartões</Divider>
      <div className="Cards">
        {cards.map((card) => (
          <EditCreditCard key={card.id} id={card.id}/>
        ))}
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddCard}
          ref={bottomCardRef}
          disabled={shouldBeDisabled()}
        >
          Adicionar Cartão
        </Button>
      </div>
      <FloatButton handleClick={handleSave} icon={<Save />} text="Save"/>
    </div>
  )
}
