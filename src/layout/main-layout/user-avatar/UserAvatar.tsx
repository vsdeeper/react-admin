import { Avatar, Button, Popover, Skeleton } from "antd";
import avatar from "@/assets/avatar.png";
import style from "./style.module.scss";

export default function UserAvatar() {
  const content = (
    <div>
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Button type="primary" danger style={{ width: "100%" }}>
        登出
      </Button>
    </div>
  );
  return (
    <Popover
      content={content}
      title="个人中心"
      trigger="click"
      className={style["avatar"]}
      classNames={{ body: style["avatar-popover"] }}
    >
      <Avatar src={<img src={avatar} alt="avatar" />} />
    </Popover>
  );
}
