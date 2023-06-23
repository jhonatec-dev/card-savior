import { ArrowBack } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  showGoBack?: boolean;
}

export default function Header(props: Props) {
  const navigate = useNavigate();
  const { title, showGoBack } = props;

  return (
    <div className="Header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showGoBack && <IconButton onClick={() => navigate(-1)} ><ArrowBack /></IconButton>}
        <h2>{title ?? 'Card Savior'}</h2>
      </div>
      <IconButton onClick={() => navigate('/editProfile')}>
        <Avatar />
      </IconButton>
    </div>
  )
}
