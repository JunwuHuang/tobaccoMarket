// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const table = db.collection('marketTable')
  const countResult = await table.where({
    isDeleted: false
  }).count()
  if (countResult.total === 0) {
    resolve({
      message: '获取失败,暂无表格数据'
    })
  } else if (countResult.total === 1) {
    return await table.where({
      isDeleted: false
    }).field({
      name: true,
      productList: true
    }).get()
  } else {
    const result = await table.where({
      isDeleted: false
    }).field({
      name: true,
      productList: true,
      updateTime: true
    }).get()
    let tempObject = {}
    result.data.reduce((a, b) => {
      if (Date.parse(a.updateTime) < Date.parse(b.updateTime)) {
        tempObject = b
      } else {
        tempObject = a
      }
    })
    delete tempObject.updateTime
    return await new Promise(resolve => {
      resolve({
        data: [tempObject]
      })
    })
  }
}