<template>
    <van-popup v-model:show="showMenu" position="left" :style="{ height: '100%', width: '60%' }" />
    <van-sticky>
        <van-nav-bar :title="title">
            <template #left>
                <van-icon @click="menuHandler" name="wap-nav" />
            </template>
        </van-nav-bar>
    </van-sticky>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
        }
    },
    setup() {
        const state = reactive({
            showMenu: false
        });

        const menuHandler = () => {
            state.showMenu = true
        }

        return {
            ...toRefs(state),
            menuHandler
        }
    },
})
</script>

<style scoped>
.van-nav-bar{
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
}
</style>
