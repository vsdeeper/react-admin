import React from "react";
import * as Icons from "@ant-design/icons";

export default function DynamicAntIcon({ name }: { name: string }) {
  return React.createElement((Icons as any)[name]);
}
