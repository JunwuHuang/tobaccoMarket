// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
    const table = db.collection('marketTable')
    const countResult = await table.where({
        name: event.name
    }).count()
    if (countResult.total) {
        const deletedCount = await table.where({
            name: event.name,
            isDeleted: true
        }).count()
        if (deletedCount.total) {
            return await table.where({
                name: event.name,
                isDeleted: true
            }).update({
                data: {
                    name: event.name,
                    productList: event.productList,
                    createTime: new Date(),
                    updateTime: new Date(),
                    isDeleted: false
                }
            })
        } else {
            return await new Promise(resolve => {
                resolve({
                    message: '添加失败,请勿使用重复的表名'
                })
            })
        }
    } else {
        return await table.add({
            data: {
                name: event.name,
                productList: event.productList,
                createTime: new Date(),
                updateTime: new Date(),
                isDeleted: false
            }
        })
    }
}