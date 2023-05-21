import axios from "axios";
import create from "zustand";
import { getAllOrdersUrl, getOrderDetailsUrl, updateOrderActionUrl } from "../Utility/Url";
import { Toastr } from "../Utility/UtilityFunctions";
import useUtilityStore from "./UtilityStore";

const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useOrderStore = create((set) => ({
  orderList: [],
  setOrderList: (value) => set({ orderList: value }),

  orderListTemp: [],
  setOrderListTemp: (value) => set({ orderListTemp: value }),

  orderListPagination: {},
  setOrderListPagination: (value) => set({ orderListPagination: value }),

  orderStatusTable: "",
  setOrderStatusTable: (value) => set({ orderStatusTable: value }),

  orderDetails: {},
  setOrderDetails: (value) => set({ orderDetails: value }),

  showOrderDetails: false,
  setShowOrderDetails: (value) => set({ showOrderDetails: value }),

  searchOrderValue: "",
  setSearchOrderValue: (value) => set({ searchOrderValue: value }),
}));

export default useOrderStore;

// get all orders list
export const getAllOrderList = async (
  filterStatus,
  paginationUrl = "",
  shopID = ""
) => {
  try {
    setLoading(true);

    let targetUrl = "";

    if (paginationUrl !== "") {
      // targetUrl = paginationUrl.indexOf("?");
      paginationUrl = JSON.stringify(paginationUrl);
      targetUrl = paginationUrl.slice(
        paginationUrl.indexOf("?"),
        paginationUrl.length - 1
      );
      targetUrl = getAllOrdersUrl + targetUrl;
      console.log("targetUrl:::", targetUrl);
    } else {
      targetUrl = getAllOrdersUrl;
    }

    console.log("targetUrl:::", targetUrl);

    let res = {};

    if (filterStatus && filterStatus !== "all orders") {
      if (shopID) {
        console.log("SHOP ID WITH STATUS !!!!!!");
        res = await axios.post(targetUrl, {

          take: 10,
          status: filterStatus,
          shop_id: shopID,

        });
      } else {
        res = await axios.post(targetUrl, {

          take: 10,
          status: filterStatus,

        })
      }
    } else {
      if (shopID) {
        console.log("ONLY SHOP ID");
        res = await axios.post(targetUrl, {

          take: 10,
          shop_id: shopID,

        });
      } else {
        res = await axios.post(targetUrl, { take: 10 });
      }
    }

    console.log("getAllOrderList res.data:::: ", res.data);

    if (res.data.success) {
      useOrderStore.getState().setOrderList(res.data.data.data);
      useOrderStore.getState().setOrderListTemp(res.data.data.data);
      useOrderStore.getState().setOrderListPagination(res.data.data);
      // Toastr({ message: res.data.message, type: "success" });
    } else {
      Toastr({ message: res.data.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("getAllOrderList: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
  }
};

// get order details
export const getOrderDetails = async (id) => {
  try {
    setLoading(true);

    const res = await axios.post(getOrderDetailsUrl, {
      id: id,
    });

    console.log("getOrderDetails res.data:::: ", res.data);

    if (res.data.success) {
      useOrderStore.getState().setOrderDetails(res.data.data);
      // Toastr({ message: res.data.message, type: "success" });
    } else {
      Toastr({ message: res.data.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("getOrderDetails: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
  }
};

// update order action
export const updateOrderAction = async (updateID = "", updateStatus = "", paginationUrl = "") => {

  console.log("updateID  updateStatus  paginationUrl", updateID, updateStatus, paginationUrl);

  try {
    setLoading(true);

    const res = await axios.post(updateOrderActionUrl, {
      id: updateID,
      action: updateStatus,
    });

    console.log("updateOrderAction res.data:::: ", res.data);

    if (res.data.success) {
      await getAllOrderList("", paginationUrl, "");
      await getOrderDetails(updateID);
      // Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("updateOrderAction: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoading(false);
    return false;
  }
};


// search order list
export const searchOrdersList = async (searchValue) => {
  try {
    setLoadingSearch(true);
    console.log("searchValue::", searchValue);
    const res = await axios.post(getAllOrdersUrl, {
      search: searchValue,
      take: 10,
    });

    console.log("searchOrdersList::: res.data", res.data);

    if (res.data.success) {
      useOrderStore.getState().setOrderList(res.data.data.data);
      useOrderStore.getState().setOrderListTemp(res.data.data.data);
      useOrderStore.getState().setOrderListPagination(res.data.data);
      setLoadingSearch(false);
      return true;
    } else {
      Toastr({ message: res.data.message, type: "error" });
      console.log("searchOrdersList: ", res.data.message);
      setLoadingSearch(false);
      return false;
    }
  } catch (error) {
    console.log("searchOrdersList: ", error);
    Toastr({ message: "An error occurred!", type: "error" });
    setLoadingSearch(false);
    return false;
  }
};
