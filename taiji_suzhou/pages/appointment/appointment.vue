<template>
	<view class="container">
		<view v-for="(item, index) in cellData" :key="index" style="margin-bottom: 1px;">
			<appointmentCell @click="clickItem" :index="index" :title="item.title" :placeholder="item.placeholder" :value="item.value" :showArrow="item.showArrow"></appointmentCell>
		</view>

		<view class="tips-view">
			<view style="color: rgb(248,93,94);">预约须知：</view>
			<view style="display: flex;">
				<view style="flex-shrink: 0;">预约时间：</view>
				<view class="">每个事项可提前在办事前1天上网预约。</view>
			</view>
			<view style="display: flex;">
				<view style="flex-shrink: 0;">优先叫号：</view>
				<view class="">预约生效后，申请人凭身份证或手机号码到政务服务中心优先取号。</view>
			</view>
		</view>

		<view style="margin: 20px 0 20px; padding: 0 10px;"><normalBtn text="提交预约" @click="commit"></normalBtn></view>
		
		<view v-if="showPopupview" class="popupview">
			<view @click="closePopupView" style="height: 50%;"></view>
			
			
			<view v-if="showPopupview" class="popupview-container fadelogIn">
				<view style="flex-shrink: 0; color: #007AFF; font-size: 17px; text-align: center; height: 50px; line-height: 50px;">{{tipsText}}</view>
				
				<!-- 部门 -->
				<view v-if="showDeptView" class="popupview-list">
					<view @click="selectDept(item)" class="popupview-list-cell" v-for="(item,index) in deptList" :key="index">
						{{item.SHORTNAME}}
					</view>
				</view>
				
				<!-- 事项 -->
				<view v-if="showBusinessView" class="popupview-list">
					<view @click="selectBusiness(item)" class="popupview-list-cell" v-for="(item,index) in businessList" :key="index">
						{{item.SXZXNAME}}
					</view>
				</view>
				
				<!-- 日期 -->
				<view v-if="showDateView" class="popupview-list date-list">
					<view @click="selectDate(item)" class="date-list-cell" v-for="(item,index) in dateList" :key="index">
						{{item.RESERVEDATE}}
					</view>
				</view>
				
				<!-- 时间 -->
				<view v-if="showTimeView" class="popupview-list date-list">
					<view @click="selectTime(item)" class="date-list-cell" v-for="(item,index) in timeList" :key="index">
						{{item.RESERVETIME}} {{item.NOWNUM + '/' + item.RESERVENUM}}
					</view>
				</view>
			</view>
			
		</view>
	
	</view>
</template>

<script>
import appointmentCell from './appointment_cell.vue'
import normalBtn from '../login/normal_button.vue'
import {mapState} from 'vuex'
import http from '../../static/js/mine.js'
export default {
	components:{
		appointmentCell,
		normalBtn
	},
	computed:mapState(['userInfo']),
	data() {
		return {
			cellData:[],
			deptList:[],
			showPopupview:false,
			tipsText:'',
			
			showDeptView:false, //部门
			nowSelectDept:null, 
			
			showBusinessView:false,
			businessList:[], //事项
			nowSelectBusiness:null,
			
			showDateView:false, //日期
			dateList:[],
			nowSelectDate:null,
			
			showTimeView:false, //时间
			timeList:[],
			nowSelectTime:null,
		};
	},
	onLoad() {
		this.cellData = [
				{
					title:'预约人',
					value:this.userInfo.REALNAME,
					showArrow:false
				},
				{
					title:'预约电话',
					value:this.userInfo.MOBILE,
					showArrow:false
				},
				{
					title:'证件号码',
					value:this.userInfo.CODE,
					showArrow:false
				},
				{
					title:'预约部门',
					placeholder:'请选择预约部门',
					showArrow:true
				},
				{
					title:'预约事项',
					placeholder:'请选择预约事项',
					showArrow:true
				},
				{
					title:'预约日期',
					placeholder:'请选择预约日期',
					showArrow:true
				},
				{
					title:'时间段',
					placeholder:'请选择预约时间段',
					showArrow:true
				},

			]
			
			this.getDeptList()
	},
	methods:{
		clickItem(index){
			
			switch (index) {
				case 3:
					this.showPopupview = true
					this.showDeptView = true
				break;
				case 4:
					this.showBusinessList()
				break;
				case 5:
					this.showDate()
				break;
				case 6:
					this.showTime()
				break;
			}
			
			// console.log(index)
		},
		commit(){
			console.log('提交预约')
			console.log(this.userInfo)
			if (!this.nowSelectDept) {
				uni.showToast({
					title:'请选择部门',
					icon:"none"
				})
				return;
			}
			if (!this.nowSelectBusiness) {
				uni.showToast({
					title:'请选择预约事项',
					icon:"none"
				})
				return;
			}
			if (!this.nowSelectDate) {
				uni.showToast({
					title:'请选择预约日期',
					icon:"none"
				})
				return;
			}
			if (!this.nowSelectTime) {
				uni.showToast({
					title:'请选择预约时间段',
					icon:"none"
				})
				return;
			}
			http.submitAppointment(this.nowSelectDept.DEPTID, this.nowSelectBusiness.ID, this.nowSelectDate, this.nowSelectTime, this.userInfo.userTOKEN, this.userInfo.USER_ID).then(res => {
				if (res.code == 200) {
					uni.showToast({
						title:'预约成功!',
						icon:"success"
					});
					setTimeout(function(){
						uni.redirectTo({
						    url:'../mine/my_subscribe_page/my_subscribe_page'
						});
					}, 1500)
				}
			})
		},
		closePopupView(){
			this.showPopupview = false
			this.showDeptView = false
			this.showBusinessView = false
			this.showDateView = false
			this.showTimeView = false
		},
		resetData(index) {
			this.showPopupview = false
			for (var i = index; i < 7; i++) {
				switch (i) {
					case 4:
						this.nowSelectBusiness = null
						this.cellData[4].value = ''
					break;
					case 5:
						this.nowSelectDate = null
						this.cellData[5].value = ''
						this.dateList = []
					break;
					case 6:
						this.nowSelectTime = null
						this.cellData[6].value = ''
						this.timeList = []
					break;
				}
			}
		},
		getDeptList(){
			this.tipsText = "请选择部门"
			http.getDeptList().then(res => {
				if (res.code == 200) {
					this.deptList = res.ReturnValue
				}
				console.log(res)
			})
		},
		selectDept(item) {
			this.showDeptView = false
			this.nowSelectDept = item
			this.businessList = []
			
			this.cellData[3].value = item.SHORTNAME
			this.resetData(4)
		},
		showBusinessList(){
			if (!this.nowSelectDept || !this.nowSelectDept.DEPTID) {
				uni.showToast({
					title:'请先选择部门',
					icon:"none"
				})
				return;
			}
			this.tipsText = "请选择事项"
			if (this.businessList.length > 0) {
				this.showPopupview = true
				this.showBusinessView = true
				return
			}
			http.getBusinessList(this.nowSelectDept.DEPTID).then(res => {
				if (res.code == 200) {
					this.businessList = res.ReturnValue
					this.showPopupview = true
					this.showBusinessView = true
				}
				console.log(res)
			})
		},
		selectBusiness(item) {
			// console.log(item)
			this.showBusinessView = false
			this.nowSelectBusiness = item
			
			this.cellData[4].value = item.SXZXNAME
			this.resetData(5)
		},
		
		showDate(){
			if (!this.nowSelectBusiness) {
				uni.showToast({
					title:'请先选择预约事项',
					icon:"none"
				})
				return;
			}
			this.tipsText = "请选择预约日期"
			if (this.dateList.length > 0) {
				this.showPopupview = true
				this.showDateView = true
				return
			}
			http.getAppointmentDate(this.nowSelectDept.DEPTID, this.nowSelectBusiness.ID, this.userInfo.userTOKEN).then(res => {
				if (res.code == 200) {
					this.dateList = res.ReturnValue.Items
					this.showPopupview = true
					this.showDateView = true
				}
				console.log(res)
			})
		},
		selectDate(item) {
			this.nowSelectDate = item.RESERVEDATE
			this.showDateView = false
			
			this.cellData[5].value = item.RESERVEDATE
			this.resetData(6)
		},
		
		showTime(){
			if (!this.nowSelectDate) {
				uni.showToast({
					title:'请先选择预约日期',
					icon:"none"
				})
				return;
			}
			this.tipsText = "请选择预约时间段"
			if (this.timeList.length > 0) {
				this.showPopupview = true
				this.showTimeView = true
				return
			}
			http.getAppointmentTime(this.nowSelectDept.DEPTID, this.nowSelectBusiness.ID, this.nowSelectDate, this.userInfo.userTOKEN).then(res => {
				if (res.code == 200) {
					this.timeList = res.ReturnValue.Items
					this.showPopupview = true
					this.showTimeView = true
				}
				console.log(res)
			})
		},
		selectTime(item) {
			this.nowSelectTime = item.RESERVETIME
			this.showTimeView = false
			
			this.cellData[6].value = item.RESERVETIME
			this.resetData(7)
		}
	}
}
</script>

<style scoped lang="scss">
.container {
	height: calc(100vh - 44px);
	padding: 10px;
	background-color: rgb(250, 250, 250);
	position: relative;
}
.tips-view {
	font-size: 14px;
	padding: 10px;
	color: rgb(142, 142, 142);
	view {
		margin: 2px 0;
	}
}

.popupview {
	left: 0;
	top: 0;
	position: absolute;
	height: 100%;
	width: 100%;
	background-color: rgba(1,1,1,0.4);
	
	.popupview-container {
		position: absolute;
		height: 50%;
		bottom: 0;
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
		
		.popupview-list {
			flex: 1;
			overflow: scroll;
			
			.popupview-list-cell {
				font-size: 13px;
				padding: 20upx 20upx 20upx 20upx;
				color: rgb(93,93,93);
				position: relative;
				&:after {
					position: absolute;
					content: '';
					background-color: rgb(240,240,240);
					left: 20upx;
					right: 20upx;
					bottom: 0;
					height: 1px;
				}
				&:active {
					background-color: rgba(1,1,1,0.1)
				}
			}
			
		}
		
		.date-list {
			flex-wrap: wrap;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			align-content: flex-start;
			
			.date-list-cell {
				width: 40%;
				height: 40px;
				background-color: rgb(248,248,248);
				color: rgb(125,125,125);
				border-radius: 5px;
				margin-left: 6.6%;
				margin-top: 20px;
				text-align: center;
				font-size: 15px;
				line-height: 40px;
				
				&:hover {
					background-color: $uni-main-theme-color;
					color: white;
				}
			}
		}
	}
}

/*弹层动画（从下往上）*/
.fadelogIn {
    -webkit-animation: fadelogIn .4s;
    animation: fadelogIn .4s;
}

@keyframes fadelogIn {
    0% {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    100% {
        -webkit-transform: none;
        transform: none;
    }
}

@-webkit-keyframes fadelogIn {
    0% {
        -webkit-transform: translate3d(0, 100%, 0);
    }
    100% {
        -webkit-transform: none;
    }
}
</style>
