import { AddCard, Close, Save } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FloatButton from "../../components/FloatButton";
import Header from "../../components/Header";
import { AppContext } from "../../context";
import { SingleCard } from "./components/SingleCard";

const EditCard = () => {
  const { cards, createCard } = useContext(AppContext);
  const navigate = useNavigate();
  const bottomCardRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (cards.length > 0)
      bottomCardRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cards]);

  const handleAddCard = () => {
    // console.log("cheguei aqui");
    createCard();
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleSave = () => {
    enqueueSnackbar("Cartões salvos com sucesso!", {
      variant: "success",
      style: {
        maxWidth: "300px",
      },
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} size="small">
          <Close />
        </IconButton>
      ),
    });
    handleGoBack();
  };

  return (
    <div className="CardsWrapper">
      <Header showGoBack handleClick={handleGoBack} />
      <h5>Adicione seus cartões e organize suas despesas!</h5>
      <Divider sx={{ margin: "20px 0", fontSize: "20px", fontWeight: "bold" }}>
        Cartões
      </Divider>
      <div className="Fluid">
        {cards.map((card) => (
          <SingleCard key={card.id} id={card.id} />
        ))}
      </div>
      <Button
        onClick={handleAddCard}
        startIcon={<AddCard />}
        variant="contained"
        ref={bottomCardRef}
        size="large"
      >
        Adicionar Cartão
      </Button>
      <FloatButton handleClick={handleSave} icon={<Save />} text="Salvar" />
    </div>
  );
};

export { EditCard };
