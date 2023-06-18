import { Backspace, LockReset, LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import { correctPassword, getFromLS, showError, showInfo } from '../utils';

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = getFromLS('user');
    if (!user) {
      navigate('/register');
      return;
    } else {
      setUsername(user.username);
    }
  }, [navigate]);

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //Context
  const { userLogin } = useContext(AppContext);

  const handleLockReset = () => {
    showInfo('App em desenvolvimento', 'Em breve');
  }

  const handleLogin = () => {
    if (correctPassword(password)) {
      userLogin();
      navigate('/home');
    } else {
      showError('Senha inválida!');
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  }

  return (
    <div className="Wrapper">
      <div className="Login">
        <Avatar sx={{ width: 100, height: 100 }}></Avatar>
        <h2>Olá novamente!</h2>
        <h4>{username}</h4>
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
          onKeyDown={handleKeyDown}
          error={password.length < 4}
          helperText={password.length < 4 ? 'Senha muito curta' : ''}
        />
        <Button startIcon={<LoginOutlined />} onClick={handleLogin}>Entrar</Button>
        <Button startIcon={<LockReset />} onClick={handleLockReset}>Recuperar Senha</Button>
      </div>
    </div>
  )
}
