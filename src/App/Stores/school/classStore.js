import axios from "axios";
import { t } from "i18next";
import create from "zustand";
import useUtilityStore from "../UtilityStore";
import { schoolClassDeleteUrl, schoolClassListUrl, schoolClassAddUrl, schoolClassAddInfoUrl, schoolClassDetailsUrl, schoolClassEditUrl, schoolClassCancelUrl } from "../../Utility/Url";
import { Toastr } from "../../Utility/UtilityFunctions";
const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useClassStore = create((set) => ({

    classList: [],
    setClassList: (value) => set({ classList: value }),

    classAddForm:
    {
        school_category_id: "",
        lesson_id: "",
        classroom_id: "",
        date: "",
        start_time: "00:00",
        end_time: "00:00",
        instructor_type: "2",

    },
    setClassAddForm: (value) => set({ classAddForm: value }),

    classEditForm:
    {
        id: "",
        school_category_id: "",
        lesson_id: "",
        classroom_id: "",
        date: "",
        start_time: "00:00",
        end_time: "00:00",
        instructor_type: "2",

    },
    setClassEditForm: (value) => set({ classEditForm: value }),

    schoolClassAddInfo: {},
    setSchoolClassAddInfo: (value) => set({ schoolClassAddInfo: value }),

    schoolDetails: {},
    setSchoolDetails: (value) => set({ schoolDetails: value }),

    schoolDeleteId: {},
    setSchoolDeleteId: (value) => set({ schoolDeleteId: value }),

    schoolPageUrl: "",
    setSchoolPageUrl: (value) => set({ schoolPageUrl: value }),

    classTakeItem: 10,
    setClassTakeItem: (value) => set({ classTakeItem: value }),

    classSearchValue: "",
    setClassSearchValue: (value) => set({ classSearchValue: value }),

    //All Modal
    showAddClassModal: false,
    setShowAddClassModal: (value) => set({ showAddClassModal: value }),

    showEditClassModal: false,
    setShowEditClassModal: (value) => set({ showEditClassModal: value }),

    showDeleteClassModal: false,
    setShowDeleteClassModal: (value) => set({ showDeleteClassModal: value }),

    showClassDetailsModal: false,
    setShowClassDetailsModal: (value) => set({ showClassDetailsModal: value }),

    showCancelNoteModal: false,
    setShowCancelNoteModal: (value) => set({ showCancelNoteModal: value }),

}));

export default useClassStore;

//Get class
export const getSchoolClass = async (url = "", search = "") => {

    const { setClassList, classTakeItem } = useClassStore.getState();

    let body = {};

    if (search === "") {
        body = { take: classTakeItem, is_web: true }
    } else {
        body = { take: classTakeItem, is_web: true, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true) }
        const res = await axios.post(url === "" ? schoolClassListUrl : url, body);
        console.log("getSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            setClassList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false) }
    } catch (error) {
        console.log("getSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false) }
        return false;
    }
};

//Add class
export const addSchoolClass = async () => {

    const { classAddForm } = useClassStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolClassAddUrl, classAddForm);
        console.log("addSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            getSchoolClass();
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("addSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//get class add info
export const getSchoolClassAddInfo = async () => {

    const { setSchoolClassAddInfo } = useClassStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolClassAddInfoUrl);
        console.log("getSchoolClassAddInfo res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolClassAddInfo(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolClassAddInfo: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//get school Details
export const getSchoolClassDetails = async (id) => {

    const { setSchoolDetails } = useClassStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolClassDetailsUrl, { id: id });
        console.log("getSchoolClassDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolDetails(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolClassDetails: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

// class edit
export const editSchoolClass = async () => {
    const { classEditForm, schoolPageUrl } = useClassStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolClassEditUrl, classEditForm);
        console.log("editSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            getSchoolClass(schoolPageUrl);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("editSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

// delete school
export const deleteSchoolClass = async () => {
    const { schoolDeleteId, schoolPageUrl } = useClassStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolClassDeleteUrl, { id: schoolDeleteId });
        console.log("deleteSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            getSchoolClass(schoolPageUrl);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("deleteSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


//cancel school
export const cancelSchoolClass = async (body) => {

    const { schoolDeleteId, schoolPageUrl } = useClassStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolClassCancelUrl, body);
        console.log("cancelSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            getSchoolClass(schoolPageUrl);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("cancelSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
