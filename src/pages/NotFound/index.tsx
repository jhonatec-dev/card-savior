import { ArrowLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="NotFound">
      <h1>404</h1>
      <h3>Page not found</h3>
      <Button
        onClick={() => navigate("/")}
        variant="outlined"
        color="primary"
        startIcon={<ArrowLeft />}
      >
        Go back
      </Button>
    </div>
  )
}
