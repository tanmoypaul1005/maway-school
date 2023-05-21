import React, { useState } from "react";
import { useRef } from "react";
import { getBase64 } from "../../App/Utility/UtilityFunctions";
import { BaseUrlSrc } from "../../App/Utility/Url";
import UploadBtn from "../Button/UploadBtn";
import { UploadCloud } from "../Utility/ImageImports";
import { useTranslation } from "react-i18next";

export default function ImageUpload({
  CustomStyles,
  onChangeFile,
  imgValue = "",
  customWidth = "",
  required = false,
  btnLabel = "Select Image"
}) {
  const { t } = useTranslation();

  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChange] = useState(false);

  const handleClick = () => inputRef.current.click();

  const handleFileChange = (e) => {
    getBase64(e.target.files[0], (result) => {
      // console.log(result);
      setImage(result);
      setIsImageChange(true);
      onChangeFile(result);
    });
    e.target.files = null;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-s350 rounded-br10 border border-dashed">
        <img
          src={
            isImageChanged
              ? image
              : imgValue
                ? BaseUrlSrc + "/" + imgValue
                : UploadCloud
          }
          className={`w-s200 h-s200 object-cover mx-auto rounded-br5 ${image || imgValue ? "hover:scale-150 " : ""} duration-500 `}
          alt="img"
        />
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
        <div className="flex justify-center pt-5">
          <UploadBtn
            colorType="primary"
            btnLabel={image || imgValue ? t("change image") : t("upload image")}
            type="button"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}
