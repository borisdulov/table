import { daysOfWeek, todayDayOfWeek } from "@/utils/utils";
import { Chip } from "@nextui-org/chip";

interface DayChipProps {
  dayId: number;
}

const YesterdayTodayTomorrowComponent: React.FC<DayChipProps> = ({ dayId }) => {
  const today = todayDayOfWeek();
  const className = "flex justify-self-end mr-2";

  switch (today) {
    case dayId - 1:
      return (
        <Chip color="warning" className={className} variant="flat">
          Завтра
        </Chip>
      );
    case dayId:
      return (
        <Chip color="success" className={className} variant="flat">
          Сегодня
        </Chip>
      );
    case dayId + 1:
      return (
        <Chip color="default" className={className} variant="flat">
          Вчера
        </Chip>
      );
  }
};

export const DayChipComponent: React.FC<DayChipProps> = ({ dayId }) => {
  const currentDate = new Date();
  const dayOffset = dayId - todayDayOfWeek();
  const targetDate = new Date(currentDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  const formattedDate = `${targetDate.getDate()}.${targetDate.getMonth() + 1}.${targetDate.getFullYear()}`;

  return (
    <div className="flex w-full mb-2 grid grid-cols-3">
      <Chip color="default" variant="flat" className="justify-self-start ml-2">
        {formattedDate}
      </Chip>
      <Chip color="secondary" className="justify-self-center" variant="flat">
        {daysOfWeek[dayId]}
      </Chip>
      <YesterdayTodayTomorrowComponent dayId={dayId} />
    </div>
  );
};
