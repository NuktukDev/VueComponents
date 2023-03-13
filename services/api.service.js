import Vue from "vue";
import camelCaseKeys from "camelcase-keys";
import logout from "@/utils/logout";
const DEFAULT_API_URL = import.meta.env.VITE_APP_BASE_API;
const DATA_API_URL = import.meta.env.VITE_APP_DATA_API;

// Custom API error to throw
function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  this.response = response;
  this.message = message;
  this.status = status;
  this.toString = function () {
    return `${this.message}\nResponse:\n${
      isObject ? JSON.stringify(this.response, null, 2) : this.response
    }`;
  };
}

const hasUnauthorizedStatus = (status) => status === 401;
const hasErrorStatus = (status) => status < 200 || status >= 300;
const isObject = (item) => typeof item === "object";
const isEmptyObject = (obj) => Object.keys(obj).length === 0;
const buildRequestOptions = (method, token, headers, extra) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  },
  ...extra,
});
const parseResponse = async function (response) {
  const { status } = response;
  const DEFAULT_MESSAGE = `Request failed with status ${status}`;

  if (hasUnauthorizedStatus(status)) {
    //logout();
  }

  if (hasErrorStatus(status)) {
    const errorResponse = await response.text();
    throw new ApiError(DEFAULT_MESSAGE, errorResponse, status);
  }

  const responseData = await response.json();
  return responseData;
};
const buildFetchRequest = function (endpoint, method = "GET", options = {}) {
  const {
    headers,
    body = {},
    query = null,
    isDataApi = false,
    ...extra
  } = options;

  const apiUrl = isDataApi ? DATA_API_URL : DEFAULT_API_URL;
  const token = Vue.$cookies.get("t");
  const requestOptions = buildRequestOptions(method, token, headers, extra);

  if (!isEmptyObject(body)) {
    requestOptions.body = isObject(body) ? JSON.stringify(body) : body; // Stringify body if object
  }

  const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

  return () => fetch(`${apiUrl}/${endpoint}${queryString}`, requestOptions);
};
//const pipe = (...funcs) => val => funcs.reduce((currVal, currFunc) => currFunc(currVal), val);
const changeToCamelCase = (data) => camelCaseKeys(data, { deep: true });
const sendRequest = async (fetchRequest) =>
  await fetchRequest().then(parseResponse);

export default (...args) =>
  sendRequest(buildFetchRequest(...args)).then(changeToCamelCase);
