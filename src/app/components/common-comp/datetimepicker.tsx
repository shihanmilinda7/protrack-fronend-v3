import { useState } from "react";
import { format, parse } from "date-fns";
import { Input } from "@nextui-org/react";

const DatetimePicker = ({
  label = "Set date and time",
  value,
  logintime,
}: {
  label?: any;
  value?: any;
  logintime?: any;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    console.log("event.target.value", event.target.value);
    const dateString = event.target.value;
    const parsedDate = parse(dateString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    // setSelectedDate(parsedDate);
    if (!isNaN(parsedDate.getTime())) {
      setSelectedDate(parsedDate);
      // const tmpFormattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss");
      // if (new Date(tmpFormattedDate) >= new Date(logintime)) {
      //   setSelectedDate(parsedDate);
      // } else {
      //   console.log("sssssssssssssssss");
      // }
    }
  };

  const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss");

  return (
    <div className="flex flex-col">
      Selected Date and Time: {formattedDate}
      <Input
        type="datetime-local"
        variant="flat"
        label={label}
        size="sm"
        placeholder="Select date and time..."
        value={formattedDate}
        onChange={handleDateChange}
        min="2018-06-07T00:00"
        max="2018-06-14T00:00"
      />
    </div>
  );
};

export default DatetimePicker;
