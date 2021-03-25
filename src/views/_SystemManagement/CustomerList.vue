<template>
	<div class="usermanagement">
		<div style="padding: 0 0;min-width: 1400px;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">
						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item style='float:right;height: 35px;'>
									<el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
									<el-button type="primary" @click="onSubmit" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>

		<div class="titles">
			<div class="second_title">Product preview</div>g
		</div>

		<div>
			<div style="padding-bottom: 40px;background: white;height: 560px;width: 100%;line-height: 0;min-width:1300px;border-radius: 10px;">
				

					<div class="shang" :model="formInline">
						<div :span="4" class="tu1" v-for="(item, index) in items">
							<!-- <span class="name" style="height: 20px;">設計名稱:{{item.recordOne}}</span> -->
							<span class="name" style="height: 20px;float: left;text-align: center;">Product:{{item.recordTwo}}</span>
							<img @click="preview(root+'/kernal/asset/'+item.plvKAssetReference)" :src="root+'/kernal/asset/'+item.plvKAssetReference" style="height: 190px;width: 100%;"/>
							
						</div>
						
						<!-- <span>預覽</span>	 -->
						
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
						
					</div>
			</div>
		</div>
		
		<div class="block" style="float: right;margin-top: 10px;">
			<el-pagination :page-size='10' layout="prev, pager, next" :total="totalElements" @current-change='pages02'
			 :current-page="page01">
			</el-pagination>
		</div>
	</div>

</template>



<script>
	export default {
		name: "CustomerList",
		data() {
			return {
				root:'',
				dialogImageUrl:'',
				items:[{
					recordOne: '',
					recordTwo: '',
				}],
				isChoose:false,
				sum:'1',
				checked: true,
				value: '',
				dialogVisible: false,
				dialogVisibles: false,
				reserve_Processing: false,
				reserve_lock: false,
				value1: '',
				value2: '',
				value6: [],
				test: '010101',
				formInline: {
// 					search: '',
// 					num: '1',
					seek: '',

					recordOne: '',
					recordTwo: '',
				},
				sum: 10,
				totalElements: 0,
				page01: 1,
				multipleSelection: []
			}


		},

		created: function() {
			
			this.root = this.$api.root
			this.search()
			//成品查看
			console.log('.........')
// 			console.log(r.recordOne)
// 			console.log(r.recordOne)
// 			this.formLabelAlign.recordOne = r.formInline.recordOne
// 			this.formLabelAlign.recordTwo = r.formInline.recordTwo
// 			this.formInline

			// this.formInline.recordOne = formLabelAlign.recordOne
			// this.formInline.recordTwo = formLabelAlign.recordTwo
			

		},

		methods: {
			
// 			 imgScc:function () {
// 				 console.log('0000000000000000000')
//                 this.isChoose = !this.isChoose
//             },
			
			search() {
				this.$api.post('/Design/seekPageAssetDictionaries', {
// 					dateEnd: this.value6[1].format("yyyy-MM-dd"),
// 					dateStart: this.value6[0].format("yyyy-MM-dd"),
					index: parseInt(this.page01) - 1,
					numbe: 10,
					seek: this.formInline.seek,
				}, r => {
					console.log('***********************')
					console.log(r);
					
					this.items = r.content
					
					this.totalElements = r.totalPage
					// this.totalElements = r.totalElements
					// this.tableData = r.content
					this.sum = r.size
				});
			},
			
			
			// 預覽圖片
			preview(imgScc) {
				console.log(imgScc)
				this.dialogImageUrl = imgScc;
				this.dialogVisible = true;
			},

			onSubmit() {
				this.page01 = 1
				this.search()
			},


			return_cancelCancel() {
				this.reserve_Processing = false
			},




			// 批次翻頁
			pages02(val) {
				// console.log(val)
				this.page01 = val
				this.search()
			},
			// 客單
			kedan(){
				this.$router.push("/SystemManagement/CustomerOrderManagement")
			},
			// 客單項目
			xiangmu(){
				this.$router.push("/SystemManagement/JewelryDesign")
			},
			
			usercreate() {
				this.$router.push("/SystemManagement/shnagzaitupian")
			},
			details(uuid) {
				this.$router.push("/SystemManagement/KedanXinzeng?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/SystemManagement/KedanXinzeng?type=alert&uuid=" + uuid)
			},
			topage(type) {
				if (type == 'user') {
					this.$router.push("/SystemManagement/CustomerOrderManagement")
				} else if (type == 'grounp') {
					console.log('00000000')
					this.$router.push("/SystemManagement/JewelryDesign")
				}
			}

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {
		
		
		.shang{
			float: left;
			height: 260px;
			width: 100%
			// background-color: antiquewhite;
		}
		.xia{
			float: left;
			height: 300px;
			// background-color: azure;
		}
		.name{
			width: 100%;
			height: 30px;
		}
		.tu1,.tu2,.tu3,.tu4,.tu5,.tu6,.tu7,.tu8{
			width: 20%;
			height: 240px;
			float: left;
			padding: 30px 40px;
			// background-color: red;
		}
		.riqi1,.riqi2,.riqi3,.riqi4,.riqi5,.riqi6,.riqi7,.riqi8{
			float: left;
			width: 100%;
			height: 20px;
			line-height: 0;
			display: block;
			height: 30px;
			line-height: 20px;
			// margin-top: -50px;
		}
		
		.tishi {
			line-height: 0;
		}

// 		.el-carousel__item h3 {
// 			color: #475669;
// 			font-size: 14px;
// 			opacity: 0.75;
// 			line-height: 200px;
// 			margin: 0;
// 		}
// 
// 		.el-carousel__item:nth-child(2n) {
// 			background-color: #99a9bf;
// 		}
// 
// 		.el-carousel__item:nth-child(2n+1) {
// 			background-color: #d3dce6;
// 		}

		.block {
			line-height: 0;

			.el-main {
				line-height: 0
			}
		}

		.el-table--enable-row-transition {
			// height: 500px;
			overflow: auto;
			border-bottom: 0px solid white
		}

		.el-table_1_column_9,
		.is-leaf {
			line-height: 50px;
			padding: 0
		}

		.second_menu {
			width: 100px;
			line-height: 60px;
			float: left;
			margin-left: 20px;
			font-size: 18px;

			span {
				cursor: pointer
			}
		}

		.el-table__header-wrapper {
			line-height: 50px;
		}


		.selector {
			color: $navHoverTextColor;

		}

		.titles {
			height: 50px;
			background: rgb(224, 224, 224);
			margin-top: 20px;
			line-height: 50px;
			// border-radius: 10px;
			.img {
				width: 30px;
				height: 30px;
				float: right;
				margin-top: 10px;
				margin-right: 50px
			}

			.second_title {
				float: left;
				font-size: 18px;
				margin-left: 20px;
				display: block
			}

		}

		.search {
			height: 90px;
			background: white;
			line-height: 110px;
			overflow: hidden;
			font-size: 18px;
			width: 100%
		}

		.el-form--inline .el-form-item__label {
			float: left
		}

		.titles_td {
			height: 50px;
			background: rgb(224, 224, 224);
			margin-top: 20px;
			line-height: 50px;

			.but {
				// background: $navHoverTextColor;
				background: rgb(245, 93, 84);
				color: white;
				float: right;
				margin-top: 6.5px;
				margin-right: 40px;
			}

			.second_title {
				float: left;
				font-size: 18px;
				margin-left: 20px;
				display: block
			}

		}
	}
</style>
