<template>
    <div class="fab">
        <van-button @click="addJob" size="normal" round type="primary">
            <van-icon name="plus" />
        </van-button>
    </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        let router = useRouter();

        function addJob() {
            router.push({ name: "jobform", params: { action: 'add', id: "job" } });
        }
        return {
            addJob,
        }
    },
})
</script>


<style scoped>
.fab {
    position: fixed;
    z-index: 100;
    bottom: 63px;
    right: 20px;
    border-radius: 50%;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);

}
</style>