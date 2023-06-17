import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>404</h1>
      <h3>Page not found</h3>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  )
}
