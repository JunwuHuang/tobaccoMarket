# 烟草行情管理

## @TODO
1. 新建烟草行情表格
    获取updateTime最新的行情表格,并在此基础上操作修改
    完成修改后点保存即新增
2. 修改烟草行情表格
    根据id获取行情表格
    完成修改后点保存即修改
3. 删除烟草行情表格
    点击删除即删除id对应的表格
4. 查看烟草行情表格
    根据id获取行情表格
    提供编辑(修改)以及删除功能
5. 浏览所有已新增的烟草行情数据
6. 搜索已新增的烟草行情数据
7. 筛选已新增的烟草行情数据
8. 新增烟草行情数据
9. 编辑烟草行情数据
10. 删除烟草行情数据

#### 数据说明

tobaccoMarket

| _id | name | slug | img | createTime | boxTradePrice | boxRetailPrice | bulkTradePrice | bulkRetailPrice | updateTime | isDeleted |
| - | :-: | -: | -: | -: | -: | -: | -: | -: | -: | -: | 
| XBoLt4nnuWjciueC | 中华| 软中 | /path/img.jpg | Wed Dec 19 2018 17:15:34 GMT+0800 (中国标准时间) | 670 | 680 | 68 | 70 | Wed Dec 19 2018 17:15:45 GMT+0800 (中国标准时间) | false |
```
_id: 烟草数据id(string)
name: 包装上的名称(string)
slug: 俗称(string)
img: 图片路径(string)
createTime: 烟草数据创建时间(date)
boxTradePrice: 条装批发价格(number)
boxRetailPrice: 条装零售价格(number)
bulkTradePrice: 包装批发价格(number)
bulkRetailPrice: 包装零售价格(number)
updateTime: 烟草数据最新修改时间(date)
isDeleted: 是否已删除(bool)
```

marketTable

| _id | name | createTime | tobaccoData | updateTime | isDeleted |
| - | :-: | -: | -: | -: | -: |
| XBoOjXkPDdDCJ2lw | 中华| Wed Dec 19 2018 17:15:34 GMT+0800 (中国标准时间) | [{"remark":"后天到货","stocks":3,"tobaccoId":"XBoLt4nnuWjciueC"}] | Wed Dec 19 2018 17:15:45 GMT+0800 (中国标准时间) | false |
```
_id: 行情表格id(string)
name: 行情表格的名称(string)
createTime: 行情表格创建时间(date)
tobaccoData: 行情表格数据数组(array)
tobaccoData[0]: 行情表格数据(object)
tobaccoData[0].tobaccoId: 行情表格数据的烟草数据id(string)
tobaccoData[0].stocks: 行情表格数据的烟草库存,单位条装(number)
tobaccoData[0].remark: 行情表格数据的烟草数据备注(string)
updateTime: 行情表格最新修改时间(date)
isDeleted: 是否已删除(bool)
```
