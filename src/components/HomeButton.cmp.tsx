import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "./icons";

export const HomeButtonComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Button
      className="rounded-full fixed bottom-7 left-7 w-14 h-14 z-20"
      isIconOnly
      onClick={handleClick}
    >
      <HomeIcon size={10} />
    </Button>
  );
};
