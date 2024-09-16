import { useParams } from "react-router-dom";
import { LinkCardComponent } from "./components/LinkCard.cmp";
import { Constants } from "@/constants";
import { NavbarComponent } from "@/components/Navbar.cmp";
import { ThemeSwitchComponent } from "@/components/themeSwitch.cmp";
import { groupData } from "../../../data/groupData";
import { ClassesParser, IClassesWeek } from "@/core/classesParser";
import { useEffect, useState } from "react";
import { DaysListComponent } from "./components/DaysList.cmp";
import { HomeButtonComponent } from "@/components/HomeButton.cmp";

export const ClassesPage = () => {
  const [week, setWeek] = useState<IClassesWeek | null>(null);
  const { groupName } = useParams();
  if (!groupName) return null;

  useEffect(() => {
    const parseClassesDTO = groupData[groupName];
    ClassesParser.parseDTO(parseClassesDTO).then((week) => {
      setWeek(week);
    });
  }, []);

  return (
    <>
      <NavbarComponent groupName={groupName || ""} />
      <LinkCardComponent
        thisUrl={`${Constants.APP_URL}/${groupName}`}
        externalUrl={groupData[groupName].url}
      />
      <DaysListComponent week={week} />
      <HomeButtonComponent />
      <ThemeSwitchComponent />
    </>
  );
};
