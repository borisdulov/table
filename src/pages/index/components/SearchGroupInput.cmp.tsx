import { SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";

export const SearchGroupInputComponent = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Поиск по группам"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      onValueChange={onValueChange}
    />
  );
};
