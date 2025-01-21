/**
 * 文件下载，适用于后端接口返回文件流
 * @param data 文件流数据
 * @param filename 文件名字，需带文件格式后缀
 */
export function fileDownload(data: ArrayBuffer | Blob, filename: string): boolean | undefined {
  try {
    const href = window.URL.createObjectURL(new Blob([data])) // 创建下载的链接
    const downloadElement = document.createElement('a')
    downloadElement.style.display = 'none'
    downloadElement.href = href
    downloadElement.download = filename // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href)
    return true
  } catch (error) {
    console.error('fileDownload: ', error)
  }
}
