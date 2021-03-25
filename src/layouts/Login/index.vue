<template>
  <a-layout>
    <a-layout-content>
      <div
        :class="[$style.layout, backgroundEnabled ? $style.light : '']"
        :style="{backgroundImage: backgroundEnabled ? `url(\'resources/images/photos/${backgroundNumber}.jpeg\')` : 'none'}"
      >
        <div :class="$style.header">
          <div :class="$style.logo">
            <router-link to="/">
              <!-- <img
                v-if="!backgroundEnabled"
                src="resources/images/logo.png"
                alt="Clean UI Admin Template"
              > -->
              <!-- <img
                v-if="backgroundEnabled"
                src="resources/images/logo-inverse.png"
                alt="Clean UI Admin Template"
              > -->
            </router-link>
          </div>
          <div :class="$style.controls">
            <div class="d-inline-block mr-3">
              <!-- <a-button type="default" @click="changeBackground">Change Background</a-button> -->
            </div>
            <div class="d-inline-block">
              <!-- <a-button type="default" @click="toggleBackground">Toggle Background</a-button> -->
            </div>
          </div>
          <nav :class="$style.navigation">
            <ul :class="$style.navigationItems">
              <li>
                <!-- <a href="javascript: void(0);"></a> -->
              </li>
              <li>
                <a :class="$style.navigationActive" href="javascript: void(0);"></a>
              </li>
              <li>
                <a href="javascript: void(0);"></a>
              </li>
              <li>
                <a href="javascript: void(0);"></a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- TODO 登录组件路由出口 -->
        <div :class="$style.content">
          <router-view/>
        </div>
				
				
				<!-- 登錄頁footer -->
        <div :class="[$style.footer, 'text-center']">
          <ul class="list-unstyled list-inline mb-3">
            <li class="list-inline-item">
              <a href="javascript: void(0);"></a>
            </li>
            <li class="active list-inline-item">
              <a href="javascript: void(0);"></a>
            </li>
            <li class="list-inline-item">
              <a href="javascript: void(0);"></a>
            </li>
            <li class="list-inline-item">
              <a href="javascript: void(0);"></a>
            </li>
            <li class="list-inline-item">
              <a href="javascript: void(0);"></a>
            </li>
          </ul>
          <p></p>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
  data: function () {
    return {
      backgroundEnabled: false,
      backgroundNumber: 1,
    }
  },
  methods: {
    changeBackground() {
      this.backgroundEnabled = true
      if (this.backgroundNumber === 5) {
        this.backgroundNumber = 1
      } else {
        this.backgroundNumber += 1
      }
    },
    toggleBackground() {
      this.backgroundEnabled = !this.backgroundEnabled
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
