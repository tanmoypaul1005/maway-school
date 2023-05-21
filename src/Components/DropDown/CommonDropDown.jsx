import { Menu, Transition } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
// import BtnFillRounded from "../Button/BtnFillRounded";
import DropDownBtn from "../Button/DropDownBtn";

const CommonDropDown = ({
  toggleButton,
  toggleTitle,
  itemOnClick,
  useDataObject = false,
  withToolTip = false,
  dataObject = [
    {
      id: 1,
      name: "Object-one",
    },
    {
      id: 2,
      name: "Object-two",
    },
    {
      id: 3,
      name: "Object-three",
    },
    {
      id: 4,
      name: "Object-four",
    },
  ],
  data = [
    "one",
    "two",
    "three",
  ],
  disabled = false,
  value = "",
  required = false,
  warningBorder = false,
  name,
  fullWidth = false,
  basicColor = false,
  placeholderTextShow = false,
  toggleButtonWidth = "",
  type = 1,
}) => {
  const [selectedItem, setSelectedItem] = useState(toggleTitle);
  const [isActive, setIsActive] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    switch (selectedItem) {
      case "completed":
        setBgColor("bg-cSuccess");
        setBorderColor("ring-cPassed");
        break;
      case "processing":
        setBgColor("bg-cPending");
        setBorderColor("ring-cPending");
        break;
      case "pending":
        setBgColor("bg-cPending");
        setBorderColor("ring-cPending");
        break;
      case "rejected":
        setBgColor("bg-cRed");
        setBorderColor("ring-cRed");
        break;
      case "canceled":
        setBgColor("bg-cRed");
        setBorderColor("ring-cRed");
        break;
      default:
        setBgColor("bg-white");
        setBorderColor("ring-white");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    if (value) {
      setSelectedItem(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Menu>
      {toggleButton ? <Menu.Button>{toggleButton}</Menu.Button> : ""}

      {toggleTitle ? (
        <>
          <input
            name={name}
            value={selectedItem}
            required={required}
            type="hidden"
            // className="opacity-0"
            onChange={() => { }}
          />
          <Menu.Button className={"w-full"}>
            <div className="w-full">
              {type === 1 ? (
                placeholderTextShow === true ? (
                  <DropDownBtn
                    fullWidth={fullWidth}
                    onClick={() => setIsActive(!isActive)}
                    btnLabel={selectedItem}
                    isBtnActive={isActive}
                    basicColor={basicColor}
                    dangerColor={selectedItem !== toggleTitle ? false : warningBorder}
                    placeholderShow={
                      toggleTitle === selectedItem ? true : false
                    }
                  />
                ) : (
                  <DropDownBtn
                    fullWidth={fullWidth}
                    onClick={() => setIsActive(!isActive)}
                    btnLabel={selectedItem}
                    dangerColor={selectedItem !== toggleTitle ? false : warningBorder}
                    isBtnActive={isActive}
                    basicColor={basicColor}
                    placeholderShow={false}
                  />
                )
              ) : (
                <DropDownBtn
                  fullWidth={fullWidth}
                  onClick={() => setIsActive(!isActive)}
                  btnLabel={selectedItem}
                  isBtnActive={isActive}
                  basicColor={basicColor}
                  dangerColor={selectedItem !== toggleTitle ? false : warningBorder}
                  btnBgColor={bgColor}
                  btnBorderColor={borderColor}
                  placeholderShow={toggleTitle === selectedItem ? true : false}
                />
              )}
            </div>
          </Menu.Button>
        </>
      ) : (
        ""
      )}
      {/* Use the Transition component. */}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-full max-h-s400 overflow-y-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className=" text-black">
            {useDataObject
              ? dataObject.map((item, index) => (
                withToolTip ? <Menu.Item key={index}>
                  {({ active }) => (
                    <Tooltip onClick={()=>setIsActive(false)} title={item.name} placement="left" >
                      <div
                        onClick={() => {
                          setSelectedItem(item.name);
                          setIsActive(false);
                          itemOnClick(item);
                          // onChange(item);
                        }}
                        className={`${active
                          ? "bg-cBrand text-white rounded-br5"
                          : "bg-white text-cMainBlack"
                          } px-3 drop-shadow-md py-s6 capitalize text-fs16 cursor-pointer max-w-[200px] truncate`}
                      >
                        {item.name}
                      </div>
                    </Tooltip>
                  )}
                </Menu.Item> :
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <div
                        onClick={() => {
                          setSelectedItem(item.name);
                          setIsActive(false);
                          itemOnClick(item);
                          // onChange(item);
                        }}
                        className={`${active
                          ? "bg-cBrand text-white rounded-br5"
                          : "bg-white text-cMainBlack"
                          } px-3 drop-shadow-md py-s6 capitalize text-fs16 cursor-pointer max-w-[200px] truncate`}
                      >
                        {item.name}
                      </div>
                    )}
                  </Menu.Item>
              ))
              : data.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        setSelectedItem(item);
                        setIsActive(false);
                        itemOnClick(item);
                        // onChange(item);
                      }}
                      className={`${active
                        ? "bg-cBrand text-white"
                        : "bg-white text-cMainBlack"
                        } px-3 rounded-br5 drop-shadow-md py-s6 capitalize text-fs16 cursor-pointer`}
                    >
                      {item}
                    </div>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default CommonDropDown;
