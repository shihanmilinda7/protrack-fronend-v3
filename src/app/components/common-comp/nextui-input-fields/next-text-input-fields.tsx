import { Input } from "@nextui-org/react";
import React from "react";

const NextTextInputField = ({
  label,
  value,
  onChange,
  color = "default",
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: any;
}) => {
  return (
    <Input
      type="text"
      variant="flat"
      label={label}
      size="sm"
      placeholder="Type here..."
      value={value}
      onChange={onChange}
      color={color}
    />
  );
};

export default NextTextInputField;
