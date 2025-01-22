import { http } from "@/utils/http";
import { sleep } from "radash";

export async function queryUserInfo() {
  try {
    const { data } = await http({
      baseURL: "/",
      method: "get",
      url: "/mock/user-info.json?t=" + +new Date(),
    });
    await sleep(1000);
    return data as {
      userId?: number;
      userName?: string;
    };
  } catch (error) {
    console.error("queryUserInfo ->", error);
  }
}

export async function queryMenu() {
  try {
    const { data } = await http({
      baseURL: "/",
      method: "get",
      url: "/mock/menu-data.json?t=" + +new Date(),
    });
    await sleep(1000);
    return data as VsMenuDataItem[];
  } catch (error) {
    console.error("queryMenuData ->", error);
  }
}

export async function queryMessage() {
  try {
    const { data } = await http({
      baseURL: "/",
      method: "get",
      url: "/mock/message.json?t=" + +new Date(),
    });
    await sleep(1000);
    return data as Record<string, any>[];
  } catch (error) {
    console.error("queryMessage ->", error);
  }
}
