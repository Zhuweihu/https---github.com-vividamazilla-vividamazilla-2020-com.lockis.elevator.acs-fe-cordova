<template>
  <div :class="$style.topbar">

		<div style="width: 100%;">

				<div  style="text-align: center;">

				  <div :class="$style.logoContainer">
            <!-- TODO logo -->
            <div style="text-align: center;font-size: 20px;">
              <!-- <span>Elysees Shop - ERP</span> -->
            </div>
						<!--  v-if="!settings.isMenuCollapsed || withDrawer" -->
				    <img
							 style="max-height: 40px;"
				       src="resources/images/lockis_logo.png"
				       alt
				     >
						 <!-- v-if="settings.isMenuCollapsed && !withDrawer" -->
				     <!-- <img

				       src="resources/images/image_logo.png"
				       alt
				     > -->
				   </div>
				 </div>

		</div>
   <!-- <div class="mr-4">
      <cui-issues-history/>
    </div>
    <div class="mr-4">
      <cui-project-management/>
    </div>
    <div class="mr-auto">
      <cui-live-search/>
    </div> -->



<!--   <a
      href="https://themeforest.net/item/clean-ui-vue-pro-vue-vuex-admin-template/23474274"
      target="_blank"
      rel="noopener noreferrer"
      class="mr-4 d-none d-sm-inline"
    >
      <a-button type="danger">Buy Now $24</a-button>
    </a> -->
   <div class="mr-4">
      <cui-bitcoin-price/>
    </div>
    <div class="mr-4">
      <cui-language-selector/>
    </div>
   <!-- <div class="mr-4">
      <cui-home-menu/>
    </div> -->
    <cui-profile-menu/>
  </div>
</template>

<script>
import CuiIssuesHistory from '@/components/LayoutComponents/Topbar/IssuesHistory'
import CuiProjectManagement from '@/components/LayoutComponents/Topbar/ProjectManagement'
import CuiLiveSearch from '@/components/LayoutComponents/Topbar/LiveSearch'
import CuiBitcoinPrice from '@/components/LayoutComponents/Topbar/BitcoinPrice'
import CuiLanguageSelector from '@/components/LayoutComponents/Topbar/LanguageSelector'
import CuiHomeMenu from '@/components/LayoutComponents/Topbar/HomeMenu'
import CuiProfileMenu from '@/components/LayoutComponents/Topbar/ProfileMenu'

export default {
  components: {
    CuiIssuesHistory,
    CuiProjectManagement,
    CuiLiveSearch,
    CuiBitcoinPrice,
    CuiLanguageSelector,
    CuiHomeMenu,
    CuiProfileMenu,
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
