
<template>
    <!-- <ul class="language-child">
          <li>
            <div class="language-change" @click="changeLan('en')">
               <span>English</span>
            </div>
          </li>
          <li>
            <div class="language-change" @click="changeLan('cn')">
               <span>Chinese</span>
            </div>
          </li>
        </ul>
  {{t('jobs.message')}} -->
  <RouterView />
  <van-tabbar v-model="active">
    <van-tabbar-item @click="tabHandler('/')" icon="home-o">
      Home</van-tabbar-item>

    <van-tabbar-item @click="tabHandler('/about')" icon="info">
      About</van-tabbar-item>
  </van-tabbar>

</template>



<script lang="ts">
import { ref } from "vue";
import { useRouter, RouterView, RouterLink } from "vue-router";
import type RoutTerm from "./types/RouteTerm";
import { useI18n } from "vue-i18n";
import { changeLang } from "@/locales/i18n.js";
export default {
  components: {
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter()
    const active = ref(0);
    const icon = {
      active: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png',
      inactive:
        'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png',
    };
    function tabHandler(val: RoutTerm) {
      router.push(val)
    }
    const changeLan = (lan: any) => {
        if (lan == "en") {
           changeLang("en");
        } else {
           changeLang("cn");
        }
      };
    return {
      changeLan,
      t,
      icon,
      active,
      tabHandler
    };
  }
}




</script>

<style scoped>

</style>