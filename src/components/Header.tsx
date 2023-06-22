import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="Header">
      <h1>Card Savior</h1>
      <IconButton onClick={() => navigate('/editProfile')}>
        <Avatar />
      </IconButton>
    </div>
  )
}
