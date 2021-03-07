import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, //是否已登录
		userInfo: {}, // 用户信息

		applyItemInfo: {}, // 要申报的是哪个事项,从事项列表点击则设置它
		businessModel: {},
		formsModel: {},
		materialsModel: {},
		postModel: {},
		materialList:[], // 网络请求到的材料列表数据
		uploadMaterials: {}, // 上传的材料数据
		uploadMaterialsNum: {}, // 上传的材料数据数量
	},
	getters: {
		userInfo: state => state.userInfo,
		applyItemInfo: state => state.applyItemInfo,
		businessModel: state => state.businessModel,
		formsModel: state => state.formsModel,
		materialsModel: state => state.materialsModel,
		postModel: state => state.postModel,
		materialList: state => state.materialList,
		uploadMaterials: state => state.uploadMaterials,
		uploadMaterialsNum: state => state.uploadMaterialsNum,
	},
	mutations: {
		// 更新用户状态 登录后有用户信息，此时hasLogin设置为true
		updateUserInfo(state, userInfo) {
			console.log("updateUserInfo:", userInfo);
			// userInfo为null则表示退出登录，需设置为null
			state.hasLogin = userInfo == null ? false : true;
			state.userInfo = userInfo;
		},
		updateBusinessModel(state, business) {
			console.log("update business:", business);
			state.businessModel = business
		},
		updateFormsModel(state, form) {
			// console.log("update formsModel:", form);
			state.formsModel = form
		},
		updateApplyItemInfo(state, itemInfo) {
			console.log("update itemInfo:", itemInfo);
			state.applyItemInfo = itemInfo
		},
		updateMaterialList(state, list) {
			console.log("update materialList:", list);
			state.materialList = list
		},
		updateUploadMaterials(state, m){
			state.uploadMaterials = m;
		},
		updateUploadMaterialsNum(state, num){
			state.uploadMaterialsNum = num;
		},
	},
	actions: {

	}
})

export default store
