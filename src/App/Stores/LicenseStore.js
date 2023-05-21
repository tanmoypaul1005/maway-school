import axios from "axios";
import { t } from "i18next";
import create from "zustand";
import { addNewLicenseUrl, assignLicenseUrl, deleteLicenseUrl, filterLicenseUrl, getLicenseIndexUrl, licenseDetailsUrl, toggleLicenseUrl, updateLicenseDurationUrl, updateLicenseUrl } from "../Utility/Url";
import { Toastr } from "../Utility/UtilityFunctions";
import { getInstructorDetails } from "./InstructorStore";

import useUtilityStore from "./UtilityStore";


const useLicenseStore = create((set, get) => ({

  licenseUpdateData: {},
  setLicenseUpdateData: (value) => set({ licenseUpdateData: value }),

  licenseIndex: {},
  setLicenseIndex: (value) => set({ licenseIndex: value }),

  addForm: {
    title: "",
    duration: "",
    price: "",
    details: "",
    type: "",
    license_type: ""
  },
  setAddForm: (value) => set({ addForm: value }),
  resetAddForm: () => {

    set({
      addForm: {
        title: "",
        duration: "",
        price: "",
        details: "",
        type: "",
        license_type: ""
      }
    });
    console.log("STATE:: ", get().addForm);
  },

  licenseDeactivateID: 0,
  setLicenseDeactivateID: (value) => set({ licenseDeactivateID: value }),

  licenseDeleteID: 0,
  setLicenseDeleteID: (value) => set({ licenseDeleteID: value }),

  licenseDetails: {},
  setLicenseDetails: (value) => set({ licenseDetails: value }),

  licenseDetailsSearchKey: "",
  setLicenseDetailsSearchKey: (value) => set({ licenseDetailsSearchKey: value }),

  licenseDetailsPageUrl: "",
  setLicenseDetailsPageUrl: (value) => set({ licenseDetailsPageUrl: value }),


  // Modals
  showDeactivateLicense: false,
  setShowDeactivateLicense: (value) => set({ showDeactivateLicense: value }),

  showDeleteModal: false,
  setShowDeleteModal: (value) => set({ showDeleteModal: value }),

  showDeleteLicenseModal: false,
  setShowDeleteLicenseModal: (value) => set({ showDeleteLicenseModal: value }),

  showEditModal: false,
  setShowEditModal: (value) => set({ showEditModal: value }),

  showEditDurationModal: false,
  setShowEditDurationModal: (value) => set({ showEditDurationModal: value }),

  licenseEditDurationID: 0,
  setLicenseEditDurationID: (value) => set({ licenseEditDurationID: value }),

  licenseEditDurationUID: 0,
  setLicenseEditDurationUID: (value) => set({ licenseEditDurationUID: value }),

  licenseEditDurationStartDate: "",
  setLicenseEditDurationStartDate: (value) => set({ licenseEditDurationStartDate: value }),

  licenseEditDurationEndDate: "",
  setLicenseEditDurationEndDate: (value) => set({ licenseEditDurationEndDate: value }),

  licenseEditDurationType: "",
  setLicenseEditDurationType: (value) => set({ licenseEditDurationType: value }),

  showAddLicenseModal: false,
  setShowAddLicenseModal: (value) => set({ showAddLicenseModal: value }),

  showEditLicenseModal: false,
  setShowEditLicenseModal: (value) => set({ showEditLicenseModal: value }),

  showEditLicense: false,
  setShowEditLicense: (value) => set({ showEditLicense: value }),

  assignLicenseModal: false,
  setAssignLicenseModal: (value) => set({ assignLicenseModal: value }),

  assignLicenseType: "",    //"school" or "instructor"
  setAssignLicenseType: (value) => set({ assignLicenseType: value }),

  assignLicenseForm: {
    license_id: 0,
    user_id: 0
  },
  setAssignLicenseForm: (value) => set({ assignLicenseForm: value }),

}));

export default useLicenseStore;

//g: spread all necessary store variables
const { setLoading } = useUtilityStore.getState();

// get license index
export const getLicenseIndex = async (type, paginationUrl, take = 10) => {
  const { setLicenseIndex } = useLicenseStore.getState();

  try {
    setLoading(true);

    console.log('### getLicenseIndex: paginationUrl = ', paginationUrl);

    let body = {};

    if (type) body = { take: take, type: type }
    else body = { take: take }

    console.log("take: ", take);
    const res = await axios.get(paginationUrl ?? getLicenseIndexUrl, { params: body });
    console.log('getLicenseIndex: ', res.data.data);

    if (res.data.success) setLicenseIndex(res.data.data);
    else Toastr({ message: res.data.message, type: "error" });

    setLoading(false);
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    console.log('getLicenseIndex: ', e);
  }
}



// toggle license status
export const toggleLicense = async (license_id) => {
  const { licenseDeactivateID } = useLicenseStore.getState();
  try {
    console.log("DEACTIVATING...", licenseDeactivateID);
    setLoading(true);
    const res = await axios.post(toggleLicenseUrl, { id: licenseDeactivateID });
    console.log('toggleLicense: ', res.data);

    if (res.data.success) {
      await getLicenseIndex();
      if (license_id) {
        getLicenseeDetails(license_id)
      }
      setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    console.log('toggleLicense: ', e);
  }
}


// add new license 
export const addNewLicense = async (addForm) => {
  // useLicenseStore.getState().resetAddForm();
  // return ;
  console.log("addForm", addForm)
  try {
    setLoading(true);

    const res = await axios.post(addNewLicenseUrl, addForm);

    console.log('addNewLicense: ', res.data);

    if (res.data.success) {
      await getLicenseIndex();
      await useLicenseStore.getState().resetAddForm();
      setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    console.log('addNewLicense: ', e);
    return false;
  }
}



// update license 
export const updateLicense = async (updateForm) => {

  try {
    // console.log(updateForm);
    // return
    setLoading(true);

    const res = await axios.post(updateLicenseUrl, updateForm);

    console.log('updateLicense: ', res.data);

    if (res.data.success) {
      await getLicenseIndex();
      getLicenseeDetails(res.data.data.id)
      setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    console.log('updateLicense: ', e);
  }
}



// e    update license duration
export const updateLicenseDuration = async (updateForm, type, u_id) => {

  
}


// delete license 
export const deleteLicense = async (id) => {

  try {
    // console.log(updateForm);
    // return
    setLoading(true);

    const res = await axios.post(deleteLicenseUrl, { id: id });

    console.log('deleteLicense: ', res.data);

    if (res.data.success) {
      await getLicenseIndex();
      setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    console.log('deleteLicense: ', e);
  }
}



// filter license 
export const filterLicense = async (type = "", showLoader = true) => {
  const { setLicenseIndex } = useLicenseStore.getState();
  try {
    // console.log(updateForm);
    // return
    if (showLoader) setLoading(true);

    const res = await axios.get(filterLicenseUrl, { params: { type: type } });

    console.log('filterLicense: ', res.data);

    if (res.data.success) {
      setLicenseIndex(res.data.data)
      if (showLoader) setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res.data.message, type: "error" });
      if (showLoader) setLoading(false);
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    if (showLoader) setLoading(false);
    console.log('filterLicense: ', e);
  }
}


//b    LicenseDetails
export const getLicenseeDetails = async (id, url = "", search = "") => {
  const { setLicenseDetails } = useLicenseStore.getState();
  const { setLoadingSearch } = useUtilityStore.getState();
  try {
    let body = {}
    if (search === "") {
      body = { "id": id, take: 10 }
      setLoading(true);
    } else {
      body = { "id": id, take: 10, search: search }
      setLoadingSearch(true)
    }

    const res = await axios.get(url === '' ? licenseDetailsUrl : url, { params: body });
    console.log('getLicenseeDetails: ', res.data);
    if (res.data.success) {
      await setLicenseDetails(res.data.data)
      search === "" ? setLoading(false) : setLoadingSearch(false)
      return true;
    }
    else {
      Toastr({ message: res.data.message, type: "error" });
      search === "" ? setLoading(false) : setLoadingSearch(false)
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    search === "" ? setLoading(false) : setLoadingSearch(false)
    console.log('getLicenseeDetails: ', e);
  }
}


//b    assign license 
export const assignLicense = async (assignForm = {}) => {
  try {
    setLoading(true);
    const res = await axios.post(assignLicenseUrl, assignForm);
    console.log('assignLicense: ', res.data);

    if (res.data.success) {
      setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (e) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    console.log('assignLicense: ', e);
    setLoading(false);
    return false;
  }
}