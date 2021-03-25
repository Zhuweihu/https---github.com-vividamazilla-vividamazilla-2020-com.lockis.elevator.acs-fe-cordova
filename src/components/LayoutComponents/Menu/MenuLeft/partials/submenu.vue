<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners" >
    <span slot="title">
      <i v-if="menuInfo.icon" :class="[styles.icon, menuInfo.icon]"></i>
      <span :class="styles.title">{{ menuInfo.title }}</span>
    </span>
    <template v-for="(item, index) in menuInfo.children" style="color:#fff;">
      <item
        v-if="!item.children && !item.divider"
        :menu-info="item"
        :styles="styles"
        :key="item.key"
        submeauitem="submeauitem"
      />
      <a-menu-divider v-if="item.divider" :key="index"/>
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
