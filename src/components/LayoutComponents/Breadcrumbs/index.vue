<template>
  <div :class="$style.breadcrumbs">
    <div :class="$style.path">
      <div class=" mr fl" style="margin-right:2rem;">
        <router-link to="/" class="text-muted">Home</router-link>
      </div>
      <!-- <div class=" mr fl" style="margin-right:2rem;">
        <router-link to="/realextate" class="text-muted">Real extate</router-link>
      </div>
      <div class=" mr fl" style="margin-right:2rem;">
        <router-link to="/building" class="text-muted">Building</router-link>
      </div>
      <div class=" mr fl" style="margin-right:2rem;">
        <router-link to="/elevator" class="text-muted">Elevator</router-link>
      </div> -->
      <!-- TODO 面包屑 -->
      <template v-for="(item, index) in breadcrumb">
        <span v-if="index != 0" :key="index">
          <span :class="$style.arrow" class="text-muted"></span>
          <strong class="text-muted font-weight-normal">{{item.title}}</strong>
        </span>
      </template>
      <span v-if="activeItem">
        <span :class="$style.arrow"></span>
        <strong :class="$style.color">{{activeItem.title}}</strong>
      </span>
    </div>
  </div>
</template>

<script>
import { getLeftMenuData, getTopMenuData } from '@/services/menu'
import { reduce } from 'lodash'

export default {
  name: 'breadcrumbs',
  data() {
    return {
      breadcrumb: [],
      activeItem: {},
      path: [],
    }
  },
  props: {
    settings: Object,
  },
  computed: {
    menuData() {
      return this.settings.isMenuTop ? getTopMenuData : getLeftMenuData
    },
  },
  methods: {
    getPath(data, url, parents = []) {
      if (url === '/') {
        url = '/dashboard/alpha'
      }
      const items = reduce(
        data,
        (result, entry) => {
          // console.log("result",result)
          // console.log("result.length",result.length)
          // console.log("entry",entry)
          // console.log("entry.children---------------------",entry.children)
          if (result.length) {
            return result
            
          }
          if (entry.children) {
            const nested = this.getPath(entry.children, url, [entry].concat(parents))
            return (result || []).concat(nested.filter(e => !!e))
          }
          if (entry.url === url) {
            return [entry].concat(parents)
          }
          return result
        },
        [],
      )
      
        this.activeItem = items[0]
      
      
      // console.log("items=======================",items)
      return items
    },
  },
  mounted: function () {
    this.breadcrumb = this.getPath(this.menuData, this.$route.path)
    console.log("this.menuData",this.menuData)
    // console.log("this.$route.path",this.$route.path)
    // console.log("this.getPath(this.menuData, this.$route.path)",this.getPath(this.menuData, this.$route.path))
  },
  watch: {
    $route(to) {
      this.breadcrumb = this.getPath(this.menuData, to.path)
      // console.log("to.path",to.path)
      // console.log("$route -> this.breadcrumb[0].title", this.breadcrumb[0].title == 'Home')

      // console.log("this.menuData2",this.menuData)
      // console.log("this.getPath(this.menuData, this.$route.path)",this.getPath(this.menuData, this.$route.path))

    },
  },
}
</script>

<style lang="scss" module>

@import "./style.module.scss";
</style>
