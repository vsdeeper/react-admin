import { Avatar, Badge, Button, Popover } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import style from "./style.module.scss";

export default function MessageBell({ data }: { data: Record<string, any>[] }) {
  const content = data.map((e) => (
    <Badge key={e.id} dot={!e.read} size="small">
      {e.avatar ? (
        <Avatar src={<img src={e.avatar} alt="avatar" />} />
      ) : (
        <Avatar icon={<UserOutlined />} />
      )}
      <div className={style["info-box"]}>
        <h4>{e.title}</h4>
        <div>{e.desc}</div>
      </div>
    </Badge>
  ));

  return (
    <Popover
      content={content}
      title="通知"
      trigger="click"
      className={style["message-bell"]}
      classNames={{ body: style["message-popover"] }}
    >
      <Badge count={5} size="small">
        <Button
          color="default"
          variant="filled"
          shape="circle"
          icon={<BellOutlined />}
          onClick={(e) => e.preventDefault()}
        />
      </Badge>
    </Popover>
  );
}
