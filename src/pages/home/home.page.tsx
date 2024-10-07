import { NavbarComponent } from "@/components/Navbar.cmp";
import { useState } from "react";

import { groupData } from "../../../data/groupData";
import { SheetTypeSelectorComponent, WorkBookType } from "./components/SheetTypeSelector.cmp";
import { SearchGroupInputComponent } from "./components/SearchGroupInput.cmp";
import { GroupsListComponent } from "./components/GroupList.cmp";
import { ThemeSwitchComponent } from "@/components/themeSwitch.cmp";

export const HomePage = () => {
  const [workBookType, setWorkBookType] = useState<WorkBookType>(WorkBookType.CLASSES);
  const [groupNames, setGroupNames] = useState<string[]>(Object.keys(groupData));

  const handleSearch = (value: string) => {
    if (value === "") {
      setGroupNames(Object.keys(groupData));
    } else {
      setGroupNames(Object.keys(groupData).filter((name) => name.includes(value)));
    }
  };

  return (
    <>
      <NavbarComponent groupName="ИнЭк" />
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 mt-2">
          <ThemeSwitchComponent />
          <SheetTypeSelectorComponent setWorkBookType={setWorkBookType} />
          <SearchGroupInputComponent onValueChange={handleSearch} />
          <GroupsListComponent groupNames={groupNames} />
        </div>
      </div>
    </>
  );
};
