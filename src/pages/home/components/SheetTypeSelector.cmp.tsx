import { Tabs, Tab } from "@nextui-org/tabs";
import { Key } from "react";

export enum WorkBookType {
  CLASSES = "classes",
  TESTS = "tests",
  GIA = "gia",
}

interface SheetTypeSelectorProps {
  setWorkBookType: (type: WorkBookType) => void;
}

export const SheetTypeSelectorComponent: React.FC<SheetTypeSelectorProps> = ({
  setWorkBookType,
}) => {
  const handleSelectionChange = (key: Key) => {
    setWorkBookType(key as WorkBookType);
  };

  return (
    <Tabs
      size="lg"
      onSelectionChange={handleSelectionChange}
      disabledKeys={["tests", "gia"]}
      radius="sm"
    >
      <Tab key="classes" title="Занятий"></Tab>
      <Tab key="tests" title="Зачетов"></Tab>
      <Tab key="gia" title="ГИА"></Tab>
    </Tabs>
  );
};
