import axios from "axios";
import create from "zustand";
import useUtilityStore from "../UtilityStore";
import { Toastr} from "../../Utility/UtilityFunctions";
import { t } from "i18next";

import {
    schoolCategoryLessonShowUrl,
    schoolCategoryListUrl,
    schoolCategoryListShowUrl,
    schoolCategoryLessonUrl,
    schoolCategoryToggleUrl,
    schoolCategoryAddLessonUrl,
    schoolCategoryEditLessonUrl,
    schoolCategoryDeleteLessonUrl,
    schoolCategoryLessonUpdateIndexUrl,
    schoolCategoryEditUrl
} from "../../Utility/Url";
const {
    setLoading
} = useUtilityStore.getState();

const useSchoolCategoryStore = create((set) => ({

    schoolCategoryListAll: [],
    setSchoolCategoryListAll: (value) => set({
        schoolCategoryListAll: value
    }),

    schoolCategoryTampList: [],
    setSchoolCategoryTampList: (value) => set({
        schoolCategoryTampList: value
    }),

    schoolCategoryDetails: {},
    setSchoolCategoryDetails: (value) => set({
        schoolCategoryDetails: value
    }),

    schoolCategoryLessonList: [],
    setSchoolCategoryLessonList: (value) => set({
        schoolCategoryLessonList: value
    }),

    lessonsAddFromData: {
        school_category_id: "",
        name: "",
        type: "",
        price: "",
        lesson_duration_id: "",
        duration: "00:00",
        description: "",
        requirements: "",
        is_mandatory: false,
        is_moms: ""
    },
    setLessonsAddFromData: (value) => set({
        lessonsAddFromData: value
    }),

    lessonsEditFromData: {
        school_category_id: "",
        id: "",
        name: "",
        type: "",
        price: "",
        lesson_duration_id: "",
        duration: "00:00",
        description: "",
        requirement: "",
        is_mandatory: false,
        is_moms: false
    },
    setLessonsEditFromData: (value) => set({
        lessonsEditFromData: value
    }),

    schoolCategoryLessonDetails: {},
    setSchoolCategoryLessonDetails: (value) => set({
        schoolCategoryLessonDetails: value
    }),

    schoolCategoryLessonDeleteId: null,
    setSchoolCategoryLessonDeleteId: (value) => set({
        schoolCategoryLessonDeleteId: value
    }),

    schoolCategoryPageUrl: "",
    setSchoolCategoryPageUrl: (value) => set({
        schoolCategoryPageUrl: value
    }),

    schoolCategorySearchKey: "",
    setSchoolCategorySearchKey: (value) => set({
        schoolCategorySearchKey: value
    }),

    categoryEditForm: {
        id: "",
        price: "",
        description: "",
        requirement: ""
    },
    setCategoryEditForm: (value) => set({
        categoryEditForm: value
    }),

    //All Modal

    showSchoolCategoryListDeactivateModal: false,
    setShowSchoolCategoryListDeactivateModal: (value) => set({
        showSchoolCategoryListDeactivateModal: value
    }),

    showAddCategoryListLessonModal: false,
    setShowAddCategoryListLessonModal: (value) => set({
        showAddCategoryListLessonModal: value
    }),

    showEditCategoryListLessonModal: false,
    setShowEditCategoryListLessonModal: (value) => set({
        showEditCategoryListLessonModal: value
    }),

    showDeleteCategoryListLessonModal: false,
    setShowDeleteCategoryListLessonModal: (value) => set({
        showDeleteCategoryListLessonModal: value
    }),

    showEditSchoolCategoryDetailsModal: false,
    setShowEditSchoolCategoryDetailsModal: (value) => set({
        showEditSchoolCategoryDetailsModal: value
    }),

}));

export default useSchoolCategoryStore;

export const schoolCategoryIndex = async (url = "") => {

    const {
        setSchoolCategoryListAll,
        setSchoolCategoryTampList
    } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(url === "" ? schoolCategoryListUrl : url, {
            "take": 10,
            "is_web": true
        });
        console.log("schoolCategoryIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolCategoryListAll(res?.data?.data);
            setSchoolCategoryTampList(res?.data?.data)
        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
        }
        setLoading(false);
    } catch (error) {
        console.log("schoolCategoryIndex: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

export const getSchoolCategoryDetails = async (id) => {

    const {
        setSchoolCategoryDetails
    } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryListShowUrl, {
            id: id
        });
        console.log("getSchoolCategoryDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolCategoryDetails(res?.data?.data);
            if (res?.data?.data?.id) {
                await getSchoolCategoryLessonIndex(res?.data?.data?.id)
            }
        } else {
            Toastr({ message: res?.data?.message,type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolCategoryDetails: ", error);
        Toastr({message: t("An error occurred!"),type: "error"});
        setLoading(false);
        return false;
    }
};

export const getSchoolCategoryLessonIndex = async (id) => {
    const {
        setSchoolCategoryLessonList
    } = useSchoolCategoryStore.getState();
    try {
        // setLoading(true);
        const res = await axios.post(schoolCategoryLessonUrl, {
            school_category_id: id
        });
        console.log("getSchoolCategoryLessonIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolCategoryLessonList(res?.data?.data);
        } else {
            Toastr({message: res?.data?.message, type: "error"});
        }
        // setLoading(false);
    } catch (error) {
        console.log("getSchoolCategoryLessonIndex: ", error);
        Toastr({message: t("An error occurred!"),type: "error"});
        // setLoading(false);
        return false;
    }
};

export const schoolCategoryToggleIndex = async (id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryToggleUrl, {
            id: id
        });
        console.log("schoolCategoryToggleIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await getSchoolCategoryDetails(res?.data?.data?.id);
            setLoading(false);
            return true;

        } else {
            Toastr({message: res?.data?.message,type: "error"});
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("schoolCategoryToggleIndex: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

export const addSchoolCategoryLesson = async () => {

    const {
        lessonsAddFromData
    } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryAddLessonUrl, lessonsAddFromData);
        console.log("addSchoolCategoryLesson res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({
                message: res?.data?.message,
                type: "success"
            });
            setLoading(false);
            return true;

        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("addSchoolCategoryLesson: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

export const getSchoolCategoryLessonShow = async (id) => {
    const {
        setSchoolCategoryLessonDetails
    } = useSchoolCategoryStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryLessonShowUrl, {
            id: id
        });
        console.log("addSchoolCategoryLesson res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolCategoryLessonDetails(res?.data?.data);

        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
        }
        setLoading(false);
    } catch (error) {
        console.log("addSchoolCategoryLesson: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

export const editSchoolCategoryLesson = async () => {
    const {
        lessonsEditFromData
    } = useSchoolCategoryStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryEditLessonUrl, lessonsEditFromData);
        console.log("editSchoolCategoryLesson res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("editSchoolCategoryLesson: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

export const deleteSchoolCategoryLesson = async () => {
    const {
        schoolCategoryLessonDeleteId
    } = useSchoolCategoryStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryDeleteLessonUrl, {
            id: schoolCategoryLessonDeleteId
        });
        console.log("deleteSchoolCategoryLesson res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({
                message: res?.data?.message,
                type: "success"
            });
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("deleteSchoolCategoryLesson: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};


export const schoolCategoryLessonUpdateIndex = async (data, category_id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryLessonUpdateIndexUrl, {
            order: data
        });
        console.log("deleteSchoolCategoryLesson res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({
                message: res?.data?.message,
                type: "success"
            });
            await getSchoolCategoryDetails(category_id);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("deleteSchoolCategoryLesson: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

// Search Category
export const searchSchoolCategoryList = async (event) => {
    const {
        schoolCategoryTampList,
        setSchoolCategoryListAll
    } = useSchoolCategoryStore.getState();
    console.log("schoolCategoryTampList", schoolCategoryTampList)
    const result = await schoolCategoryTampList?.data?.filter((item) => {
        if (item) {
            let name = "";
            name = item.category_name ?? "";

            if (name.toLowerCase().includes(event.toLowerCase())) {
                return item;
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
    console.log("search result: ", result);
    const data = {
        data: result
    }
    await setSchoolCategoryListAll(data);
};

// category edit
export const schoolCategoryEdit = async () => {

    const {
        categoryEditForm
    } = useSchoolCategoryStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryEditUrl, categoryEditForm);
        console.log("schoolCategoryEdit res.data:::: ", res?.data);

        if (res?.data?.success) {
            await getSchoolCategoryDetails(res?.data?.data?.id);
            setLoading(false);
            return true;

        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("schoolCategoryEdit: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};