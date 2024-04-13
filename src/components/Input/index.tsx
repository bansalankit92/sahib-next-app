import { DropdownType } from "@/app/types/InputTypes";
import React, { InputHTMLAttributes, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  inputType?: "DROPDOWN" | "DATE_PICKER";
  onClickClear?: () => void;
  dateValue?: Date;
  onDateSelect?: (e: DateValueType) => void;
  dropdownValues?: DropdownType[];
  onDropdownSelect?: (e: DropdownType) => void;
}

const Input: React.FC<Props> = ({
  name,
  label,
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
  const defaultInput = () => (
    <div>
      {labelTag}
      <input
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      />
    </div>
  );

  const datePicker = () => (
    <div>
      {labelTag}
      <Datepicker
        inputClassName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        asSingle={true}
        maxDate={new Date(new Date().valueOf() + 1000 * 3600 * 24)}
        value={naamDate}
        onChange={handleDateValueChange}
        placeholder={rest.placeholder}
      />
    </div>
  );

  const dropDownInput = () => (
    <div>
     {labelTag}

      <div data-dropdown-toggle="dropdown" className="bg-gray-50 flex border border-gray-300 text-gray-900 rounded items-center focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <input
          name={name}
          
          className="appearance-none outline-none w-full bg-transparent sm:text-sm"
          onClick={() => setshowDropdown(true)}
          {...rest}
        />
        <button
          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
          onClick={onClickClear}
          disabled={rest.disabled}
        >
          <svg
            className="w-4 h-4 mx-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {/* <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
          <svg
            className="w-4 h-4 mx-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button> */}
      </div>
      {showDropdown && dropdownValues.length > 0 && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
           {dropdownValues.map( d => (<li key={d.key}>
              <a 
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={()=>{onDropdownSelect(d); setshowDropdown(false);}}
                >
                {d.label}
              </a>
            </li>))}
          </ul>
        </div>
      )}
    </div>
  );

  switch (inputType) {
    case "DROPDOWN":
      return dropDownInput();
    case "DATE_PICKER":
      return datePicker();
    default:
      return defaultInput();
  }
};

export default Input;
