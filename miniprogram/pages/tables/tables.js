// pages/tables/tables.js
Page({
    data: {
        tablesList: []
    },
    onShow() {
        wx.cloud.callFunction({
            name: 'getTables'
        }).then(res => {
            let tempArray = res.result.data.map(v => {
                let date = new Date(v.updateTime)
                let updateTime = ''
                updateTime += date.getMonth() + 1 + '/';
                updateTime += date.getDate() + ' ';
                updateTime += date.getHours() + ':';
                updateTime += date.getMinutes();
                v.updateTime = updateTime;
                return v;
            })
            this.setData({
                tablesList: tempArray
            })
        })
    },
    btn_addTable() {
        wx.navigateTo({
            url: '../addTable/addTable'
        })
    },
    btn_updateTable(e) {
        wx.navigateTo({
            url: '../updateTable/updateTable?_id=' + e.target.dataset._id,
        })
    },
    btn_deleteTable(e) {
        wx.cloud.callFunction({
            name: 'deleteTable',
            data: {
                _id: e.target.dataset._id
            }
        }).then(res => {
            let tempArray = this.data.tablesList.filter(v => {
                return v._id !== e.target.dataset._id
            })
            this.setData({
                tablesList: tempArray
            })
        })
    },
})