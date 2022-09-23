<template>
    <Menu :title="'Home'" />

    <van-search v-model="search" placeholder="Search jobs here" :clearable="false" />

    <div class="sort">
        <van-button round size="mini" :plain="order != 'title'" type="primary" @click="handleClick('title')">Order
            by
            title</van-button>
        &nbsp;
        <van-button round size="mini" :plain="order != 'salary'" type="primary" @click="handleClick('salary')">Order
            by
            salary</van-button>
        &nbsp;
        <van-button round size="mini" :plain="order != 'location'" type="primary" @click="handleClick('location')">
            Order
            by location
        </van-button>
    </div>


    <van-pull-refresh v-model="refreshing" @refresh="fetchJobs">
        <van-list style="margin-bottom: 70px;" v-model:loading="loading" :finished="finished"
            :loading-text="loadingtext" @load="fetchJobs">
            <transition-group name="job-list">
                <div v-for="item in filterSearch" :key="item.id">
                    <van-swipe-cell>
                        <van-card @click.stop="goJobForm(item,'update')" :title="item.title" :desc="item.location"
                            :price="item.salary">

                            <template #footer>
                                <van-button plain round size="small" type="primary"
                                    @click.stop="goJobForm(item, 'viewdetails')">
                                    View Details
                                </van-button>
                                &nbsp;
                                <van-button @click.stop="easyApply" size="small" round type="success">Easy Apply
                                </van-button>
                            </template>
                        </van-card>
                        <template #right>
                            <van-button @click.stop="deleteJob(item.id)" square text="Delete" type="danger"
                                class="delete-button" />
                        </template>
                    </van-swipe-cell>
                </div>
            </transition-group>
        </van-list>
    </van-pull-refresh>


    <div v-show="filterSearch.length == 0 && !loading">
        <van-empty image="search" description="No Records Found" />
    </div>

    <div v-show="jobList.length == 0 && !loading">
        <van-empty image="network" description="No Data" />
    </div>

    <Fab />
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive, toRefs, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
import { Notify, Toast, Dialog } from 'vant';
import type Job from '../types/Job';
import type OrderTerm from '../types/OrderTerm';
import Fab from "../element/Fab.vue";
import Menu from "@/element/Menu.vue";

export default defineComponent({
    components: {
        Fab,
        Menu
    },
    setup() {
        let router = useRouter();
        const search = ref("");
        const state = reactive({
            loadingtext: "Please Wait",
            jobList: [] as Job[],
            loading: false,
            finished: false,
            refreshing: false,
            order: "title" as OrderTerm,
            showMenu: false

        })

        onMounted(() => {
            // fetchJobs();
        })

        const filterSearch = computed(() => {
            return [...state.jobList].filter((val) => {
                return !search.value || val.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
            })
        })

        function fetchJobs() {
            state.loading = true
            axios.get(import.meta.env.VITE_API_URL + "/jobs").then((res) => {
                state.finished = true
                state.loading = false
                state.refreshing = false
                if (res.status == 200) {
                    state.jobList = res.data;
                    handleClick('title'); // default sort with title
                } else {
                    Notify({ type: 'warning', message: res.status + "Something went wrong!" });

                }
            }).catch((err) => {
                state.loading = false
                state.refreshing = false
                Notify({ type: 'warning', message: err.message });
            })
        }

        function goJobForm(item: any, actiontype: any) {
            router.push({ name: "jobform", params: { action: actiontype, id: item.id } });
        }

        const handleClick = (term: OrderTerm) => {
            state.order = term;
            state.jobList = [...state.jobList].sort((a: Job, b: Job) => {
                return a[state.order] > b[state.order] ? 1 : -1
            })

        }

        const deleteJob = (id: any) => {

            Dialog.confirm({
                title: 'Delete?',
                message: 'This record will be deleted permanently.',
                cancelButtonText: "Cancel",
                confirmButtonText: "Confirm",

            })
                .then(() => {
                    state.finished = false
                    state.loading = true
                    state.refreshing = true
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    axios.delete(import.meta.env.VITE_API_URL + "/jobs/" + id).then((res) => {
                        state.finished = true
                        state.loading = false
                        state.refreshing = false
                        if (res.status == 200) {
                            Notify({ type: 'success', message: "Delete job successfully." });
                            let sliceArray = state.jobList.filter((t) => {
                                return t.id != id
                            })
                            state.jobList = sliceArray;
                        } else {
                            Notify({ type: 'warning', message: res.status + "Something went wrong!" });
                        }
                    }).catch((err) => {
                        Notify({ type: 'warning', message: err.message });
                    })
                })
                .catch(() => {
                    // on cancel
                });
        }
        const easyApply = () => {
            Toast({
                message: "You aren't qualified for this job 😂",
                position: 'top',
            });

        }


        return {
            ...toRefs(state),
            fetchJobs,
            search,
            filterSearch,
            handleClick,
            goJobForm,
            deleteJob,
            easyApply
        }
    },
})
</script>

<style lang="scss" scoped>
.van-card {
    margin: 10px 10px 20px 10px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    /* border-top-left-radius: 10px;
    border-bottom-left-radius: 10px; */
}

.sort {
    padding: 10px 10px 0 10px;
}

.job-list-move {
    transition: all 500ms;
}

.delete-button {
    height: 153px;
    /* border-radius: 10px; */
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>