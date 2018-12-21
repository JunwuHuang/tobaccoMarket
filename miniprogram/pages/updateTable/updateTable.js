Page({
    data: {
        tableName: '',
        selectedProducts: []
    },
	onLoad(e){
		wx.cloud.callFunction({
			name: 'getTable',
			data: {
				_id: e._id
			}
		}).then(res => {
			this.setData({
				_id: e._id,
				tableName: res.result.data[0].name,
				selectedProducts: res.result.data[0].productList
			})
			wx.setStorageSync('selectedProducts', JSON.stringify(res.result.data[0].productList))
		})
	},
    onShow() {
        wx.getStorage({
            key: 'selectedProducts',
            success: (res) => {
                let tempArray = JSON.parse(res.data).map(v => {
                    v.isEditing = false;
                    return v
                })
                this.setData({
                    selectedProducts: tempArray
                })
            }
        })
    },
    input_caption(e) {
        e.detail.value = e.detail.value.replace(/\s+/g, "")
        this.setData({
            tableName: e.detail.value
        })
        return e.detail.value
    },
    input_price(e) {
        e.detail.value = e.detail.value.replace(/\s+/g, "")
        let name = e.target.dataset.name
        let tempArray = this.data.selectedProducts
        tempArray.forEach(v => {
            if (v._id === e.target.dataset._id) {
                v[name] = e.detail.value
            }
        })
        this.setData({
            selectedProducts: tempArray
        })
        return e.detail.value
    },
    btn_edit(e) {
        let tempArray = this.data.selectedProducts
        tempArray.forEach(v => {
            if (v._id === e.target.dataset._id) {
                v.isEditing = !v.isEditing
            }
        })
        this.setData({
            selectedProducts: tempArray
        })
    },
    btn_selectProduct(e) {
        wx.navigateTo({
            url: '../selectProducts/selectProducts',
        })
    },
	btn_updateTable() {
        if (!this.data.tableName) {
            wx.showToast({
                title: '请输入表名',
                icon: 'none'
            })
            return
        }
        let tempArray = this.data.selectedProducts.map(v => {
            v.boxTradePrice = v.boxTradePrice || 0
            v.boxRetailPrice = v.boxRetailPrice || 0
            v.bulkTradePrice = v.bulkTradePrice || 0
            v.bulkRetailPrice = v.bulkRetailPrice || 0
            v.productId = v._id;
            delete v._id;
            delete v.isEditing;
            return v;
        })
        wx.cloud.callFunction({
            name: 'updateTable',
            data: {
				_id: this.data._id,
                name: this.data.tableName,
                productList: tempArray
            }
        }).then(res => {
            if (res.result.message) {
                wx.showToast({
                    title: res.result.message,
                    icon: 'none'
                })
            } else {
                wx.removeStorageSync('selectedProducts')
                wx.switchTab({
                    url: '/pages/tables/tables'
                })
            }
        })
    }
})