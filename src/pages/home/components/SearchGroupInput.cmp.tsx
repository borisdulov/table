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
      type="search"
      onValueChange={onValueChange}
    />
  );
};
