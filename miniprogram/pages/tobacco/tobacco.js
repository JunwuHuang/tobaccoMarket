// pages/tobacco/tobacco.js
Page({
  data: {
    productList: []
  },
  onShow() {
    wx.cloud.callFunction({
      name: 'getProducts'
    }).then(res => {
      this.setData({
        productList: res.result.data
      })
    })
  },
  btn_addProduct() {
    wx.navigateTo({
      url: '../addProduct/addProduct'
    })
  },
  btn_update(e) {
    let _id = e.target.dataset.id
    wx.navigateTo({
      url: '../updateProduct/updateProduct?_id=' + _id
    })
  },
  btn_delete(e) {
    let _id = e.target.dataset.id
    wx.cloud.callFunction({
      name: 'deleteProduct',
      data: {
        _id
      }
    }).then(() => {
      let tempArray = this.data.productList.filter(v => {
        return v._id !== _id
      })
      this.setData({
        productList: tempArray
      })
    })
  }
})