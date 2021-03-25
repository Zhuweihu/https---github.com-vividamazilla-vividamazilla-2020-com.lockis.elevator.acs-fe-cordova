<template>
	<div class="usermanagement">
		
		<!-- <el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark" style="background:white;height: 60px;">

					<div class="second_menu">
						<span @click="topage('user')">用戶管理</span>
					</div>

					<div class="second_menu">
						<span @click="topage('grounp')">群組管理</span>
					</div>

					<div class="second_menu selector">
						<span >分行管理</span>
					</div>
					
				</div>
			</el-col>
		</el-row> -->
		

		<div>
			
			<div class="titles_td" >
				<div class="second_title" >>>>List</div>
				<!-- <el-button class='but' type="primary" @click="grounpcreate" style='width: 112px;border:0;'>新增分行</el-button> -->
			</div>
			
			<div  style="padding: 20px 0;overflow: auto;width: 100%;border-radius: 10px;background: white;border: 2px solid rgb(209,209,209);">
				
				<div class="act_block" v-for="item in content">
					<!-- <div class="title">商業人像照及基本活動相片工作坊</div> -->
					<div class="content">{{item.content}}</div>
				</div>
				
				
				
				
			</div>
			
		</div>

		<div style="width: 100%;text-align: center;">
			<button class="return" @click="returns" >返回</button>
		</div>
		
		
		<!-- 賬號密碼錯誤彈窗 -->
		<!-- <div class="dialog">
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%"  top='20%'>
				<span>起始時間不能大於終止時間</span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogVisible = false">確 定</el-button>
				</span>
			</el-dialog>
		</div> -->
		
		
	</div>

</template>

<script>
	export default {
		name: "CustomentManagement",
		data() {
			return {
				value1: "",
				test: '010101',
				content:'',
				formInline: {
					search: '',
					num: ''
				},
				tableData: [{
					name: '經理',
					num:10
				},
				{
					name: '銷售',
					num:30
				},
				{
					name: '收銀',
					num:20
				}]
			}

		
	},
	created: function() {
		this.$api.post('/ActivityList/findDetailBySalesNo?salesno='+this.$route.query.reference,null, r => {
			console.log(r)
			this.content=r
		});
		
		
		this.$api.put('/ActivityList/read?salesno='+this.$route.query.reference, null, r => {
			//console.log('****************************okok')
			// this.search();
		});
		
	},
	
	watch: {
		  '$route' (to, from) { //监听路由是否变化
			
			
			this.$api.put('/ActivityList/read?salesno='+this.$route.query.reference, null, r => {
				
				console.log('已讀')
				//console.log('****************************okok')
				// this.search();
			});
		  
			
		  }
		},
	
	methods: {
		onSubmit() {
			
		},
		// 批次翻頁
		pages02(val) {
			//console.log(val)
		},
		grounpcreate(){
			this.$router.push("/GroundCreate")
		},
		detail(){
			this.$router.push("/UserCreate?type=detail")
		},
		Alert(){
				this.$router.push("/UserCreate?type=Alert")
		},
		topage(type){
			if(type=='user'){
				this.$router.push("/UserManagement")
			}else if(type=='grounp'){
				this.$router.push("/CustomentManagement")
			}
		},
		returns(){
			// this.$router.push("/activityList")
			window.history.go(-1);
			
		}
	}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';
	
	.usermanagement{
		
		.return{
			margin-top: 30px;
			background: rgb(245, 93, 84);
			width:130px;
			height:55px;
			border: 0;
			color: white;
			cursor: pointer;
			border-radius: 5px;
			font-size: 16px
		}
		
		.act_block{
			width: 95%;
			margin-left: 2.5%;
			line-height: 20px;
			text-align: left;
			background: white;
			padding: 10px;
			border-bottom: 1px solid #BBBBBB;
			.title{
				line-height: 40px
			}
		}
		
		.block{
			line-height: 0;
			.el-main{
				line-height: 0
			}
		}
		
		.el-table--enable-row-transition{
			overflow: auto;
			border-bottom: 0px solid white
		}
		
		.el-table_1_column_9,.is-leaf{
			line-height: 50px;
			padding: 0
		}
		
		.second_menu {
			width: 100px;
			line-height: 60px;
			float: left;
			margin-left: 20px;
			font-size: 18px;
			span{
				cursor: pointer
			}
		}
		
		.el-table__header-wrapper{
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
			// background: rgb(224, 224, 224);
			margin-top: 20px;
			line-height: 50px;
		
			.but {
				// background: $navHoverTextColor;
				background: rgb(245,93,84);
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
