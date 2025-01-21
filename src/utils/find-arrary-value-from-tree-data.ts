type NodeKey = string | number

/**
 * 根据子ID查询其所有父级元素，包含其本身
 * @param targetId 要查询的目标id
 * @param treeData 树形数据
 * @param options 可选参数
 * @param options.id id字段别名，默认id
 * @param options.label label字段别名，默认label
 * @param options.children children子节点别名，默认children
 * @param options.returnType 返回所查找元素的类别，可选'ids'(默认)|'labels'|'nodes'
 */
export function findArraryValueFromTreeData(
  targetId: NodeKey,
  treeData: Record<string, any>[],
  options?: {
    id?: string
    label?: string
    children?: string
    returnType?: 'ids' | 'labels' | 'nodes'
  }
) {
  try {
    const { returnType = 'ids' } = options ?? {}
    if (returnType === 'labels') return getLabels(targetId, toFlatten(treeData), options)
    else if (returnType === 'ids') return getIds(targetId, toFlatten(treeData), options)
    else return getNodes(targetId, toFlatten(treeData), options)
  } catch (error) {
    console.error('findArraryValuesFromTreeData: ', error)
  }
}

/**
 * 拍平树形数据
 * @param treeData 树形数据
 * @param options 可选参数
 * @param options.id id字段别名，默认id
 * @param options.children children子节点别名，默认children
 * @param options.parentId 节点的父级id，函数内部自动添加，无需传入
 */
export function toFlatten(
  treeData: Record<string, any>[],
  options?: { id?: string; children?: string; parentId?: NodeKey }
): Record<string, any>[] {
  try {
    const { id = 'id', children = 'children', parentId } = options ?? {}
    return treeData.reduce<Record<string, any>[]>((pre, cur) => {
      return [
        ...pre,
        typeof parentId === 'undefined' ? cur : { ...cur, parentId },
        ...(cur[children]?.length ? toFlatten(cur[children], { parentId: cur[id] }) : [])
      ]
    }, [])
  } catch (error) {
    console.error('toFlatten: ', error)
    return []
  }
}

function getIds(targetId: NodeKey, flatData: Record<string, any>[], options?: { id?: string }) {
  const { id = 'id' } = options ?? {}
  let ids = [targetId]
  let child = flatData.find((e) => e[id] === targetId)
  while (child && typeof child.parentId !== 'undefined') {
    ids = [child.parentId, ...ids]
    child = flatData.find((e) => e[id] === child!.parentId)
  }
  return ids
}

function getLabels(
  targetId: NodeKey,
  flatData: Record<string, any>[],
  options?: { id?: string; label?: string }
) {
  const { id = 'id', label = 'label' } = options ?? {}
  let child = flatData.find((e) => e[id] === targetId)
  let labels: string[] = child && child[label] ? [child[label]] : []
  while (child && typeof child.parentId !== 'undefined') {
    const find = flatData.find((e) => e[id] === child!.parentId)
    labels = [find![label], ...labels]
    child = flatData.find((e) => e[id] === child!.parentId)
  }
  return labels
}

function getNodes(targetId: NodeKey, flatData: Record<string, any>[], options?: { id?: string }) {
  const { id = 'id' } = options ?? {}
  let child = flatData.find((e) => e[id] === targetId)
  let nodes = child ? [child] : []
  while (child && typeof child.parentId !== 'undefined') {
    const find = flatData.find((e) => e[id] === child!.parentId)
    nodes = [find!, ...nodes]
    child = flatData.find((e) => e[id] === child!.parentId)
  }
  return nodes
}
