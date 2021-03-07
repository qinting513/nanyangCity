<template>
	<view class="mail-express-page">
		<view class="blms">{{blmsTitle}}</view>
		<view class="flex-row ywgsd">
			<view class="left">
				业务归属地:
			</view>
			<view class="right">
				<picker :range='guishudiTitlesList' mode='selector' @change="getItemData">
					<view class="flex-row picker-area">
						<view class="">{{selectedGuiShuDiModel.AREANAME || '暂无'}}</view>
						<view class="right-arrow"></view>
					</view>
				</picker>
			</view>
		</view>
		<view class="djcl">
			<view class="">
				请选择递交材料方式:
			</view>
			<view v-if="djzzclList.length > 0">
				<radio-group @change="radioChange">
					<view class="flex-row radio-list">
						<block v-for="(item, index) in djzzclList" :key="index">
							<view class="flex-row one-radio">
								<radio :value="item" :checked="item === currentDjzzcl" />
								<view>{{djzzclValueList[item] || ''}} </view>
							</view>
						</block>
					</view>
				</radio-group>
				<view class="djcl-detail">
					<view class="" v-if="currentDjzzcl == '1' || currentDjzzcl == '2'">
						<view class="" v-for="(net, i) in networkItems" :key="i">
							<view class="one-net">
								<view class="">
									网点名称: {{net.NETWORKNAME || '暂无数据'}}
								</view>
								<view class="">
									网点地址: {{net.NETWORKADDRESS || '暂无数据'}}
								</view>
								<view class="">
									网点电话: {{net.NETWORKPHONE || '暂无数据'}}
								</view>
							</view>
						</view>
					</view>
					<view class="" v-if="currentDjzzcl == '3'">
						说明:业务办理无须递交纸质材料
					</view>
				</view>
			</view>
			<view class="djcl-nodata" v-else>
				暂无
			</view>
		</view>
		<view class="lzfs">
			<view class="">
				请选择领取证照方式:
			</view>
			<view v-if="lqspjgList.length > 0">
				<radio-group @change="radioChangeLq">
					<view class="flex-row radio-list">
						<block v-for="(item, index) in lqspjgList" :key="index">
							<view class="flex-row one-radio">
								<radio :value="item" :checked="item === currentLqspjg" />
								<view>{{lqspjgValueList[item] || ''}} </view>
							</view>
						</block>
					</view>
				</radio-group>
				<view class="djcl-detail">
					<!-- 1. 网点领取 -->
					<view class="" v-if="currentLqspjg === '1'">
						<view class="" v-for="(net, i) in networkItems" :key="i">
							<view class="one-net">
								<view class="">
									承诺办结时限: {{applyItemInfo.ITEMLIMITTIME || "1"}}个工作日，具体时间以短信通知为主
								</view>
								<view class="">
									网点名称: {{net.NETWORKNAME || '暂无数据'}}
								</view>
								<view class="">
									网点地址: {{net.NETWORKADDRESS || '暂无数据'}}
								</view>
								<view class="">
									网点电话: {{net.NETWORKPHONE || '暂无数据'}}
								</view>
							</view>
						</view>
					</view>
					<view class="" v-if="currentLqspjg === '2'">
						<view class="flex-row add-address" @click="gotoSelectAddress">
							<view v-if="userAddressModel != null">
								<view>收件人: {{userAddressModel.RECEIVE || '暂无数据'}}</view>
								<view>联系方式: {{userAddressModel.MOBILE || '暂无数据'}}</view>
								<view>地址: {{userAddressModel.ADDRESS || '暂无数据'}}</view>
							</view>
							<view class="" v-else>
								添加地址
							</view>
							<view class="right-arrow">
							</view>
						</view>
					</view>
					<view v-if="currentLqspjg === '3'">
						说明: 请申请人于业务办结登录PC网厅“我的办事”点击“我的证照”栏目下载电子证照并打印"
					</view>
				</view>
			</view>
			<view class="djcl-nodata" v-else>
				暂无
			</view>
		</view>
		<view class="flex-row bottom-btns">
			<view class="pre" @click="pre">
				上一步
			</view>
			<view class="tempstore" @click="tempStore">
				暂存
			</view>
			<view class="next" @click="next">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import Apply from '../../static/js/nanyang_apply.js';
	import InputCell from '../../components/input_cell.vue';
	import Util from '../../static/js/util.js';
	import {
		mapState
	} from "vuex";

	export default {
		name: "MailExpressPage",
		components: {
			InputCell
		},
		data() {
			return {
				blmsModel: null, // 办理模式model,
				blmsTitle: "办理模式：暂无", // 办理模式字符串
				guishudiModelList: [], // 归属地数组
				guishudiTitlesList: [], // 归属地数组
				selectedGuiShuDiModel: {}, // 当前选择的归属地
				djzzclList: [], //递交材料数组
				djzzclValueList: {
					"1": "网点递交",
					"2": "邮寄递交",
					"3": "无需递交",
				},
				lqspjgList: [], //领取审批结果数组
				lqspjgValueList: {
					"1": "网点领取",
					"2": "邮寄领取",
					"3": "自行打印",
				},
				networkItems: [], //递交材料的网点数组
				userAddressModel: null, // 邮寄领取时的用户地址
				currentDjzzcl: '', // 当前选中的递交纸质材料
				currentLqspjg: '', // 当前选中的领取审批结果
				postXml: "",
			}
		},
		computed: mapState(['applyItemInfo', 'userInfo',
			'businessModel', 'formsModel', 'materialsModel',
			'postModel', 'materialList'
		]),
		mounted() {
			// 获取办理模式
			this.getPermWsfwsd();
			// 获取业务归属地
			this.getRegionByPermidBsnum();
		},
		methods: {
			// 1.获取办理模式
			getPermWsfwsd: function() {
				let business = this.businessModel;
				console.log("邮政速递id:", business.permId);
				if (business == null || business.permId == null) {
					return;
				}
				Apply.getPermWsfwsd(business.permId).then(res => {
					console.log("邮政速递res：", res);
					if (res['code'] == 200 && res['ReturnValue'] != null) {
						this.blmsModel = res['ReturnValue'];
						this.setBlms();
						this.getDJZZCL();
						this.getLQSPJG();
					}
				});
			},
			// 设置办理模式
			setBlms: function() {
				let index = this.blmsModel.BLMS;
				let blmsTitle = '';
				let i = parseInt(index) || -1;
				switch (i) {
					case 1:
						blmsTitle = "办理模式：全程网上办";
						break;
					case 2:
						blmsTitle = "办理模式：默认全程网上办";
						break;
					case 3:
						blmsTitle = "办理模式：窗口一次办";
						break;
					case 4:
						blmsTitle = "办理模式：窗口一次办";
						break;
					default:
						blmsTitle = "办理模式：暂无";
						break;
				}
				this.blmsTitle = blmsTitle;
			},
			// 递交纸质材料，1网点递交，2速递服务 可能的结果是'3,1'
			getDJZZCL: function() {
				let str = this.blmsModel.DJZZCL;
				if (str.indexOf('2') != -1 || str.indexOf('3') != -1) {
					// 网络获取网点信息
					this.getNetworkItems();
				}
				let tempList = str.split(",");
				this.djzzclList = tempList;
				this.currentDjzzcl = tempList[0];
				console.log("DJZZCL tempList:", tempList, this.currentDjzzcl);
			},
			// "LQSPJG":"领取审批结果，1网点领取，2速递服务，3自行打印",
			getLQSPJG: function() {
				// 加上2 测试使用到
				// let str = this.blmsModel.LQSPJG + ',2';
				let str = this.blmsModel.LQSPJG;
				if (str.indexOf('2') != -1) {
					// 获取用户地址信息
					this.getUserAdderssItems();
				}
				let tempList = str.split(",");
				this.lqspjgList = tempList;
				this.currentLqspjg = tempList[0] || '';
				console.log("LQSPJG tempList:", tempList, this.currentLqspjg);
			},
			// 获取网点名称
			getNetworkItems: function() {
				Apply.getNetworkByPermid(this.businessModel.permId).then(res => {
					console.log("获取网点名称", res);
					if (res.code == '200' && res['ReturnValue'] != null) {
						let returnValue = res['ReturnValue'];
						this.networkItems = returnValue.Items;
						console.log("获取网点名称", this.networkItems);
					}
				});
			},
			radioChange: function(e) {
				this.currentDjzzcl = e.detail.value;
				// console.log(e, this.currentDjzzcl);
			},
			radioChangeLq: function(e) {
				this.currentLqspjg = e.detail.value;
				// console.log(e, this.currentLqspjg);
			},
			getUserAdderssItems: function() {
				// console.log("获取用户地址:", this.userInfo);
				Apply.getUserPostInfo(this.userInfo.USER_ID).then(res => {
					// console.log("获取用户地址 res:", res);
					if (res.code == '200' && res['ReturnValue'] != null) {
						let returnValue = res['ReturnValue'];
						this.userAddressModel = returnValue.Items[0];
					}
				});
			},
			getRegionByPermidBsnum: function() {
				let permId = this.businessModel.permId || "";
				let bsNum = this.businessModel.bsNum || "";
				// console.log("归属地permId: ", permId, bsNum);
				Apply.getRegionByPermidBsnum(permId, bsNum).then(res => {
					// console.log("归属地model: ", res);
					if (res.code == '200' && res['ReturnValue'] != null) {
						let returnValue = res['ReturnValue'];
						this.guishudiModelList = returnValue.PARENTS || [];
						this.selectedGuiShuDiModel = returnValue.PARENTS[0] || {};
						let titles = [];
						for (let i in returnValue.PARENTS) {
							// console.log("归属地model: ", i);
							if (returnValue.PARENTS[i]) {
							    titles.push(returnValue.PARENTS[i].AREANAME || "");
							}
						}
						this.guishudiTitlesList = titles;
						// console.log("titles:", titles);
					}
				});
			},
			getItemData: function(e) {
				let value = e.detail.value;
				let index = parseInt(value);
				this.selectedGuiShuDiModel = this.guishudiModelList[index];
				// console.log("eee:", index, this.selectedGuiShuDiModel);
			},
			gotoSelectAddress: function() {
				console.log("跳转去选择地址");
			},
			pre: function() {
				this.$emit('pre', {
					page: 'MailExpressPage'
				});
			},
			tempStore: function() {
				this.$emit('tempStore', {
					page: 'MailExpressPage'
				});
			},
			next: function() {
				this.$emit('next', {
					page: 'MailExpressPage'
				});
			},
			getPostXmlData: function() {
				var emsInfo;
				var postInfo;
				// 2 表示 邮寄递交
				if ((this.currentDjzzcl == '2' || this.currentDjzzcl == '1') &&
					this.networkItems != null) {
					let m = this.networkItems[0];
					let map = {
						type: "1",
						RECEIVE: m.NETWORKNAME,
						ADDRESS: m.NETWORKADDRESS,
						MOBILE: m.NETWORKPHONE,
						PHONE: m.NETWORKPHONE,
						POSTCODE: "000000",
					};
					postInfo = this.getXmlByType(map);
				} else {
					postInfo = "";
				}
				console.log("========>:", this.currentLqspjg);
				if (this.currentLqspjg == '2' && this.userAddressModel != null) {
					let map = {
						type: "2",
						RECEIVE: this.userAddressModel.receive,
						ADDRESS: this.userAddressModel.address,
						MOBILE: this.userAddressModel.mobile,
						PHONE: this.userAddressModel.phone,
						POSTCODE: this.userAddressModel.postcode,
					};
					emsInfo = this.getXmlByType(map);
				} else {
					emsInfo = "";
				}
				if (postInfo == "" && emsInfo == "") {
					this.postXml = "";
				} else {
					this.postXml = `<emsinfos>${postInfo}${emsInfo}</emsinfos>`;
				}
				console.log("===> postXML:", this.postXml);
				return this.postXml;
			},
			getXmlByType(item) {
				return "<emsinfo><ddhm></ddhm><ddmc></ddmc>" +
					`<ddlx>${item['type']}</ddlx><item>` +
					`<type>S</type><xm>${item['RECEIVE']}</xm>` +
					"<dw></dw>" +
					`<dz>${item['ADDRESS']}</dz>` +
					`<dh>${item['MOBILE']}</dh>` +
					`<sj>${item['PHONE']}</sj>` +
					`<yb>${item['POSTCODE']}</yb>` +
					`<csdm>${item['type']}</csdm>` +
					"</item></emsinfo>";
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/apply/apply.scss";

	base {
		margin-top: 16upx;
		background-color: #FFFFFF;
		padding: 26upx;
	}

	.mail-express-page {
		background-color: #f8f8f8;
		color: #2b2b2b;

		.blms {
			@extend base;
			margin-top: 0;
		}

		.ywgsd {
			@extend base;
			justify-content: space-between;

			.right {
				flex: 2;

				.picker-area {
					justify-content: flex-end;
				}
			}
		}

		.djcl {
			@extend base;
		}

		.radio-list {
			padding: 20upx 0;
			justify-content: flex-start;

			.one-radio {
				margin-right: 24upx;
			}
		}

		.djcl-detail {
			font-size: 29upx;
			color: #353535;
		}

		.one-net {
			padding-bottom: 10upx;
		}

		.djcl-nodata {
			padding: 10upx 0;
			font-size: 29upx;
			color: #666;
		}



		.add-address {
			justify-content: space-between;
			font-size: 30upx;
			padding: 30upx 20upx;
		}

		.lzfs {
			@extend base;

		}
	}
</style>
