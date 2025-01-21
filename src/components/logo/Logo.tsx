import { Image } from "antd";
import LogoIcon from "@/assets/react.svg";
import style from "./style.module.scss";

export default function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={style.logo}>
      <Image
        src={LogoIcon}
        preview={false}
        style={{
          flex: `0 0 ${collapsed ? "30px" : "25px"}`,
          width: collapsed ? "30px" : "25px",
        }}
      />
      {!collapsed && <span>Vswift</span>}
    </div>
  );
}
