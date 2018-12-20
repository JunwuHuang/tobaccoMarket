// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
	const table = db.collection('tobaccoMarket')
	table.where({
		slug: event.slug,
		isDeleted: true
	}).remove()
	const countResult = await table.where({
		slug: event.slug,
		isDeleted: false
	}).count()
	if (countResult.total) {
		return await new Promise(resolve => {
			resolve({
				message: '修改失败,请勿使用重复的俗称'
			})
		})
	} else {
		return await table.where({
			_id: event._id,
			isDeleted: false
		}).update({
			data: {
				img: event.img,
				name: event.name,
				slug: event.slug,
				updateTime: new Date()
			}
		})
	}
}