import { ArrowForward } from '@mui/icons-material';
import { Avatar, IconButton, TextField } from '@mui/material';
import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import { correctPassword, getFromLS, showInfo } from '../utils';

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
  // const [showPassword, setShowPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

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
      setWrongPassword(true);
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
          className={wrongPassword ? 'InputPassword': ''}
          placeholder="Senha"
          label="Senha"
          size='small'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          onAnimationEnd={() => setWrongPassword(false)}
          InputProps={{
            endAdornment:
              password.length > 0 && <IconButton onClick={handleLogin} color="primary">
                <ArrowForward />
              </IconButton>


          }}
          onKeyDown={handleKeyDown}

        />
      </div>
    </div>
  )
}
