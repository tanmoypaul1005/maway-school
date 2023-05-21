import axios from "axios";
import create from "zustand";
import { Toastr } from '../../App/Utility/UtilityFunctions';
// import { editStudentDetailUrl, getStudentAdditionalUrl, getStudentCurriculumIndex, getStudentDetailsUrl, shareInvoiceDetailsUrl, studentFilterSearchUrl, studentHistoryCategoryLessonUrl, studentHistoryCategoryUrl, toggleStatusStudentUrl } from './../Utility/Url';

import {
  adminSchoolBankInfoUrl,
  editStudentDetailUrl, getStudentAdditionalUrl, getStudentCurriculumIndex, getStudentDetailsUrl,
  shareInvoiceDetailsUrl,
  studentFilterSearchUrl, studentFindSchoolAddUrl, studentFindSchoolFilterOptionsUrl, studentFindSchoolInfoUrl, studentFindSchoolListUrl, studentHistoryCategoryLessonUrl, studentHistoryCategoryUrl, studentSchoolListUrl, toggleStatusStudentUrl
} from './../Utility/Url';
import useUtilityStore from "./UtilityStore";
const { setLoading } = useUtilityStore.getState();

const useStudentStore = create((set) => ({

  studentListAll: [],
  setStudentListAll: (value) => set({ studentListAll: value }),

  studentSchoolListAll: [],
  setStudentSchoolListAll: (value) => set({ studentSchoolListAll: value }),

  studentBankInfo: [],
  setStudentBankInfo: (value) => set({ studentSchoolListAll: value }),

  studentSchoolFindListAll: [],
  setStudentSchoolFindListAll: (value) => set({ studentSchoolFindListAll: value }),

  studentFindSchoolDetails: [],
  setStudentFindSchoolDetails: (value) => set({ studentFindSchoolDetails: value }),

  studentFindSchoolCategoryInfo: [],
  setStudentFindSchoolCategoryInfo: (value) => set({ studentFindSchoolCategoryInfo: value }),

  studentTakeList: { take: 10 },
  setStudentTakeList: (name, value) => set((state) => (state.studentTakeList[name] = value)),

  studentDetails: {},
  setStudentDetails: (value) => set({ studentDetails: value }),

  studentPaginationURL: "",
  setStudentPaginationURL: (value) => set({ studentPaginationURL: value }),

  studentAdditional: {},
  setStudentAdditional: (value) => set({ studentAdditional: value }),

  studentSearch: "",
  setStudentSearch: (value) => set({ studentSearch: value }),

  studentCurriculumDetailShareId: "",
  setStudentCurriculumDetailShareId: (value) => set({ studentCurriculumDetailShareId: value }),

  studentCurriculumHistoryShareId: "",
  setStudentCurriculumHistoryShareId: (value) => set({ studentCurriculumHistoryShareId: value }),

  // studentCurriculumDetailShareFrom: {
  //   user_id: "",
  //   role: "",
  //   type: "",
  //   email: ""

  // },
  // setStudentCurriculumDetailShare: (name, value) =>
  //   set((state) => (state.studentCurriculumDetailShareFrom[name] = value)),


  EditFormData: {
    id: "", student_name: "", phone_number: "", address: "", image: ""
  },
  setEditFormData: (name, value) =>
    set((state) => (state.EditFormData[name] = value)),

  filterData: {
    search: "",
    status: -1,
    category: [],
    school_ids: [],
  },
  setFilterData: (value) => set({ filterData: value }),
  resetStudentFilterData: (value) => set({
    filterData: {
      search: "",
      status: -1,
      category: [],
      school_ids: [],
    }
  }),



  // Modals
  showDeleteModal: false,
  setShowDeleteModal: (value) => set({ showDeleteModal: value }),

  showEditModal: false,
  setShowEditModal: (value) => set({ showEditModal: value }),

  showStudentFilterModal: false,
  setShowStudentFilterModal: (value) => set({ showStudentFilterModal: value }),

  categoryArray: [],
  setCategoryArray: (value) => set({ categoryArray: value }),

  studentCurriculumList: [],
  setStudentCurriculumList: (value) => set({ studentCurriculumList: value }),

  studentHistoryCategoryList: {},
  setStudentHistoryCategoryList: (value) => set({ studentHistoryCategoryList: value }),

  studentHistoryCategoryLesson: {},
  setStudentHistoryCategoryLesson: (value) => set({ studentHistoryCategoryLesson: value }),

  historyLessonCategory: {},
  setHistoryLessonCategory: (value) => set({ historyLessonCategory: value }),


  FilterSchoolArray: [],
  setFilterSchoolArray: (value) => set({ FilterSchoolArray: value }),

  studentSchoolCategoryArray: [],
  setStudentSchoolCategoryArray: (value) => set({ studentSchoolCategoryArray: value }),

  studentFindSchoolValue: [],
  setStudentFindSchoolValue: (value) => set({ studentFindSchoolValue: value }),

  studentFindSchoolLessonId: [],
  setStudentFindSchoolLessonId: (value) => set({ studentFindSchoolLessonId: value }),

  fullPackageChecked: false,
  setFullPackageChecked: (value) => set({ fullPackageChecked: value }),

  studentSchoolPackagePrice: "0",
  setStudentSchoolPackagePrice: (value) => set({ studentSchoolPackagePrice: value }),

  studentSchoolMomsPrice: 0,
  setStudentSchoolMomsPrice: (value) => set({ studentSchoolMomsPrice: value }),

  studentFindSchoolFilterValue: [],
  setStudentFindSchoolFilterValue: (value) => set({ studentFindSchoolFilterValue: value }),

  // Modals
  showDeleteModal: false,
  setShowDeleteModal: (value) => set({ showDeleteModal: value }),

  showEditModal: false,
  setShowEditModal: (value) => set({ showEditModal: value }),

  showStudentFilterModal: false,
  setShowStudentFilterModal: (value) => set({ showStudentFilterModal: value }),

  showDeactivateStudent: false,
  setShowDeactivateStudent: (value) => set({ showDeactivateStudent: value }),

  showShareReportModal: false,
  setShowShareReportModal: (value) => set({ showShareReportModal: value }),

  showAddCurriculumLessonModal: false,
  setShowAddCurriculumLessonModal: (value) => set({ showAddCurriculumLessonModal: value }),

  showEditCurriculumLessonModal: false,
  setShowEditCurriculumLessonModal: (value) => set({ showEditCurriculumLessonModal: value }),

  FilterStudentActive: false,
  setFilterStudentActive: (value) => set({ FilterStudentActive: value }),

  showStudentChangePassModal: false,
  setShowStudentChangePassModal: (value) => set({ showStudentChangePassModal: value }),

  showStudentEditModal: false,
  setShowStudentEditModal: (value) => set({ showStudentEditModal: value }),

  showAddStudentModal: false,
  setShowAddStudentModal: (value) => set({ showAddStudentModal: value }),

  showStudentAddPassModal: false,
  setShowStudentAddPassModal: (value) => set({ showStudentAddPassModal: value }),

  showShareCurriculumDetailsModal: false,
  setShowShareCurriculumDetailsModal: (value) => set({ showShareCurriculumDetailsModal: value }),

  showShareCurriculumHistoryModal: false,
  setShowShareCurriculumHistoryModal: (value) => set({ showShareCurriculumHistoryModal: value }),

  showAddStudentSchoolModal: false,
  setShowAddStudentSchoolModal: (value) => set({ showAddStudentSchoolModal: value }),

  showStudentSchoolFilterModal: false,
  setShowStudentSchoolFilterModal: (value) => set({ showStudentSchoolFilterModal: value }),

  studentFindSchoolApply: true,
  setStudentFindSchoolApply: (value) => set({ studentFindSchoolApply: value }),

  studentSchoolFilterAllRatting: [],
  setStudentSchoolFilterAllRatting: (value) => set({ studentSchoolFilterAllRatting: value }),

  
  showBankDetailsModal: false,
  setShowBankDetailsModal: (value) => set({ showBankDetailsModal: value }),

  showShareCurriculumDetailsModal: false,
  setShowShareCurriculumDetailsModal: (value) => set({ showShareCurriculumDetailsModal: value }),

  showShareCurriculumHistoryModal: false,
  setShowShareCurriculumHistoryModal: (value) => set({ showShareCurriculumHistoryModal: value }),

}));

export default useStudentStore;

const { setStudentListAll, setFilterStudentActive, studentTakeList } = useStudentStore.getState();

export const getStudentList = async (url = "", data, showLoader = true) => {
  try {
    let filterForm = { ...data };
    console.log("RECEIVED filterForm", filterForm)

    if (filterForm?.search === "") delete filterForm.search;
    if (filterForm?.status === -1) delete filterForm.status;
    if (filterForm?.category?.length === 0) delete filterForm.category;
    if (filterForm?.school_ids?.length === 0) delete filterForm.school_ids;


    if (Object.keys(filterForm).length > 0) {
      setFilterStudentActive(true);
      filterForm = { ...filterForm, take: studentTakeList.take };
    } else {
      setFilterStudentActive(false);
      filterForm = { take: studentTakeList.take };
    }

    if (showLoader) setLoading(true);
    const res = await axios.post(url === "" ? studentFilterSearchUrl : url, filterForm);
    console.log("getStudentList res.data:::: ", res.data);

    if (res.status === 200) {
      await setStudentListAll(res.data.data);
      if (showLoader) setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      if (showLoader) setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("getStudentList: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    if (showLoader) setLoading(false);
    return false;
  }
};

// get student details
export const getStudentDetails = async (user_id) => {
  const { setStudentDetails, setStudentAdditional } = useStudentStore.getState();
  try {
    setLoading(true);

    // get details
    const res = await axios.post(getStudentDetailsUrl, { id: user_id });

    // get additional details
    const res_additional = await axios.get(getStudentAdditionalUrl, { params: { student_id: user_id } });
    console.log("getStudentDetails res.data:::: ", res.data);

    if (res.data.success) {
      setStudentDetails(res.data.data);
      setStudentAdditional(res_additional.data.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("getStudentDetails: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


export const studentToggleStatus = async (id) => {
  try {
    setLoading(true);
    const res = await axios.post(toggleStatusStudentUrl, { "id": id });
    console.log("schoolToggleStatus:::: ", res);

    if (res.data.success) {
      await getStudentDetails(id)
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


// search student list
export const searchStudentList = async (url = "") => {
  const { studentSearch, setStudentListAll, resetStudentFilterData, setFilterStudentActive } = useStudentStore.getState();
  const { setLoadingSearch } = useUtilityStore.getState();
  try {
    setLoadingSearch(true);

    const res = await axios.post(url === "" ? studentFilterSearchUrl : url, { search: studentSearch, take: studentTakeList.take });
    console.log("searchStudentList res.data:::: ", res?.data);

    if (res.data.success) {
      await setStudentListAll(res.data.data);
      resetStudentFilterData();
      setFilterStudentActive(false);
      setLoadingSearch(false);
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoadingSearch(false);
      return false;
    }

  } catch (error) {
    console.log("searchStudentList: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoadingSearch(false);
    return false;
  }
};



//edit StudentDetail
export const editStudentDetail = async (body) => {
  const { setStudentDetails } = useStudentStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(editStudentDetailUrl, body);
    console.log("StudentDetail res.data:::: ", res?.data);

    if (res.data.success) {
      await setStudentDetails(res.data.data)
      getStudentDetails(res?.data?.data?.id)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("StudentDetail:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


//get student Curriculum list
export const getStudentCurriculumList = async (id) => {
  const { setStudentCurriculumList } = useStudentStore.getState();
  try {
    // setLoading(true);
    const res = await axios.get(getStudentCurriculumIndex, { params: { "student_id": id } });
    console.log("getStudentCurriculumList res.data:::: ", res?.data);

    if (res.data.success) {
      await setStudentCurriculumList(res.data.data)
      // setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      // setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getStudentCurriculumList:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    // setLoading(false);
    return false;
  }
};

//get student history category list
export const getStudentHistoryCategoryList = async (student_id) => {
  const { setStudentHistoryCategoryList } = useStudentStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(studentHistoryCategoryUrl, { params: { "student_id": student_id } });
    console.log("getStudentHistoryCategoryList res.data:::: ", res?.data);

    if (res.data.success) {
      await setStudentHistoryCategoryList(res.data.data)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getStudentHistoryCategoryList:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};

//get student history category lesson List
export const getStudentHistoryCategoryLesson = async (student_id) => {

  const { setStudentHistoryCategoryLesson, setHistoryLessonCategory } = useStudentStore.getState();
  try {
    // setLoading(true);
    const res = await axios.get(studentHistoryCategoryUrl, { params: { "student_id": student_id } });
    if (res.data.success) {
      const category_id = await res.data.data?.length > 0 && res.data.data[0].category_id
      const res2 = await axios.get(studentHistoryCategoryLessonUrl, { params: { "student_id": student_id, "category_id": category_id } });
      console.log("StudentHistoryCategoryLesson res.data:::: ", res2?.data);
      if (res2.data.success) {
        await setStudentHistoryCategoryLesson(res2.data.data)
        await setHistoryLessonCategory(res.data.data[0])
        // setLoading(false);
        return true;
      }
    } else {
      Toastr({ message: res.data.message, type: "error" });
      // setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("StudentHistoryCategoryLesson:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};



// export const shareStudentCurriculum = async (body) => {

//   try {
//     setLoading(true);
//     const res = await axios.post(shareInvoiceDetailsUrl, body);
//     console.log("shareStudentCurriculum res.data:::: ", res?.data);

//     if (res.data.success) {
//       Toastr({ message: res.data.message, type: "success" });
// await setStudentDetails(res.data.data)
// getStudentDetails(res?.data?.data?.id)

export const shareStudentCurriculum = async (body) => {

  try {
    setLoading(true);
    const res = await axios.post(shareInvoiceDetailsUrl, body);
    console.log("shareStudentCurriculum res.data:::: ", res?.data);

    if (res.data.success) {
      Toastr({ message: res.data.message, type: "success" });
      // await setStudentDetails(res.data.data)
      // getStudentDetails(res?.data?.data?.id)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("shareStudentCurriculum:", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};




// ==============================
//     Student School Start
// ==============================


// Student School list
export const studentSchoolIndex = async (student_id) => {
  const { setStudentSchoolListAll } = useStudentStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(studentSchoolListUrl, { params: { "student_id": student_id } });
    console.log("studentSchoolIndex res.data:::: ", res?.data);

    if (res.data.success) {
      if (res?.data?.data) {
        await setStudentSchoolListAll(res?.data?.data)
      } else {
        await setStudentSchoolListAll([])
      }

      setLoading(false);
      return true;
    } else {
      // Toastr({ message: res.data.message, type: "error" });
      await setStudentSchoolListAll([])
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("studentSchoolIndex :::::", error);
    // Toastr({ message: "An error occurred!", type: "error" });
    await setStudentSchoolListAll([])
    setLoading(false);
    return false;
  }
};



// Student School Find list
export const studentFindSchoolIndex = async (body) => {

  const { setStudentSchoolFindListAll } = useStudentStore.getState();

  const { setLoadingSearch } = useUtilityStore.getState();

  // console.log("body",body)
  try {
    if (body?.search) {
      setLoadingSearch(true);
    } else { setLoading(true); }

    const res = await axios.post(studentFindSchoolListUrl, body);
    console.log("studentFindSchoolIndex res.data:::: ", res?.data);

    if (res.data.success) {
      await setStudentSchoolFindListAll(res?.data?.data)

      if (body?.search) {
        setLoadingSearch(false);
      } else { setLoading(false); }
      return true;
    } else {
      // Toastr({ message: res.data.message, type: "error" });
      if (body?.search) {
        setLoadingSearch(false);
      } else { setLoading(false); }
      return false;
    }
  } catch (error) {
    console.log("studentFindSchoolIndex :::::", error);
    // Toastr({ message: "An error occurred!", type: "error" });
    // await setStudentSchoolListAll([])
    if (body?.search) {
      setLoadingSearch(false);
    } else { setLoading(false); }
    return false;
  }
};




// Student School list
export const studentFindSchoolInfoFn = async (school_id) => {

  const { setStudentFindSchoolDetails } = useStudentStore.getState();

  try {
    setLoading(true);
    const res = await axios.get(studentFindSchoolInfoUrl, { params: { "id": school_id } });
    console.log("studentFindSchoolInfoFn ", res?.data);

    if (res.data.success) {
      if (res?.data?.data) {
        await setStudentFindSchoolDetails(res?.data?.data)
      } else {
        await setStudentFindSchoolDetails([])
      }

      setLoading(false);
      return true;
    } else {
      // Toastr({ message: res.data.message, type: "error" });
      // await setStudentSchoolListAll([])
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("studentFindSchoolInfoFn :::::", error);
    // Toastr({ message: "An error occurred!", type: "error" });
    // await setStudentSchoolListAll([])
    setLoading(false);
    return false;
  }
};


export const studentFindSchoolAddFn = async (body) => {
  const data = {
    "school_id": parseInt(body.school_id),
    "student_id": parseInt(body.student_id),
    "school_category_id": parseInt(body.school_category_id),
    "lesson_ids": body.lesson_ids,
    "student_note": body.student_note
  }
  //console.log("body", data)

  try {
    setLoading(true);
    const res = await axios.post(studentFindSchoolAddUrl, data);
    console.log("studentFindSchoolAddFn res.data:::: ", res?.data);

    if (res.data.success) {
      // if (res?.data?.data) {
      //   await setStudentFindSchoolDetails(res?.data?.data)
      // } else {
      //   await setStudentFindSchoolDetails([])
      // }
      Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("shareStudentCurriculum:", error);
    console.log("studentFindSchoolAddFn :::::", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};
// };



export const studentFindSchoolFilterOptionsFn = async (school_id) => {

  const { setStudentFindSchoolFilterValue } = useStudentStore.getState();

  try {
    setLoading(true);
    const res = await axios.get(studentFindSchoolFilterOptionsUrl, { params: { "id": school_id } });
    console.log("studentFindSchoolInfoFn res.data:::: ", res?.data);

    if (res.data.success) {
      await setStudentFindSchoolFilterValue(res?.data?.data)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      // await setStudentSchoolListAll([])
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("studentFindSchoolInfoFn :::::", error);
    Toastr({ message: "An error occurred!", type: "error" });
    // await setStudentSchoolListAll([])
    setLoading(false);
    return false;
  }
};

// studentFindSchoolFilterOptionsUrl
// ==============================
//     Student School End
// ==============================


export const adminSchoolBankInfo= async (school_id) => {

  const { setStudentBankInfo } = useStudentStore.getState();

  try {
    setLoading(true);
    const res = await axios.get(adminSchoolBankInfoUrl);
    console.log("adminSchoolBankInfo res.data:::: ", res?.data);

    if (res.data.success) {
      await setStudentBankInfo(res?.data?.data)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      // await setStudentSchoolListAll([])
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("adminSchoolBankInfo :::::", error);
    Toastr({ message: "An error occurred!", type: "error" });
    // await setStudentSchoolListAll([])
    setLoading(false);
    return false;
  }
};