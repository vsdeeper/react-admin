type NodeKey = string | number

/**
 * 根据value值获取label名称
 * @param target 目标值
 * @param data 查找的目标数据，只适用于扁平数组
 * @param options 可选参数
 * @param options.label label别名，默认label
 * @param options.value value别名，默认value
 * @param options.emptyText 空数据时文本内容
 */
export function getLabelByValue(
  target: NodeKey,
  data: Record<string, any>[],
  options?: { label?: string; value?: string; emptyText?: string }
) {
  try {
    const { label = 'label', value = 'value', emptyText = '--' } = options ?? {}
    const find = data.find((e) => e[value] === target)
    return (find && find[label]) ?? emptyText
  } catch (error) {
    console.error('getLabelByValue: ', error)
  }
}
