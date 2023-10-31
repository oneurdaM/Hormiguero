import cn from "classnames";
import React, { InputHTMLAttributes } from "react";
import Link from "next/link";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  dimension?: "small" | "medium" | "big";
  showLabel?: boolean;
  signUpLink?: string
}

const classes = {
  root: "px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
};
const sizeClasses = {
  small: "text-sm h-10",
  medium: "h-12",
  big: "h-14",
};
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      children,
      variant = "normal",
      dimension = "medium",
      shadow = false,
      type = "text",
      inputClassName,
      disabled,
      showLabel = true,
      signUpLink,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      {
        [classes.shadow]: shadow,
      },
      sizeClasses[dimension],
      inputClassName
    );
    let numberDisable = type === "number" && disabled ? "number-disable" : "";
    return (
      <div className={className}>
        <div className="mb-3 flex items-center justify-between">

        {showLabel ? (
          <label
            htmlFor={name}
            className="text-sm font-semibold leading-none md:text-body-dark"
          >
            {label}
          </label>
        ) : (
          ""
        )}

        {signUpLink && (
            <Link
              href={signUpLink}
              className="text-xs md:text-accent transition-colors duration-200 hover:text-accent-hover focus:font-semibold focus:text-accent-700 focus:outline-none"
            >
              ¿No te has registrado?
            </Link>
        )}
        </div>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={`${rootClassName} ${
            disabled
              ? `cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4] ${numberDisable} select-none`
              : ""
          }`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {note && <p className="mt-2 text-xs text-body">{note}</p>}
        {error && (
          <p className="my-2 text-xs text-red-500 text-start">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
