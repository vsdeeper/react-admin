import * as XLSX from 'xlsx-js-style'
import type { XLSX$Utils, WorkSheet } from 'xlsx-js-style'

/**
 * xlsx文件导出
 * 更多关于xlsx-js-style, 参见 https://github.com/gitbrent/xlsx-js-style
 * @param exportData 导出数据
 * @param name 导出文件名，包含文件格式后缀
 * @param addStyleExc 自定义样式执行
 */
export async function xlsxExport(
  exportData: Record<string, any>[],
  name?: string,
  addStyleExc?: (XLSX: { utils: XLSX$Utils }, worksheet: WorkSheet) => void
) {
  try {
    // 创建工作簿和工作表
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(exportData, { cellStyles: true, cellDates: true })

    if (addStyleExc) {
      // 自定义样式执行
      addStyleExc(XLSX, worksheet)
    } else {
      // 默认样式执行
      // 获取工作表的范围
      const range = XLSX.utils.decode_range(worksheet['!ref']!)
      const startRow = range.s.r // 起始行
      const endRow = range.e.r // 结束行

      // 遍历指定行，并设置左对齐样式
      for (let row = startRow; row <= endRow; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellRef = XLSX.utils.encode_cell({ c: col, r: row })
          if (!worksheet[cellRef]) worksheet[cellRef] = {}
          worksheet[cellRef].s = {
            font: {
              sz: 10,
              name: 'Arial'
            },
            alignment: { horizontal: 'left', vertical: 'center' }
          }
        }
      }
    }

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // 生成Excel文件并写入到文件系统
    XLSX.writeFile(workbook, name ?? `output.xlsx`)
  } catch (error) {
    console.error(error)
  }
}
