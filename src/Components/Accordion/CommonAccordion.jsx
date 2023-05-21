/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Accordion = ({
  accordion_type = "independent",
  customOnClick,
  className = "",
  isInitOpen = false,
  header = "",
  body = "",
  rightEndIcon,
  rightIconWidth = "w-[200px]",
}) => {
  // ! isInitOpen = "Decides whether SidebarAccordion should be opened initially"
  // ! accordion_type = independent --> can open multiple accordion at a time
  // ! accordion_type = dependent --> can open only one accordion at a time

  const [isOpen, setIsOpen] = useState(isInitOpen);

  useEffect(() => {
    if (accordion_type === "dependent") {
      // ! If accordion_type is dependent --> control accordion with isInitOpen prop
      setIsOpen(isInitOpen);
    }
  }, [isInitOpen]);

  const onClick = () => {
    setIsOpen(!isOpen);
    customOnClick && customOnClick();
  };

  return (
    <div className={`text-md py-s8  text-cBodyText ${className}`}>
      <div
        className={`flex justify-between items-center w-full cursor-pointer border-b pb-s12 ${
          isOpen && ""
        }`}
      >
        <div
          onClick={onClick}
          className="flex items-center w-full text-sm font-medium"
        >
          {header}
        </div>
        <div className={`${rightIconWidth}`}>{rightEndIcon}</div>
        <div onClick={onClick}>
          <IoIosArrowForward
            className={`ml-s10 duration-300 transition-transform ${
              isOpen && "rotate-90"
            }`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          !isOpen ? "max-h-0" : "max-h-[40rem]"
        }`}
      >
        <div className="pt-s12"></div>
        {body}
      </div>
      {isOpen ? <div className="pt-s10 border-b"></div> : ""}
    </div>
  );
};

export default Accordion;
