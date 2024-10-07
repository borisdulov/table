import { useTheme } from "@/hooks/use-theme";
import { Button } from "@nextui-org/button";

export const ThemeSwitchComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="flat" onClick={toggleTheme}>
      {theme === "light" ? "Переключить тему 🌚" : "Переключить тему 🌝"}
    </Button>
  );
};
