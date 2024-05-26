import React from "react";
import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { tw } from "@/utils/style";

const BirthdateSelector = ({
  value,
  onChange,
  label,
  wrapperClassName,
  labelClassName,
}: {
  value: any;
  onChange: any;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
}) => {
  const maxDate = subYears(new Date(), 18);

  return (
    <div className={tw("custominput customDateinput ", wrapperClassName)}>
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

      <DatePicker
        selected={value}
        onChange={onChange}
        maxDate={maxDate}
        placeholderText="Select your birthdate"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default BirthdateSelector;
