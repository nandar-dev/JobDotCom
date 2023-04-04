<template>
  <Drawer :show="showMenu" @close="onDrawerClose()" />
  <van-sticky>
    <van-nav-bar :title="title">
      <template #left>
        <van-icon @click="menuHandler" name="wap-nav" />
      </template>
    </van-nav-bar>
  </van-sticky>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Drawer from "./Drawer.vue";

export default defineComponent({
  components: {
    Drawer,
  },
  props: {
    title: {
      type: String,
    },
  },
  setup() {
    const state = reactive({
      showMenu: false,
    });

    const menuHandler = () => {
      state.showMenu = true;
    };

    const onDrawerClose = () => {
      state.showMenu = false;
    };

    return {
      ...toRefs(state),
      menuHandler,
      onDrawerClose,
    };
  },
});
</script>

<style scoped>
.van-nav-bar {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
}
</style>
