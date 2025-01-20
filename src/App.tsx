import { Outlet } from "react-router";
import "./App.scss";
import { useAppDispatch } from "./hooks";
import { storeUserInfo } from "./stores/global";

export default function App() {
  const dispatch = useAppDispatch();
  setTimeout(() => {
    dispatch(storeUserInfo({ name: "como" }));
  }, 3000);
  return <Outlet />;
}
