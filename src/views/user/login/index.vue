<template>
	<div>
		<div :class="[$style.title, 'login-heading']">

			<!-- <img src="../../../../image/logo.png" style="width: 350px;" /> -->
			<!-- <h1>
				<strong>WELCOME TO CLEAN UI VUE - VUE REDUX ADMIN TEMPLATE</strong>
			</h1>
			<p>
				Pluggable enterprise-level vue application framework.
				<br>An excellent front-end solution for web applications built upon Ant Design.
				<br>Credentials for testing purposes -
				<strong>admin@mediatec.org</strong> /
				<strong>cleanui</strong>
			</p> -->
		</div>
		<div :class="$style.block">
			<div class="row">
				<div class="col-xl-12">
					<div :class="$style.inner">
						<div :class="$style.form">
							<h4 class="text-uppercase">
								<strong>Please log in</strong>
							</h4>
              <!-- @submit="handleSubmit" -->
							<a-form class="login-form" :form="form" >
								<a-form-item label="Username">
									<a-input placeholder="Username"  v-decorator="['user', { initialValue: '', rules: [{ required: true, message: 'Please input your username!' }]}]">
										<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25);" />
									</a-input>
								</a-form-item>
								<a-form-item label="Password">
									<a-input placeholder="Password"  type="password" v-decorator="['password', {initialValue: '', rules: [{ required: true, message: 'Please input your Password!' }]}]">
										<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);" />
									</a-input>
								</a-form-item>
								<div>
									<!-- <a-checkbox>Remember me</a-checkbox>
									<router-link class="pull-right text-primary utils__link--blue utils__link--underlined" to="/user/forgot">Forgot
										password?</router-link> -->
								</div>
								<div class="form-actions">
									<a-button @click="handleSubmit" type="primary" htmlType="submit" class="login-form-button width-150">Sign in</a-button>
									<!-- <span class="ml-3 register-link">
										<a href="javascript: void(0);" class="text-primary utils__link--underlined mr-1">Register</a> if you
										don&#39;t have account
									</span> -->
								</div>

                <div>

                </div>

                <div class="form-group">
									<!-- <p>Use another service to Log In</p> -->
									<div class="mt-2">
										<!-- <a href="javascript: void(0);" class="btn btn-icon mr-2">
											<i class="icmn-facebook" />
										</a>
										<a href="javascript: void(0);" class="btn btn-icon mr-2">
											<i class="icmn-google" />
										</a>
										<a href="javascript: void(0);" class="btn btn-icon mr-2">
											<i class="icmn-windows" />
										</a>
										<a href="javascript: void(0);" class="btn btn-icon mr-2">
											<i class="icmn-twitter" />
										</a> -->
									</div>
								</div>
							</a-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store'
	import $ from 'jquery'
	export default {
		data: function() {
			return {
				form: this.$form.createForm(this),
				ruleForm: {
					user: '',
					passWord: ''
				},

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
			handleSubmit(e) {
				document.cookie = "accessToken="+'r.token_type'+' '+'r.access_token'+';path=/';
				this.$router.push('/')
				// 				this.$nprogress.done()
				// 				this.$notification['success']({
				// 					message: 'Logged In',
				// 					description: 'You have successfully logged in to Clean UI Vue Admin Template!',
				// 				})
				//
				// 				this.$router.push("/purchase")
				// console.log('1111')

				// 					window.localStorage.setItem("auth","arr");
				// 					console.log('1121212')
				// 					this.$router.push('/')





				//
				//   this.form.validateFields((err, values) => {
				//     if (!err) {
				// 		 this.$nprogress.start()
				//
				// 		 var bodyFormData = new FormData();
				// 								bodyFormData.set('username', this.ruleForm.user);
				// 								bodyFormData.set('grant_type', 'password');
				// 								bodyFormData.set('password', this.ruleForm.passWord);
				// 								this.$api.post('/oauth/token',bodyFormData , r => {
				// 									console.log('----------------------')
				// 									console.log(r)
				// 									store.state.user.user=true
				// 									this.$router.push("/purchase")
				// 									this.$nprogress.done()
				// 									  e.preventDefault()
				// 								});
				// 	})
				//
				// 	}}


				console.log('----------------------')
				console.log(this.$api.axios.defaults.headers)
				console.log('----------------------')

				// this.$api.axios.defaults.headers.common['Authorization'] ='Basic MTExMTE6MTExMTE='

				//this.$api.axios.defaults.headers.common['Authorization'] ='Basic ODcyMmJmOWMtZTZjZi0xMWU1LTk2NTAtMDAwYzI5NTIyZGNhOmRmYTQ0MzhiLWU2ZTctMTFlNS05NjUwLTAwMGMyOTUyMmRjYQ=='

        		this.$api.axios.defaults.headers.common['Authorization'] = 'Basic MzZkMTI5NGMtNGNkYi0xMWVhLTgwYWYtZjQ1Yzg5OGU2N2IxOjNmYThjYWZjLTRjZGItMTFlYS04MGFmLWY0NWM4OTJlNTdiMQ=='

				// store.state.user.user = true
				// this.$router.push("/purchase")
				// this.$nprogress.done()
				// e.preventDefault()

				var qs = require('qs');
					this.form.validateFields((err, values) => {
					console.log(values.user+'-------'+values.password)
					if (values.user!=''&&values.password!='') {
						
						//this.$nprogress.start()
						// console.log(this.$nprogress.status)

						var bodyFormData = new FormData();
						bodyFormData.set("username", values.user);
						bodyFormData.set("grant_type", "password");
						bodyFormData.set("password", values.password);

						// console.log('----------------------01')
						// var time=parseInt(window.getComputedStyle(document.querySelector('.bar')).getPropertyValue('width'))
						// var arr = new Array;
						// var out=0
						// var timer = setInterval(() => {
						// 	var a=window.getComputedStyle(document.querySelector('.bar')).getPropertyValue('transform')
						// 	arr = a.split(",")
						// 	out=(parseInt(arr[4])+time)/time*100
						// 	$('.spinner').attr('data-content',parseInt(out)+'%');
					 //   }, 50)
						
						
						//开始
						// /*
						this.$api.post('/oauth/token',

						bodyFormData
						, r => {
							
							// setTimeout(function(){
							// 	  window.clearInterval(timer);
							// },400)

							console.log('----------------------0000')
							// this.$api.axios.headers.Authorization =r.token_type+' '+r.access_token
							// 设置请求头中的 Authorization (授权)
							this.$api.axios.defaults.headers.common['Authorization'] =r.token_type+' '+r.access_token

							// var today = new Date();
							// var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24*0.1;
							// today.setTime(targetday_milliseconds);
							// document.cookie = "accessToken="+r.token_type+' '+r.access_token+"; expires=Sun, 31 Dec 2017 12:00:00 UTC";
							// document.cookie = "accessToken="+r.token_type+' '+r.access_token+";expires="+today.toUTCString();
							document.cookie = "accessToken="+r.token_type+' '+r.access_token;
							// Response.Cookies("accessToken").Expires= (now()+1/24)
							// console.log(this.$api.axios.headers)
							// console.log(r)

              // setTimeout(function(){
                store.state.user.user = true



                this.$router.push("/")
              // },200)


							// console.log('------'+this.$nprogress.status)
							this.$nprogress.done()
							e.preventDefault()

						})
						// */


						//test
						
					}

				})




				// this.form.validateFields((err, values) => {
					// console.log(values)
					// if (!err) {
						// this.$nprogress.start()
						// this.$nprogress.done()
						// this.$notification['success']({
						// 	message: 'Logged In',
						// 	description: 'You have successfully logged in to Clean UI Vue Admin Template!',
						// })
						// this.$router.push("/purchase")
						// 				          this.$auth.login(values.email, values.password)
						// 				            .then(() => {
						//
						//
						// 				              this.$nprogress.done()
						// 				              this.$notification['success']({
						// 				                message: 'Logged In',
						// 				                description: 'You have successfully logged in to Clean UI Vue Admin Template!',
						// 				              })
						//
						// 							  // this.$router.push("/newpurchase?type=new")
						//
						// 				            })
						// 				            .catch((error) => {
						// 				              this.$nprogress.done()
						// 				              this.$notification['warning']({
						// 				                message: error.code,
						// 				                description: error.message,
						// 				              })
						// 				            })
					// }
				// })
				

				

			},

		},
}
</script>

<style lang="scss" module>
	@import "./style.module.scss";
</style>
