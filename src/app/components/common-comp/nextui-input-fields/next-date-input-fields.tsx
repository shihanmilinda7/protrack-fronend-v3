import { Input } from "@nextui-org/react";
import React from "react";

const NextDateInputField = ({
  label,
  value,
  onChange,
  isDisabled = false,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: any;
}) => {
  return (
    <Input
      isDisabled={isDisabled}
      type="date"
      variant="flat"
      label={label}
      size="sm"
      placeholder="Type here..."
      value={value}
      onChange={onChange}
    />
  );
};

export default NextDateInputField;
