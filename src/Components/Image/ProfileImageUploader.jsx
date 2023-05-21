import React, { useRef, useState } from "react";
import { iProfile } from "../../App/Utility/source";
import { iImageUploder, iImageIogo } from "./../../App/Utility/source";
import { Toastr } from "../../App/Utility/UtilityFunctions";
import { render } from "@testing-library/react";

export default function ProfileImageUploader({
  setImage,
  FileData,
  onChange = () => { },
  finalBase64 = () => { },
  iImage = iImageIogo,
  imageUploader,
  imageName = "",
  rounded = true,
  bannerImage = false,
  categoryImg = false
}) {
  const [tempImage, setTempImage] = useState(iImage);

  const inputFile = useRef(null);

  const onButtonClick = () => inputFile.current.click();

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    var image = new Image();
    var reader = new FileReader();
    reader.onloadend = async function () {
      setTempImage(reader.result);
      finalBase64(reader.result);
      (await FileData) && FileData("icon", reader.result);
      (await imageUploader) && imageUploader(imageName, reader.result);
      (await setImage) && setImage(reader.result);
      // console.log("reader.result: ", reader.result);
    };
    reader.onload = (event) => {
      //setTempImage(reader.result);
      image.src = event.target.result;
    };

    if (bannerImage) {
      if (!/^image\/(png|jpe?g|gif)$/.test(file.type))
        return Toastr({ message: "Unsupported file type", type: "error" });

      //image width and height validation code below

      // image.onload = () => {
      //   console.log("image on load");
      //   if (image.width === 1200 && image.height === 600) {
      //     // setTempImage(reader.result);
      //     Toastr({
      //       message: "Nice, image is the right size. It can be uploaded",
      //       type: "success",
      //     });
      //   } else {
      //     Toastr({
      //       message: `Sorry, this image doesn't look like the size we wanted. It's
      //     ${image.width} x ${image.height} but we require 1200 x 600 size image.`,
      //       type: "error",
      //     });
      //     setTempImage(iImage);
      //     //   alert(`Sorry, this image doesn't look like the size we wanted. It's
      //     // ${image.width} x ${image.height} but we require 1200 x 600 size image.`);
      //   }
      // };
    }
    reader.readAsDataURL(file);
    onChange(file);
  };
  return (
    <>
      {tempImage ? (
        <div className="relative">
          <div
            className={`${rounded ? "h-[144px]" : "h-[144px]"}  ${rounded ? "w-[144px]" : "w-[400px]"}
            ${rounded ? "rounded-full" : "rounded-br10"}  bg-cBackgroundAndCategory overflow-hidden select-none relative`}
          >
            <input
              onChange={onChangeFile.bind(this)}
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
            />

            <div className="rounded-full">
              {categoryImg && <img
                className={`${rounded ? "h-[85px]" : "h-[144px]"}  ${rounded ? "w-[100px]" : "w-[400px]"} 
                bg-cBackgroundAndCategory overflow-hidden select-none relative mt-s30 ml-s25`}
                src={tempImage ? tempImage : iProfile}
                alt="profile-pic"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = iImageIogo;
                }}
              />}
              {!categoryImg &&
                <img
                  className={`
                          ${rounded ? "h-[144px]" : "h-[144px]"}  ${rounded ? "w-[144px]" : "w-[400px]"}
                          ${rounded ? "rounded-full" : "rounded-br10"}
                          bg-cBackgroundAndCategory overflow-hidden select-none relative object-cover
                  `}
                  src={tempImage ? tempImage : iProfile}
                  alt="profile-pic"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = iImageIogo;
                  }}
                />}
            </div>
          </div>
          <div
            onClick={onButtonClick}
            className="z-50 cursor-pointer w-[100px] h-[40px] absolute bottom-0 -right-6  "
          >
            <img
              src={iImageUploder}
              alt="upload a pic"
              className="w-[34px] mx-auto pt-1 z-20"
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <div
            className={`${rounded ? "h-[144px]" : "h-[144px]"}  ${rounded ? "w-[144px]" : "w-[400px]"
              } ${rounded ? "rounded-full" : "rounded-br10"
              } bg-cBackgroundAndCategory overflow-hidden 
          select-none relative`}
          >
            <input
              onChange={onChangeFile.bind(this)}
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
            />
            <img
              className={`h-[74px] w-[74px]  object-none  ${rounded ? "m-s35" : "my-s35 mx-s165"
                }`}
              src={tempImage ? tempImage : iImageIogo}
              alt="profile-pic"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = iImageIogo;
              }}
            />
          </div>
          <div>
            <div
              onClick={onButtonClick}
              className="z-50 cursor-pointer w-[100px] h-[40px] absolute bottom-0 -right-6"
            >
              <img
                src={iImageUploder}
                alt="upload a pic"
                className="w-[34px] mx-auto pt-1 z-20"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
