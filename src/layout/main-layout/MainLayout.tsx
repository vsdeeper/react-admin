import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Button, Layout, Menu, Typography } from "antd";
import type { MenuItemType, SubMenuType } from "antd/es/menu/interface";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Logo } from "@/components";
import { useAppSelector } from "@/hooks";
import style from "./style.module.scss";
import antIconMap from "./ant-icon-map";

export default function MainLayout() {
  const { Sider, Header, Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const { menu } = useAppSelector((state) => state.global);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>();
  const navigate = useNavigate();

  const generateMenuItems = (data: VsMenuDataItem[]) => {
    return data.map((item) => {
      const obj: MenuItemType | SubMenuType = {
        key: item.path,
        label: item.menuName,
      };
      if (item.menuType === 1 /** 模块 */) {
        if (item.icon) {
          obj.icon = antIconMap[item.icon];
        }
        if (item.children?.length /** 有子集 */) {
          (obj as SubMenuType).children = generateMenuItems(item.children);
        }
      } else if (item.menuType === 2 /** 菜单 */) {
        obj.icon = item.icon ? antIconMap[item.icon] : antIconMap.FireOutlined;
      }
      return obj;
    });
  };

  const handleClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(`${key}`);
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  return (
    <Layout className={style.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo collapsed={collapsed} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={generateMenuItems(menu)}
          onClick={handleClick}
        />
      </Sider>
      <Layout>
        <Header className={style.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className={style.content}>
          <Outlet />
        </Content>
        <Footer className={style.footer}>
          Made by
          <Typography.Link href="https://github.com/vsdeeper" target="_blank">
            Vsdeeper
          </Typography.Link>
        </Footer>
      </Layout>
    </Layout>
  );
}
