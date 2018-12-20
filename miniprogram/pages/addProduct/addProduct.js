// pages/addProduct/addProduct.js
Page({
	data: {
		tempImgPath: '',
		productName: '',
		productSlug: ''
	},
	btn_uploadImg: function () {
		wx.chooseImage({
			count: 1,
			sizeType: 'compressed',
			success: (res) => {
				this.setData({
					tempImgPath: res.tempFilePaths[0]
				})
			}
		})
	},
	image_onTap: function () {
		if (!this.data.tempImgPath) {
			wx.chooseImage({
				count: 1,
				sizeType: 'compressed',
				success: (res) => {
					this.setData({
						tempImgPath: res.tempFilePaths[0]
					})
				}
			})
		} else {
			wx.previewImage({
				urls: [this.data.tempImgPath]
			})
		}
	},
	input_name: function (e) {
		this.setData({
			productName: e.detail.value.replace(/\s+/g, '')
		})
		return e.detail.value.replace(/\s+/g, '')
	},
	input_slug: function (e) {
		this.setData({
			productSlug: e.detail.value.replace(/\s+/g, '')
		})
		return e.detail.value.replace(/\s+/g, '')
	},
	btn_cancel: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	btn_submit: function () {
		if (!this.data.tempImgPath) {
			wx.showToast({
				title: '请上传商品图片',
				icon: 'none'
			})
			return
		}
		if (!this.data.productName) {
			wx.showToast({
				title: '请输入包装上的名称',
				icon: ''
			})
			return
		}
		if (!this.data.productSlug) {
			wx.showToast({
				title: '请输入俗称',
				icon: ''
			})
			return
		}
		let tempArray = this.data.tempImgPath.split('.')
		let imgMime = tempArray[tempArray.length - 1]
		let cloudPath = 'productImages/' + this.data.productSlug + '.' + imgMime
		wx.cloud.uploadFile({
			cloudPath: cloudPath,
			filePath: this.data.tempImgPath
		}).then(data => {
			wx.cloud.callFunction({
				name: 'addProduct',
				data: {
					img: data.fileID,
					name: this.data.productName,
					slug: this.data.productSlug
				}
			}).then(res => {
				if (res.result.message) {
					wx.showToast({
						title: res.result.message,
						icon: 'none'
					})
				} else {
					wx.switchTab({
						url: '/pages/tobacco/tobacco'
					})
				}
			})
		})
	}
})