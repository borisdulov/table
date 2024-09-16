import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { GroupButtonComponent } from "./GroupButton.cmp";

interface GroupsProps {
  groupNames: string[];
}

export const GroupsListComponent = ({ groupNames }: GroupsProps) => {
  return (
    <ScrollShadow className="w-[250px] h-[400px]" size={20}>
      {groupNames.map((name) => (
        <GroupButtonComponent name={name} key={name} />
      ))}
    </ScrollShadow>
  );
};
