import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";

export default function Home() {
  const navigate = useNavigate();
  // Context
  const {user} = useContext(AppContext);

  // Effects
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [navigate, user])

  return (
    <div className="Wrapper">
      <Button onClick={() => navigate('/editProfile')}>Profile</Button>
    </div>
  )
}
