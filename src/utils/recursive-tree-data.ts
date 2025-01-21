/**
 * 递归树形数据，返回原数据对象
 * @param treeData 树形数据
 * @param callback 递归回调，可对节点数据进行加工处理
 * @param options 可选参数
 * @param options.children children别名，默认children
 */
export function recursiveTreeData(
  treeData: Record<string, any>[],
  callback: (node: Record<string, any>) => void,
  options?: { children?: string }
) {
  const { children = "children" } = options ?? {};
  treeData.forEach((node) => {
    callback(node);
    if (node[children]?.length) {
      recursiveTreeData(node[children], callback, options);
    }
  });
  return treeData;
}
