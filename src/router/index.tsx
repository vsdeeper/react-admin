import { lazy, StrictMode } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import App from "../App";
import store from "../stores";
import { MainLayout } from "../layout";
import { generateRoutes } from "./utils";

const routes = generateRoutes(store.getState().global.menu);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <StrictMode>
        <Provider store={store}>
          <ConfigProvider
            locale={zhCN}
            theme={{
              cssVar: true,
              hashed: false,
              token: {
                // 自定义主题色
                // colorPrimary: "#00b96b",
              },
            }}
          >
            <App />
          </ConfigProvider>
        </Provider>
      </StrictMode>
    ),
    children: [
      {
        path: "/login",
        Component: lazy(() => import("../views/login/Login.tsx")),
      },
      {
        element: <MainLayout />,
        children: routes.length
          ? [
              { index: true, element: <Navigate to={routes[0].path!} /> },
              ...routes,
            ]
          : [],
      },
      { path: "*", Component: lazy(() => import("../views/404/404.tsx")) },
    ],
  },
]);

export default router;
