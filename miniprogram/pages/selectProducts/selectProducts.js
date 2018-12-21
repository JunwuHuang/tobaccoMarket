// pages/selectProduct/selectProduct.js
Page({
    data: {
        productList: []
    },
    onLoad(options) {
        wx.cloud.callFunction({
            name: 'getProducts'
        }).then(res => {
            wx.getStorage({
                key: 'selectedProducts',
                success: (result) => {
                    let data = JSON.parse(result.data) || []
                    let tempArray = res.result.data.map(v => {
                        v.isSelected = false;
                        return v
                    });
                    if (data.length) {
                        tempArray.forEach(v => {
                            data.forEach(val => {
                                if (v._id == val.productId) {
                                    v.isSelected = true
                                } else if (v._id == val._id) {
                                    v.isSelected = true
                                }
                            })
                        })
                    }
                    this.setData({
                        productList: tempArray
                    })
                }
            })
        })
    },
    onUnload() {
        let tempArray = []
        for (let v of this.data.productList) {
            if (v.isSelected) {
                tempArray.push({
                    _id: v._id,
                    slug: v.slug
                })
            }
        }
        tempArray = JSON.stringify(tempArray)
        wx.setStorageSync('selectedProducts', tempArray)
    },
    btn_select(e) {
        let tempArray = this.data.productList.map((v, i) => {
            if (i == e.target.dataset.index) {
                v.isSelected = !v.isSelected
            }
            return v
        })
        this.setData({
            productList: tempArray
        })
    }
})