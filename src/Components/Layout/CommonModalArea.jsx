import React from "react";
import InvoiceFilterModal from "./../../Pages/Invoice/InvoiceModal/InvoiceFilterModal";
import ShareInvoiceModal from "../../Pages/Invoice/InvoiceModal/ShareInvoiceModal";
import LogoutModal from "./component/LogoutModal";
import useLayoutStore from "../../App/Stores/LayoutStore";
import { handleUserLogout } from "../../App/Stores/authStore";
import ImagePreviewPopup from "../Image/ImagePreviewPopup";
import AddClassModal from "../../Pages/MawaySchoolWeb/classes/modal/AddClassModal";
import EditClassModal from "../../Pages/MawaySchoolWeb/classes/modal/EditClassModal";
import EditProfile from "../../Pages/MawaySchoolWeb/profile/modal/EditProfile";
import LicenseDetails from "../../Pages/MawaySchoolWeb/profile/modal/LicenseDetails";
import SchoolCategoryListDeactivateModal from "../../Pages/MawaySchoolWeb/category/modal/SchoolCategoryListDeactivateModal";
import AddCategoryListLessonModal from "../../Pages/MawaySchoolWeb/category/modal/AddCategoryListLessonModal";
import AddClassroomModal from "../../Pages/MawaySchoolWeb/classroom/modal/AddClassroomModal";
import EditClassroomModal from "../../Pages/MawaySchoolWeb/classroom/modal/EditClassroomModal";
import DeleteClassroomModal from "../../Pages/MawaySchoolWeb/classroom/modal/DeleteClassroomModal";
import EditCategoryListLessonModal from "../../Pages/MawaySchoolWeb/category/modal/EditCategoryListLessonModal";
import DeleteCategoryListLessonModal from "../../Pages/MawaySchoolWeb/category/modal/DeleteCategoryListLessonModal";
import DeleteClassModal from "../../Pages/MawaySchoolWeb/classes/modal/DeleteClassModal";
import EditSchoolCategoryDetailsModal from "../../Pages/MawaySchoolWeb/category/modal/EditSchoolCategoryDetailsModa";
import AddBankInfoModal from "../../Pages/settings/Components/school/modal/AddBankInfoModal";
import ClassDetailsModal from "../../Pages/MawaySchoolWeb/classes/modal/ClassDetailsModal";
import CancelClassNoteModal from "../../Pages/MawaySchoolWeb/classes/modal/CancelClassNoteModal";
import AcceptNoteModal from "../../Pages/MawaySchoolWeb/Instructor/modal/AcceptNoteModal";
import RejectionReasonModal from "../../Pages/MawaySchoolWeb/Instructor/modal/RejectionReasonModal";
import InstructorRemoveModal from "../../Pages/MawaySchoolWeb/Instructor/modal/InstructorRemoveModal";
import InstructorRequestDetailsModal from "../../Pages/MawaySchoolWeb/Instructor/modal/InstructorRequestDetailsModal";
import SchoolStudentInvoiceModal from "../../Pages/MawaySchoolWeb/student/modal/SchoolStudentInvoiceModal";
import LessonDetailsModal from "../../Pages/MawaySchoolWeb/Instructor/modal/LessonDetailsModal";
import InvoiceUpdatePrice from "../../Pages/MawaySchoolWeb/invoice/modal/InvoiceUpdatePrice";
import InvoiceAcceptNote from "../../Pages/MawaySchoolWeb/invoice/modal/InvoiceAcceptNote";
import InvoiceRejectNote from "../../Pages/MawaySchoolWeb/invoice/modal/InvoiceRejectNote";
import InvoicePaymentDetailsModal from "../../Pages/MawaySchoolWeb/invoice/modal/InvoicePaymentDetailsModal";
import UpdatePrice from "../../Pages/MawaySchoolWeb/student/modal/UpdatePrice";
import RefundModal from "../../Pages/MawaySchoolWeb/student/modal/RefundModal";
import InvoiceLessonListModal from "../../Pages/MawaySchoolWeb/invoice/modal/InvoiceLessonListModal";
import InstructorInvoiceMakePaymentModal from "../../Pages/MawaySchoolWeb/invoice/modal/InstructorInvoiceMakePaymentModal";
import AdminInvoiceMakePaymentModal from "../../Pages/MawaySchoolWeb/invoice/modal/AdminInvoiceMakePaymentModal";
import InstructorInvoiceRejectNote from "../../Pages/MawaySchoolWeb/invoice/modal/InstructorInvoiceRejectNote";
import NewInvoiceShareModal from "../../Pages/MawaySchoolWeb/invoice/modal/NewInvoiceShareModal";
import AdminInvoiceCancelNote from "../../Pages/MawaySchoolWeb/invoice/modal/AdminInvoiceCancelNote";
import InvoiceDetailsLessonList from "../../Pages/MawaySchoolWeb/invoice/modal/InvoiceDetailsLessonList";
import SchoolStudentCurriculumDetailsModal from "../../Pages/MawaySchoolWeb/student/modal/SchoolStudentCurriculumDetailsModal";
import TransactionDetailsModal from "../../Pages/MawaySchoolWeb/student/modal/TransactionDetailsModal";
import PayModal from "../../Pages/MawaySchoolWeb/student/modal/PayModal";
import BankInfoEditModal from "../../Pages/settings/Components/school/modal/BankInfoEditModal";
import NotificationAlertModal from "../../Pages/MawaySchoolWeb/notification/modal/NotificationAlertModal";
import AdminToSchoolPayModal from "../../Pages/MawaySchoolWeb/invoice/modal/AdminToSchoolPayModal";
import SchoolAcceptNoteToSystem from "../../Pages/MawaySchoolWeb/invoice/modal/SchoolAcceptNoteToSystem";
import NotificationDetailsModal from "../../Pages/MawaySchoolWeb/notification/modal/NotificationDetailsModal";
import LicenseOverViewDetails from "../../Pages/MawaySchoolWeb/profile/modal/LicenseOverViewDetails";
import PayoutModal from "../../Pages/MawaySchoolWeb/invoice/modal/PayoutModal";
import DeleteAccountModal from "../../Pages/MawaySchoolWeb/profile/modal/DeleteAccountModal";

export default function CommonModalArea() {
  const { setShowLogoutModal, showLogoutModal } = useLayoutStore();
  return (
    <>
      {/* System Modal */}
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        handleUserLogout={handleUserLogout}
      />
      <ImagePreviewPopup />

      {/* invoice modals */}
      <InvoiceFilterModal />
      <ShareInvoiceModal />

      <AddBankInfoModal />



      {/* ### ==============================
      ###             School
      ### ==================================
      */}

      {/*e    invoice area  */}
      <InvoiceUpdatePrice />
      <InvoiceAcceptNote />
      <InvoiceRejectNote />
      <NewInvoiceShareModal />
      <InvoiceDetailsLessonList />

      <InstructorInvoiceRejectNote />
      <InstructorInvoiceMakePaymentModal />
      <AdminInvoiceMakePaymentModal />
      <AdminInvoiceCancelNote />
      <InvoicePaymentDetailsModal />
      <InvoiceLessonListModal />
      <AdminToSchoolPayModal />
      <SchoolAcceptNoteToSystem />
      <PayoutModal/>


      {/* class Modal */}
      <AddClassModal />
      <EditClassModal />
      <DeleteClassModal />
      <ClassDetailsModal />
      <CancelClassNoteModal />


      {/* Profile */}
      <EditProfile />
      <LicenseDetails />
      <LicenseOverViewDetails/>
      <DeleteAccountModal/>

      {/* category */}
      <SchoolCategoryListDeactivateModal />
      <AddCategoryListLessonModal />
      <EditCategoryListLessonModal />
      <DeleteCategoryListLessonModal />
      <EditSchoolCategoryDetailsModal />

      {/* classroom */}
      <AddClassroomModal />
      <EditClassroomModal />
      <DeleteClassroomModal />

      {/* Instructor */}
      <AcceptNoteModal />
      <RejectionReasonModal />
      <InstructorRemoveModal />
      <InstructorRequestDetailsModal />
      <SchoolStudentInvoiceModal />
      <LessonDetailsModal />


      {/* student */}
      <UpdatePrice />
      <PayModal />
      <TransactionDetailsModal />
      <RefundModal />
      <SchoolStudentCurriculumDetailsModal />

      <BankInfoEditModal />


      <NotificationAlertModal/>
      <NotificationDetailsModal/>
    </>
  );
}
