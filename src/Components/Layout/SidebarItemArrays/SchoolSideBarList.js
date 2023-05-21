
import useLayoutStore from "../../../App/Stores/LayoutStore";
import useNewInvoiceStore from "../../../App/Stores/school/NewInvoiceStore";

import useClassStore from "../../../App/Stores/school/classStore";
import useClassroomStore from "../../../App/Stores/school/classroomStore";
import useNotificationStore from "../../../App/Stores/school/notificationStore";
import useProfileStore from "../../../App/Stores/school/profileStore";
import useSchoolCategoryStore from "../../../App/Stores/school/schoolCategoryStore";
import useSchoolInstructorStore from "../../../App/Stores/school/schoolInstructorStore";
import useSchoolStudentStore from "../../../App/Stores/school/schoolStudentStore";
import {
    iCategory,
    iClassNormal,
    iClassRoomNormal,
    iClassRoomSelected,
    iClassSelected,
    iDashboard,
    iInstructor,
    iInstructorWhite,
    iInvoice,
    iInvoiceWhite,
    iLogOut,
    iNotificationNormal,
    iNotificationSelected,
    iSettings,
    iStudent,
    iStudentWhite,
    iWhiteCategory,
    iWhiteDashboard,
    iWhiteSettings
} from "../../../App/Utility/source";

const {
    setActiveSection,
    setShowLogoutModal
} = useLayoutStore.getState();

const { schoolDashboardDetails } = useProfileStore.getState();

const {
    resetInvoiceFilterData,
    setSelectedInvoiceChip,
    setInvoiceTake,
    setInvoiceSearchKey,
    setInvoicePageUrl,
    setInvoiceUserType,
    setInvoiceIndexData,
    setInvoicePaginationUrl,
    setActiveFilter
} = useNewInvoiceStore.getState();

const {
    setSchoolCategoryPageUrl
} = useSchoolCategoryStore.getState();
const {
    setSchoolPageUrl,
    setClassTakeItem,
    setClassSearchValue
} = useClassStore.getState();
const {
    setSchoolStudentPageUrl,
    setSchoolStudentSearch
} = useSchoolStudentStore.getState();
const {
    setNotificationSearch
} = useNotificationStore.getState();
const {
    setClassroomSearch
} = useClassroomStore.getState();
const {
    setSchoolInstructorSearchKey
} = useSchoolInstructorStore.getState();


const SchoolSideBarList = [

    // home
    {
        onClick: () => {
            setActiveSection("dashboard")
        },
        title: ("Profile"),
        linkTo: "/",
        isActiveLink: "dashboard",
        normalIcon: iDashboard,
        selectedIcon: iWhiteDashboard,
    },
    // notification
    {
        onClick: () => {
            setActiveSection("notification");
            setNotificationSearch("")
        },
        title: "Notification",
        linkTo: "/notification",
        isActiveLink: "notification",
        normalIcon: iNotificationNormal,
        selectedIcon: iNotificationSelected,
    },

    // instructor
    {
        onClick: () => {
            setActiveSection("instructor");
            setSchoolInstructorSearchKey("")
        },
        title: "Instructor",
        linkTo: "/school-instructor",
        isActiveLink: "instructor",
        normalIcon: iInstructorWhite,
        selectedIcon: iInstructor,
        total:schoolDashboardDetails?.total?.instructors
    },

    // student
    {
        onClick: () => {
            setActiveSection("student");
            setSchoolStudentPageUrl("")
            setSchoolStudentSearch("")
        },
        title: "Student",
        linkTo: "/school-student",
        isActiveLink: "student",
        normalIcon: iStudentWhite,
        selectedIcon: iStudent,
        total:schoolDashboardDetails?.total?.students
    },

    // Invoice
    {
        onClick: () => {
            setActiveSection("invoice");
            setInvoiceSearchKey("")
            if (window.location.pathname !== "/invoice") {
                setSelectedInvoiceChip('all')
                setInvoiceIndexData({});
            }
            setActiveFilter(false)
            setInvoiceTake(10);
            resetInvoiceFilterData();
            setInvoicePageUrl("");
            setInvoiceUserType("all");
            setInvoicePaginationUrl("");

        },
        title: "Orders",
        linkTo: "/invoice",
        isActiveLink: "invoice",
        normalIcon: iInvoiceWhite,
        selectedIcon: iInvoice,
        total:schoolDashboardDetails?.total?.order_count
    },

    // Category
    {
        onClick: () => {
            setActiveSection("category");
            setSchoolCategoryPageUrl("")
        },
        title: "Category",
        linkTo: "/school/category-list",
        isActiveLink: "category",
        normalIcon: iWhiteCategory,
        selectedIcon: iCategory,
    },

    // Classes
    {
        onClick: () => {
            setActiveSection("class");
            setSchoolPageUrl("")
            setClassTakeItem(10);
            setClassSearchValue("")
        },
        title: "Classes",
        linkTo: "/classes",
        isActiveLink: "class",
        normalIcon: iClassNormal,
        selectedIcon: iClassSelected,
    },

    // Classes
    {
        onClick: () => {
            setActiveSection("classroom");
            setClassroomSearch("")
        },
        title: "Classroom",
        linkTo: "/classroom",
        isActiveLink: "classroom",
        normalIcon: iClassRoomNormal,
        selectedIcon: iClassRoomSelected,
    },

    // settings
    {
        onClick: () => {
            setActiveSection("settings");
        },
        title: "Settings",
        linkTo: "/settings",
        isActiveLink: "settings",
        normalIcon: iWhiteSettings,
        selectedIcon: iSettings,
    },

    // PlayGround
    // {
    //     onClick: () => {
    //         setActiveSection("PlayGround");
    //     },
    //     title: "Play Ground",
    //     linkTo: "/play",
    //     isActiveLink: "PlayGround",
    //     normalIcon: iWhiteSettings,
    //     selectedIcon: iSettings,
    // },

    // log out
    {
        onClick: () => {
            setShowLogoutModal(true)
        },
        title: "log out",
        linkTo: "/////////////",
        // isActiveLink: "logout",
        normalIcon: iLogOut,
        selectedIcon: iLogOut,
    },

];

export default SchoolSideBarList