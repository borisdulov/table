import { daysOfWeek } from "@/utils/utils";
import { Chip } from "@nextui-org/chip";

interface DayChipProps {
  dayId: number;
}

const YesterdayTodayTomorrowComponent: React.FC<DayChipProps> = ({ dayId }) => {
  const today = new Date().getDay() - 1;
  switch (today) {
    case dayId - 1:
      return (
        <Chip color="primary" variant="flat">
          Завтра
        </Chip>
      );
    case dayId:
      return (
        <Chip color="primary" variant="flat">
          Сегодня
        </Chip>
      );
    case dayId + 1:
      return (
        <Chip color="primary" variant="flat">
          Вчера
        </Chip>
      );
  }
};

export const DayChipComponent: React.FC<DayChipProps> = ({ dayId }) => {
  return (
    <div className="flex w-full justify-center mb-2 gap-2">
      <Chip color="secondary" variant="flat">
        {daysOfWeek[dayId]}
      </Chip>
      <YesterdayTodayTomorrowComponent dayId={dayId} />
    </div>
  );
};
