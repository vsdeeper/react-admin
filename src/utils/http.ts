import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { message, Modal } from "antd";
import { TOKEN_STORAGE_KEY } from "./constants";

const MODE = import.meta.env.VITE_MODE;
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH;

const config = {
  // 接口域名默认与页面域名一致，根据需要添加域名
  apiDomain: {
    dev: API_DOMAIN,
    test: API_DOMAIN,
    prod: API_DOMAIN,
  },
  basePath: API_BASE_PATH,
  // 根据需要添加配置第三方接口...
  thirdPartyConfig: {
    apiDomain: {
      dev: "/",
      test: "/",
      prod: "/",
    },
    basePath: "",
  },
};

// 默认 http 实例
const http: AxiosInstance = axios.create({
  baseURL: config.apiDomain[MODE] + config.basePath,
  // 请求超时设置，默认10秒
  timeout: 10000,
});

// 根据需要创建第三方 http 实例...

// 添加 http 请求拦截器
http.interceptors.request.use(
  async function (config) {
    // 在发送请求之前做些什么
    const token: string | undefined = Cookies.get(TOKEN_STORAGE_KEY);
    if (token) {
      // Authorization 根据需要修改
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加 http 响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data } = response;
    if (data.code === 0 /** 正常业务返回码 */) {
      return data;
    } else {
      message.error(data.msg ?? "未知错误");
      return Promise.reject(data);
    }
  },
  function (error) {
    // 对响应错误做点什么
    if (error.message.includes("timeout")) {
      message.error("请求超时");
    } else if (error.message === "Network Error") {
      message.error("网络错误");
    } else {
      if (error.response.status === 401) {
        Modal.confirm({
          title: "提示",
          content: "登录失效，请重新登录",
          onOk() {
            window.location.replace(`/login?redirect_url=${getRedirectUrl()}`);
          },
        });
      } else {
        message.error(error.message);
      }
    }
    return Promise.reject(error);
  }
);

function getRedirectUrl(base?: string) {
  try {
    const pathname = window.location.pathname;
    const search = window.location.search;
    if (!base || base === "/") return `${pathname}${search}`;
    else return `/${pathname.split(base)[1]}${search}`;
  } catch (error) {
    console.error("getRedirectUrl ->", error);
  }
}

export { http };
