<template>
    <Menu :title="'About'" />
    <div class="about-content">

        <div class="version">
            <h3> 1.0.1</h3>
            <div>Version</div>
        </div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quidem eius reprehenderit natus voluptate
            fuga quod vitae, placeat suscipit magni? Id fugiat voluptates repellendus, pariatur iure, amet adipisci
            temporibus exercitationem fugit alias, labore ab cupiditate vero excepturi distinctio eos quia autem
            obcaecati ratione veniam harum tempore consequatur quod? Assumenda deleniti incidunt provident aliquid
            placeat ea nostrum consequuntur aliquam, saepe tenetur officia ad earum corporis commodi voluptatum atque
            facilis at perspiciatis sapiente sit! Distinctio voluptates dicta eveniet ab a sed itaque obcaecati vel vero
            aut architecto in doloremque officiis illum facilis deleniti, provident aperiam unde iure id? Libero rerum
            minus facere!</p>
    </div>
</template>

<script lang="ts">
import Menu from '@/element/Menu.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        Menu
    },
    setup() {

    },
})
</script>


<style scoped>
.about-content {
    padding: 20px;
    line-height: 30px;
}

.version {
    text-align: center;
}

.version div {
    color: grey;
    margin-top: -22px;
    font-size: 14px;

}
</style>