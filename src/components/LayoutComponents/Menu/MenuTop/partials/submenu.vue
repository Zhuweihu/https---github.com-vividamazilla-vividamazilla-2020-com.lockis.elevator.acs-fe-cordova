<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <span :class="styles.title">aaa</span>
      <i v-if="menuInfo.icon" :class="[styles.icon, menuInfo.icon]"></i>
    </span>
    <template v-for="item in menuInfo.children">
      <item
        v-if="!item.children && !item.divider"
        :menu-info="item"
        :styles="styles"
        :key="item.key"
      />
      <sub-menu v-if="item.children" :menu-info="item" :styles="styles" :key="item.key"/>
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
import Item from './item'

export default {
  name: 'SubMenu',
  components: { Item },
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: Object,
    styles: Object,
  },
}
</script>
