import { Input } from "@nextui-org/react";
import React from "react";

const NextDateTimeInputField = ({
  label,
  value,
  onChange,
  minDate = "",
  maxDate = "",
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minDate?: any;
  maxDate?: any;
}) => {
  return (
    <Input
      type="datetime-local"
      variant="flat"
      label={label}
      size="sm"
      placeholder="Type here..."
      value={value}
      onChange={onChange}
      min={minDate}
      max={maxDate}
    />
  );
};

export default NextDateTimeInputField;
