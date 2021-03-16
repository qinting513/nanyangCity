### 1.运行预览
```
1. 下载项目后先安装依赖
npm install @dcloudio/uni-ui


```

### 2. 知识库
```
1、组件的生命周期
beforeCreate      实例已经开始初始化之后调用 【数据初始化未完成，页面没有开始渲染】
created           实例创建完成之后调用 【组件创建完成，不代表组件已挂载到页面】
beforeMount       在挂载开始之前被调用。        
mounted           挂载到实例上去之后调用。 注意：此处并不能确定子组件被全部挂载，
　　　　　　　　　　 如果需要子组件完全挂载之后在执行操作可以使用$nextTickVue官方文档  
      
beforeUpdate    数据更新时调用，发生在虚拟 DOM 打补丁之前。    仅H5平台支持    
updated         由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。    仅H5平台支持    
beforeDestroy   实例销毁之前调用。在这一步，实例仍然完全可用。        
destroyed       Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，
　　　　　　　　　　所有的子实例也会被销毁。
```

```
2.页面的生命周期

onLoad 监听页面加载，其参数为上个页面传递的数据，参数类型为object（用于页面传参）
onShow 监听页面显示
onReady 监听页面初次渲染完成
onHide 监听页面隐藏
onUnload 监听页面卸载
onPullDownRefresh 监听用户下拉动作
onReachBottom 页面上拉触底事件的处理函数
onShareAppMessage 用户点击右上角分享 微信小程序
onPageScroll 监听页面滚动
onTabItemTap 当前是 tab 页时，点击 tab 时触发
```
```
3.获取屏幕高度
// 获取屏幕高度 用来设置swiper的高度
			let that = this;
			uni.getSystemInfo({
				success(res) {
					// console.log('res.windowHeight:', res.windowHeight);
					that.heightStyle = {
						height: (res.windowHeight + 30) + 'px'
					};
				},
			});
// Swiper最好设置计算好的高度
```
### 3.注意问题
```
1. 有时候有缓存问题，新建的文件不生成，则删除unpackage下的文件 重新编译生成新的
2. 申报部分 基本表单多出一两个字段，需要在暂存时表单的xml里增加对应的字段 现在没有添加
```


```
没有单点登录的页面汇总: 
1.个人办事(个人主题导航): https://rtxxdj.linewell.com/nanyang/#/pages/government_service/business_page?userType=1
2.法人办事(法人主题导航): https://rtxxdj.linewell.com/nanyang/#/pages/government_service/business_page?userType=2
3.部门导航: https://rtxxdj.linewell.com/nanyang/#/pages/government_service/department_page
4.热门事项: https://rtxxdj.linewell.com/nanyang/#/pages/hotlist/hotlist
5.事项搜索  https://rtxxdj.linewell.com/nanyang/#/pages/hotlist/hotlist?type=search
6.热门服务: https://rtxxdj.linewell.com/nanyang/#/pages/hotservice/hotservice
7.我的申报  https://rtxxdj.linewell.com/nanyang/#/pages/mine/my_business_page/my_business_page
8.事项跳转到办事指南的格式: "https://rtxxdj.linewell.com/nanyang/#/pages/business_guide/guide_page?ID=" + 事项ID
9.主题导航点击某一个进到的事项列表: (pictureCode传SORTCODE，pictureName传SORTNAME )
     https://rtxxdj.linewell.com/nanyang/#/pages/government_service/item_list?pictureCode=root_gr_ztfl_01&pictureName=生育收养
10.我的办件

单点登录页面汇总:
	 1.个人办事: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=grbs
	  2.企业办事: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=qybs
	  3.部门导航: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=bmbs
	  4.热门事项: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=rmsx
	  5.事项搜索: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=sxss
	 6.办事指南: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=bszn&ID=005998375QR13609003
	  7.事项列表: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=sxlb&pictureCode=root_gr_ztfl_01&pictureName=生育收养
	  8.进度查询: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=jdcx
	  9.我的办件：https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=wdbj&index=1
	  10.热门服务:https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=rmfw
	  
	  
	  
"list": [{
				"pagePath": "pages/tabbar/home",
				"iconPath": "static/images/tabbar/tabbar_home.png",
				"selectedIconPath": "static/images/tabbar/tabbar_home_selected.png",
				"text": "首页"
			},
			{
				"pagePath": "pages/tabbar/government_service",
				"iconPath": "static/images/tabbar/tabbar_gov.png",
				"selectedIconPath": "static/images/tabbar/tabbar_gov_selected.png",
				"text": "政务服务"
			},
			{
				"pagePath": "pages/tabbar/convenient_service",
				"iconPath": "static/images/tabbar/tabbar_com.png",
				"selectedIconPath": "static/images/tabbar/tabbar_com_selected.png",
				"text": "便民服务"
			},
			{
				"pagePath": "pages/tabbar/mine",
				"iconPath": "static/images/tabbar/tabbar_me.png",
				"selectedIconPath": "static/images/tabbar/tabbar_me_selected.png",
				"text": "我的"
			}
		]
```