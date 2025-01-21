import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./styles/main.scss";
import { queryMenu, queryUserInfo } from "./api/global";
import store from "./stores";
import { storeMenu, storeUserInfo } from "./stores/global";

NProgress.configure({ showSpinner: true, minimum: 0.1 });

// 获取用户信息
queryUserInfo().then((res) => {
  store.dispatch(storeUserInfo(res));
});

// 获取菜单数据
NProgress.start();
queryMenu().then(async (res) => {
  store.dispatch(storeMenu(res));
  const router = (await import("./router")).default;
  createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
  );
  NProgress.done();
});
