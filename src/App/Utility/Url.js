export const BaseUrlSrc = "https://dev-api.maway.dk/";
// export const BaseUrlSrc = "https://stg.maway.dk/";
// export const BaseUrlSrc = "http://192.168.0.212:8004/";

const BaseUrl = BaseUrlSrc + "api/v1.1";
export const BaseUrlSchool = BaseUrlSrc + "api/v1";
export default BaseUrl;

export const userLoginUrl = "/auth/login";
export const userVerifyUrl = "/auth/user";
export const userLogoutUrl = "/auth/logout";
export const kuAuthRegister = "/auth/register";
export const kuResendOtp = "/auth/resend-otp";
export const kuAuthVerify = "/auth/verify";
export const kuFpOtpVerify = "/auth/forgot-password-otp-verify";
export const kuForgetPassword = "/auth/forgot-password";
export const kuResetPassword = "/auth/reset-password";

// b: Dashboard Urls
export const dashboardDataUrl = "/admin/dashboard";
export const dashboardPendingActivityUrl = "/admin/dashboard/pending-activity";


// blue: school urls
export const getAllSchoolListUrl = "/admin/school/filter";
export const schoolAdditionalUrl = "/admin/school/additional-info";
export const detailSchoolUrl = "/admin/school/show";
export const toggleSchoolCategoryUrl = "/admin/school/status-toggle";
export const editSchoolUrl = "/admin/school/update";
export const schoolInvoiceIndexUrl = "/admin/school/invoice/filter";
export const schoolCategoryUrl = "/admin/school/categories/index"
export const schoolCategoryShowUrl = "/admin/school/categories/show"
export const schoolCategoriesToggleUrl = "/admin/school/categories/status-toggle"
export const schoolCategoriesLessonDeleteUrl = "/admin/school/categories/lesson/delete"
export const schoolCategoriesUpdateUrl = "/admin/school/categories/update"
export const schoolCategoriesLessonAddUrl = "/admin/school/categories/lesson/create"
export const schoolCategoriesLessonEditUrl = "/admin/school/categories/lesson/update"
export const schoolInstructorListUrl = "/admin/school/instructors/index"
export const schoolInstructorShowUrl = "/admin/school/instructors/show"
export const schoolInstructorsFindUrl = "admin/school/instructors/find"
export const schoolInstructorsFindShowUrl = "/admin/school/instructors/find-show"
export const schoolInstructorsAddUrl = "/admin/school/instructors/add"
export const adminSchoolInstructorsRemoveUrl = "/admin/school/instructors/remove"
export const schoolInstructorsRejectUrl = "/admin/school/instructors/reject"
export const adminSchoolInstructorAcceptUrl = "/admin/school/instructors/accept"
export const schoolStudentListUrl = "/admin/school/student/index"
export const updateSchoolCategoryListItemOrderUrl = "/admin/school/categories/lesson/update-index"


// terms
export const getTermsUrl = "/admin/terms-and-condition/get";
export const updateTermsUrl = "/admin/terms-and-condition/update";

//blue: update profile
export const updateProfileUrl = "/common/auth/profile/update";
export const getProfileUrl = "/common/auth/user";
export const changePasswordUrl = "/common/auth/profile/change-password";
export const deleteAccountUrl = "/common/auth/profile/delete";


// b: License
export const getLicenseIndexUrl = "/admin/license/index";
export const toggleLicenseUrl = "/admin/license/toggle-status";
export const addNewLicenseUrl = "/admin/license/add";
export const updateLicenseUrl = "/admin/license/update";
export const deleteLicenseUrl = "/admin/license/delete";
export const filterLicenseUrl = "/admin/license/filter";
export const updateLicenseDurationUrl = "/admin/invoices/license_purchase/edit-license-dates";
export const licenseDetailsUrl = "/admin/license/details"
export const assignLicenseUrl = "/admin/license/license-assign"

// b:     instructor
export const instructorIndexUrl = "/admin/instructor/all";
export const instructorDetailsUrl = "/admin/instructor/show";
export const instructorAdditionalUrl = "/admin/instructor/additional-info";
export const instructorToggleStatusUrl = "/admin/instructor/status-toggle";
export const instructorFilterUrl = "/admin/instructor/filter";
export const editInstructorDetailUrl = "/admin/instructor/update";

// g:   invoice
export const getInvoiceIndexUrl = "/admin/invoices/license_purchase/index";
export const getSystemGenInvoiceIndexUrl = "/admin/invoices/system-generated/index";
export const getSystemGenInvoiceDetailsUrl = "/admin/invoices/system-generated/show";
export const getInvoiceDetailsUrl = "/admin/invoices/license_purchase/show";
export const changeInvoiceStatusUrl = "admin/invoices/license_purchase/status-change";
export const changeSystemInvoiceStatusUrl = "/admin/invoices/system-generated/status-change";
export const shareInvoiceDetailsUrl = "/share";
export const secondaryInvoiceDetailsUrl = "/admin/school/invoice/show";


//student
export const getStudentListUrl = "/admin/student/all";
export const getStudentDetailsUrl = "/admin/student/show";
export const getStudentAdditionalUrl = "/admin/student/additional-info";
export const toggleStatusStudentUrl = "/admin/student/status-toggle";
export const studentFilterSearchUrl = "/admin/student/filter";
export const editStudentDetailUrl = "/admin/student/update"
export const getStudentCurriculumIndex = "/admin/student/curriculum/index";
export const studentHistoryCategoryUrl = "/admin/student/curriculum/history/category-index"
export const studentHistoryCategoryLessonUrl = "/admin/student/curriculum/history/category-lessons"
export const studentSchoolListUrl = "/admin/student/schools/index"
export const studentFindSchoolListUrl = "/admin/student/schools/find-school/index"
export const studentFindSchoolInfoUrl = "/admin/student/schools/find-school/school-info"
export const studentFindSchoolAddUrl = "/admin/student/schools/find-school/add"
export const studentFindSchoolFilterOptionsUrl = "/admin/student/schools/find-school/get-filter-options"

// FAQ urls
export const allFaqListUrl = "/admin/faq/filter";
export const addFaqUrl = "/admin/faq/create";
export const updateFaqUrl = "/admin/faq/update";
export const deleteFaqUrl = "/admin/faq/delete";
export const faqDetailUrl = "/admin/faq/show";
export const toggleStatusFaqUrl = "/admin/faq/status-toggle";

//Terms & Condition
export const allTermsConditionUrl = "/admin/terms-conditions/index";
export const addTermsConditionUrl = "/admin/terms-conditions/create";
export const detailTermsConditionUrl = "/admin/terms-conditions/show";
export const editTermsConditionUrl = "/admin/terms-conditions/update";
export const deleteTermsConditionUrl = "/admin/terms-conditions/delete";
export const toggleStatusTermsConditionUrl =
  "/admin/terms-conditions/status-toggle";


//pass change url
export const settingsChangePasswordUrl = "/admin/profile/change-password";


//e ###=========SCHOOL_WEB=================###
// invoice new
export const newInvoiceIndexUrl = "/school/invoice/filter-invoice";
export const newInvoiceDetailsUrl = "/school/invoice/show";
export const newSystemInvoiceStatusUpdateUrl = "/school/invoice/system-generated/status-change";
export const newInvoiceDetailsStatusUpdateUrl = "/school/invoice/status-change";
export const newInstructorInvoiceStatusUpdateUrl = "/school/invoice/ins_pay/pay";
export const newInstructorInvoiceStatusRejectUrl = "/school/invoice/ins_pay/reject";
export const newSchoolAdminPaymentUrl = "/common/invoice/pay";
export const newSchoolAdminCancelUrl = "/common/invoice/cancel";
export const commonInvoiceReminderUrl = "/remind";
export const commonInvoiceContactAdminUrl = "/remind";
export const balanceInvoiceUrl = "/school/invoice/balance-list";
export const invoicePayoutUrl = "/school/invoice/generate-freepay-order";


// ###=========Tested=================###


//Settings
export const schoolContactUsUrl = "/common/contact-us/send";
export const schoolFaqsUrl = "/common/faqs";
export const schoolTermsConditionsUrl = "/common/terms-conditions";
export const schoolLanguageIndexUrl = "/language/index";
export const schoolLanguageSetUrl = "/language/set";
export const schoolChangePasswordUrl = "/school/profile/change-password";
export const schoolBankInfoUrl = "/school/bank-info/get-info";
export const schoolAddBankInfoUrl = "/school/bank-info/add-bank";

//school Dashboard
export const schoolDashboardUrl = "/school/dashboard";
export const schoolProfileEditUrl = "/school/profile/update";
export const schoolGetLisencesUrl = "/common/lisence/get-lisences";
export const schoolDeleteMessageUrl = "/common/delete-msg";
export const schoolDeleteUrl = "/school/delete";

// school category
export const schoolCategoryListUrl = "/school/school-category/index";
export const schoolCategoryListShowUrl = "/school/school-category/show";
export const schoolCategoryLessonUrl = "/school/lesson/index";
export const schoolCategoryToggleUrl = "/school/school-category/status-toggle";
export const schoolCategoryAddLessonUrl = "/school/lesson/create";
export const schoolCategoryLessonShowUrl = "/school/lesson/show";
export const schoolCategoryEditLessonUrl = "/school/lesson/update";
export const schoolCategoryDeleteLessonUrl = "/school/lesson/delete";
export const schoolCategoryLessonUpdateIndexUrl = "school/lesson/update-index";
export const schoolCategoryEditUrl = "/school/school-category/update";


//classRoom
export const schoolClassroomUrl = "/school/classroom/index";
export const schoolCreateClassroomUrl = "/school/classroom/create";
export const schoolShowClassroomUrl = "/school/classroom/show";
export const schoolEditClassroomUrl = "/school/classroom/update";
export const schoolDeleteClassroomUrl = "/school/classroom/delete";


//class
export const schoolClassListUrl = "/school/class/index";
export const schoolClassAddUrl = "/school/class/add";
export const schoolClassAddInfoUrl = "/school/class/add/index";
export const schoolClassDetailsUrl = "/school/class/show";
export const schoolClassEditUrl = "/school/class/edit";
export const schoolClassDeleteUrl = "/school/class/delete";
export const schoolClassCancelUrl = "/school/class/cancel";

//add License
export const schoolAddLicenseUrl = "/common/purchase-lisence/add";

//Notification
export const notificationIndexUrl = "/common/web/notification/index";
export const notificationShowUrl = "/common/notification/show";

//school-student
export const schoolStudentIndexUrl = "/school/student/web/index";
export const schoolStudentShowUrl = "/school/student/web/show";
export const schoolStudentInvoiceUrl = "/school/invoice/filter-invoice";
export const schoolStudentCurriculumUrl = "/school/student/web/curriculum";
export const schoolStudentCurriculumShowUrl = "/school/student/web/curriculum/show";
export const schoolStudentInvoiceShowUrl = "/school/invoice/show";
export const schoolStudentBalanceHistoryUrl = "/school/student/web/balance/history";
export const schoolStudentBalanceHistoryShowUrl = "/school/student/web/balance/history/show";
export const schoolStudentBalancePayUrl = "/school/student/balance/pay";
export const schoolStudentBalanceRefundUrl = "/school/student/balance/refund";
export const schoolStudentAdmissionInvoiceUrl = "/school/invoice/get-admission-invoice";
export const schoolStudentInvoiceStatusChangeUrl = "/school/invoice/status-change";


//school-instructor
export const schoolInstructorIndexUrl = "/school/instructor/instructor-index";
export const schoolInstructorDetailsUrl = "/school/instructor/show";
export const schoolInstructorRejectUrl = "/school/instructor/reject";
export const schoolInstructorAcceptUrl = "/school/instructor/accept";
export const schoolInstructorsRemoveUrl = "/school/instructor/remove";
export const schoolInstructorsLessonUrl = "/school/instructor/lesson-filter";
export const schoolInstructorsLessonDetailsUrl = "/school/instructor/lesson-details";
export const schoolInstructorsInvoiceFilterUrl = "/school/invoice/filter-invoice";
export const schoolInstructorsAdditionalInfoUrl = "/school/instructor/additional-info";


// bank
export const adminSchoolBankInfoUrl = "/admin/school/bank-info/get-info";
