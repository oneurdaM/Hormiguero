import Button, { ButtonProps } from "./button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-bluer-500 hover:bg-bluer-100 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
