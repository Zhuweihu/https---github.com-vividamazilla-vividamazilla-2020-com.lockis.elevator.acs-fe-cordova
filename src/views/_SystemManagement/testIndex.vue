<template>
  <div class="demo-fit">
    <el-row>
      <el-col :span="3" v-for="item in fits"  style='cursor: pointer;min-width: 200px;'>

        <div style='white-space: nowrap;background: white;width: 180px;height: 120px;text-align: center;margin-top: 20px;' @click='to_url(item.url)'>
          <i :class="item.icon" style="font-size: 40px;line-height: 80px"></i>
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
            title:'User',
            key:'User',
            url:'/testUser',
            icon:'el-icon-user',
          },

          {
            title:'Gruop Setting',
            key:'Group Setting',
            // url:'',
            icon:'el-icon-s-platform',
          },

          {
            title:'User Gruop Setting',
            key:'User Group Setting',
            url:'',
            icon:'el-icon-present',
          },

          {
            title:'Country',
            key:'Country',
            url:'',
            icon:'el-icon-map-location',
          },

          {
            title:'Category',
            key:'Cartegory',
            url:'',
            icon:'el-icon-document-copy',
          },

          {
            title:'Brand',
            key:'Brand',
            url:'',
            icon:'el-icon-office-building',
          },

          {
            title:'Warehouse',
            key:'Warehouse',
            url:'',
            icon:'el-icon-house',
          },

          {
            title:'Cutsomer',
            key:'Customer',
            url:'',
            icon:'el-icon-s-custom',
          },

          {
            title:'Product',
            key:'Product',
            url:'',
            icon:'el-icon-box',
          },

          {
            title:'Purchase',
            key:'Purchase',
            url:'',
            icon:'el-icon-shopping-cart-2',
          },

          {
            title:'Purchase Receipt',
            key:'Purchase Receipt',
            url:'',
            icon:'el-icon-document',
          },

          {
            title:'Warehouse Purchase',
            key:'Warehouse Purchase',
            url:'',
            icon:'el-icon-shopping-bag-2',
          },

          {
            title:'Order',
            key:'Order',
            url:'',
            icon:'el-icon-tickets',
          },

          {
            title:'Order Shipping Method',
            key:'Order Shipping Method',
            url:'',
            icon:'el-icon-truck',
          },

          {
            title:'Order Status',
            key:'Order Status',
            url:'',
            icon:'el-icon-s-operation',
          },

          {
            title:'Invoice',
            key:'Invoice',
            url:'',
            icon:'el-icon-s-ticket',
          },

          {
            title:'Expense',
            key:'Expense',
            url:'',
            icon:'el-icon-coin',
          },



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
        //this.$api.axios.defaults.headers.common['Authorization'] = 'Basic ODcyMmJmOWMtZTZjZi0xMWU1LTk2NTAtMDAwYzI5NTIyZGNhOmRmYTQ0MzhiLWU2ZTctMTFlNS05NjUwLTAwMGMyOTUyMmRjYQ=='

        this.$api.axios.defaults.headers.common['Authorization'] = 'Basic MzZkMTI5NGMtNGNkYi0xMWVhLTgwYWYtZjQ1Yzg5OGU2N2IxOjNmYThjYWZjLTRjZGItMTFlYS04MGFmLWY0NWM4OTJlNTdiMQ=='

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
