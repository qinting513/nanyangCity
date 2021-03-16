<template>
	<view class="material-page">
		<view class="tip">{{ tipString }}</view>
		<view class="materials" :style="[materialStyle]">
			<view v-for="(m, i) in materialList" :key="i" class="flex-column cell">
				<view class="flex-row top">
					<view v-if="m.SFBY == '1'" class="star">*</view>
					<!-- <view class="paper">纸</view> -->
					<view class="title">{{ m.CLMC }}</view>
				</view>
				<view class="flex-row center">
					<view class="upload-img" v-for="(imgObj, imgIndex) in (materials ? materials[m.ID] : [])"
						:key="imgIndex" @click="previewImg(materials[m.ID], imgIndex)">
						<image :src="imgObj.filepath || imgObj.localImg" mode="scaleToFill"></image>
					</view>
					<view class="flex-column add-btn" @click="addImages(m)">
						<view class="add">+</view>
					</view>
					<!-- <u-upload :action="action" max-count="6" :max-size="6 * 1024 * 1024" :file-list="fileList">
					</u-upload> -->

				</view>
				<view class="bottom">
					<view class="have-data" v-if="materialsNumber[m.ID] != null">
						已上传({{ materialsNumber[m.ID]['uploading'] || 0 }}/{{ materialsNumber[m.ID]['uploaded'] || 0 }})
					</view>
					<view class="nodata" v-else>暂无上传</view>
				</view>
			</view>
		</view>

		<view class="flex-row bottom-btns">
			<view class="pre" @click="pre">上一步</view>
			<view class="tempstore" @click="tempStore">存为草稿</view>
			<view class="next" @click="next">下一步</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	import Apply from '../../static/js/nanyang_apply.js';
	import Util from '../../static/js/util.js';
	import {
		mapState
	} from 'vuex';

	export default {
		name: 'MaterialPage',
		props: {
			pageHeight: {
				type: Number
			}
		},
		data() {
			return {
				action: Http.uploadFileURL,
				fileList: [{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}],
				tipString: '温馨提示：如果材料是暂未上传的标识需要点击上传附件；如果材料出现上传失败的标识，请点击重新上传，直到出现材料上传成功的绿色标识，既表示该材料已成功电子化上传。',
				materialsNumber: {}, // 提交的材料数据 {itemid0: num0, itemid1: num1}
				materials: null, // 提交的材料 {itemid0: [], itemid1: []}
				uploadInfo: {},
				materialStyle: {}
			};
		},
		// materialList 是网络请求到的最原始的材料列表，一般不去修改
		computed: mapState(['applyItemInfo', 'userInfo', 'businessModel', 'formsModel', 'materialsModel', 'postModel',
			'materialList'
		]),
		created() {},
		mounted() {
			if (this.pageHeight > 0) {
				this.materialStyle = {
					height: this.pageHeight - 180 + 'px'
				};
				// console.log('materialStyle:', this.materialStyle);
			} else {
				this.materialStyle = {
					height: '600px'
				};
				// console.log('other materialStyle:', this.materialStyle);
			}
			console.log("upload Url", Http.uploadFileURL, Http.downloadFileURL);
		},
		methods: {
			updateMaterials(data, materialsNumber) {
				this.materials = data
				this.materialsNumber = materialsNumber
			},
			// 1.弹窗 列表选择
			addImages: function(model) {
				let materials = this.materials || {};
				let tempList = materials[model.ID];
				if (tempList != null && tempList.length >= 9) {
					uni.showToast({
						icon: 'none',
						title: '最多只能上传9份文件'
					});
					return;
				}
				let that = this;
				uni.showActionSheet({
					itemList: ['拍照', '相册获取'],
					success: function(res) {
						let index = res.tapIndex;
						console.log('index:', index);
						that.chooseImages(index, model);
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			// index 用来识别是相册还是相机  model.id是材料id
			chooseImages: function(index, model) {
				let that = this;
				let materials = this.materials || {};
				let length = (materials[model.ID] || []).length;
				uni.chooseImage({
					count: 9 - length, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: index == 1 ? ['album'] : ['camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						if (res.tempFilePaths.length > 0) {
							let materials = that.materials || {};
							let current = (materials[model.ID] || []).length;
							that.updateMaterialNumber({
								itemId: model.ID,
								uploaded: current + res.tempFilePaths.length
							});
							that.uploadAllImgs({
								model: model,
								localImgPaths: res.tempFilePaths,
								localTemp: res.tempFiles
							});
						}
					}
				});
			},
			// 该方法实现同步上传， 一个完成 再去上传另一个
			uploadAllImgs: function(data) {
				var that = this,
					// 总数量
					i = data.i ? data.i : 0,
					// 成功的数量
					success = data.success ? data.success : 0,
					// 失败的数量
					fail = data.fail ? data.fail : 0;
				let title = `上传中(${i + 1}/${data.localImgPaths.length})`;
				uni.showLoading({
					title: title,
					mask: true
				});
				that.upload2wx(
					data.localImgPaths[i],
					data.localTemp[i].name,
					data.model,
					// 成功的回调
					function(res) {
						success++;
						console.log('successBlock:', i, res.ReturnValue.FILEID);
						// console.log(i);
					},
					// 失败的回调
					function(err) {
						fail++;
						// console.log('failBlock fail index:', i);
						// console.log('failBlock fail err:', err);
						uni.showToast({
							icon: 'none',
							title: `第${i + 1}张上传失败`
						});
						let materials = that.materials || {};
						let itemMaterials = materials[data.model.ID] || []; // 取出来是个对象
						itemMaterials.pop();
						that.$set(that.materials, data.model.ID, itemMaterials);

						let uploaded = (that.materialsNumber[data.model.ID] || {}).uploaded || 0;
						uploaded = uploaded - 1;
						that.updateMaterialNumber({
							itemId: data.model.ID,
							uploaded: uploaded
						});
					},
					// 完成的回调
					function() {
						// console.log('completeBlock:', i);
						i++;
						if (i == data.localImgPaths.length) {
							//当图片传完时，停止调用
							uni.hideLoading();
							console.log('执行完毕');
							console.log('成功：' + success + ' 失败：' + fail);
							let info = {
								success: success,
								fail: fail
							};
							that.$set(that.uploadInfo, data.model.ID, info);
							that.$store.commit('updateUploadMaterials', that.materials);
							that.$store.commit('updateUploadMaterialsNum', that.materialsNumber);
						} else {
							// console.log(i);
							data.i = i;
							data.success = success;
							data.fail = fail;
							that.uploadAllImgs(data);
						}
					}
				);
			},
			/*** 上传图片到后台 1.整合所需的数据提交后台 2.刷新UI */
			upload2wx: function(imgPath, imgName, model, successBlock, failBlock, completeBlock) {
				let oneFile = {
					id: '',
					fileid: imgPath,
					filepath: '',
					filedel: '',
					filename: '',
					filetype: 'img',
					isUploading: 1,
					localImg: imgPath
				};
				// materials是所有上传的文件集合  itemMaterials根据model.ID获取到，一个model.ID可以对应多张图片
				let materials = this.materials || {};
				let itemMaterials = materials[model.ID] || []; // 取出来是个对象
				itemMaterials.push(oneFile);
				// 再重新赋值回去刷新UI
				materials[model.ID] = itemMaterials;
				this.materials = materials;

				// 分离文件后缀
				var dotIndex = imgPath.lastIndexOf('.');
				// let ext = imgPath.substring(dotIndex, imgPath.length);
				var ext = imgPath.substr(dotIndex);
				if (imgName) {
					var dotIndex = imgName.lastIndexOf('.');
					// let ext = imgPath.substring(dotIndex, imgPath.length);
					var ext = imgName.substr(dotIndex);
				}
				//文件名
				let name = '材料';
				if (model.CLMC != null) {
					// console.log('====start', model.CLMC);
					let nameList = Http.materialNameList;
					nameList.forEach(temp => {
						// console.log('========', temp);
						if (model.CLMC.indexOf(temp) != -1) {
							name = temp;
						}
					});
				}
				let materialIndex = itemMaterials.length;
				let fileName = name + '_' + materialIndex + ext;
				// 材料1 材料2这样增加
				for (let i = 0; i < itemMaterials.length; i++) {
					let item = itemMaterials[i];
					if (item['filename'] == fileName) {
						materialIndex++;
						fileName = name + '_' + materialIndex.toString() + ext;
						break;
					}
				}
				// 提交文件
				let that = this;
				uni.uploadFile({
					url: Http.uploadFileURL,
					filePath: imgPath,
					name: 'file',
					formData: {
						USERID: this.userInfo.id,
						SXID: this.businessModel.permId,
						FILENAME: fileName
					},
					success: function(res) {
						let data = JSON.parse(res.data);
						// console.log('上传返回数据:', data);
						if (data.code != 200) {
							return;
						}
						let responseFileID = data.ReturnValue.FILEID;
						let fileId = Http.downloadFileURL + responseFileID;
						// console.log('===>after upload responseFileID:', responseFileID);

						let materials = that.materials || {};
						let itemMaterials = materials[model.ID] || [];
						let index = -1;
						for (let i = 0; i < itemMaterials.length; i++) {
							let item = itemMaterials[i];
							if (item['fileid'] === imgPath) {
								index = i;
								break;
							}
						}
						if (index > -1) {
							// 找到值后进行替换map对象
							itemMaterials[index] = {
								id: responseFileID,
								fileid: responseFileID,
								filepath: fileId, // 完整的路径
								filedel: '',
								filename: fileName,
								filetype: 'img',
								isUploading: 0,
								localImg: imgPath
							};
						}

						materials[model.ID] = itemMaterials;
						that.materials = materials;
						// console.log('===>after upload materials:', that.materials);
						let uploading = (that.materialsNumber[model.ID] || {}).uploading || 0;
						uploading = uploading + 1;
						that.updateMaterialNumber({
							itemId: model.ID,
							uploading: uploading
						});
						successBlock(data);
					},
					fail: function(res) {
						failBlock(res);
					},
					complete: function(res) {
						completeBlock();
					}
				});
			},
			updateMaterialNumber: function(data) {
				// 每次上传完一张就修改uploaded
				let materialsNumber = this.materialsNumber || {};
				let itemImgs = materialsNumber[data.itemId] || {};

				if (data.uploading != null) {
					itemImgs.uploading = data.uploading;
				}

				if (data.uploaded != null) {
					itemImgs.uploaded = data.uploaded;
				}
				this.$set(this.materialsNumber, data.itemId, itemImgs);
				this.$forceUpdate();
			},
			pre: function() {
				this.$emit('pre', {
					page: 'MaterialPage'
				});
			},
			tempStore: function() {
				this.$emit('tempStore', {
					page: 'MaterialPage'
				});
			},
			next: function() {
				this.$emit('next', {
					page: 'MaterialPage'
				});
			},
			checkMaterial: function(showTip) {

				if (this.materialList != null && this.materialList.length == 0) {
					this.formsModel.stateMaterial = true;
					this.$store.commit('updateFormsModel', this.formsModel);
					// 无材料就通过
					return true;
				}
				var ret = true;
				for (let i in this.materialList) {
					let item = this.materialList[i];
					if (
						item.SFBY == '1' &&
						(this.materialsNumber[item.ID] == null || this.materialsNumber[item.ID]['uploaded'] == null ||
							this.materialsNumber[item.ID]['uploaded'] == 0)
					) {
						ret = false;
					}
				}
				if (!ret && showTip) {
					uni.showToast({
						icon: 'none',
						title: '带*号的都为必须提交的材料'
					});
				}
				if (ret) {
					this.formsModel.stateMaterial = true;
					this.$store.commit('updateFormsModel', this.formsModel);
				}
				return ret;
			},
			previewImg(imgArr, imgIndex) {
				console.log("previewImg:", imgIndex);
				uni.previewImage({
					urls: imgArr,
					current: imgIndex,
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	@import '../../static/css/apply/apply.scss';

	.tip {
		padding: 20upx 30upx;
		color: #ff5200;
		background-color: #fdf9ee;
		font-size: 24upx;
	}

	.materials {
		background-color: #fff;
		overflow-y: scroll;

		.cell {
			border-bottom: 1upx solid #f0f0f0;
			align-items: flex-start;
			padding: 20upx 30upx 30upx 30upx;

			.top {
				justify-content: flex-start;
				align-items: flex-start;
				font-size: 30upx;
				color: #333;

				.star {
					font-size: 36upx;
					color: #f00;
					margin-top: 6upx;
				}

				.paper {
					margin: 0 8upx;
					color: #fff;
					font-size: 24upx;
					padding: 4upx 8upx;
					// background-color: #0072FF;
					background-color: #50ba47;
					border-radius: 8upx;
				}
			}

			.center {
				padding: 20upx 0;
				justify-content: flex-start;
				flex-wrap: wrap;

				.upload-img {
					width: 106upx;
					height: 106upx;
					background-color: #f8f8f8;
					border-radius: 10upx;
					margin-right: 10upx;
					margin-top: 10upx;
					display: inline-block;
					flex-shrink: 0;
				}

				.upload-img image {
					width: 100%;
					height: 100%;
				}

				.add-btn {
					background-color: #f8f8f8;
					color: #cccccc;
					width: 106upx;
					height: 106upx;
					border-radius: 10upx;
					font-size: 38upx;
				}
			}

			.bottom {
				font-size: 25upx;
				color: #777;

				.have-data {
					color: #50ba47;
				}
			}
		}
	}
</style>
