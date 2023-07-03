import { Add } from "@mui/icons-material";
import { Box, Dialog } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import FloatButton from "../../components/FloatButton";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { hasUser } from "../../utils";
import EditBill from "../EditBill";
import CardResume from "./components/CardResume";
import DataList from "./components/DataList";
import { DataListOverdue } from "./components/DataListOverdue";
import Overdue from "./components/Overdue";

export default function Home() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { user, userLogin } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [showOverdue, setShowOverdue] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");

  useEffect(() => {
    if (!user) {
      if (hasUser()) {
        userLogin();
      } else {
        navigate("/register");
      }
    }
  }, [navigate, user, userLogin]);

  const handleAdd = () => {
    setIdToEdit("");
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    setIdToEdit(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowOverdue = () => {
    setShowOverdue(!showOverdue);
  };

  return (
    <div className="Wrapper">
      <Header />
      <h3>Olá, {user?.username}!</h3>
      <div className="Fluid">
        <CardResume />
        <Overdue
          handleShowOverdue={handleShowOverdue}
          showOverdue={showOverdue}
        />
      </div>
      {showOverdue ? (
        <DataListOverdue handleEdit={handleEdit} />
      ) : (
        <DataList handleEdit={handleEdit} />
      )}
      <FloatButton
        icon={<Add />}
        handleClick={handleAdd}
        text="Adicionar novo"
      />
      <Dialog open={open} onClose={handleClose} fullScreen={width < 768}>
        <Box>
          <EditBill idToEdit={idToEdit} handleClose={handleClose} />
        </Box>
      </Dialog>
    </div>
  );
}
