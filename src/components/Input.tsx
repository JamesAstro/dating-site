import type { ChangeEvent, ComponentProps, ComponentRef } from "react";
import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { tw } from "@/utils/style";

type InputProps = {
  label?: string;
  labelClassName?: string;
  onChange?: (value: string) => void;
  isPassword?: boolean;
  leftIcon?: React.ReactElement;
  isError?: boolean;
  minInput?: any;
  onInput?: (value: string) => void;
  wrapperClassName?: string;
} & Omit<ComponentProps<"input">, "onChange">;

const Input = forwardRef<ComponentRef<"input">, InputProps>((props, ref) => {
  const {
    label,
    labelClassName,
    onChange,
    className,
    type,
    isPassword,

    leftIcon,
    onInput,
    isError = false,
    minInput,
    wrapperClassName,

    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };
  return (
    <div className={tw("custominput", wrapperClassName)}>
      {label && (
        <label
          className={tw(
            "mb-1 text-[#4d4c4c] inline-block z-[1] bg-secondary relative top-[0.8rem] px-[3px] ml-[8px] text-[15px] font-[500]",
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          type={!showPassword ? type : "text"}
          className={tw(
            "w-full px-3 py-3   placeholder:font-[300] bg-secondary placeholder:text-[#adadad] text-[14px]  rounded border border-[#4d4c4c]",
            isError && "border-red-600",
            className
          )}
          min={minInput}
          {...rest}
          onChange={handleChange}
          onInput={onInput}
        />
        {leftIcon && leftIcon}
        {isPassword && (
          <>
            {showPassword ? (
              <FaEye
                className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-[24px] text-[#676767] "
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-[24px] text-[#676767] "
                onClick={togglePasswordVisibility}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
