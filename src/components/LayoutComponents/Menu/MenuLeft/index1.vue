<template>
  <div>
    <!-- <div :class="$style.logo" style="background: rgb(198,220,218);">

     <div :class="$style.logoContainer">
       <img
          v-if="!settings.isMenuCollapsed || withDrawer"
          src="resources/images/all_logo.png"
          alt
        >
        <img
          v-if="settings.isMenuCollapsed && !withDrawer"
          src="resources/images/image_logo.png"
          alt
        >
      </div>
    </div> -->
    <div :class="settings.isLightTheme ? [$style.navigation, $style.light] : $style.navigation">
      <vue-custom-scrollbar :class="settings.isMobileView ? $style.scrollbarMobile : $style.scrollbarDesktop">
        <a-menu :theme="settings.isLightTheme ? 'light' : 'dark'" :inlineCollapsed="withDrawer ? false : settings.isMenuCollapsed"
                :mode="'inline'" :selectedKeys="selectedKeys" :openKeys.sync="openKeys" @click="handleClick" @openChange="handleOpenChange">
          <!-- <a-menu-item :key="'settings'">
            <span>
              <span :class="$style.title">Settings</span>
              <i :class="[$style.icon, 'icmn icmn-cog']"></i>
            </span>
          </a-menu-item> -->
          <!-- <a-menu-item :key="'docs'">
            <a href="https://docs.cleanuitemplate.com" target="_blank">
              <span :class="$style.title">Documentation</span>
              <i :class="[$style.icon, 'icmn icmn-books']"></i>
            </a>
          </a-menu-item> -->
          <!-- <a-menu-divider/> -->
          <template v-for="(item, index) in menuData">
            <item v-if="!item.children && !item.divider" :menu-info="item" :styles="$style" :key="item.key" />
            <a-menu-divider v-if="item.divider" :key="index" />
            <sub-menu v-if="item.children" :menu-info="item" :styles="$style" :key="item.key" />
          </template>
        </a-menu>
        <!-- <div :class="$style.buyPro">
          <p>
            <strong>More components, more styles, more themes, and premium support!</strong>
          </p>
          <a
            href="https://themeforest.net/item/clean-ui-vue-pro-vue-vuex-admin-template/23474274"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-sm btn-danger"
          >Buy Pro 24$</a>
        </div> -->
      </vue-custom-scrollbar>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import _ from 'lodash'
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import {
    getLeftMenuData
  } from '@/services/menu'
  import SubMenu from './partials/submenu'
  import Item from './partials/item'

  export default {
    name: 'menu-left',
    components: {
      vueCustomScrollbar,
      SubMenu,
      Item
    },
    props: {
      settings: Object,
      withDrawer: {
        type: Boolean,
        default: false,
      },
    },
    mounted() {
      this.openKeys = store.get('app.menu.openedKeys') || []
      this.selectedKeys = store.get('app.menu.selectedKeys') || []
      this.setSelectedKeys()
    },
    data() {
      return {
        menuData: getLeftMenuData,
        // create_menuData:getLeftMenuData,
        selectedKeys: [],
        openKeys: [],
        isAdmin: false,
        isAccounting: false,
        isSales: false,
        isMember:false,
        other_menuData: []
      }
    },
    watch: {
      'settings.isMenuCollapsed'() {
        this.openKeys = []
      },
      '$route'() {
        this.setSelectedKeys()
      },
    },

    created: function() {




      this.openKeys = [
        "Inventory",
        "CRM",
        "Accounting",
        "Staffs",
        "Miscellaneous"
        // "Function",
        // "System",
        // "purchase",
        // "productManagement",
        // "CustomersManagement",
        // "Permissions Management"
      ]

      this.menuData = [

        {
          icon: "el-icon-menu",
          key: "Dashboard",
          title: "Dashboard",
          url: "/Dashboard"
        },
        {
          title: 'Sales Order',
          key: 'Sales Order',
          icon: 'el-icon-s-order',
          children: [{
            title: 'Sales',
            key: 'Sales',
            url: '/CustomerOrderManagement',
            icon: 'el-icon-sell',

          },
            {
              title: 'Maintenance Order',
              key: 'Maintenance Order',
              url: '/CustomerOrderManagement_Maintenance',
              icon: 'el-icon-box',

            },
            {
              title: 'Coupon Setting',
              key: 'Coupon Setting',
              url: '/CardTicketInformation',
              icon: 'el-icon-s-ticket',
            },


          ],
        },

        {
          title: 'Factory Order',
          key: 'Factory Order',
          icon: 'el-icon-s-home',
          children: [

            {
              title: 'Orders',
              key: 'Orders',
              url: '/factoryManagement',
              icon: 'el-icon-tickets',
            },
            {
              title: 'Factory Setting',
              key: 'Factory Setting',
              url: '/factoryList',
              icon: 'el-icon-set-up'
            },

          ]

        },

        {
          title: 'Inventory',
          key: 'Inventory',
          icon: 'el-icon-house',

          children: [

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

          ],

        },

        {
          title: 'CRM',
          key: 'CRM',
          icon: 'el-icon-s-custom',

          children: [

            {
              title: 'Customer Data',
              key: 'Customer Data',
              url: '/CustomersManagement',
              icon: 'el-icon-user-solid',
            },

            {
              title: 'Customer Tier',
              key: 'Customer Tier',
              url: '/Kehu_Customer',
              icon: 'el-icon-sort',
            },

            {
              title: 'Conversations',
              key: 'Conversations',
              url: '/Communicationlogs',
              icon: 'el-icon-chat-line-round',
            },


          ],
        },

        {
          title: 'Accounting',
          key: 'Accounting',
          icon: 'el-icon-sell',
          children: [

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

          ],
        },

        {
          title: 'Staffs',
          key: 'Staffs',
          icon: 'el-icon-user',
          children: [

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

          ],
        },

        {
          title: 'Branch',
          key: 'Branch',
          url: '/branchManagement',
          icon: 'el-icon-s-shop'
        },

        {
          title: 'Miscellaneous',
          key: 'Miscellaneous',
          icon: 'el-icon-warning',
          children: [

            {
              title: 'Order Status Setting',
              key: 'Order Status Setting',
              url: '/orderstatusManagement',
              icon: 'el-icon-set-up'
            },

            {
              title: 'Material Setting',
              key: 'Material Setting',
              url: '/materialManagement',
              icon: 'el-icon-set-up'
            },

            {
              title: 'Material Color Setting',
              key: 'Material Color Setting',
              url: '/materialManagement_Color',
              icon: 'el-icon-set-up'
            },

            {
              title: 'Payment Method Setting',
              key: 'Payment Method Setting',
              url: '/materialManagement_PaymentMethod',
              icon: 'el-icon-set-up'
            },




            {
              title: 'Crash Reports',
              key: 'errorManagement',
              url: '/errorManagement',
              icon: 'el-icon-warning'
            },

          ],
        },


      ]


      this.$api.get('/member', null, r => {
        // this.menuData.splice(0, 1)

        for (let i = 0; i < r.plvKMemberRoleDtoList.length; i++) {

          if (r.plvKMemberRoleDtoList[i].identity == 'ADMIN') {
            this.isAdmin = true
            // this.other_menuData=this.menuData
            // this.menuData=this.other_menuData
            // break;
          }

          // ACCOUNTING
          // SALES
          // ADMIN
          // PURCHASING
          // MEMBER


        }


        if (!this.isAdmin) {

          for (let i = 0; i < r.plvKMemberRoleDtoList.length; i++) {
            if (r.plvKMemberRoleDtoList[i].identity == 'ACCOUNTING') {
              this.isAccounting = true
            }

          }

        }


        if (this.isAccounting) {
          this.other_menuData = this.menuData
          // this.other_menuData.splice(4, 1)
          this.other_menuData.splice(6, 1)
          this.other_menuData.splice(6, 1)
          this.other_menuData.splice(6, 1)
          this.other_menuData.splice(4, 1)
          this.other_menuData.splice(2, 1)
          this.other_menuData.splice(1, 1)
          this.menuData = this.other_menuData
        } else if (!this.isAdmin) {
          for (let i = 0; i < r.plvKMemberRoleDtoList.length; i++) {

            if (r.plvKMemberRoleDtoList[i].identity == 'SALES') {
              this.isSales = true
            }

          }
        }

        if (this.isSales) {
          this.other_menuData = this.menuData
          this.other_menuData.splice(5, 1)
          this.other_menuData.splice(5, 1)

          this.other_menuData[6].children.splice(1, 1)
          this.other_menuData[6].children.splice(1, 1)

          // this.other_menuData.splice(6, 1)
          // this.other_menuData.splice(6, 1)
          // this.other_menuData.splice(6, 1)

          this.menuData = this.other_menuData
        }

//         else if (!this.isMember) {
//           for (let i = 0; i < r.plvKMemberRoleDtoList.length; i++) {
//
//             if (r.plvKMemberRoleDtoList[i].identity == 'SALES') {
//               this.isSales = true
//             }
//
//           }
//         }


        // this.tableData2 = r.content

        // ACCOUNTING
        // SALES
        // ADMIN
        // PURCHASING
        // MEMBER


      });



    },


    methods: {
      handleClick(e) {
        if (e.key === 'settings') {
          this.$store.commit('CHANGE_SETTING', {
            setting: 'isSettingsOpen',
            value: true
          })
          return
        }
        store.set('app.menu.selectedKeys', [e.key])
        this.selectedKeys = [e.key]
      },
      handleOpenChange(openKeys) {
        store.set('app.menu.openedKeys', openKeys)
        this.openKeys = openKeys
      },
      setSelectedKeys() {
        const pathname = this.$route.path
        const menuData = this.menuData.concat()
        const flattenItems = (items, key) =>
          items.reduce((flattenedItems, item) => {
            flattenedItems.push(item)
            if (Array.isArray(item[key])) {
              return flattenedItems.concat(flattenItems(item[key], key))
            }
            return flattenedItems
          }, [])
        const selectedItem = _.find(flattenItems(menuData, 'children'), [
          'url',
          pathname,
        ])
        this.selectedKeys = selectedItem ? [selectedItem.key] : []
      },
    },
  }
</script>

<style lang="scss" module>
  @import "./style.module.scss";
</style>
