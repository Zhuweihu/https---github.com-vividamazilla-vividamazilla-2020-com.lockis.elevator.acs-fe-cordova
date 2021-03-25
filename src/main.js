
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import $ from 'jquery'
import NProgress from 'vue-nprogress'
import FirebaseAuthService from './services/firebase'
import './registerServiceWorker'
import './global.scss'
import "./assets/styles/element/index.js"
import "./assets/plugins/date.js"
// import "./assets/plugins/cxmlp-label-api.js"
import htmlToPdf from "./assets/plugins/Pdf.js"

import print from "./assets/plugins/print.js"

import "./assets/plugins/cxmlp-label-api.js"

import "./assets/styles/iconfont/iconfont.css";

// import htmlToPdf from './plugins/Pdf'
import api from './api/index.js';
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'


Vue.prototype.$api = api;
Vue.use(htmlToPdf)
Vue.use(print)

Vue.config.devtools = true

import {
  Avatar, TreeSelect, Rate, Breadcrumb, InputNumber, Steps, Message,
  Upload, Button, Layout, Table, Icon, Progress, Radio, Dropdown, Menu,
  Carousel, Input, Calendar, Badge, Slider, Form, Tooltip, Select, Switch,
  Tag, Affix, Spin, Alert, Checkbox, Tabs, Pagination, notification, Drawer,
} from 'ant-design-vue'

Vue.use(Avatar)
Vue.use(Button)
Vue.use(Rate)
Vue.use(TreeSelect)
Vue.use(Breadcrumb)
Vue.use(Layout)
Vue.use(Table)
Vue.use(Icon)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Carousel)
Vue.use(Input)
Vue.use(Calendar)
Vue.use(Badge)
Vue.use(Slider)
Vue.use(Form)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Affix)
Vue.use(Spin)
Vue.use(Alert)
Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Message)
Vue.use(Steps)
Vue.use(InputNumber)
Vue.use(Drawer)
Vue.use(Switch)
Vue.use(notification)

Vue.prototype.$notification = notification

Vue.use(NProgress)
Vue.use(FirebaseAuthService)

Vue.config.productionTip = false
// NProgress.set(0.4)


const nprogress = new NProgress({parent: 'body' })
//
// nprogress.configure({ minimum: 0.01 });
// nprogress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
// nprogress.inc(0.2)
// nprogress.set(0.5)
// console.log('-------------')
// console.log(nprogress.isStarted)
// console.log(nprogress.settings)
// var n=clamp(5,0.01,1)
// console.log(n)





			// var j=0;
			// var timer = setInterval(() => {
			//
			// 				j=j+1
			// 				console.log(nprogress.settings.trickleRate*100*j+'%------'+nprogress.status)
			//
			// }, 800);



import {
  // Pagination,
  Dialog,
  Autocomplete,
  // Dropdown,
  DropdownMenu,
  DropdownItem,
  // Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  // Input,
  // InputNumber,
  // Radio,
  RadioGroup,
  RadioButton,
  // Checkbox,
  CheckboxButton,
  CheckboxGroup,
  // Switch,
  // Select,
  Option,
  OptionGroup,
  // Button,
  ButtonGroup,
  // Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  // Tooltip,
  // Breadcrumb,
  BreadcrumbItem,
  // Form,
  FormItem,
  // Tabs,
  TabPane,
  // Tag,
  Tree,
  // Alert,
  // Slider,
  // Icon,
  Row,
  Col,
  // Upload,
  // Progress,
  // Badge,
  Card,
  // Rate,
  // Steps,
  Step,
  // Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  // Message,
  Notification,

} from 'element-ui';



// Vue.use(Avatar);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);
Vue.use(ElementUI, { locale })


Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

var timer=null

if(api.getCookie('accessToken')!=''){
			api.axios.defaults.headers.common['Authorization'] =api.getCookie('accessToken')
			// store.state.user.user = true
			// console.log('okok---')
			// console.log(store.state.user.user)
			// router.push("/purchase")
}

			// var timer = setInterval(() => {
			//     console.log(nprogress.status)
			// }, 50);


router.beforeEach((to,from,next) => {

	// window.print();

  // nprogress.start()

  // 百分比進度條
  //  var time=parseInt(window.getComputedStyle(document.querySelector('.bar')).getPropertyValue('width'))
  //  var arr = new Array;
  //  var out=0
  //  timer = setInterval(() => {
		// var a=window.getComputedStyle(document.querySelector('.bar')).getPropertyValue('transform')
  //       arr = a.split(",")
		// out=(parseInt(arr[4])+time)/time*100
		// $('.spinner').attr('data-content',parseInt(out)+'%');
		//
  //  }, 50)



  next()
})

router.afterEach(() => {
 //  nprogress.done()
 //
 //
	// setTimeout(function(){
	// 	  window.clearInterval(timer);
	// },400)





  // console.log('*02')
})




new Vue({
  router,
  store,
  nprogress,
  render: h => h(App),
}).$mount('#app')
