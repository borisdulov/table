import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

interface GroupButtonProps {
  name: string;
}

export const GroupButtonComponent = ({ name }: GroupButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/${name}`);
    }, 200);
  };

  return (
    <Button className="w-full mb-2 opacity-70" onClick={handleClick}>
      {name}
    </Button>
  );
};
