/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import AxiosHeader from "./App/Utility/AxiosHeader";
import Layout from "./Components/Layout/Layout";
import OverlayModalArea from "./Components/Layout/OverlayModalArea";
import LoadingModal from "./Components/Modal/LoadingModal";
import Error404 from "./Components/Others/Error404";
import Login from "./Pages/Auth/Login";
import LoginScreen from "./Pages/Auth/LoginScreen";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Test from "./Pages/Test/Test";
import { useEffect, useState } from "react";
import useAuthStore, { verifyAuthUser } from "./App/Stores/authStore";
import ProtectedRoute from "./App/Utility/ProtectedRoute";
import SplashScreen from "./Components/Layout/SplashScreen";
import Invoice from "./Pages/Invoice/Invoice";
import InvoiceDetail from "./Pages/Invoice/InvoiceDetail";
import useUtilityStore from "./App/Stores/UtilityStore";
import InvoiceParent from "./Pages/Invoice/InvoiceParent";
import SettingsParent from "./Pages/settings/SettingsParent";
import { setAppSidebarList } from "./Utility/UtilityFunctions";
import useGeneralStore from "./App/Stores/GeneralStore";
import Contact from "./Pages/settings/Components/school/Contact";
import Classes from "./Pages/MawaySchoolWeb/classes/Classes";
import SchoolTermsAndCondition from "./Pages/settings/Components/school/SchoolTermsAndCondition";
import LicenseOverview from "./Pages/MawaySchoolWeb/profile/components/LicenseOverview";
import SchoolCategoryList from "./Pages/MawaySchoolWeb/category/SchoolCategoryList";
import SchoolCategoryListDetails from "./Pages/MawaySchoolWeb/category/components/SchoolCategoryListDetails";
import Classroom from "./Pages/MawaySchoolWeb/classroom/Classroom";
import Notification from "./Pages/MawaySchoolWeb/notification/Notification";
import { k_role } from "./App/Utility/const";
import NewInvoice from "./Pages/MawaySchoolWeb/invoice/NewInvoice";
import BankInformation from "./Pages/settings/Components/school/BankInformation";
import SchoolChangePassword from "./Pages/settings/Components/school/SchoolChangePassword";
import FaqManagement from "./Pages/settings/Components/FaqManagement";
import SchoolStudent from "./Pages/MawaySchoolWeb/student/SchoolStudent";
import SchoolStudentParent from "./Pages/MawaySchoolWeb/student/SchoolStudentParent";
import SchoolInstructorParent from "./Pages/MawaySchoolWeb/Instructor/SchoolInstructorParent";
import SchoolInstructor from "./Pages/MawaySchoolWeb/Instructor/SchoolInstructor";
import SchoolInstructorInvoice from "./Pages/MawaySchoolWeb/Instructor/components/SchoolInstructorInvoice";
import SchoolInstructorClassRoom from "./Pages/MawaySchoolWeb/Instructor/components/SchoolInstructorClassRoom";
import SchoolInstructorDriving from "./Pages/MawaySchoolWeb/Instructor/components/SchoolInstructorDriving";
import SchoolInstructorExternal from "./Pages/MawaySchoolWeb/Instructor/components/SchoolInstructorExternal";
import SchoolStudentProfile from "./Pages/MawaySchoolWeb/student/components/SchoolStudentProfile";
import NewInvoiceDetails from "./Pages/MawaySchoolWeb/invoice/NewInvoiceDetails";
import Register from "./Pages/Auth/Register";
import OtpVerification from "./Pages/Auth/OtpVerification";
import ForgotPassword from "./Pages/Auth/ForgetPassword";
import CreateNewPassword from "./Pages/Auth/CreateNewPassword";
import BalanceHistory from "./Pages/MawaySchoolWeb/student/components/BalanceHistory";
import LanguageChange from "./Pages/settings/Components/school/LanguageChange";

if (localStorage.maway_token) {
  AxiosHeader(localStorage.maway_token);
} else {
  if (localStorage.postcard_token) {
    AxiosHeader(localStorage.maway_token);
  } else {
    AxiosHeader(null);
  }
} function App(props) {
  const { setIsLoggedIn } = useAuthStore();
  const { loggedUser, setLoggedUser } = useUtilityStore();
  const [loading, setLoading] = useState(true);
  const { role } = useGeneralStore();

  const navigateTo = useNavigate();
  const token = localStorage.getItem("maway_token")

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      verifyIfRealUser();
      navigateTo("/");
    } else {
      setIsLoggedIn(false);
      const path = window.location.pathname;
      if (path === '/login' || path === '/admin/login' || path === '/register' || path === '/otp-verification' || '/forgot-password') {
        // console.log('path1', window.location.pathname);
      } else {
        // console.log('path2', window.location.pathname);
        navigateTo("/login");
      }
    }

  }, [token]);

  const verifyIfRealUser = async () => {
    await verifyAuthUser();
  }

  useEffect(() => {

    if (loggedUser?.name === "") {
      let local_data = "";
      local_data = localStorage.getItem("user");
      local_data && setLoggedUser(JSON.parse(local_data));
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setAppSidebarList(role)
  }, [role])


  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="bg-cLayoutBg text-cTextBlack">
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
            theme="dark"
            limit={2}
          />

          <LoadingModal />
          <OverlayModalArea />

          <Routes>
            {/* red 404 not found */}
            <Route exact path="/*">
              <Route
                path="*"
                element={
                  <Layout>
                    <Error404 />
                  </Layout>
                }
              />
            </Route>


            {/* red: auth */}
            <Route exact path="/login" element={ <Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/otp-verification" element={<OtpVerification />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/set-new-password" element={<CreateNewPassword />} />

            <Route exact path="/" element={<ProtectedRoute />}>

            {/* blue: dashboard */}
              <Route
                exact
                path="/"
                element={
                  <Layout {...props}>
                    <Dashboard />
                  </Layout>
                }
              >
            </Route>

              {/********************** license Start ***********************/}

              <Route
                exact
                path="/license/overview"
                element={
                  <Layout>
                    <LicenseOverview />
                  </Layout>
                }
              >
              </Route>

              {/**********************  license End ***********************/}


              {/********************** Invoice Start ***********************/}
              <Route
                exact
                path="/invoice"
                element={
                  <Layout {...props}>
                    <InvoiceParent />
                  </Layout>
                }
              >
                <Route index element={role === k_role?.school ? <NewInvoice /> : <Invoice />} />
                <Route path="details/:invoice_id" element={role === k_role?.school ? <NewInvoiceDetails /> : <InvoiceDetail />} />
                <Route path="details/:invoice_id/:invoice_type" element={role === k_role?.school ? <NewInvoiceDetails /> : <InvoiceDetail />} />
          
              </Route>
              {/********************** Invoice End ***********************/}



              {/********************** Settings Start ***********************/}
              <Route
                exact
                path="/settings"
                element={
                  <Layout {...props}>
                    <SettingsParent />
                  </Layout>
                }
              >
                <Route index element={<FaqManagement />} />
                <Route path="school/bank-information" element={<BankInformation />} />
                <Route path="school/contact-us" element={<Contact />} />
                <Route path="school/change-password" element={<SchoolChangePassword />} />
                <Route path="school/language-change" element={<LanguageChange />} />
                <Route path="school/terms-condition" element={<SchoolTermsAndCondition />} />

              </Route>
              {/********************** Settings End ***********************/}



              <Route
                exact
                path="/play"
                element={
                  <Layout>
                    <Test />
                  </Layout>
                }
              >
              </Route>


            </Route>

            {/* blue: testing */}
            <Route
              exact
              path="/test"
              element={
                // <Layout>
                <Test />
                // </Layout>
              }
            ></Route>


            {/* 🏫 school web */}
            <Route
              exact
              path="/classes"
              element={
                <Layout>
                  <Classes />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/school/category-list"
              element={
                <Layout>
                  <SchoolCategoryList />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/classroom"
              element={
                <Layout>
                  <Classroom />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/school/category-list/details/:category_id"
              element={
                <Layout>
                  <SchoolCategoryListDetails />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/notification"
              element={
                <Layout>
                  <Notification />
                </Layout>
              }
            ></Route>

            {/********************** School Student start ***********************/}
            <Route
              exact
              path="/school-student"
              element={
                <Layout {...props}>
                  <SchoolStudentParent />
                </Layout>
              }
            >
              <Route index element={<SchoolStudent />} />
              <Route path="details/:school_student_id" element={<><SchoolStudentProfile /></>} />
              <Route path="details/:school_student_id/balance-history" element={<><BalanceHistory /></>} />☻
            </Route>

            {/********************** School Student End ***********************/}


            {/********************** School Instructor start ***********************/}
            <Route
              exact
              path="/school-instructor"
              element={
                <Layout {...props}>
                  <SchoolInstructorParent />
                </Layout>
              }
            >
              <Route index element={<SchoolInstructor />} />
              <Route path="details/:school_instructor_id/invoice" element={<SchoolInstructorInvoice />} />
              <Route path="details/:school_instructor_id/classroom" element={<SchoolInstructorClassRoom />} />
              <Route path="details/:school_instructor_id/driving" element={<SchoolInstructorDriving />} />
              <Route path="details/:school_instructor_id/external" element={<SchoolInstructorExternal />} />
            </Route>

            {/********************** School Instructor End ***********************/}

            {/* blue: testing */}
            <Route exact path="/login2" element={<LoginScreen />}></Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;


export const PrivateRoute = ({
  token,
  redirectPath = '/',
  children,
}) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};