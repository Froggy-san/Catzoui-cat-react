import { useNavigate } from "react-router-dom";

export default function useGoToProductPage(id: string) {
  const navigate = useNavigate();

  return id ? navigate(`/?product=${id}`) : "";
}
