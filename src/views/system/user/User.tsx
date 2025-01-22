import { Empty } from "antd";

export default function User() {
  return (
    <Empty
      description={false}
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    />
  );
}
