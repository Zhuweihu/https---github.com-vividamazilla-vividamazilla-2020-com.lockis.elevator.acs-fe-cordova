<template>
  <div>
    <div
      :class="
        settings.isLightTheme
          ? [$style.navigation, $style.light]
          : $style.navigation
      "
    >
      <vue-custom-scrollbar
        :class="
          settings.isMobileView
            ? $style.scrollbarMobile
            : $style.scrollbarDesktop
        "
      >
        <a-menu
          :theme="settings.isLightTheme ? 'light' : 'dark'"
          :inlineCollapsed="withDrawer ? false : settings.isMenuCollapsed"
          :mode="'inline'"
          :selectedKeys="selectedKeys"
          :openKeys.sync="openKeys"
          @click="handleClick"
          @openChange="handleOpenChange"
        >
          <template v-for="(item, index) in menuData">
            <item
              v-if="!item.children && !item.divider"
              :menu-info="item"
              :styles="$style"
              :key="item.key"
            />
            <a-menu-divider v-if="item.divider" :key="index" />
            <sub-menu
              v-if="item.children"
              :menu-info="item"
              :styles="$style"
              :key="item.key"
            />
          </template>
        </a-menu>
      </vue-custom-scrollbar>
    </div>
  </div>
</template>

<script>
import store from "store";
import _ from "lodash";
import vueCustomScrollbar from "vue-custom-scrollbar";
import { getLeftMenuData } from "@/services/menu";
import SubMenu from "./partials/submenu";
import Item from "./partials/item";

export default {
  name: "menu-left",
  components: {
    vueCustomScrollbar,
    SubMenu,
    Item
  },
  props: {
    settings: Object,
    withDrawer: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.openKeys = store.get("app.menu.openedKeys") || [];
    this.selectedKeys = store.get("app.menu.selectedKeys") || [];
    this.setSelectedKeys();
  },
  data() {
    return {
      menuData: [],
      // menuData: getLeftMenuData,
      selectedKeys: [],
      openKeys: [],
      isAdmin: false,
      isAccounting: false,
      isSales: false,
      isMember: false,
      other_menuData: []
    };
  },
  watch: {
    "settings.isMenuCollapsed"() {
      this.openKeys = [];
    },
    $route() {
      this.setSelectedKeys();
    }
  },

  created: function() {
    this.openKeys = [
      "Inventory",
      "CRM",
      "Accounting",
      "Staffs",
      "Miscellaneous"
    ];
    this.menuData = [
      {
        icon: "el-icon-menu",
        key: "lockisWelcom",
        title: "Home",
        url: "/lockisWelcom"
      },
      // {
      //   icon: "el-icon-menu",
      //   key: "Vendor",
      //   title: "Vendor",
      //   children: [
      //     {
      //       icon: "el-icon-menu",
      //       key: "real extate",
      //       title: "Real extate",
      //       url: "/realextate",
      //     },
      //     {
      //       icon: "el-icon-menu",
      //       key: "Building",
      //       title: "Building",
      //       url: "/building",
      //     },
      //     {
      //       icon: "el-icon-menu",
      //       key: "Elevator",
      //       title: "Elevator",
      //       url: "/elevator",
      //     },
      //     {
      //       icon: "el-icon-menu",
      //       key: "ElevatorButton",
      //       title: "ElevatorButton",
      //       url: "/elevatorButton",
      //     },
      //   ],
      // },
      // {
      //   icon: "el-icon-menu",
      //   key: "filter",
      //   title: "filter",
      //   url: "/filter",
      // },

      //User Management
      {
        icon: "el-icon-user",
        key: "user management",
        title: "User Management",
        children: [
          {
            icon: "el-icon-menu",
            key: "administrator",
            title: "Administrator",
            url: "/administrator"
          },
          {
            icon: "el-icon-menu",
            key: "supplier administrator",
            title: "Supplier Administrator",
            url: "/supplierAdministrator"
          },
          {
            icon: "el-icon-menu",
            key: "supplier personnel",
            title: "Supplier Personnel",
            url: "/supplierPersonnel"
          }
        ]
      },
      //App Theme Management
      {
        icon: "iconfont icon-theme",
        key: "app theme management",
        title: "App Theme Management",
        url: "/appthemeManagement"
      },
      //Vendor Dcvice Management
      {
        icon: "el-icon-s-management",
        key: "vendor dcvice management",
        title: "Vendor Dcvice Management",
        children: [
          {
            icon: "el-icon-menu",
            key: "real estate",
            title: "Real Estate",
            url: "/realestate"
          },
          {
            icon: "el-icon-menu",
            key: "building",
            title: "Building",
            url: "/building"
          },
          {
            icon: "el-icon-menu",
            key: "elevator",
            title: "Elevator",
            url: "/elevator"
          },
          {
            icon: "el-icon-menu",
            key: "devmodel",
            title: "Devmodel",
            url: "/devmodel"
          },
          {
            icon: "el-icon-menu",
            key: "dev",
            title: "Dev",
            url: "/dev"
          },
          {
            icon: "el-icon-menu",
            key: "Machine",
            title: "Machine",
            url: "/machine"
          },
          {
            icon: "el-icon-menu",
            key: "Button",
            title: "Button",
            url: "/button"
          },
          {
            icon: "el-icon-menu",
            key: "QRcode",
            title: "QRcode",
            url: "/qrcode"
          },
          // {
          //   icon: "el-icon-menu",
          //   key: "mobile devices",
          //   title: "Mobile Devices",
          //   url: "/moblileDevices"
          // },
          // {
          //   icon: "el-icon-menu",
          //   key: "system setting",
          //   title: "System Setting",
          //   url: "/systemSetting"
          // },
          //TODO 左侧menu菜单
          // {
          //   icon: "el-icon-menu",
          //   key: "test",
          //   title: "Test",
          //   url: "/test"
          // },
          
        ]
      },
      //system Program
      {
        icon: "el-icon-s-tools",
        key: "system program",
        title: "System Program",
        url: "/systemprogram"
      }
      // {
      //   icon: "el-icon-menu",
      //   key: "Home",
      //   title: "Home",
      //   url: "/elysUserGroupActivity"
      // },
      // {
      //   icon: "el-icon-menu",
      //   key: "real extate",
      //   title: "Real extate",
      //   url: "/realextate"
      // },
      // {
      //   icon: "el-icon-menu",
      //   key: "Building",
      //   title: "Building",
      //   url: "/building"
      // },
      // {
      //   icon: "el-icon-menu",
      //   key: "Elevator",
      //   title: "Elevator",
      //   url: "/elevator"
      // }
      // {
      //   icon: "el-icon-menu",
      //   key: "elysDashboard",
      //   title: "Dashboard",
      //   url: "/elysDashboard"
      // },
      // {
      //   title: 'Purchase',
      //   key: 'Purchase',
      //   url: '/elysPurchase',
      //   icon: 'el-icon-shopping-cart-2'
      // },
      // {
      //   title: 'Order',
      //   key: 'Order',
      //   url: '/elysOrder',
      //   icon: 'el-icon-tickets'
      // },
      // {
      //   title: 'Invoice',
      //   key: 'Invoice',
      //   icon: 'el-icon-s-ticket',
      //   url:'/elysInvoice',
      // },
      // {
      //   title: 'Expense',
      //   key: 'Expense',
      //   icon: 'el-icon-coin',
      //   url:'/elysExpense',
      // },
      // {
      //   title: 'Customer',
      //   key: 'Customer',
      //   url: '/elysCustomer',
      //   icon: 'el-icon-s-custom'
      // },
      // {
      //   title: 'User Group Activity',
      //   key: 'User Group Activity',
      //   icon: 'el-icon-message',
      //   url: "/elysDashboard"
      // },
      // {
      //   title: 'User',
      //   key: 'User',
      //   icon: 'el-icon-user',
      //   children: [{
      //       title: 'User',
      //       key: 'User',
      //       url: '/elysUser',
      //       icon: 'el-icon-user',
      //     },
      //     {
      //       title: 'Group Setting',
      //       key: 'Group Setting',
      //       url: '/elysGroup',
      //       icon: 'el-icon-setting',
      //     },
      //   ],
      // },
      // {
      //   title: 'System Settings',
      //   key: 'System Settings',
      //   icon: 'el-icon-setting',
      //   children: [
      //       {
      //         title: 'Brand',
      //         key: 'Brand',
      //         icon: 'el-icon-star-off',
      //         url:'/elysBrand',
      //       },
      //       {
      //         title: 'Category',
      //         key: 'Category',
      //         icon: 'el-icon-document-copy',
      //         url:'/elysCategory',
      //       },
      //       {
      //         title: 'City',
      //         key: 'City',
      //         icon: 'el-icon-map-location',
      //         url:'/elysCity',
      //       },
      //       {
      //         title: 'Order Status',
      //         key: 'Order Status',
      //         url: '/elysOrderStatus',
      //         icon: 'el-icon-s-operation'
      //       },
      //       {
      //         title: 'Warehouse',
      //         key: 'Warehouse',
      //         icon: 'el-icon-house',
      //         url:'/elysWarehouse',
      //       },
      //   ],
      // },
    ];

    // this.$api.get("/member", null, r => {
    //   var menu = [
    //     {
    //       title: "User Group Activity",
    //       key: "User Group Activity",
    //       icon: "el-icon-message",
    //       url: "/elysUserGroupActivity"
    //     },
    //     {
    //       title: "Order",
    //       key: "Order",
    //       url: "/elysOrder",
    //       icon: "el-icon-tickets"
    //     },
    //     {
    //       title: "Purchase",
    //       key: "Purchase",
    //       url: "/elysPurchase",
    //       icon: "el-icon-shopping-cart-2"
    //     },
    //     {
    //       title: "Invoice",
    //       key: "Invoice",
    //       icon: "el-icon-s-ticket",
    //       url: "/elysInvoice"
    //     },
    //     {
    //       title: "Expense",
    //       key: "Expense",
    //       icon: "el-icon-coin",
    //       url: "/elysExpense"
    //     },
    //     {
    //       title: "Customer",
    //       key: "Customer",
    //       url: "/elysCustomer",
    //       icon: "el-icon-s-custom"
    //     },
    //     {
    //       title: "System Settings",
    //       key: "System Settings",
    //       icon: "el-icon-setting",
    //       children: [
    //         {
    //           title: "Brand",
    //           key: "Brand",
    //           icon: "el-icon-star-off",
    //           url: "/elysBrand"
    //         },
    //         {
    //           title: "Category",
    //           key: "Category",
    //           icon: "el-icon-document-copy",
    //           url: "/elysCategory"
    //         },
    //         {
    //           title: "City",
    //           key: "City",
    //           icon: "el-icon-map-location",
    //           url: "/elysCity"
    //         },
    //         {
    //           title: "Order Status",
    //           key: "Order Status",
    //           url: "/elysOrderStatus",
    //           icon: "el-icon-s-operation"
    //         },
    //         {
    //           title: "Warehouse",
    //           key: "Warehouse",
    //           icon: "el-icon-house",
    //           url: "/elysWarehouse"
    //         }
    //       ]
    //     },
    //     {
    //       title: "User Settings",
    //       key: "User Settings",
    //       icon: "el-icon-user",
    //       children: [
    //         {
    //           title: "User",
    //           key: "User",
    //           url: "/elysUser",
    //           icon: "el-icon-user"
    //         },
    //         {
    //           title: "Group Setting",
    //           key: "Group Setting",
    //           url: "/elysGroup",
    //           icon: "el-icon-setting"
    //         }
    //       ]
    //     }
    //   ];
    //   for (let i = 0; i < r.elysKUserRoleDtoList.length; i++) {
    //     if (r.elysKUserRoleDtoList[i].identity == "ADMIN") {
    //       this.isAdmin = true;
    //     } else {
    //       for (let m = 0; m < menu.length; m++) {
    //         if (menu[m].key == "System Settings") {
    //           menu.splice(m, 1);
    //         }
    //       }
    //       for (let m = 0; m < menu.length; m++) {
    //         if (menu[m].key == "User Settings") {
    //           menu.splice(m, 1);
    //         }
    //       }
    //     }
    //     if (
    //       r.elysKUserRoleDtoList[i].identity == "ADMIN" ||
    //       r.elysKUserRoleDtoList[i].identity == "STAFF"
    //     ) {
    //       if (r.elysKUserRoleDtoList[i].purchase != 1) {
    //         for (let m = 0; m < menu.length; m++) {
    //           if (menu[m].key == "Purchase") {
    //             menu.splice(m, 1);
    //           }
    //         }
    //       }
    //       if (r.elysKUserRoleDtoList[i].order != 1) {
    //         for (let m = 0; m < menu.length; m++) {
    //           if (menu[m].key == "Order") {
    //             menu.splice(m, 1);
    //           }
    //           if (menu[m].key == "Invoice") {
    //             menu.splice(m, 1);
    //           }
    //         }
    //       }
    //       if (r.elysKUserRoleDtoList[i].expense != 1) {
    //         for (let m = 0; m < menu.length; m++) {
    //           if (menu[m].key == "Expense") {
    //             menu.splice(m, 1);
    //           }
    //         }
    //       }
    //       if (r.elysKUserRoleDtoList[i].customer != 1) {
    //         for (let m = 0; m < menu.length; m++) {
    //           if (menu[m].key == "Customer") {
    //             menu.splice(m, 1);
    //           }
    //         }
    //       }
    //       if (r.elysKUserRoleDtoList[i].miscellaneous != 1) {
    //         for (let m = 0; m < menu.length; m++) {
    //           if (menu[m].key == "System Settings") {
    //             menu.splice(m, 1);
    //           }
    //         }
    //       }
    //     }
    //     this.menuData = menu;
    //   }
    // });
  },
  methods: {
    handleClick(e) {
      // console.log("e=============",e)
      if (e.key === "settings") {
        this.$store.commit("CHANGE_SETTING", {
          setting: "isSettingsOpen",
          value: true
        });
        return;
      }
      store.set("app.menu.selectedKeys", [e.key]);
      this.selectedKeys = [e.key];
    },
    handleOpenChange(openKeys) {
      console.log(openKeys);
      store.set("app.menu.openedKeys", openKeys);
      this.openKeys = openKeys;
    },
    setSelectedKeys() {
      const pathname = this.$route.path;
      const menuData = this.menuData.concat();
      const flattenItems = (items, key) =>
        items.reduce((flattenedItems, item) => {
          flattenedItems.push(item);
          if (Array.isArray(item[key])) {
            return flattenedItems.concat(flattenItems(item[key], key));
          }
          return flattenedItems;
        }, []);
      const selectedItem = _.find(flattenItems(menuData, "children"), [
        "url",
        pathname
      ]);
      this.selectedKeys = selectedItem ? [selectedItem.key] : [];
    }
  }
};
</script>

<style lang="scss" module>
@import "./style.module.scss";

</style>