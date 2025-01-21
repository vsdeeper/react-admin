/**
 * 图片质量压缩
 * @param imgFile 图片文件
 * @param quality 默认0.5
 */
export function imageCompress(imgFile: File | Blob, quality?: number) {
  return new Promise<string>((resolve, reject) => {
    try {
      console.log('压缩前文件信息: ', imgFile)
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        const img = new Image()
        img.src = ev.target?.result as string
        img.onload = () => {
          // 创建一个canvas元素
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          let width = img.width
          let height = img.height
          // 图片宽度超过1500 按1500计算 等比例缩放
          if (width > 1500) {
            height = Math.ceil((1500 * height) / width)
            width = 1500
          }
          // 设置canvas的宽高
          canvas.width = width
          canvas.height = height
          // 将图片绘制到canvas上，并调整质量
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

          // 将canvas转换为base64格式的图片，同时设置质量
          const dataUrl = canvas.toDataURL('image/jpeg', quality ?? 0.5 /**质量压缩为原来的50% */)
          resolve(dataUrl)
        }
      }
      fileReader.readAsDataURL(imgFile)
    } catch (error) {
      console.error('imageCompress ->', error)
      reject(error)
    }
  })
}
