// import "./cxmlp-label-api.js"

var ERR_KIND = {
  				TIMEOUT: 1,
  				PRINTERCHECK : 2,
  				PRINT : 3,
  				PRINTERSTATUS : 4
  			};

  			/*** global ***/
  			var startTime;		// timer
  			var currentTime;



BarCode.prototype = {

  /*** Kind of error ***/


        test:function(){

          console.log('test')

        }



}



// sampleSinglePrint

const MyPlugin = {}
MyPlugin.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$BarCode = BarCode
};
export default MyPlugin
