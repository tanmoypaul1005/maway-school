import axios from "axios";
import { t } from "i18next";
import create from "zustand";
import { Toastr } from "../Utility/UtilityFunctions";
import { adminSchoolBankInfoUrl, adminSchoolInstructorAcceptUrl, adminSchoolInstructorsRemoveUrl, detailSchoolUrl, editSchoolUrl, getAllSchoolListUrl, schoolAdditionalUrl, schoolCategoriesLessonAddUrl, schoolCategoriesLessonDeleteUrl, schoolCategoriesLessonEditUrl, schoolCategoriesToggleUrl, schoolCategoriesUpdateUrl, schoolCategoryShowUrl, schoolCategoryUrl, schoolInstructorAcceptUrl, schoolInstructorListUrl, schoolInstructorsAddUrl, schoolInstructorsFindShowUrl, schoolInstructorsFindUrl, schoolInstructorShowUrl, schoolInstructorsRejectUrl, schoolInstructorsRemoveUrl, schoolStudentListUrl, toggleSchoolCategoryUrl, updateSchoolCategoryListItemOrderUrl } from './../Utility/Url';
import useUtilityStore from "./UtilityStore";

const { setLoading } = useUtilityStore.getState();

const useSchoolStore = create((set) => ({

  schoolListAll: [],
  setSchoolListAll: (value) => set({ schoolListAll: value }),

  bankInfo: {},
  setBankInfo: (value) => set({ bankInfo: value }),

  showBankDetailsModal: false,
  setShowBankDetailsModal: (value) => set({ showBankDetailsModal: value }),

  schoolCategoryListAll: [],
  setSchoolCategoryListAll: (value) => set({ schoolCategoryListAll: value }),

  schoolInstructorList: [],
  setSchoolInstructorList: (value) => set({ schoolInstructorList: value }),

  schoolStudentList: [],
  setSchoolStudentList: (value) => set({ schoolStudentList: value }),

  schoolInstructorDetailShow: [],
  setSchoolInstructorDetailShow: (value) => set({ schoolInstructorDetailShow: value }),

  schoolCategoryShow: {},
  setSchoolCategoryShow: (value) => set({ schoolCategoryShow: value }),

  schoolCategoryLessonDetails: {},
  setSchoolCategoryLessonDetails: (value) => set({ schoolCategoryLessonDetails: value }),

  schoolDetails: {},
  setSchoolDetails: (value) => set({ schoolDetails: value }),

  schoolAdditionalCounter: {},
  setSchoolAdditionalCounter: (value) => set({ schoolAdditionalCounter: value }),

  schoolDeactivateID: 0,
  setSchoolDeactivateID: (value) => set({ schoolDeactivateID: value }),

  schoolTakeList: { take: 10 },
  setSchoolTakeList: (name, value) => set((state) => (state.schoolTakeList[name] = value)),

  // categorySchoolDeactivateID: 0,
  // setSchoolDeactivateID: (value) => set({ schoolDeactivateID: value }),

  schoolInstructorPageUrl: "",
  setSchoolInstructorPageUrl: (value) => set({ schoolInstructorPageUrl: value }),

  lessonDeleteID: "",
  setLessonDeleteID: (value) => set({ lessonDeleteID: value }),

  schoolInstructorsFindValue: [],
  setSchoolInstructorsFindValue: (value) => set({ schoolInstructorsFindValue: value }),

  schoolInstructorsSearchValue: "",
  setSchoolInstructorsSearchValue: (value) => set({ schoolInstructorsSearchValue: value }),

  schoolInstructorsFindDetails: [],
  setSchoolInstructorsFindDetails: (value) => set({ schoolInstructorsFindDetails: value }),

  EditFormData: {
    school_name: "",
    cvr: "",
    address: "",
    website: "",
    phone_number: "",
    contact_mail: "",
    cover: "",
    l_description: "",
    zip: "",
    city: ""
  },
  setEditFormData: (name, value) =>
    set((state) => (state.EditFormData[name] = value)),

  resetSchoolEditFormData: (value) => set({
    EditFormData: {
      school_name: "",
      cvr: "",
      address: "",
      website: "",
      phone_number: "",
      contact_mail: "",
      cover: "",
      l_description: "",
      zip: "",
      city: ""
    }
  }),

  schoolSearchKey: "",
  setSchoolSearchKey: (value) => set({ schoolSearchKey: value }),

  schoolSearchValue: '',
  setSchoolSearchValue: (value) => set({ schoolSearchValue: value }),


  // for filter ui only
  licenseArray: [],
  setLicenseArray: (value) => set({ licenseArray: value }),

  FilterSchoolActive: false,
  setFilterSchoolActive: (value) => set({ FilterSchoolActive: value }),

  filterData: {
    search: "",
    status: -1,
    license_id: -1,
    payment_status: [],
  },
  setFilterData: (value) => set({ filterData: value }),
  resetSchoolFilterData: (value) => set({
    filterData: {
      search: "",
      status: -1,
      license_id: -1,
      payment_status: [],
    }
  }),

  searchKey: "",
  setSearchKey: (value) => set({ searchKey: value }),

  schoolPageUrl: "",
  setSchoolPageUrl: (value) => set({ schoolPageUrl: value }),

  schoolInstructorAppliedCategories: [],
  setSchoolInstructorAppliedCategories: (value) => set({ schoolInstructorAppliedCategories: value }),

  schoolInstructorAppliedCategoriesValue: [],
  setSchoolInstructorAppliedCategoriesValue: (value) => set({ schoolInstructorAppliedCategoriesValue: value }),

  appliedCategoriesSuccessId: 0,
  setAppliedCategoriesSuccessId: (value) => set({ appliedCategoriesSuccessId: value }),

  schoolStudentType: "active",
  setSchoolStudentType: (value) => set({ schoolStudentType: value }),

  schoolStudentPageUrl: "",
  setSchoolStudentPageUrl: (value) => set({ schoolStudentPageUrl: value }),

  // Modals
  showSchoolFilterModal: false,
  setShowSchoolFilterModal: (value) => set({ showSchoolFilterModal: value }),

  showDeleteModal: false,
  setShowDeleteModal: (value) => set({ showDeleteModal: value }),

  showEditModal: false,
  setShowEditModal: (value) => set({ showEditModal: value }),

  showDeactivateSchool: false,
  setShowDeactivateSchool: (value) => set({ showDeactivateSchool: value }),

  showStudentEditModal: false,
  setShowStudentEditModal: (value) => set({ showStudentEditModal: value }),

  showEditSchoolModal: false,
  setShowEditSchoolModal: (value) => set({ showEditSchoolModal: value }),

  showInstructorProfileEditModal: false,
  setShowInstructorProfileEditModal: (value) => set({ showInstructorProfileEditModal: value }),

  showExpertiseAreaModal: false,
  setShowExpertiseAreaModal: (value) => set({ showExpertiseAreaModal: value }),

  showEditLicenseModal: false,
  setShowEditLicenseModal: (value) => set({ showEditLicenseModal: value }),

  showAddClassModal: false,
  setShowAddClassModal: (value) => set({ showAddClassModal: value }),

  showEditClassDetailModal: false,
  setShowEditClassDetailModal: (value) => set({ showEditClassDetailModal: value }),

  showEditClassRoomDetailModal: false,
  setShowEditClassRoomDetailModal: (value) => set({ showEditClassRoomDetailModal: value }),

  showAddClassRoomDetailModal: false,
  setShowAddClassRoomDetailModal: (value) => set({ showAddClassRoomDetailModal: value }),

  showSchoolChangePassModal: false,
  setShowSchoolChangePassModal: (value) => set({ showSchoolChangePassModal: value }),

  showAddSchoolModal: false,
  setShowAddSchoolModal: (value) => set({ showAddSchoolModal: value }),

  showSchoolAddPassModal: false,
  setShowSchoolAddPassModal: (value) => set({ showSchoolAddPassModal: value }),

  showCategoryLessonDetailsModal: false,
  setShowCategoryLessonDetailsModal: (value) => set({ showCategoryLessonDetailsModal: value }),

  showEditCategoryLessonDetailsModal: false,
  setShowEditCategoryLessonDetailsModal: (value) => set({ showEditCategoryLessonDetailsModal: value }),

  showEditID: 0,
  setShowEditID: (value) => set({ showEditID: value }),

  showDeactivateModal: false,
  setShowDeactivateModal: (value) => set({ showDeactivateModal: value }),

  addingNewCategory: false,
  setAddingNewCategory: (value) => set({ addingNewCategory: value }),

  showSchoolCategoryDeactivateModal: false,
  setShowSchoolCategoryDeactivateModal: (value) => set({ showSchoolCategoryDeactivateModal: value }),

  showAddSchoolCategoryModal: false,
  setShowAddSchoolCategoryModal: (value) => set({ showAddSchoolCategoryModal: value }),

  showSchoolCategoryDeleteModal: false,
  setShowSchoolCategoryDeleteModal: (value) => set({ showSchoolCategoryDeleteModal: value }),

  showEditSchoolCategoryModal: false,
  setShowEditSchoolCategoryModal: (value) => set({ showEditSchoolCategoryModal: value }),

  showAddSchoolInstructorModal: false,
  setShowAddSchoolInstructorModal: (value) => set({ showAddSchoolInstructorModal: value }),

  showSchoolInstructorsAddExpertiseArea: false,
  setShowSchoolInstructorsAddExpertiseArea: (value) => set({ showSchoolInstructorsAddExpertiseArea: value }),

  showSchoolInstructorAppliedCategories: false,
  setShowSchoolInstructorAppliedCategories: (value) => set({ showSchoolInstructorAppliedCategories: value }),

}));

export default useSchoolStore;

const { setSchoolListAll, setSchoolDetails, schoolTakeList, resetSchoolEditFormData } = useSchoolStore.getState();

export const getSchoolList = async (url = "", data, take = "", showLoader = true) => {
  const { setFilterSchoolActive } = useSchoolStore.getState();
  try {
    let filterForm = { ...data };
    if (filterForm?.search === "") delete filterForm.search;
    if (filterForm?.status === -1) delete filterForm.status;
    if (filterForm?.license_id === -1) delete filterForm.license_id;
    if (filterForm?.payment_status?.length === 0) delete filterForm.payment_status;

    // return
    if (Object.keys(filterForm).length > 0) {
      console.log("FILTERING...", filterForm);
      setFilterSchoolActive(true);
      filterForm = { ...filterForm, take: take === "" ? schoolTakeList.take : take };
    } else {
      console.log("NOT FILTERING", filterForm);
      setFilterSchoolActive(false);
      filterForm = { take: take === "" ? schoolTakeList.take : take };
    }

    if (showLoader) setLoading(true);
    console.log("filterForm", filterForm);

    // r    api call    
    const res = await axios.post(url === "" ? getAllSchoolListUrl : url, filterForm);
    console.log("getSchoolList res.data:::: ", res.data);

    if (res.data.success) {
      setSchoolListAll(res.data.data);
      if (showLoader) setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      if (showLoader) setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("getSchoolList: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    if (showLoader) setLoading(false);
    return false;
  }
};


export const getSchoolDetail = async (id) => {
  const { setSchoolAdditionalCounter } = useSchoolStore.getState();
  try {
    setLoading(true);
    // get school details
    const res = await axios.post(detailSchoolUrl, { id: id });
    // get additional details
    const res_additional = await axios.get(schoolAdditionalUrl, { params: { school_id: id } });
    console.log("getSchoolDetail res.data:::: ", res);
    console.log("res_additional res_additional.data.data:::: ", res_additional.data.data);

    if (res.data.success) {
      await setSchoolDetails(res.data);
      await setSchoolAdditionalCounter(res_additional.data.data)

      localStorage.setItem("schoolInvoiceCount", JSON.stringify(res_additional.data.data))
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("getSchoolDetail: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};

export const schoolToggleStatus = async (id) => {
  try {
    setLoading(true);
    const res = await axios.post(toggleSchoolCategoryUrl, { "id": id });
    console.log("schoolToggleStatus:::: ", res);

    if (res.data.success) {
      await getSchoolDetail(id)
      //Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("schoolToggleStatus: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


export const editSchoolData = async (EditFormData) => {
  console.log("EditFormData", EditFormData)
  try {
    setLoading(true);
    const res = await axios.post(editSchoolUrl, EditFormData);
    console.log("editCategoryData res.data:::: ", res.data);

    if (res.data.success) {
      // setCategoryListAll(res.data);
      //Toastr({ message: res.data.message, type: "success" });
      await getSchoolDetail(res.data.data[0].id)
      setLoading(false);
      resetSchoolEditFormData()
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("editCategoryData:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


// search school list   
export const searchSchoolList = async (searchKey = "", url = "", customTake, showLoader = true) => {
  const { setSchoolListAll, setFilterSchoolActive, resetSchoolFilterData, schoolSearchKey } = useSchoolStore.getState();
  const { setLoadingSearch } = useUtilityStore.getState();
  try {

    // return
    setLoadingSearch(true);

    let body = {
      search: searchKey ?? schoolSearchKey,
      take: customTake ? customTake : schoolTakeList.take,
    }

    console.log("schoolSearch_BODY", body);

    const res = await axios.post(url === "" ? getAllSchoolListUrl : url, body);

    console.log('searchSchoolList: ', res.data.data);

    if (res.data.success) {
      setFilterSchoolActive(false);
      resetSchoolFilterData();
      setSchoolListAll(res.data.data);
    }
    else Toastr({ message: res.data.message, type: "error" });

    setLoadingSearch(false);
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoadingSearch(false);
    console.log('searchSchoolList: ', e);
  }
}


export const resetSchoolEditData = () => {
  const { setEditFormData } = useSchoolStore.getState();
  setEditFormData("id", '');
  setEditFormData("school_name", "");
  setEditFormData("email", '')
  setEditFormData("cvr", "")
  setEditFormData("phone_number", "")
  setEditFormData("address", "")
  setEditFormData("contact_mail", "")
  setEditFormData("website", "")
  setEditFormData("l_description", "")
  setEditFormData("image", "")
  setEditFormData("zip", "")
  setEditFormData("city", "")
}




// ==============================
//    School Category Start
// ==============================

//getSchoolCategory
export const getSchoolCategoryIndex = async (school_id) => {
  const { setSchoolCategoryListAll } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolCategoryUrl, { params: { "school_id": school_id } });
    console.log("getSchoolCategoryIndex res.data:::: ", res.data);

    if (res.data.success) {
      //Toastr({ message: res.data.message, type: "success" });
      await setSchoolCategoryListAll(res.data.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getSchoolCategoryIndex:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



//getSchoolCategoryShow
export const getSchoolCategoryShowIndex = async (id) => {

  const { setSchoolCategoryShow } = useSchoolStore.getState();
  try {
    setLoading(true);
    console.log("getSchoolCategoryShowIndex body:::: ", id);
    const res = await axios.get(schoolCategoryShowUrl, { params: { "school_category_id": id } });
    console.log("getSchoolCategoryShowIndex res.data:::: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: "success" });
      await setSchoolCategoryShow(res.data.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getSchoolCategoryShowIndex:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



//update order of the list items of SchoolCategoryShow
export const updateSchoolCategoryListItemOrder = async (data, id) => {

  try {
    setLoading(true);
    console.log("updateSchoolCategoryListItemOrder body:::: ", id);

    const res = await axios.post(updateSchoolCategoryListItemOrderUrl, { order: data });
    console.log("updateSchoolCategoryListItemOrder res.data:::: ", res.data);

    if (res.data.success) {
      await getSchoolCategoryShowIndex(id);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("updateSchoolCategoryListItemOrder:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


//school Categories Toggle
export const schoolCategoriesToggleStatus = async (school_category_id, school_id) => {

  const { setSchoolCategoryShow } = useSchoolStore.getState();
  try {
    setLoading(true);
    console.log("school_category_id,school_id", typeof (school_category_id), typeof (school_id));
    const res = await axios.post(schoolCategoriesToggleUrl, {
      "id": parseInt(school_category_id),
      "school_id": parseInt(school_id)
    });
    console.log("schoolCategoriesToggleStatus res.data:::: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: "success" });
      getSchoolCategoryShowIndex(school_category_id)
      await setSchoolCategoryShow(res.data.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolCategoriesToggleStatus:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



//school Categories Lesson Delete
export const schoolCategoriesLessonDeleteFn = async (id, school_category_id) => {

  try {
    setLoading(true);
    const res = await axios.post(schoolCategoriesLessonDeleteUrl, { "id": id });
    console.log("schoolCategoriesLessonDeleteFn res.data:::: ", res.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      getSchoolCategoryShowIndex(school_category_id)
      // await setSchoolCategoryShow(res.data.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolCategoriesLessonDeleteFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



//school Categories Update
export const schoolCategoriesEditFn = async (body) => {

  try {
    setLoading(true);
    const res = await axios.post(schoolCategoriesUpdateUrl, body);
    console.log("schoolCategoriesEditFn res.data:::: ", res.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      getSchoolCategoryShowIndex(body.id)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolCategoriesEditFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};




//school Categories Update
export const schoolCategoriesLessonAddFn = async (body) => {

  try {
    setLoading(true);

    const res = await axios.post(schoolCategoriesLessonAddUrl, body);
    console.log("schoolCategoriesLessonAddFn res.data:::: ", res.data);

    if (res.data.success) {
      //Toastr({ message: res.data.message, type: "success" });
      getSchoolCategoryShowIndex(body.school_category_id)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolCategoriesLessonAddFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



//school Categories Update
export const editSchoolCategoriesLessonFn = async (body, school_category_id) => {
  const { setSchoolCategoryLessonDetails } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(schoolCategoriesLessonEditUrl, body);
    console.log("editSchoolCategoriesLessonFn res.data:::: ", res.data.data[0]);

    if (res.data.success) {
      //Toastr({ message: res.data.message, type: "success" });
      await setSchoolCategoryLessonDetails(res.data.data[0])
      await getSchoolCategoryShowIndex(school_category_id)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("editSchoolCategoriesLessonFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};

// ==============================
//      School Category End
// ==============================



// ==============================
//     School Instructor Start
// ==============================

//School Instructor List
export const schoolInstructorListIndexFn = async (url = "", school_id) => {
  const { setSchoolInstructorList } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(url === '' ? schoolInstructorListUrl : url, { params: { "school_id": school_id, take: 10 } });
    console.log("schoolInstructorListIndexFn res.data:::: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: "success" });
      await setSchoolInstructorList(res?.data?.data)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolInstructorListIndexFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


//School Instructor Details
export const schoolInstructorShowFn = async (school_instructor_id) => {
  const { setSchoolInstructorDetailShow } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolInstructorShowUrl, { params: { "application_id": school_instructor_id } });
    console.log("schoolInstructorShowFn res.data:::: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: "success" });
      await setSchoolInstructorDetailShow(res?.data?.data[0])
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolInstructorShowFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


//School Instructor Search Find
export const schoolInstructorsFindFn = async (body) => {
  const { setSchoolInstructorsFindValue } = useSchoolStore.getState();
  const { setLoadingSearch } = useUtilityStore.getState();
  try {
    setLoadingSearch(true);
    const res = await axios.get(schoolInstructorsFindUrl, { params: body });
    console.log("schoolInstructorsFindFn res.data:::: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: "success" });
      await setSchoolInstructorsFindValue(res?.data?.data)
      setLoadingSearch(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoadingSearch(false);
      return false;
    }
  } catch (error) {
    console.log("schoolInstructorsFindFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoadingSearch(false);
    return false;
  }
};



//School Instructor Search Find Details
export const schoolInstructorsFindShowFn = async (body) => {
  const { setSchoolInstructorsFindDetails, setSchoolInstructorAppliedCategories } = useSchoolStore.getState();

  try {
    setLoading(true);
    const res = await axios.get(schoolInstructorsFindShowUrl, { params: body });
    console.log("schoolInstructorsFindShowFn res.data:::: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: "success" });
      await setSchoolInstructorsFindDetails(res?.data?.data)
      await setSchoolInstructorAppliedCategories(res?.data?.data?.school_category_info)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolInstructorsFindShowFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


//School Instructor Search Find Details
export const addSchoolInstructorsFn = async (body) => {

  const { setAppliedCategoriesSuccessId } = useSchoolStore.getState();

  const value = {
    "school_id": parseInt(body?.school_id),
    "instructor_id": parseInt(body?.instructor_id),
    "applied_categories": body?.applied_categories
  }
  console.log("value", value)
  try {
    setLoading(true);
    const res = await axios.post(schoolInstructorsAddUrl, value);
    console.log("addSchoolInstructorsFn res.data:::: ", res.data);

    if (res.data.success) {
      await setAppliedCategoriesSuccessId(res?.data?.data[0]?.id)
      Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("addSchoolInstructorsFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



//School Instructor Accept
export const schoolInstructorAcceptFn = async (id) => {
  // const { setSchoolInstructorsFindDetails, setSchoolInstructorAppliedCategories } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(adminSchoolInstructorAcceptUrl, { "id": id });
    console.log("schoolInstructorAcceptFn res.data:::: ", res.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolInstructorAcceptFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


//School Instructor Reject
export const schoolInstructorsRejectFn = async (id) => {

  // const { setSchoolInstructorsFindDetails, setSchoolInstructorAppliedCategories } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(schoolInstructorsRejectUrl, { "id": id });
    console.log("schoolInstructorsRejectFn res.data:::: ", res.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolInstructorsRejectFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


//School Instructor Reject
export const schoolInstructorsRemoveFn = async (id) => {
  // const { setSchoolInstructorsFindDetails, setSchoolInstructorAppliedCategories } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(adminSchoolInstructorsRemoveUrl, { "id": id });
    console.log("schoolInstructorsRemoveFn res.data:::: ", res.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolInstructorsRemoveFn:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};




// ==============================
//     School Instructor End
// ==============================









// ==============================
//     School Student Start
// ==============================
export const schoolStudentIndex = async (url = "", school_id, type) => {

  const { setSchoolStudentList } = useSchoolStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(url === "" ? schoolStudentListUrl : url, { params: { "school_id": school_id, type: type, take: 10 } });
    console.log("schoolStudentIndex res.data:::: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: "success" });
      await setSchoolStudentList(res.data.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("schoolStudentIndex:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};

// ==============================
//     School Student End
// ==============================

export const adminSchoolBankInfo= async (user_id) => {

  const { setBankInfo } = useSchoolStore.getState();

  try {
    setLoading(true);
    const res = await axios.get(adminSchoolBankInfoUrl,{ params: { user_id: user_id } });
    console.log("adminSchoolBankInfo res.data:::: ", res?.data);

    if (res.data.success) {
      await setBankInfo(res?.data?.data)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("adminSchoolBankInfo :::::", error);
    Toastr({ message: "An error occurred!", type: "error" });

    setLoading(false);
    return false;
  }
};