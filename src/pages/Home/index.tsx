import { Add } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
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
import Overdue from "./components/Overdue";

const Initialstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  bgcolor: "background.default",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
  maxHeight: "100%",
};

export default function Home() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { user, userLogin } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");
  const [style, setStyle] = useState(Initialstyle);

  useEffect(() => {
    if (width > 768) {
      console.log("tablet");
      setStyle({...style, width: "550px", maxHeight: "700px"});
    } else {
      setStyle(Initialstyle);
    }
  }, [width, height]);

  useEffect(() => {
    if (!user) {
      if (hasUser()) {
        userLogin();
      }
      navigate("/register");
      return;
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

  return (
    <div className="Wrapper">
      <Header />
      <h3>Olá, {user?.username}!</h3>
      <div className="Fluid">
        <CardResume />
        <Overdue />
      </div>
      <DataList handleEdit={handleEdit} />
      <FloatButton
        icon={<Add />}
        handleClick={handleAdd}
        text="Adicionar novo"
      />
      {/* <Button onClick={teste}>Teste</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditBill idToEdit={idToEdit} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
