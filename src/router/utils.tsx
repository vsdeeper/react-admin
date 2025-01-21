import { dash, last, pascal, title } from "radash";
import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router";

const transPath = (path: string) => {
  const arr = path
    .split("/")
    .filter((e) => !!e)
    .map((e) => dash(title(e)).toLowerCase());
  return `${arr.join("/")}/${pascal(last(arr)!)}`;
};

const matchViewPaths: Record<string, any> = import.meta.glob(
  "../views/**/*.tsx"
);
export const generateRoutes = (menuData: VsMenuDataItem[]) => {
  return menuData.map((item) => {
    const route: RouteObject = {
      path: item.path,
    };
    if (item.menuType === 2 /** 菜单 */) {
      route.Component = lazy(
        matchViewPaths[`../views/${transPath(item.path)}.tsx`]
      );
    }
    if (item.menuType === 1 && item.children?.length /** 模块，且有子集 */) {
      route.children = generateRoutes(item.children);
      route.children.unshift({
        index: true,
        element: <Navigate to={route.children[0].path!} />,
      });
    }
    return route;
  });
};
