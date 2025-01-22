import { Empty } from "antd";

export default function Dict() {
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
