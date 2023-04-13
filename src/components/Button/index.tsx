import React from "react";

export enum ButtonColors {
  PRIMARY, DANGER, SUCCESS, WARNING
}
interface Props {
  text: string;
  onClick?: () => void;
  type?: ButtonColors;
}

const Button: React.FC<Props> = ({ text = "Button", onClick = () => {}, type=ButtonColors.PRIMARY }) => {
  let className = 'w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800 '
  switch(type){
    case ButtonColors.DANGER: 
    className +=' bg-red-600 hover:bg-red-700  dark:bg-red-600 dark:hover:bg-red-700'
    break;
    case ButtonColors.SUCCESS: 
    className +=' bg-green-600 hover:bg-green-700  dark:bg-green-600 dark:hover:bg-green-700'
    break;
    case ButtonColors.WARNING: 
    className +=' bg-orange-600 hover:bg-orange-700  dark:bg-orange-600 dark:hover:bg-orange-700'
    break;
    default:
    className +=' bg-indigo-600 hover:bg-indigo-700  dark:bg-indigo-600 dark:hover:bg-indigo-700'
    break;
  }
  return (
    <button
      type="submit"
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
