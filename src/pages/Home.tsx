import { Add } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardResume from "../components/CardResume";
import DataList from "../components/DataList";
import FloatButton from "../components/FloatButton";
import Header from "../components/Header";
import Overdue from "../components/Overdue";
import { AppContext } from "../context";
import { BillsProvider } from "../context/bills";
import { hasUser } from "../utils";

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
  }, [navigate, user]);

  const handleAdd = () => {
    navigate('/addBill');
  }

  return (
    <BillsProvider>
      <div className="Wrapper">
        <Header />
        <h3>Olá, {user?.username}!</h3>
        <div className="Cards">
          <CardResume />
          <Overdue />
        </div>
        <DataList />
        <FloatButton icon={<Add />} handleClick={handleAdd} text="Adicionar novo" />
      </div>
    </BillsProvider>
  )
}
