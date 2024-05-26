import { type ComponentProps, type ReactNode } from "react";

import { LuLoader } from "react-icons/lu";

import { tw } from "@/utils/style";

interface ButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
  children?: ReactNode;
  masked?: boolean;
  loaderClassName?: string;
}

const Button = (props: ButtonProps) => {
  const {
    loading = false,
    className = "",
    children,
    disabled = false,
    loaderClassName,
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      className={tw(
        "w-full px-3 rounded relative gap-x-1 flex justify-center disabled:cursor-not-allowed disabled:pointer-events-none items-center   py-3 hover:opacity-[0.9] text-[17px] font-[500] bg-[#e96464] text-secondary ",

        className,
        isDisabled && "customButtonC"
      )}
      disabled={isDisabled}
      {...rest}
    >
      {children}

      {loading && (
        <div className={tw("absolute right-4", loaderClassName)}>
          <LuLoader className="animate-spin text-inherit" size={24} />
        </div>
      )}
    </button>
  );
};

export default Button;
