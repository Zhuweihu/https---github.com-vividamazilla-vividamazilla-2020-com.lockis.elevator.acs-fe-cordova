// import storage from "./storage";
//
// export {
// 	storage
// };

import {
	MessageBox,
	Message
} from 'element-ui';


// 配置API接口地址
// var root = 'https://www.elyseesshop.co/9f286966-2a2f-11ea-b04e-acde48001122'   //李治1
// var root = '../../data'
// var root = 'http://192.168.2.195:8090'
//  var root = 'http://192.168.8.195:8080/b1b73a5a-1361-11eb-adc1-0242ac120002'
//  var root = 'http://192.168.8.227:8080/b1b73a5a-1361-11eb-adc1-0242ac120002'
//  var root = 'http://192.168.8.127:8080/b1b73a5a-1361-11eb-adc1-0242ac120002'
//  var root = 'http://localhost:8080/b1b73a5a-1361-11eb-adc1-0242ac120002'
// var root = 'http://192.168.8.13:8080/b1b73a5a-1361-11eb-adc1-0242ac120002'
// var root = 'http://192.168.8.28:8080/b1b73a5a-1361-11eb-adc1-0242ac120002'


// 公网接口
var root = 'http://23.101.29.177/b1b73a5a-1361-11eb-adc1-0242ac120002'

// var root = '/api'
// var root = '/api'


// 引用axios
var axios = require('axios')

// 自定义判断元素类型JS
function toType(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
	for (var key in o) {
		if (o[key] === null) {
			delete o[key]
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim()
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key])
		} else if (toType(o[key]) === 'array') {
			o[key] = filterNull(o[key])
		}
	}
	return o
}

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的Alert
*/

function login_api(method, url, params, success, failure) {
	// console.log("aaaaaaa")
	console.log("params:"+params)
	if (params) {
		params = filterNull(params)
	}
	axios({
			method: method,
			url: url,
			data: method === 'POST' || method === 'PUT' ? params : null,
			params: method === 'GET' || method === 'DELETE' ? params : null,
			baseURL: root,
			crossDomain: true,
			withCredentials: false
		})
		.then(function(res) {

			success(res.data)

			//     if (res.data.success === true) {
			//       if (success) {
			//         success(res.data)
			//       }
			//     } else {
			//       if (failure) {
			//         failure(res.data)
			//       } else {
			//         window.Alert('error: ' + JSON.stringify(res.data))
			//       }
			//     }

		})
		.catch(function(err) {
			let res = err.response
			if (err) {
				window.Alert('api error, HTTP CODE: ' + res.status)
			}
		})


}

function apiAxios(method, url, params, success, failure) {

	// var ifToken = document.cookie.indexOf('accessToken');
	// console.log(getCookie('accessToken'))

	// if (ifToken != -1) {

	if (params) {
		params = filterNull(params)   //对参数进行过滤，去除空的和字符串首位空格
	}
	axios({
			method: method,
			url: url,
			// 是作为请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
			data: method === 'POST' || method === 'PUT' ? params : null,
			// 是即将与请求一起发送的 URL 参数
			params: method === 'GET' || method === 'DELETE' ? params : null,
			baseURL: root,
			// headers: {
			// 	"Authorization": "Basic " + 'MTExMTE6MTExMTE=',
			// 	'Access-Control-Allow-Origin': '*'
			// },
			// withCredentials: true
			withCredentials: false  //在跨域请求时，不会携带用户凭证；返回的 response 里也会忽略 cookie
		})
		.then(function(res) {

			//  console.log("res:"+res)
			success(res.data)
			//     if (res.data.success === true) {
			//       if (success) {
			//         success(res.data)
			//       }
			//     } else {
			//       if (failure) {
			//         failure(res.data)
			//       } else {
			//         window.Alert('error: ' + JSON.stringify(res.data))
			//       }
			//     }

		})
		.catch(function(err) {
			let res = err.response

			// failure(res)
			 console.log("err.response",err)

			if (err) {

        console.log('----------')
        console.log(err)

				if (res.status == '404') {
					this.$router.push("/404")
					MessageBox('Network Error', '', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {

					});
					failure(res)
					// alert('網絡錯誤')
				} else if (res.status == '401') {
					MessageBox("Username / Password error", '', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {

					});
					failure(res)
					// alert('username 或 password錯誤')
				}else if (res.status == '400') {
					// if(err.response)
					// console.log(err.response.data.error_description)
					if(err.response.data.error_description=='Bad credentials'){
						MessageBox("Username / Password error", '', {
							confirmButtonText: 'OK',
							// cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.loading = false
							// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
						}).catch(() => {

						});
					}else{

						if(err.response.data.message=='PLV_K_SALES_COUPON_NOT_EXISTS'){
							MessageBox('Coupons do not exist', '', {
								confirmButtonText: 'OK',
								// cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.loading = false
								// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
							}).catch(() => {

							});

						}else if(err.response.data.message=='PLV_K_SALES_COUPON_ALREADY_EXPIRED'){


							MessageBox('The coupon has expired', '', {
								confirmButtonText: 'OK',
								// cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.loading = false
								// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
							}).catch(() => {

							});

						}else if(err.response.data.message=='PLV_K_SALES_COUPON_NOT_AVAILABLE'){


							MessageBox('Coupons are not available', '', {
								confirmButtonText: 'OK',
								// cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.loading = false
								// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
							}).catch(() => {

							});

						}

            else if(err.response.data.message=='PLV_VERSION_MISMATCH'){
            	MessageBox('Version mismatch', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_ACCESS_IS_DENIED'){
            	MessageBox('Access was denied', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_REQUEST_DATA_PARTIAL_EMPTY'){
            	MessageBox('Some data is empty', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_INTERNAL_SERVER_ERROR'){
            	MessageBox('Server error', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_ADMIN_NOT_DROPABLE'){
            	MessageBox('Administrator cannot be deleted', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_MEMBER_ALREADY_EXISTS'){
            	MessageBox('Member already exists', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_MEMBER_NOT_EXISTS'){
            	MessageBox('Member does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_MEMBER_ALREADY_ACTIVATED'){
            	MessageBox('Member has been activated', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_MEMBER_NOT_ACTIVATED'){
            	MessageBox('Member inactivated', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_MEMBER_INVALID_EMAIL_ADDRESS'){
            	MessageBox('Invalid e-mail address', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_MEMBER_GROUP_NOT_EXISTS'){
            	MessageBox('Group does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_BRANCH_NOT_EXISTS'){
            	MessageBox('Branch does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_ASSET_NOT_EXISTS'){
            	MessageBox('Resources does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_ASSET_RETAIN_FAILURE_FILE_EMPTY'){
            	MessageBox('Failure of resource reservation results in empty files', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_ASSET_FETCH_FAILURE_FILE_UNAVAILABLE'){
            	MessageBox('File unavailability due to resource extraction failure', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_INVENTORY_NOT_EXISTS'){
            	MessageBox('Inventory does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_INVENTORY_GEM_TYPE_NOT_EXISTS'){
            	MessageBox('No gems type exists', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_SALES_ORDER_ALREADY_EXISTS'){
            	MessageBox('Sales order already exists', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_SALES_ORDER_ITEM_NOT_EXISTS'){
            	MessageBox('Order item does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_SALES_ORDER_STATUS_NOT_EXISTS'){
            	MessageBox('Order status does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_FACTORY_NOT_EXISTS'){
            	MessageBox('Factory does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_FACTORY_ORDER_NOT_EXISTS'){
            	MessageBox('Factory order does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_FACTORY_MATERIAL_ALREADY_RESERVED'){
            	MessageBox('Factory material alredy reserved', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_FACTORY_MATERIAL_NOT_RESERVED'){
            	MessageBox('Factory material not reserved', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_INVOICE_NOT_EXISTS'){
            	MessageBox('Invoice does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_INVOICE_IS_EXIST'){
            	MessageBox('Invoice alredy exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_INVOICE_SUPPLIER_NOT_EXISTS'){
            	MessageBox('Supplier does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_PRODUCT_NOT_EXISTS'){
            	MessageBox('Product does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_PRODUCT_CATEGORY_NOT_EXISTS'){
            	MessageBox('Product category does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_CUSTOMER_NOT_EXISTS'){
            	MessageBox('Customer does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_CUSTOMER_TYPE_NOT_EXISTS'){
            	MessageBox('Customer type does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_L_GEM_CERTIFIED_NOT_EXISTS'){
            	MessageBox('Gem certified does not exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }

            else if(err.response.data.message=='PLV_K_GEM_CERTIFIED_IS_EXISTS'){
            	MessageBox('Gem certified alredy exist', '', {
            		confirmButtonText: 'OK',
            		type: 'warning'
            	}).then(() => {
            		this.loading = false
            	}).catch(() => {
            	});
            }






            else{

							MessageBox(err.response.data.message, '', {
								confirmButtonText: 'OK',
								// cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.loading = false
								// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
							}).catch(() => {

							});

						}


						failure(res)
					}
					// alert('username 或 password錯誤')
				} else if (res.status == '403') {
					MessageBox('Access was denied', '', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {

					});
					failure(res)
					// alert('您沒有這個功能權限')
				} else {
					MessageBox('Unknown error', '', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
					}).catch(() => {

					});

					failure(res)
				}
				// window.Alert('api error, HTTP CODE: ' + res.status)
			}
		})


	// 	} else {
	// 		var ifrefreshToken = document.cookie.indexOf('refreshToken');
	// 		if (ifrefreshToken != -1) {
	// 			console.log('刷新Token')
	// 		} else {
	// 			// window.location.href('https://www.baidu.com/')
	// 			window.location.href = '../login';
	// 		}
	// 	}

}


//檢查token是否失效
function checkToken() {
	document.cookie.indexOf('accessToken')
}

function getCookie(c_name) {
	var c_end=''
	//if (true) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "="); //获取字符串的起点
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1; //获取值的起点
			c_end = document.cookie.indexOf(";", c_start); //获取结尾处
			if (c_end == -1) c_end = document.cookie.length; //如果是最后一个，结尾就是cookie字符串的结尾
			return decodeURI(document.cookie.substring(c_start, c_end)); //截取字符串返回
		}
	}
	return "";

}

// 返回在vue模板中的调用接口
export default {
	get: function(url, headers, params, success, failure) {
		return apiAxios('GET', url, headers, params, success, failure)
	},
	post: function(url, headers, params, success, failure) {
		return apiAxios('POST', url, headers, params, success, failure)
	},
	put: function(url, headers, params, success, failure) {
		return apiAxios('PUT', url, headers, params, success, failure)
	},
	delete: function(url, headers, params, success, failure) {
		return apiAxios('DELETE', url, headers, params, success, failure)
	},
	login_api: function(url, headers, params, success, failure) {
		return login_api('POST', url, headers, params, success, failure)
	},

	axios,

	root,
	getCookie:function(name){
		return getCookie(name)
	}

}
