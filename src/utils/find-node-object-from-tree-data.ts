type NodeKey = string | number

/**
 * 从树形数据中找到目标ID所在的节点对象
 * @param targetId 目标ID
 * @param options 可选参数
 * @param options.id id别名
 * @param options.children children别名
 */
export function findNodeObjectFromTreeData(
  targetId: NodeKey,
  treeData: Record<string, any>[],
  options?: { id?: string; children?: string }
) {
  try {
    const { id = 'id', children = 'children' } = options ?? {}
    let find: Record<string, any> | undefined
    const findHandler = (treeData: Record<string, any>[]) => {
      for (const node of treeData) {
        if (node[id] === targetId) {
          find = node
          break
        } else {
          if (node[children]?.length) {
            findHandler(node[children])
          }
        }
      }
      return find
    }
    return findHandler(treeData)
  } catch (error) {
    console.error('findNodeFromTreeData: ', error)
  }
}
