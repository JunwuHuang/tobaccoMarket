// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
    const table = db.collection('marketTable')
	table.where({
		name: event.name,
		isDeleted: true
	}).remove()
    const countResult = await table.where({
        name: event.name,
		isDeleted: false
    }).count()
    if (countResult.total) {
		return new Promise(resolve => {
			resolve({
				message: '修改失败,请勿使用重复的表名'
			})
		})
    } else {
        return await table.where({
            _id: event._id
        }).update({
            data: {
                name: event.name,
                productList: event.productList,
                updateTime: new Date()
            }
        })
    }
}