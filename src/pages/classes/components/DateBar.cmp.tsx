import { daysOfWeek, todayDayOfWeek } from "@/utils/utils";
import { Chip } from "@nextui-org/chip";

interface DateProps {
  targetDate: Date;
}

const DateComponent: React.FC<DateProps> = ({ targetDate }) => {
  const formattedDate = `${targetDate.getDate()}.${String(targetDate.getMonth() + 1).padStart(2, "0")}`;

  return (
    <div className="flex w-full px-2 justify-end">
      <Chip color="default" variant="flat" size="sm">
        {formattedDate}
      </Chip>
    </div>
  );
};

interface DayOfWeekProps {
  dayId: number;
}

const DayOfWeekComponent: React.FC<DayOfWeekProps> = ({ dayId }) => {
  return (
    <Chip color="secondary" className="" variant="flat" size="sm">
      {daysOfWeek[dayId]}
    </Chip>
  );
};

interface YesterdayTodayTomorrowProps {
  dayId: number;
}

const YesterdayTodayTomorrowComponent: React.FC<YesterdayTodayTomorrowProps> = ({ dayId }) => {
  const today = todayDayOfWeek();
  let text = "";
  let color: "success" | "warning" | "danger";

  switch (today) {
    case dayId - 1:
      text = "Завтра";
      color = "warning";
      break;
    case dayId:
      text = "Сегодня";
      color = "success";
      break;
    case dayId + 1:
      text = "Вчера";
      color = "danger";
      break;
    default:
      return <div className="w-full" />;
  }

  return (
    <div className="w-full px-2">
      <Chip color={color} variant="flat" size="sm">
        {text}
      </Chip>
    </div>
  );
};

interface DayChipProps {
  dayId: number;
}

export const DateBarComponent: React.FC<DayChipProps> = ({ dayId }) => {
  const currentDate = new Date();
  const dayOffset = dayId - todayDayOfWeek();
  const targetDate = new Date(currentDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);

  return (
    <div className="flex w-full sticky top-12 z-10 p-3 backdrop-blur-md">
      <DateComponent targetDate={targetDate} />
      <DayOfWeekComponent dayId={dayId} />
      <YesterdayTodayTomorrowComponent dayId={dayId} />
    </div>
  );
};
