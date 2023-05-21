/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useProfileStore, { getSchoolDashboard } from "../../App/Stores/school/profileStore";
import { useEffect } from "react";
import useGeneralStore from "../../App/Stores/GeneralStore";
import { k_role } from "../../App/Utility/const";

export default function NormalSideBarItem({
  title,
  linkTo = null,
  isActiveLink,
  isOpenSidebar,
  normalIcon,
  selectedIcon,
  onClick,
  total
}) {


  const { role } = useGeneralStore();

  useEffect(() => {
    fetchStudentDashboard()
  }, [])

  const fetchStudentDashboard = async () => {
    if (role === k_role?.school) {
      await getSchoolDashboard();
    }
  }

  const { schoolDashboardDetails } = useProfileStore.getState();

  return (
    <Tooltip
      title={isOpenSidebar ? "" : title}
      placement="right"
      componentsProps={{
        tooltip: {
          sx: {
            textTransform: "capitalize"
          }
        }
      }}
    >
      <Link onClick={onClick} className={`mt-s5`} to={linkTo}>
        <div
          className={`pr-s12 pl-s9 flex items-center justify-between h-[45px] transition-all duration-300 hover:bg-cBrand
           ${isActiveLink === true
              ? "bg-cBrand text-cBrandColor2"
              : "bg-cSidebarDarkBg text-cBrandColor2"} ${isOpenSidebar ? "px-0 rounded-br4" : "justify-center w-20"}`}>

          <div className="flex items-center">
            <div
              className={`flex justify-center items-center rounded-full transition-all duration-300 w-s34 h-s34
             ${isActiveLink === true ? "" : "bg-cSidebarDarkBg "} ${isOpenSidebar ? "my-s7" : ""}`}>
              <img
                className="object-cover w-s20 h-s20"
                src={isActiveLink === true ? selectedIcon : normalIcon}
                alt="sidebar-icon"
              />
            </div>
            {isOpenSidebar ? (
              <div className="pl-s12 text-left capitalize font-fw600 text-[13px]">
                {title}
              </div>
            ) : (
              ""
            )}
          </div>
          {title === "Instructor" && role === k_role?.school && schoolDashboardDetails?.total?.instructors !== 0 ?
            <div className="h-s20 w-s20 bg-cPending rounded-full flex justify-center items-center text-cBlack small_body_text">
              {schoolDashboardDetails?.total?.instructors}
            </div> : ''}

          {title === "Student" && role === k_role?.school && schoolDashboardDetails?.total?.web_students_count !== 0 ?
            <div className="h-s20 w-s20 bg-cPending rounded-full flex justify-center items-center text-cBlack small_body_text">
              {schoolDashboardDetails?.total?.web_students_count}
            </div> : ''}

          {title === "Orders" && role === k_role?.school && schoolDashboardDetails?.total?.order_count !== 0 ?
            <div className="h-s20 w-s20 bg-cPending rounded-full flex justify-center items-center text-cBlack small_body_text">
              {schoolDashboardDetails?.total?.order_count}
            </div>
             : ''}
        </div>
      </Link>
    </Tooltip >
  );
}

export const chipList = ({ value }) => {
  return (
    <div className="h-s18 w-s18 bg-cPending rounded-full flex justify-center items-center text-cBlack small_body_text">
      {value}
    </div>
  )
}
