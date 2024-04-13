import { DropdownType } from "@/app/types/InputTypes";
import React, { InputHTMLAttributes, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  inputType?: "DROPDOWN" | "DATE_PICKER";
  onClickClear?: () => void;
  dateValue?: Date;
  row:number,
  onDateSelect?: (e: DateValueType) => void;
  dropdownValues?: DropdownType[];
  onDropdownSelect?: (e: DropdownType) => void;
}

const TextArea: React.FC<Props> = ({
  name,
  label, row=5,
  inputType,
  onClickClear = () => {},
  onDateSelect = () => {},
  dateValue = new Date(),
  dropdownValues = [],
  onDropdownSelect = () => {},
  ...rest
}) => {
  const [naamDate, setNaamDate] = useState<DateValueType>({
    startDate: dateValue,
    endDate: dateValue,
  });
  const [showDropdown, setshowDropdown] = useState(false);

  const handleDateValueChange = (newValue: DateValueType) => {
    setNaamDate(newValue);
    onDateSelect(newValue);
  };

  const labelTag = (<label
    htmlFor={name}
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    {label}
  </label>);
  const defaultTextarea = () => (
    <div>
      {labelTag}
      <textarea
        name={name}
        rows={row}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      />
    </div>
  );
return defaultTextarea();
};

export default TextArea;
