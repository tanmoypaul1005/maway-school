import axios from "axios";
import { t } from "i18next";
import create from "zustand";
import { editInstructorDetailUrl, instructorAdditionalUrl, instructorDetailsUrl, instructorFilterUrl, instructorIndexUrl, instructorToggleStatusUrl } from "../Utility/Url";
import { Toastr } from "../Utility/UtilityFunctions";
import useUtilityStore from "./UtilityStore";

const { setLoading } = useUtilityStore.getState();

const useInstructorStore = create((set) => ({

  instructorActivateID: 0,
  setInstructorActivateID: (value) => set({ instructorActivateID: value }),

  instructorTakeList: { take: 10 },
  setInstructorTakeList: (name, value) => set((state) => (state.instructorTakeList[name] = value)),

  instructorIndex: {},
  setInstructorIndex: (value) => set({ instructorIndex: value }),

  instructorSearchKey: "",
  setInstructorSearchKey: (value) => set({ instructorSearchKey: value }),

  instructorDetails: {},
  setInstructorDetails: (value) => set({ instructorDetails: value }),

  instructorAdditionalCounter: {},
  setInstructorAdditionalCounter: (value) => set({ instructorAdditionalCounter: value }),

  EditFormData: {
    id: "", instructor_name: "", phone_number: "", address: "", image: ""
  },
  setEditFormData: (name, value) =>
    set((state) => (state.EditFormData[name] = value)),

  // filters only

  licenseArray: [],
  setLicenseArray: (value) => set({ licenseArray: value }),

  categoryArray: [],
  setCategoryArray: (value) => set({ categoryArray: value }),

  filterData: {
    expertise: [],
    status: -1,
    license_id: -1,
    payment_status: [],
    school_ids: [],
  },
  setFilterData: (value) => set({ filterData: value }),
  resetInstructorFilterData: (value) => set({
    filterData: {
      expertise: [],
      status: -1,
      license_id: -1,
      payment_status: [],
      school_ids: [],
    }
  }),


  instructorPageUrl: "",
  setInstructorPageUrl: (value) => set({ instructorPageUrl: value }),

  FilterInstructorActive: false,
  setFilterInstructorActive: (value) => set({ FilterInstructorActive: value }),

  FilterSchoolArray: [],
  setFilterSchoolArray: (value) => set({ FilterSchoolArray: value }),

  // Modals
  showDeleteModal: false,
  setShowDeleteModal: (value) => set({ showDeleteModal: value }),

  showDeactivateModal: false,
  setShowDeactivateModal: (value) => set({ showDeactivateModal: value }),

  showEditModal: false,
  setShowEditModal: (value) => set({ showEditModal: value }),

  showAddLicenseModal: false,
  setShowAddLicenseModal: (value) => set({ showAddLicenseModal: value }),

  showInstructorFilterModal: false,
  setShowInstructorFilterModal: (value) => set({ showInstructorFilterModal: value }),

  showUpcomingClassroomBookingModal: false,
  setShowUpcomingClassroomBookingModal: (value) => set({ showUpcomingClassroomBookingModal: value }),

  showDrivingLessonsModal: false,
  setShowDrivingLessonsModal: (value) => set({ showDrivingLessonsModal: value }),

  showUpcomingExternalModal: false,
  setShowUpcomingExternalModal: (value) => set({ showUpcomingExternalModal: value }),

  showInstructorChangePassModal: false,
  setShowInstructorChangePassModal: (value) => set({ showInstructorChangePassModal: value }),

  showAddInstructorModal: false,
  setShowAddInstructorModal: (value) => set({ showAddInstructorModal: value }),


  showInstructorAddPassModal: false,
  setShowInstructorAddPassModal: (value) => set({ showInstructorAddPassModal: value }),

}));

export default useInstructorStore;

const { setInstructorIndex, setFilterInstructorActive, instructorTakeList } = useInstructorStore.getState();

// get Instructor index
export const getInstructorIndex = async (paginationUrl = "", data, take = "", showLoader = true) => {

  // console.log("instructorTakeList.take", instructorTakeList)
  try {
    let filterForm = { ...data };
    if (filterForm?.expertise?.length === 0) delete filterForm.expertise;
    if (filterForm?.status === -1) delete filterForm.status;
    if (filterForm?.license_id === -1) delete filterForm.license_id;
    if (filterForm?.payment_status?.length === 0) delete filterForm.payment_status;
    if (filterForm?.school_ids?.length === 0) delete filterForm.school_ids;

    if (Object.keys(filterForm).length > 0) {
      setFilterInstructorActive(true);
      console.log("FILTER INSTRUCTOR", filterForm);
      filterForm = { ...filterForm, take: take === "" ? instructorTakeList.take : take };
    } else {
      setFilterInstructorActive(false);
      console.log("GET ALL INSTRUCTOR", filterForm);
      filterForm = { take: take === "" ? instructorTakeList.take : take };
    }

    console.log("getInstructorIndex filterForm:::", filterForm);

    if (showLoader) setLoading(true);

    console.log('### getInstructorIndex: paginationUrl = ', paginationUrl);

    const res = await axios.post(paginationUrl === "" ? instructorFilterUrl : paginationUrl, filterForm);
    // console.log("API_CALL instructor index");
    console.log('getInstructorIndex: ', res.data);

    if (res.data.success) {
      setInstructorIndex(res.data.data);
      setLoading(false);
      return true
    }
    else Toastr({ message: res.data.message, type: "error" });
    setLoading(false);
    return false
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    console.log('getInstructorIndex: ', e);
    setLoading(false);
    return false
  }
}



// get Instructor details
export const getInstructorDetails = async (user_id) => {
  const { setInstructorDetails, setInstructorAdditionalCounter } = useInstructorStore.getState();
  try {
    setLoading(true);

    const res = await axios.post(instructorDetailsUrl, { id: user_id });
    const res_additional = await axios.get(instructorAdditionalUrl, { params: { instructor_id: user_id } });
    console.log('getInstructorDetails: ', res.data.data);
    console.log('setInstructorAdditionalCounter: ', res_additional.data.data);

    if (res.data.success) {
      setInstructorDetails(res.data.data);
      setInstructorAdditionalCounter(res_additional.data.data);
    }
    else Toastr({ message: res.data.message, type: "error" });

    setLoading(false);
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    console.log('getInstructorDetails: ', e);
  }
}


// get Instructor Toggle
export const getInstructorToggle = async () => {
  const { instructorActivateID } = useInstructorStore.getState();
  try {
    setLoading(true);

    const res = await axios.post(instructorToggleStatusUrl, { id: instructorActivateID });
    console.log('getInstructorToggle: ', res.data.data);

    if (res.data.success) {
      getInstructorDetails(instructorActivateID);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    console.log('getInstructorToggle: ', e);
  }
}


// search instructor list
export const searchInstructorList = async (url = "", customTake = 0) => {
  const { setInstructorIndex, resetInstructorFilterData, setFilterInstructorActive, instructorSearchKey } = useInstructorStore.getState();
  const { setLoadingSearch } = useUtilityStore.getState();

  try {
    setLoadingSearch(true);
    // if (e === '') return getInstructorIndex()
    const res = await axios.post(url === "" ? instructorFilterUrl : url, { search: instructorSearchKey, take: customTake ? customTake : instructorTakeList.take });
    console.log("searchInstructorList res.data:::: ", res);

    if (res.data.success) {
      await setInstructorIndex(res.data.data);
      resetInstructorFilterData();
      setFilterInstructorActive(false);
      setLoadingSearch(false);
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoadingSearch(false);
      return false;
    }

  } catch (error) {
    console.log("searchInstructorList: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoadingSearch(false);
    return false;
  }
};



//edit InstructorDetail
export const editInstructorDetail = async (body) => {
  const { setInstructorDetails } = useInstructorStore.getState();
  console.log("body", body)
  try {
    setLoading(true);
    const res = await axios.post(editInstructorDetailUrl, body);
    console.log("editInstructorDetail res.data:::: ", res);

    if (res.data.success) {

      //Toastr({ message: res.data.message, type: "success" });
      await setInstructorDetails(res.data.data[0])
      getInstructorDetails(res?.data?.data[0]?.id)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("editInstructorDetail:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



export const resetInstructorEditData = () => {
  const { setEditFormData } = useInstructorStore.getState();
  setEditFormData("id", "");
  setEditFormData("instructor_name", "");
  setEditFormData("email", "")
  setEditFormData("phone_number", '')
  setEditFormData("address", "")
  setEditFormData("image", "")
}