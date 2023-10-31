import { Input } from "@nextui-org/react";
import React from "react";

const NextEmailInputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <Input
        type="email"
        variant="flat"
        label={label}
        size="sm"
        placeholder="Type here..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default NextEmailInputField;

export const validateEmail = (email) => {
  // Regular expression for a valid email address
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validateGmailAddress = (email) => {
  // Regular expression for a valid Gmail address
  const gmailRegex = /^[A-Z0-9._%+-]+@gmail\.com$/i;
  return gmailRegex.test(email);
};