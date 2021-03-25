<template>
	<div class="errorDeail">
		
		<div>
			<b>endpoint:</b>
			<span>{{title}}</span>
		</div>
		
		<div>
			<b>message:</b>
			<span>{{details}}</span>
		</div>
		
		<div>
			<b>stacktrace:</b>
			<span>{{stacktrace}}</span>
		</div>
		
		<div style="width: 100%;text-align: center;margin-top: 20px;">
			
			<el-button  type="primary" @click="Return('ruleForm')" style='margin-left: 20px;'>Return</el-button>
			
		</div>
		
		

	</div>

</template>

<script>
	export default {
		name: "errorDeail",
		data() {
			return {
				details:'',
				title:'',
				stacktrace:''
			}
		},

		// /Branch/findAll
		created: function() {
			// this.search()
			
			this.$api.get('/miscellaneous/exception/'+this.$route.query.uuid,    
				null, r => {
					
					console.log(r);
					this.details=r.message
					this.title=r.endpoint
					this.stacktrace=r.stacktrace
					// this.totalElements = r
					// this.tableData = r.content
					// this.sum = r.size
				});
			
		},

		methods: {
			
			Return(){
				history.back(-1)
			},
			
			search() {
				
				this.$api.get('/miscellaneous/exception/',    
					null, r => {
						
						console.log(r);
						// this.totalElements = r.totalPage
						this.tableData = r
						// this.sum = r.size
					});
				
			},
			

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/styles/variable';



	.errorDeail {
		

		
	}
</style>
