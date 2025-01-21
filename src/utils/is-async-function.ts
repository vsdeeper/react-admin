/**
 * 判断异步函数
 * @param obj
 * @returns boolean
 */
export function isAsyncFunction(obj: unknown) {
  try {
    return Object.prototype.toString.call(obj) === '[object AsyncFunction]'
  } catch (error) {
    console.error('isAsyncFunction: ', error)
  }
}
