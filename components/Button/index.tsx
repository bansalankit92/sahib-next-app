import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text = "Button", onClick = () => {} }) => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-primary-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
