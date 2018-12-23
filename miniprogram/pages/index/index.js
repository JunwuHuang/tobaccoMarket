// pages/tables/tables.js
Page({
  data: {
    tableInfo: {}
  },
  onLoad() {
    wx.cloud.callFunction({
      name: 'getLastestTable'
    }).then(res => {
      this.setData({
        tableInfo: res.result.data[0]
      })
    })
  },
  btn_addTable() {
    wx.navigateTo({
      url: '../addTable/addTable'
    })
  },
  btn_updateTable() {
    wx.navigateTo({
      url: '../addTable/addTable?_id=' + this.data.tableInfo._id
    })
  }
})