// import axios from "axios";
// import i18next, { t } from "i18next";
import create from "zustand";

const useGeneralStore = create((set) => ({
  role: null,
  setRole: (data) => set({ role: data }),
}));

export default useGeneralStore;

// export const setAppLangCodeFoo = async (lang_code = "en") => {
//   const { setLoading } = useGeneralStore.getState();
//   const { setAppLangCode } = useGeneralStore.getState();

//     try {
//       setLoading(true);

//       const res = await axios.post(kuSetLanguage, { lang_code: lang_code });
//       console.log("setAppLangCodeFoo: ", res.data);

//       if (res.data.success) {
//         setAppLangCode(lang_code);
//         i18next.changeLanguage(lang_code);
//         localStorage.setItem("lang_code", lang_code);
//       } else Toastr(res.data.message);

//       setLoading(false);
//     } catch (err) {
//       Toastr(t("An error occurred!"));
//       setLoading(false);
//       console.log("setAppLangCodeFoo: ", err);
//     }
// };


