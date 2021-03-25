<template>
	<div class="demo-fit">
		<el-row>
			<el-col :span="3" v-for="item in fits"  style='cursor: pointer;min-width: 160px;'>

				<div style='white-space: nowrap;background: white;width: 150px;height: 100px;text-align: center;margin-top: 15px;' @click='to_url(item.url)'>
					<i :class="item.icon" style="font-size: 32px;line-height: 70px"></i>
					<div class="grid-content bg-purple-dark" style="line-height: 20px;">
						<b>{{item.title}}</b>
					</div>
				</div>
			</el-col>

		</el-row>
	</div>
</template>

<script>
	import store from '@/store'
	import $ from 'jquery'
	export default {
		data: function() {
			return {
				fits: [

					{
						title: 'Dashboard',
						key: 'Dashboard',
						url: '/Dashboard',
						icon: 'el-icon-menu',
					},



          {
          	title: 'Sales',
          	key: 'Sales',
          	url: '/CustomerOrderManagement?type=self',
            icon:'el-icon-sell',

          },

          {
          	title: 'Maintenance Order',
          	key: 'Maintenance Order',
          	url: '/CustomerOrderManagement_Maintenance',
            icon:'el-icon-box',

          },

          {
          	title: 'Coupon Setting',
          	key: 'Coupon Setting',
          	url: '/CardTicketInformation',
          	icon: 'el-icon-s-ticket',
          	//
          },

          {
          	title: 'Factory Order',
          	key: 'Factory Order',
          	url: '/factoryManagement?type=self',
          	icon: 'el-icon-tickets',
          },

          {
          	title: 'Factory Setting',
          	key: 'Factory Setting',
          	url: '/factoryList',
          	icon:'el-icon-set-up'
          },

          {
          	title: 'Gem Inventory',
          	key: 'Gem Inventory',
          	url: '/purchase',
          	icon: 'el-icon-s-goods',
          },

          {
          	title: 'Product Inventory',
          	key: 'Product Inventory',
          	url: '/ProductList',
          	icon: 'el-icon-s-cooperation',
          },

          {
          	title: 'Certified Gem Data',
          	key: 'Certified Gem Data',
          	url: '/gemList',
          	icon: 'el-icon-document',
          },

          {
          	title: 'Gem Type Setting',
          	key: 'Gem Type Setting',
          	url: '/gemType',
          	icon: 'el-icon-s-operation',

          },

          {
          	title: 'Product Cat. Setting',
          	key: 'Product Cat. Setting',
          	url: '/categoryLIist',
          	icon: 'el-icon-set-up',
          },

          {
          	title: 'Ring Size Surcharge',
          	key: 'Ring Size Surcharge',
          	url: '/surcharge_group',
          	icon: 'el-icon-edit-outline',
          },

          {
          	title: 'Ring Surcharge',
          	key: 'Ring Surcharge',
          	url: '/product_surcharge_ring',
          	icon: 'el-icon-edit-outline',
          },

          {
          	title: 'Customer Data',
          	key: 'Customer Data',
          	url: '/CustomersManagement',
          	icon:'el-icon-user-solid',
          },

          {
          	title: 'Customer Tier',
          	key: 'Customer Tier',
          	url: '/Kehu_Customer',
          	icon:'el-icon-sort',
          },

          {
          	title: 'Conversations',
          	key: 'Conversations',
          	url: '/Communicationlogs',
          	icon:'el-icon-chat-line-round',
          },

          {
          	title: 'Invoice',
          	key: 'Invoice',
          	url: '/DailyExpenditureinvoiceManagement',
          	icon: 'el-icon-tickets',
          },

          {
          	title: 'Supplier',
          	key: 'Supplier',
          	url: '/SupplierList',
          	icon: 'el-icon-s-shop',
          },

          {
          	title: 'Staffs',
          	key: 'Staffs',
          	url: '/Permissions',
          	icon: 'el-icon-s-custom',
          },

          {
          	title: 'Group Setting',
          	key: 'Group Setting',
          	url: '/GroupManager',
          	icon: 'el-icon-s-platform',
          },

          {
          	title: 'Branch',
          	key: 'Branch',
          	url: '/branchManagement',
          	icon:'el-icon-s-shop'
          },

          {
          	title: 'Order Status Setting',
          	key: 'Order Status Setting',
          	url: '/orderstatusManagement',
          	icon:'el-icon-set-up'
          },

          {
          	title: 'Material Setting',
          	key: 'Material Setting',
          	url: '/materialManagement',
          	icon:'el-icon-set-up'
          },

          {
          	title: 'Material Color Setting',
          	key: 'Material Color Setting',
          	url: '/materialManagement_Color',
          	icon:'el-icon-set-up'
          },

          {
          	title: 'Payment Method Setting',
          	key: 'Payment Method Setting',
          	url: '/materialManagement_PaymentMethod',
          	icon:'el-icon-set-up'
          },




          {
          	title: 'Crash Reports',
          	key: 'errorManagement',
          	url: '/errorManagement',
          	icon:'el-icon-warning'
          },



// 					{
// 						title: 'Gem Inventory',
// 						key: 'Gem Inventory',
// 						url: '/purchase',
// 						icon: 'el-icon-s-goods',
// 					},
//
// 					{
// 						title: 'Gem Type Setting',
// 						key: 'Gem Type Setting',
// 						url: '/gemType',
// 						icon: 'el-icon-s-operation',
//
// 					},
//
// 					{
// 						title: 'Certified Gem Data',
// 						key: 'Certified Gem Data',
// 						url: '/gemList',
// 						icon: 'el-icon-document',
// 					},
//
// 					{
// 						title: 'Product Inventory',
// 						key: 'Product Inventory',
// 						url: '/ProductList',
// 						icon: 'el-icon-s-cooperation',
// 					},
//
// 					{
// 						title: 'Product Cat. Setting',
// 						key: 'Product Cat. Setting',
// 						url: '/categoryLIist',
// 						icon: 'el-icon-edit-outline',
//
//
// 					},
// 					{
// 						title: 'Sales Order',
// 						key: 'Sales Order',
// 						url: '/CustomerOrderManagement',
// 						icon: 'el-icon-s-order'
// 					},
// 					{
// 						title: 'Factory Order',
// 						key: 'Factory Order',
// 						url: '/factoryManagement',
// 						icon:'el-icon-s-home'
// 					},
// 					{
// 						title: 'Customer Data',
// 						key: 'Customer Data',
// 						url: '/CustomersManagement',
// 						icon:'el-icon-user-solid',
// 					},
//
// 					{
// 						title: 'Grade Setting',
// 						key: 'Grade Setting',
// 						url: '/Kehu_Customer',
// 						icon:'el-icon-sort',
// 					},
// 					{
// 						title: 'Order Status',
// 						key: 'Orderstatus',
// 						url: '/orderstatusManagement',
// 						icon:'el-icon-info'
// 					},
//
// 					{
// 						title: 'Invoice',
// 						key: 'Invoice',
// 						url: '/DailyExpenditureinvoiceManagement',
// 						icon: 'el-icon-tickets',
// 					},
//
// 					{
// 						title: 'Staffs',
// 						key: 'Staffs',
// 						url: '/Permissions',
// 						icon: 'el-icon-s-custom',
//
//
// 					},
//
// 					{
// 						title: 'Group Setting',
// 						key: 'Group Setting',
// 						url: '/GroupManager',
// 						icon: 'el-icon-s-platform',
// 					},
//
// 					{
// 						title: 'Coupon',
// 						key: 'Coupon',
// 						url: '/CardTicketInformation',
// 						icon: 'el-icon-s-ticket',
// 						//
//
// 					},
//
// 					{
// 						title: 'Factory',
// 						key: 'Factory',
// 						url: '/factoryList',
// 						icon:'el-icon-office-building'
// 					},
//
//
//
// 					{
// 						title: 'Branch',
// 						key: 'Branch',
// 						url: '/branchManagement',
// 						icon:'el-icon-s-shop'
// 					},
// 					{
// 						title: 'Error',
// 						key: 'errorManagement',
// 						url: '/errorManagement',
// 						icon:'el-icon-warning'
// 					},

				],
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
			}
		},

		// beforeCreate: function() {
		//
		// 	console.log('okok')
		//
		// 	// console.log(this.$api.getCookie('accessToken'))
		// 	if(this.$api.getCookie('accessToken')!=''){
		//
		// 		console.log('okok')
		// 		this.$api.axios.defaults.headers.common['Authorization'] =this.$api.getCookie('accessToken')
		// 		store.state.user.user = true
		//
		// 	}
		//
		// },
		methods: {

			to_url(path){
				console.log("/SystemManagement"+path)
				// this.$router.push("/SystemManagement/special")
				this.$router.push(path)
			},

			handleSubmit(e) {

				console.log('----------------------')
				console.log(this.$api.axios.defaults.headers)
				console.log('----------------------')

				// this.$api.axios.defaults.headers.common['Authorization'] ='Basic MTExMTE6MTExMTE='
				this.$api.axios.defaults.headers.common['Authorization'] =
					'Basic ODcyMmJmOWMtZTZjZi0xMWU1LTk2NTAtMDAwYzI5NTIyZGNhOmRmYTQ0MzhiLWU2ZTctMTFlNS05NjUwLTAwMGMyOTUyMmRjYQ=='

				// store.state.user.user = true
				// this.$router.push("/purchase")
				// this.$nprogress.done()
				// e.preventDefault()

				var qs = require('qs');
				this.form.validateFields((err, values) => {
					console.log(values.user + '-------' + values.password)
					if (values.user != '' && values.password != '') {

						this.$nprogress.start()
						// console.log(this.$nprogress.status)

						var bodyFormData = new FormData();
						bodyFormData.set("username", values.user);
						bodyFormData.set("grant_type", "password");
						bodyFormData.set("password", values.password);

						// console.log('----------------------01')
						var time = parseInt(window.getComputedStyle(document.querySelector('.bar')).getPropertyValue('width'))
						var arr = new Array;
						var out = 0

						this.$api.post('/oauth/token',

							bodyFormData, r => {
								setTimeout(function() {
									window.clearInterval(timer);
								}, 400)
								this.$api.axios.defaults.headers.common['Authorization'] = r.token_type + ' ' + r.access_token
								document.cookie = "accessToken=" + r.token_type + ' ' + r.access_token;
								store.state.user.user = true
								this.$router.push("/purchase")
								this.$nprogress.done()
								e.preventDefault()
							});

					}

				})



			},
		},
	}
</script>

<style>


</style>
