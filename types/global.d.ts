export {};
declare global {
  /**
   * 菜单数据接口
   * @interface VsMenuDataItem
   * @property {number} VsMenuDataItem.menuId - 菜单id
   * @property {string} VsMenuDataItem.menuName - 菜单名称
   * @property {number} VsMenuDataItem.menuType - 菜单类型，菜单挂在模块下，权限点挂在菜单下，可选值 1-模块，2-菜单，3-权限点
   * @property {string} VsMenuDataItem.menuKey - 菜单唯一key，带上上一级的menuKey，用 : 隔开，例：模块 a 的权限标识符取名 aKey，则模块 a 下面的菜单 b 的menuKey可取名 aKey，则模块:bKey
   * @property {string} VsMenuDataItem.path - 路由路径，例：/aRoutePath/bRoutePath
   * @property {string} VsMenuDataItem.icon - 菜单图标
   * @property {number} VsMenuDataItem.isExternalLink - 是否外链，可选值 1-是，2-否
   * @property {number} VsMenuDataItem.visible - 是否显示，可选值 1-显示，2-隐藏
   * @property {arrary} VsMenuDataItem.children - 子菜单
   */
  interface VsMenuDataItem {
    menuId: number;
    menuName: string;
    menuType: 1 | 2 | 3;
    menuKey: string;
    path: string;
    icon?: string;
    isExternalLink?: 1 | 2;
    visible?: 1 | 2;
    children?: VsMenuDataItem[];
  }

  /**
   * 分页参数
   * @interface PagingParams
   * @property {number} PagingParams.pageIndex - 页码
   * @property {number} PagingParams.pageSize - 每页显示条目个数
   */
  interface PagingParams {
    pageIndex?: number;
    pageSize?: number;
    [key: string]: any;
  }

  /**
   * 选项数据通用
   * @interface OptionItem
   * @property {string | number} OptionItem.id - 唯一标识
   * @property {string} OptionItem.label - 名称
   * @property {string | number} OptionItem.label - 也可做唯一标识
   */
  interface OptionItem {
    id?: string | number;
    label?: string;
    value?: string | number;
    [key: string]: any;
  }
}
