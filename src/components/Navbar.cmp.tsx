import { Navbar as NextUINavbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { title } from "./primitives";

interface NavbarProps {
  groupName: string;
}

export const NavbarComponent: React.FC<NavbarProps> = ({ groupName }) => {
  return (
    <NextUINavbar position="sticky" isBordered height={"50px"}>
      <NavbarContent className="hidden flex basis-full" justify="center">
        <NavbarItem className="flex basis-full justify-center">
          <p className={title({ size: "sm" })}>Расписание&nbsp;</p>
          <p className={title({ color: "violet", size: "sm" })}>{groupName}</p>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
