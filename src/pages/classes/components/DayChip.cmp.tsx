import { daysOfWeek, todayDayOfWeek } from "@/utils/utils";
import { Chip } from "@nextui-org/chip";

interface DateProps {
  targetDate: Date;
}

const DateComponent: React.FC<DateProps> = ({ targetDate }) => {
  const formattedDate = `${targetDate.getDate()}.${String(targetDate.getMonth() + 1).padStart(2, "0")}`;

  return (
    <Chip color="default" variant="flat" className="justify-self-start">
      {formattedDate}
    </Chip>
  );
};

interface DayOfWeekProps {
  dayId: number;
}

const DayOfWeekComponent: React.FC<DayOfWeekProps> = ({ dayId }) => {
  return (
    <Chip color="secondary" className="justify-self-center" variant="flat">
      {daysOfWeek[dayId]}
    </Chip>
  );
};

interface YesterdayTodayTomorrowProps {
  dayId: number;
}

const YesterdayTodayTomorrowComponent: React.FC<YesterdayTodayTomorrowProps> = ({ dayId }) => {
  const today = todayDayOfWeek();
  const className = "flex justify-self-end";

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

interface DayChipProps {
  dayId: number;
}

export const DayChipComponent: React.FC<DayChipProps> = ({ dayId }) => {
  const currentDate = new Date();
  const dayOffset = dayId - todayDayOfWeek();
  const targetDate = new Date(currentDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);

  return (
    <div className="flex w-full grid grid-cols-3 sticky top-12 z-10 p-3 backdrop-blur-md">
      <DateComponent targetDate={targetDate} />
      <DayOfWeekComponent dayId={dayId} />
      <YesterdayTodayTomorrowComponent dayId={dayId} />
    </div>
  );
};
