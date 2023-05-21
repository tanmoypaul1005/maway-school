import axios from "axios";
import create from "zustand";
import { t } from "i18next";
import useUtilityStore from "../UtilityStore";
import { Toastr } from "../../Utility/UtilityFunctions";
import { schoolInstructorAcceptUrl, schoolInstructorDetailsUrl, schoolInstructorIndexUrl, schoolInstructorRejectUrl, schoolInstructorsAdditionalInfoUrl, schoolInstructorsInvoiceFilterUrl, schoolInstructorsLessonDetailsUrl, schoolInstructorsLessonUrl, schoolInstructorsRemoveUrl } from "../../Utility/Url";

const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useSchoolInstructorStore = create((set) => ({

    schoolInstructorList: [],
    setSchoolInstructorList: (value) => set({ schoolInstructorList: value }),

    schoolInstructorsLessonList: [],
    setSchoolInstructorsLessonList: (value) => set({ schoolInstructorsLessonList: value }),

    schoolInstructorsInvoiceList: [],
    setSchoolInstructorsInvoiceList: (value) => set({ schoolInstructorsInvoiceList: value }),

    schoolInstructorsDrivingList: [],
    setSchoolInstructorsDrivingList: (value) => set({ schoolInstructorsDrivingList: value }),

    schoolInstructorsExternalList: [],
    setSchoolInstructorsExternalList: (value) => set({ schoolInstructorsExternalList: value }),

    schoolInstructorsLessonDetails: {},
    setSchoolInstructorsLessonDetails: (value) => set({ schoolInstructorsLessonDetails: value }),

    schoolInstructorDetails: {},
    setSchoolInstructorDetails: (value) => set({ schoolInstructorDetails: value }),

    schoolInstructorSearchKey: null,
    setSchoolInstructorSearchKey: (value) => set({ schoolInstructorSearchKey: value }),

    schoolInstructorRejectionNote: null,
    setSchoolInstructorRejectionNote: (value) => set({ schoolInstructorRejectionNote: value }),

    school_instructor_take: 10,
    setSchool_instructor_take: (value) => set({ school_instructor_take: value }),

    invoice_take: 10,
    setInvoice_take: (value) => set({ invoice_take: value }),

    classroom_take: 10,
    setClassroom_take: (value) => set({ classroom_take: value }),

    driving_take: 10,
    setDriving_take: (value) => set({ driving_take: value }),

    external_take: 10,
    setExternal_take: (value) => set({ external_take: value }),

    instructor_additional_info: {},
    setInstructor_additional_info: (value) => set({ instructor_additional_info: value }),

    instructor_invoice_search: "",
    setInstructor_invoice_search: (value) => set({ instructor_invoice_search: value }),

    instructor_classroom_search: "",
    setInstructor_classroom_search: (value) => set({ instructor_classroom_search: value }),

    instructor_driving_search: "",
    setInstructor_driving_search: (value) => set({ instructor_driving_search: value }),

    instructor_external_search: "",
    setInstructor_external_search: (value) => set({ instructor_external_search: value }),

    //All Modal

    showAcceptNoteModal: false,
    setShowAcceptNoteModal: (value) => set({ showAcceptNoteModal: value }),

    showRejectionReasonModal: false,
    setShowRejectionReasonModal: (value) => set({ showRejectionReasonModal: value }),

    showInstructorRemoveModal: false,
    setShowInstructorRemoveModal: (value) => set({ showInstructorRemoveModal: value }),

    showInstructorRequestDetailsModal: false,
    setShowInstructorRequestDetailsModal: (value) => set({ showInstructorRequestDetailsModal: value }),

    showLessonDetailsModal: false,
    setShowLessonDetailsModal: (value) => set({ showLessonDetailsModal: value }),

}));

export default useSchoolInstructorStore;

//Get School Instructor
export const getSchoolInstructorIndex = async (url = "") => {

    const { school_instructor_take, setSchoolInstructorList, schoolInstructorSearchKey } = useSchoolInstructorStore.getState();

    let body = {};

    const id = JSON.parse(localStorage.getItem("user"))?.school_id

    if (schoolInstructorSearchKey !== null) {
        body = { school_id: id, search: schoolInstructorSearchKey, take: school_instructor_take }
    } else {
        body = { school_id: id, take: school_instructor_take }
    }

    try {
        if (schoolInstructorSearchKey === null) { setLoading(true); } else { setLoadingSearch(true); }

        const res = await axios.get(url === "" ? schoolInstructorIndexUrl : url, { params: body });
        console.log("getSchoolInstructorIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (schoolInstructorSearchKey === null) { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("getSchoolInstructorIndex::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (schoolInstructorSearchKey === null) { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

//Get School Instructor Details
export const getSchoolInstructorDetails = async (id) => {

    const { setSchoolInstructorDetails } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorDetailsUrl, { id: id });
        console.log("getSchoolInstructorDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorDetails(res?.data?.data[0])
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolInstructorDetails::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Instructor Remove
export const schoolInstructorsRemove = async (id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorsRemoveUrl, { id: id });
        console.log("schoolInstructorsRemove res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorsRemove::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Instructor Accept
export const schoolInstructorAcceptIndex = async (id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorAcceptUrl, { id: id });
        console.log("schoolInstructorAcceptIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorAcceptIndex::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Instructor Reject
export const schoolInstructorRejectIndex = async (id) => {
    const { schoolInstructorRejectionNote } = useSchoolInstructorStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorRejectUrl, { id: id,reject_note:schoolInstructorRejectionNote });
        console.log("schoolInstructorRejectIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorRejectIndex::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//school Instructors Classroom
export const schoolInstructorsClassroomIndex = async (url = "", id, search = "") => {

    const { setSchoolInstructorsLessonList, classroom_take } = useSchoolInstructorStore.getState();

    let body = {};

    if (search === "") {
        body = { id: id, type: "classroom", take: classroom_take }
    } else {
        body = { id: id, type: "classroom", take: classroom_take, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsLessonUrl : url, { params: body });
        console.log("schoolInstructorsLessonIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsLessonList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsLessonIndex :::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

//school Instructors Driving
export const schoolInstructorsDrivingIndex = async (url = "", id, search = "") => {

    const { setSchoolInstructorsDrivingList, driving_take } = useSchoolInstructorStore.getState();

    let body = {};

    if (search === "") {
        body = { id: id, type: "driving", take: driving_take }
    } else {
        body = { id: id, type: "driving", take: driving_take, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsLessonUrl : url,{ params: body });
        console.log("schoolInstructorsDrivingIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsDrivingList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsDrivingIndex :::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    }
};

//school Instructors External
export const schoolInstructorsExternalIndex = async (url = "", id, search = "") => {

    const { setSchoolInstructorsExternalList, external_take } = useSchoolInstructorStore.getState();

    let body = {};

    if (search === "") {
        body = { id: id, type: "external", take: external_take }
    } else {
        body = { id: id, type: "external", take: external_take, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsLessonUrl : url,
            { params: body });
        console.log("schoolInstructorsExternalIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsExternalList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsExternalIndex :::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

//school Instructors dETAILS
export const schoolInstructorsAllTypeDetails = async (id, type = "") => {

    const { setSchoolInstructorsLessonDetails } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(schoolInstructorsLessonDetailsUrl, { params: { id: id, type: type } });
        console.log("schoolInstructorsExternalIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            if (type === "classroom") {
                setSchoolInstructorsLessonDetails(res?.data?.data[0])
            } else {
                setSchoolInstructorsLessonDetails(res?.data?.data)
            }

            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorsExternalIndex:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//school Instructors Invoice List
export const schoolInstructorsInvoiceIndex = async (url="", id, search = "") => {

    const { setSchoolInstructorsInvoiceList, invoice_take } = useSchoolInstructorStore.getState();

    let body = {};
    if (search === "") {
        body = { instructor_id: id, type: "school_instructor", take: invoice_take }
    } else {
        body = { instructor_id: id, type: "school_instructor", take: invoice_take, search: search }
    }
    console.log("InstructorsInvoiceBody",body)
    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsInvoiceFilterUrl : url, {
            params: body
        });
        
        console.log("schoolInstructorsInvoiceIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsInvoiceList(res?.data?.data)

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsInvoiceIndex:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

export const getSchoolInstructorsAdditionalInfo = async (id) => {

    const { setInstructor_additional_info } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(schoolInstructorsAdditionalInfoUrl, { params: { id: id } });
        console.log("getSchoolInstructorsAdditionalInfo res.data:::: ", res?.data);

        if (res?.data?.success) {
            setInstructor_additional_info(res?.data?.data)
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("getSchoolInstructorsAdditionalInfo:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
