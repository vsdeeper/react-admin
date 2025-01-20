import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import App from "./App.tsx";
import { MainLayout } from "./layout";
import store from "./stores";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <StrictMode>
            <Provider store={store}>
              <ConfigProvider
                locale={zhCN}
                theme={{
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
        }
      >
        <Route
          path="/login"
          Component={lazy(() => import("./views/login/Login.tsx"))}
        />
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            Component={lazy(() => import("./views/dashboard/Dashboard.tsx"))}
          />
          <Route path="/system" element={<Navigate to="/system/log" />} />
          <Route
            path="system/log"
            Component={lazy(() => import("./views/system/log/Log.tsx"))}
          />
        </Route>
        <Route path="*" Component={lazy(() => import("./views/404/404.tsx"))} />
      </Route>
    </Routes>
  </BrowserRouter>
);
