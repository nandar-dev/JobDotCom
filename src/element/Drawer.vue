<template>
  <van-popup
    @close="onClose"
    v-model:show="show"
    position="left"
    :style="{ height: '100%', width: '60%' }">
    <div class="content">
      <div class="img-content">
        <img src="./../assets/logo.png" alt="" />

        <p>Version 1.0.1</p>
      </div>

      <div class="list">
        <ul>
          <li @click="goRoute('/')">Home</li>
          <li @click="goRoute('/about')">About</li>
        </ul>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import router from '@/router';
import { useRouter } from 'vue-router';
export default {
  props: {
    show: {
      type: Boolean,
    },
  },
  emits: ["close"],

  setup(context, emits) {
    const onClose = () => {
      emits.emit("close");
    };

    const goRoute = (name: any)=>{
        router.push(name)
    }

    return {
      onClose,
      goRoute,
    };
  },
};
</script>

<style lang="scss" scoped>
$imageWidth: 100px;
.content {
  padding: 10px;

  .img-content {
    width: $imageWidth;
    margin: auto;

    img {
      width: $imageWidth;
    }
  }

  .list {
    ul {
      li {
        padding: 20px 0;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          bottom: 10px;
          width: 100%;
          height: 1px;
          background: gainsboro;
        }
      }
    }
  }
}
</style>
