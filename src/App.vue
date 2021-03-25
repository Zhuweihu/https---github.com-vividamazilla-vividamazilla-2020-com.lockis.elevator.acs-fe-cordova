<template>
  <div id="app">

		<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <!-- TODO 页面路由出口 MainLayout，LogonLayout -->
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',

  //test
	// // created: function() {
	//
	//
	// 	// if(this.$api.getCookie('accessToken')!=''){
	//
	// 		// this.$api.axios.defaults.headers.common['Authorization'] =this.$api.getCookie('accessToken')
	// 		// store.state.user.user = true
	// 		// this.$router.push("/purchase")
	// 	// }
	//
	// // },

	created: function() {
    document.title='Lockis'
    window.less.modifyVars({
        // '@primary-color': '#6839c9',
        // '@link-color': '#6839c9',
        // '@btn-primary-bg': '#6839c9',
        // '@layout-header-background': '#1766a8'
        // '@component-background': this.color
      })

	},

  computed: {
    ...mapGetters(['user']),
    nextRoute() {
      return this.$route.query.redirect || '/'
      

    },
  },
  watch: {


    user(auth) {
		// this.$router.replace(this.nextRoute)
    },
    '$route'(to, from) {
      // const query = Object.assign({}, to.query)
      // this.$store.commit('SETUP_URL_SETTINGS', query)


    },

  },
}
</script>
<!-- <script type="text/javascript" src="./assets/plugins/cxmlp-label-api.js"></script> -->
