import { Add, Backspace, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Button, Divider, IconButton, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import EditCreditCard from "../components/EditCreditCard";
import FloatButton from "../components/FloatButton";
import { AppContext } from "../context/index";

export default function EditProfile() {
  // Navigate
  const navigate = useNavigate();
  // Context
  const { cards, createCard } = useContext(AppContext);
  // States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // useReff
  const bottomCardRef = useRef<HTMLButtonElement>(null);
  const handleSave = () => {
    console.log('save');
  }
  // useEffect
  useEffect(() => {
    if (cards.length > 0)
      bottomCardRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cards]);

  const handleAddCard = () => {
    createCard();
  }

  const shouldBeDisabled = () => {
    if (cards.length === 0)
      return false
    else {
      return cards.some((card) => card.id === -1);
    }
  }

  return (
    <div className="Wrapper">
      <div className="UserProfile">
        <Avatar sx={{ width: 100, height: 100 }}></Avatar>
        <TextField
          label="Nome"
          placeholder="Nome"
          required
          fullWidth value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={username.length < 3}
          helperText={username.length < 4 ? 'Nome muito curto' : ''}
          InputProps={{
            endAdornment:
              <IconButton onClick={() => setUsername('')} color="primary">
                <Backspace />
              </IconButton>
          }}
        />
        <TextField
          placeholder="Email"
          label="Email"
          fullWidth
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!validator.isEmail(email)}
          helperText={!validator.isEmail(email) ? 'Email inválido' : ''}
          InputProps={{
            endAdornment:
              <IconButton onClick={() => setEmail('')} color="primary">
                <Backspace />
              </IconButton>
          }}
        />
        <TextField
          placeholder="Telefone"
          label="Telefone"
          fullWidth
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          InputProps={{
            endAdornment:
              <IconButton onClick={() => setTelefone('')} color="primary">
                <Backspace />
              </IconButton>
          }}
        />
        <TextField
          placeholder="Senha"
          label="Senha"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          InputProps={{
            endAdornment:
              <>
                <IconButton onClick={() => setShowPassword(!showPassword)} color="primary">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton onClick={() => setPassword('')} color="primary">
                  <Backspace />
                </IconButton>
              </>

          }}
          required
          error={password.length < 4}
          helperText={password.length < 4 ? 'Senha muito curta' : ''}
        />
        <TextField
          placeholder="Confirme sua senha"
          label="Confirme sua senha"
          id="confirm-password"
          error={password !== passwordConfirm}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={passwordConfirm}
          onChange={({ target }) => setPasswordConfirm(target.value)}
          InputProps={{
            endAdornment:
            <>
            <IconButton onClick={() => setShowPassword(!showPassword)} color="primary">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton onClick={() => setPasswordConfirm('')} color="primary">
              <Backspace />
            </IconButton>
          </>
          }}
          helperText={password !== passwordConfirm ? 'Senhas não conferem' : ''}
        />
      </div>
      <Divider sx={{margin: '20px 0', fontSize: '20px', fontWeight: 'bold'}}>Cartões</Divider>
      <div className="Cards">
        {cards.map((card) => (
          <EditCreditCard key={card.id} id={card.id} />
        ))}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Add />}
          onClick={handleAddCard}
          ref={bottomCardRef}
          disabled={shouldBeDisabled()}
        >
          Adicionar Cartão
        </Button>
      </div>
      <FloatButton handleClick={handleSave} icon={<Save />} text="Save" />
    </div >
  )
}
