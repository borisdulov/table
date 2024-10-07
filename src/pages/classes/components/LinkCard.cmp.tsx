import { Card, CardBody } from "@nextui-org/card";
import { Snippet } from "@nextui-org/snippet";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";

interface LinkCardProps {
  thisUrl: string;
  externalUrl: string;
}

export const LinkCardComponent: React.FC<LinkCardProps> = ({ thisUrl, externalUrl }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Card className="rounded-t-none z-10">
      <CardBody className="flex flex-col gap-2 items-center">
        <div className="w-full flex flex-row gap-2">
          <Button className="w-full" radius="sm" variant="flat" onClick={goToHome}>
            Cписок групп 📜
          </Button>
          <Button className="w-full" radius="sm" variant="flat" onClick={toggleTheme}>
            {theme === "light" ? "Переключить тему 🌚" : "Переключить тему 🌝"}
          </Button>
        </div>
        <div className="w-full flex flex-row gap-2">
          <Snippet symbol="📌" color="secondary" variant="flat" className="w-full" size="sm">
            {thisUrl}
          </Snippet>
          <Link
            size="sm"
            isExternal
            href={externalUrl}
            showAnchorIcon
            className="flex w-full bg-blue-500 bg-opacity-20 rounded-lg p-2 justify-center"
          >
            Оригинал
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
