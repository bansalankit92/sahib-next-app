import React, { ReactNode } from "react";

interface Props {
  header?: string;
  children?: ReactNode;
  isOpen: Boolean;
  setIsOpen: (x:boolean) => void;
}

const Drawer: React.FC<Props> = ({
  header = "",
  children,
  isOpen = false,
  setIsOpen = () => {},
}) => {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity duration-500 translate-x-0  "
          : " transition-all delay-500  translate-x-full  ")
      }
    >
      <section
        className={
          " p-4 w-72 max-w-sm right-0 absolute bg-white dark:bg-gray-800 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative  max-w-sm pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          {header ? (
            <header className="p-4 font-bold text-lg">{header}</header>
          ) : null}
          {children}
        </article>
      </section>
      <section
        className=" h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default Drawer;
