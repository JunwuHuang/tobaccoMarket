const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database();
exports.main = async (event, context) => {
	const table = db.collection('tobaccoMarket')
	const countResult = await table.where({
		slug: event.slug
	}).count()
	if (countResult.total) {
		const isDeleted = await table.where({
			slug: event.slug,
			isDeleted: true
		}).count()
		if (isDeleted.total) {
			return await table.where({
				slug: event.slug,
				isDeleted: true
			}).update({
				data: {
					img: event.img,
					name: event.name,
					slug: event.slug,
					createTime: new Date(),
					updateTime: new Date(),
					isDeleted: false
				}
			})
		} else {
			return await new Promise(resolve => {
				resolve({
					message: '添加失败,请勿使用重复的俗称'
				})
			})
		}
	} else {
		return await table.add({
			data: {
				img: event.img,
				name: event.name,
				slug: event.slug,
				createTime: new Date(),
				updateTime: new Date(),
				isDeleted: false
			}
		})
	}
}