import { Add } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../../components/FloatButton";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { hasUser } from "../../utils";
import CardResume from "./components/CardResume";
import DataList from "./components/DataList";
import Overdue from "./components/Overdue";

export default function Home() {
  const navigate = useNavigate();
  // Context
  const { user, userLogin } = useContext(AppContext);

  // Effects
  useEffect(() => {
    if (!user) {
      if(hasUser()){
        userLogin();
      }
      navigate('/register');
      return;
    }
  }, [navigate, user, userLogin]);

  const handleAdd = () => {
    navigate('/add');
  }

  return (
      <div className="Wrapper">
        <Header />
        <h3>Olá, {user?.username}!</h3>
        <div className="Fluid">
          <CardResume />
          <Overdue />
        </div>
        <DataList />
        <FloatButton icon={<Add />} handleClick={handleAdd} text="Adicionar novo" />
      </div>
  )
}