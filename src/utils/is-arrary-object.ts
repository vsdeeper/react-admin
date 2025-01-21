/**
 * 判断对象数组
 * @param data
 */
export function isArraryObject(data: unknown) {
  try {
    if (Array.isArray(data)) {
      if (data.length) return !!data[0] && data[0].constructor === Object
      console.warn('data.length === 0, unable to judge.')
    }
    return false
  } catch (error) {
    console.error('isArraryObject ->', error)
  }
}
