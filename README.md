# 烟草行情管理

## @TODO
### 功能
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
### 界面
1. tabbar(3个:首页;表格;数据)
2. 首页:查看最新行情表格,新增表格按钮,编辑当前表格按钮
3. 表格:浏览行情表格列表,每一个表格都有编辑与删除按钮,新增表格按钮
4. 数据:浏览所有烟草数据,每一个数据都有编辑与删除按钮,新增数据按钮
5. 新增表格的表单页面
6. 编辑表格的表单页面
7. 新增数据的表单页面
8. 编辑数据的表单页面
### API
1. 根据updateTime获取marketTable里最新的表格(GET)
2. 查询marketTable里的表格,做分页功能(GET)
3. 根据_id在marketTable里删除相应的表格(DELETE)
4. 查询tobaccoMarket里的数据,做分页功能(GET)
5. 根据_id在tobaccoMarket里删除相应的数据(DELETE)
6. 提交表单数据在marketTable里新增一个表格(POST)
7. 提交表单数据并根据_id在marketTable里修改相应的表格(PUT)
8. 提交表单数据在tobaccoMarket里新增一个数据(POST)
9. 提交表单数据并根据_id在tobaccoMarket里修改相应的数据(PUT)
10. 上传图片功能(待定,可能小程序有内置API)

#### 数据说明

tobaccoMarket

| _id | name | slug | img | createTime | updateTime | isDeleted |
| - | :-: | -: | -: | -: | -: | -: |
| XBoLt4nnuWjciueC | 中华| 软中 | /path/img.jpg | Wed Dec 19 2018 17:15:34 GMT+0800 (中国标准时间) | Wed Dec 19 2018 17:15:45 GMT+0800 (中国标准时间) | false |
```
_id: 烟草数据id(string)
name: 包装上的名称(string)
slug: 俗称(string)
img: 图片路径(string)
createTime: 烟草数据创建时间(date)
updateTime: 烟草数据最新修改时间(date)
isDeleted: 是否已删除(bool)
```

marketTable

| _id | name | createTime | tobaccoData | updateTime | isDeleted |
| - | :-: | -: | -: | -: | -: |
| XBoOjXkPDdDCJ2lw | 中华| Wed Dec 19 2018 17:15:34 GMT+0800 (中国标准时间) | [{"stocks":{"$numberLong":"3"},"tobaccoId":"XBoLt4nnuWjciueC","remark":"后天到货","boxTradePrice":{"$numberLong":"670"},"boxRetailPrice":{"$numberLong":"680"},"bulkTradePrice":{"$numberLong":"68"},"bulkRetailPrice":{"$numberLong":"70"}}] | Wed Dec 19 2018 17:15:45 GMT+0800 (中国标准时间) | false |
```
_id: 行情表格id(string)
name: 行情表格的名称(string)
createTime: 行情表格创建时间(date)
tobaccoData: 行情表格数据数组(array)
tobaccoData[0]: 行情表格数据(object)
tobaccoData[0].tobaccoId: 行情表格数据的烟草数据id(string)
tobaccoData[0].stocks: 行情表格数据的烟草库存,单位条装(number)
tobaccoData[0].remark: 行情表格数据的烟草数据备注(string)
tobaccoData[0].boxTradePrice: 条装批发价格(number)
tobaccoData[0].boxRetailPrice: 条装零售价格(number)
tobaccoData[0].bulkTradePrice: 包装批发价格(number)
tobaccoData[0].bulkRetailPrice: 包装零售价格(number)
updateTime: 行情表格最新修改时间(date)
isDeleted: 是否已删除(bool)
```
