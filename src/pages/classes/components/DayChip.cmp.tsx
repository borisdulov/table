import { Chip } from "@nextui-org/chip";

interface DayChipProps {
  dayKey: string;
}

export const DayChipComponent: React.FC<DayChipProps> = ({ dayKey }) => {
  return (
    <div className="flex w-full justify-center">
      <Chip color="secondary" variant="flat">
        {dayKey}
      </Chip>
    </div>
  );
};
