import axios from "axios";
import create from "zustand";
import i18next from "i18next";
import { t } from "i18next";
import {
  addFaqUrl,
  allFaqListUrl,

  changePasswordUrl,
  deleteAccountUrl,
  faqDetailUrl,

  schoolBankInfoUrl,
  schoolChangePasswordUrl,
  schoolContactUsUrl,
  schoolFaqsUrl,
  schoolLanguageIndexUrl,
  schoolLanguageSetUrl,
  schoolTermsConditionsUrl,
  settingsChangePasswordUrl,
  toggleStatusFaqUrl,
  schoolAddBankInfoUrl
} from "../Utility/Url";
import { Toastr } from "../Utility/UtilityFunctions";
import UseTestStore from "./TestStore";
import useUtilityStore from "./UtilityStore";
import { updateFaqUrl, deleteFaqUrl, generalSettingsIndexUrl, toggleStatusCityUrl, detailTermsConditionUrl, allTermsConditionUrl, addTermsConditionUrl, deleteTermsConditionUrl, toggleStatusTermsConditionUrl } from './../Utility/Url';
import useGeneralStore from "./GeneralStore";
import { k_role } from "../Utility/const";

const { setLoading } = useUtilityStore.getState();
const { role } = useGeneralStore.getState();

const useSettingsStore = create((set) => ({
  selectedFiler: false,
  setSelectedFiler: (value) => set({ selectedFiler: value }),

  appLanguage: [
    { langName: "English", code: "en" },
    { langName: "Danish", code: "da" },
  ],
  setAppLanguage: (value) => set({ appLanguage: value }),

  activeLang: "",
  setActiveLanguage: (value) => set({ activeLang: value }),

  lang_code: "",
  setLang_code: (lang_code) => set({ lang_code }),
  app_lang_code: "en",
  setAppLangCode: (langCode) => set((state) => ({ app_lang_code: langCode })),

  userData: {
    name: "",
    email: "",
    phone: "",
    image_url: "",
  },
  setUserData: (e) =>
    set((state) => (state.userData[e.target.name] = e.target.value)),

  finalUpdateUserData: {},
  setFinalUpdateUserData: (value) => set({ finalUpdateUserData: value }),

  deleteAccountWarn: false,
  setDeleteAccountWarn: (value) => set({ deleteAccountWarn: value }),

  dataWithImage: false,
  setDataWithImage: (value) => set({ dataWithImage: value }),

  privacyEditState: false,
  setPrivacyEditState: (value) => set({ privacyEditState: value }),

  termsEditState: false,
  setTermsEditState: (value) => set({ termsEditState: value }),

  authFee: 0,
  setAuthFee: (value) => set({ authFee: value }),

  shippingFee: 0,
  setShippingFee: (value) => set({ shippingFee: value }),

  privacyData: "",
  setPrivacyData: (value) => set({ privacyData: value }),

  termsData: "",
  setTermsData: (value) => set({ termsData: value }),

  schoolContactUsForm: { subject: "", message: "" },
  setSchoolContactUsForm: (value) => set({ schoolContactUsForm: value }),

  //...........Settings page states...............//

  faqListAll: [],
  setFaqListAll: (value) => set({ faqListAll: value }),

  faqDetail: [],
  setFaqDetails: (value) => set({ faqDetail: value }),

  FaqActiveID: "",
  setFaqActiveID: (value) => set({ FaqActiveID: value }),

  isActive: "",
  setIsActive: (value) => set({ isActive: value }),

  activeComponent: "",
  setActiveComponent: (value) => set({ activeComponent: value }),

  DeleteMessageList: "",
  setDeleteMessageList: (value) => set({ DeleteMessageList: value }),

  deleteMessageDetail: "",
  setDeleteMessageDetail: (value) => set({ deleteMessageDetail: value }),

  DeleteMessageDeactivateID: "",
  setDeleteMessageDeactivateID: (value) => set({ DeleteMessageDeactivateID: value }),

  generalSettingsIndex: "",
  setGeneralSettingsIndex: (value) => set({ generalSettingsIndex: value }),

  cityListAll: [],
  setCiyListAll: (value) => set({ cityListAll: value }),

  deleteCityID: "",
  setDeleteCityID: (value) => set({ deleteCityID: value }),

  cityDetail: [],
  setCityDetail: (value) => set({ cityDetail: value }),

  cityDeactivateID: "",
  setCityDeactivateID: (value) => set({ cityDeactivateID: value }),

  TermsConditionList: [],
  setTermsConditionList: (value) => set({ TermsConditionList: value }),

  schoolTermsConditionList: {},
  setSchoolTermsConditionList: (value) => set({ schoolTermsConditionList: value }),

  TermsConditionDetail: {},
  setTermsConditionDetail: (value) => set({ TermsConditionDetail: value }),

  TermsConditionEditFormData: {
    id: "",
    content: "",
    app_type: '',
    image: ''
  },
  setTermsConditionEditFormData: (name, value) =>
    set((state) => (state.TermsConditionEditFormData[name] = value)),

  updateTermsData: (value) =>
    set((state) => ({
      TermsConditionEditFormData: { ...state.TermsConditionEditFormData.content, content: value, }
    })),

  TermsConditionDeactivateID: "",
  setTermsConditionDeactivateID: (value) => set({ TermsConditionDeactivateID: value }),

  citySearchKey: "",
  setCitySearchKey: (value) => set({ citySearchKey: value }),

  temporaryCityList: [],
  setTemporaryCityList: (value) => set({ temporaryCityList: value }),

  bankInfo: {},
  setBankInfo: (value) => set({ bankInfo: value }),

  addBankInfoForm: {
    bank_name: "",
    account_name: "",
    account_number: "",
    reg_no: ""
  },
  setAddBankInfoForm: (value) => set({ addBankInfoForm: value }),


  // Modals
  showAddDeleteMessage: false,
  setShowAddDeleteMessage: (value) => set({ showAddDeleteMessage: value }),

  showEditDeleteMessage: false,
  setShowEditDeleteMessage: (value) => set({ showEditDeleteMessage: value }),

  showAddFaqModal: false,
  setShowAddFaqModal: (value) => set({ showAddFaqModal: value }),

  showEditFaqModal: false,
  setShowEditFaqModal: (value) => set({ showEditFaqModal: value }),

  showFaqDeleteModal: false,
  setShowFaqDeleteModal: (value) => set({ showFaqDeleteModal: value }),

  showCityDeleteModal: false,
  setShowCityDeleteModal: (value) => set({ showCityDeleteModal: value }),

  showDeleteMessageModal: false,
  setShowDeleteMessageModal: (value) => set({ showDeleteMessageModal: value }),

  showFaqDeactivateModal: false,
  setShowFaqDeactivateModal: (value) => set({ showFaqDeactivateModal: value }),

  showDeleteMessageDeactivateModal: false,
  setShowDeleteMessageDeactivateModal: (value) => set({ showDeleteMessageDeactivateModal: value }),

  showAddCityModal: false,
  setShowAddCityModal: (value) => set({ showAddCityModal: value }),

  showEditCityModal: false,
  setShowEditCityModal: (value) => set({ showEditCityModal: value }),

  showCityDeactivateModal: false,
  setShowCityDeactivateModal: (value) => set({ showCityDeactivateModal: value }),

  showWriteTermsAndConditionModal: false,
  setShowWriteTermsAndConditionModal: (value) => set({ showWriteTermsAndConditionModal: value }),

  showTermsAndConditionDetailsModal: false,
  setShowTermsAndConditionDetailsModal: (value) => set({ showTermsAndConditionDetailsModal: value }),

  showEditTermsAndConditionModal: false,
  setShowEditTermsAndConditionModal: (value) => set({ showEditTermsAndConditionModal: value }),

  showTermsAndConditionDeactivateModal: false,
  setShowTermsAndConditionDeactivateModal: (value) => set({ showTermsAndConditionDeactivateModal: value }),

  showTermsAndConditionDeleteModal: false,
  setShowTermsAndConditionDeleteModal: (value) => set({ showTermsAndConditionDeleteModal: value }),

  showAddBankInfoModal: false,
  setShowAddBankInfoModal: (value) => set({ showAddBankInfoModal: value }),

  showEditBankInfoModal: false,
  setShowEditBankInfoModal: (value) => set({ showEditBankInfoModal: value }),

  //...........Settings page states end...........//

  selectedOption: "",
  setSelectedOption: (option) =>
    set((state) => (state.selectedOption = option)),

  changePasswordForm: {
    old_password: "",
    password: "",
    password_confirmation: "",
  },
  setChangePasswordForm: (e) =>
    set((state) => (state.changePasswordForm[e.target.name] = e.target.value)),
  resetChangePasswordForm: (e) =>
    set(
      (state) =>
      (state.changePasswordForm = {
        old_password: "",
        password: "",
        password_confirmation: "",
      })
    ),
}));

export default useSettingsStore;


// ====================================================
//          API Fn
// ====================================================



//  change password
export const changePassword = async () => {
  try {
    const { changePasswordForm } = useSettingsStore.getState();
    if (
      changePasswordForm.password !== changePasswordForm.password_confirmation
    ) {
      Toastr({
        message: "Password and confirm password do not match!",
        type: "error",
      });
      return false;
    }

    setLoading(true);

    const res = await axios.post(changePasswordUrl, changePasswordForm);

    console.log("changePassword res.data:::: ", res.data.data);

    if (res.data.success) {
      UseTestStore.getState().setShowEditPassModal(false);
      useSettingsStore.getState().resetChangePasswordForm();
    } else {
      Toastr({ message: res.data.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("changePassword: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
  }
};





// delete Account
export const deleteAccount = async () => {
  try {
    setLoading(true);

    const res = await axios.post(deleteAccountUrl);

    console.log("deleteAccount res.data:::: ", res.data.data);

    if (res.data.success) {
      setLoading(false);
    } else {
      Toastr({ message: res.data.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("deleteAccount: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
  }
};

// ==============================
//              FAQ
// ==============================

//get list FAQ
export const getFaList = async () => {
  const { setFaqListAll } = useSettingsStore.getState();
  const admin_role=localStorage.getItem('maway_role')
  try {
    setLoading(true);
    const res = await axios.get(admin_role === k_role.admin ? allFaqListUrl : schoolFaqsUrl);
    console.log("getFaList res.data:::: ", res);

    if (res?.data?.success) {
      setFaqListAll(admin_role === k_role.admin ? res?.data?.data : res?.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getFaList: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//Create FAQ
export const createFaq = async (body) => {
  try {
    setLoading(true);
    const res = await axios.post(addFaqUrl, body);
    console.log("createFaq res.data:::: ", res.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      await getFaList();
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log(error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//edit FAQ
export const editFaq = async (body) => {
  try {
    setLoading(true);
    const res = await axios.post(updateFaqUrl, body);
    console.log("editFaq res.data:::: ", res.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      await getFaList();
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log(error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};


//FAQ DETAIL
export const getFaqDetail = async (id) => {
  const { setFaqDetails } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(faqDetailUrl, { params: { id: id } });
    console.log("getFaqDetail res.data:::: ", res.data);

    if (res?.data?.success) {
      setFaqDetails(res?.data?.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getFaqDetail: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//delete faq
export const deleteFaq = async (id) => {
  try {
    setLoading(true);
    const res = await axios.post(deleteFaqUrl, { id: id });
    console.log("deleteFaq res.data:::: ", res.data);

    if (res?.data?.success) {
      Toastr({ message: res.data.message, type: "success" });
      await getFaList();
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("deleteFaq: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

export const faqToggleStatus = async (id) => {
  try {
    setLoading(true);
    const res = await axios.post(toggleStatusFaqUrl, { id: id });
    console.log("faqToggleStatus:::: ", res);

    if (res.data.success) {
      await getFaList();
      //Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("faqToggleStatus: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

// ==============================
//              FAQ
// ==============================




// ==============================
//        Change Password
// ==============================


export const settingsChangePassword = async (body) => {

  try {
    setLoading(true);
    const res = await axios.post(role === k_role.admin ? settingsChangePasswordUrl : schoolChangePasswordUrl, body);
    console.log("settingsChangePassword res.data:::: ", res);

    if (res?.data?.success) {
      Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("settingsChangePassword: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

// ==============================
//        Change Password
// ==============================







// ==============================
//       Terms & Conditions
// ==============================
//Terms & Condition detail

export const getTermsConditionsIndex = async () => {
  const { setTermsConditionList } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(allTermsConditionUrl);
    console.log("getTermsConditionsIndex res.data:::: ", res.data);

    if (res?.data?.success) {
      setTermsConditionList(res?.data?.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("getTermsConditionsIndex: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//get School School TermsCondition List
export const getSchoolTermsConditionsIndex = async () => {
  const { setSchoolTermsConditionList } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolTermsConditionsUrl);
    console.log("getTermsConditionsIndex res.data:::: ", res.data);

    if (res?.data?.success) {
      setSchoolTermsConditionList(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("getTermsConditionsIndex: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//Create Terms & Conditio


// ==============================
//       Terms & Conditions
// ==============================

//send School Contact Us
export const sendSchoolContactUs = async () => {
  const { schoolContactUsForm } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(schoolContactUsUrl, schoolContactUsForm);
    console.log("sendSchoolContactUs res.data:::: ", res.data);

    if (res?.data?.success) {
      Toastr({ message: res?.data?.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return true;
    };
  } catch (error) {
    console.log("sendSchoolContactUs: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};


//school Language Index
export const schoolLanguageIndex = async () => {
  const { setAppLanguage } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolLanguageIndexUrl);
    console.log("schoolLanguageIndex res.data:::: ", res?.data);

    if (res?.data?.success) {
      setAppLanguage(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("schoolLanguageIndex: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};


//school Language Set
export const schoolLanguageSet = async (id,lang_code = 'en') => {
  try {
    setLoading(true);
    const res = await axios.post(schoolLanguageSetUrl, { id: id });
    console.log("schoolLanguageIndex res.data:::: ", res?.data);

    if (res?.data?.success) {
      Toastr({ message: res?.data?.message, type: "success" });
      i18next.changeLanguage(lang_code);
      localStorage.setItem("lang_code", lang_code);
      schoolLanguageIndex();
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("schoolLanguageIndex: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//school Bank Information
export const getSchoolBankInfo = async (isLoading=true) => {
  const { setBankInfo } = useSettingsStore.getState();
  try {
    if(isLoading) setLoading(true); 
    const res = await axios.get(schoolBankInfoUrl);
    console.log("getSchoolBankInfo res.data:::: ", res?.data);

    if (res?.data?.success) {
      setBankInfo(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    if(isLoading) setLoading(false); 
  } catch (error) {
    console.log("getSchoolBankInfo: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    if(isLoading) setLoading(false); 
    return false;
  }
};


//school Bank Information
export const addSchoolBankInfo = async () => {
  const { addBankInfoForm } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(schoolAddBankInfoUrl,addBankInfoForm);
    console.log("addSchoolBankInfo res.data:::: ", res?.data);

    if (res?.data?.success) {
      Toastr({ message: res?.data?.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("addSchoolBankInfo: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};