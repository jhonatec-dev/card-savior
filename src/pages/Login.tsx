import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/getData.js';
export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('new user');
    const user = getUser();
    console.log(user);
    if(!user){
      navigate('/register');
      return;
    }
  }, [navigate]);

  return (
    <div>Login</div>
  )
}
