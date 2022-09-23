<template>
    <van-sticky>
        <van-nav-bar v-if="$route.params.action == 'viewdetails'" :title="title" left-text="Back" left-arrow
            @click-left="onClickLeft">
        </van-nav-bar>
        <van-nav-bar v-else :title="title" left-text="Back" left-arrow @click-left="onClickLeft">

            <template #right>
                <div style="font-size: 20px;">

                    <van-icon v-if="true" name="success" @click="submitJob" />
                </div>
            </template>
        </van-nav-bar>
    </van-sticky>

    <div class="form-content">
        <van-cell-group inset>
            <van-field :readonly="$route.params.action == 'viewdetails'" v-model="jobTitle" label="Title"
                placeholder="Job Title" />
            <van-field :readonly="$route.params.action == 'viewdetails'" v-model="description" label="Description"
                type="textarea" placeholder="Description" rows="3" autosize />
            <van-field :readonly="$route.params.action == 'viewdetails'" v-model="salary" type="number" label="Salary"
                placeholder="Salary" />
            <van-field :readonly="$route.params.action == 'viewdetails'" v-model="location" label="Location"
                placeholder="Location" />
        </van-cell-group>
    </div>

</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { Notify, Toast } from 'vant';

export default defineComponent({

    setup() {
        const router = useRouter()
        const route = useRoute()
        const state = reactive({
            title: "",
            jobId: "",
            jobTitle: "",
            description: "",
            salary: "",
            location: ""
        });

        onMounted(() => {
            if (route.params.action == 'add') {
                state.title = "Add Job"
            } else if (route.params.action == 'update') {
                state.title = "Update Job"
                fetchJobsByID(route.params.id)
            } else if (route.params.action == 'viewdetails') {
                state.title = "View Details"
                fetchJobsByID(route.params.id)
            }
        })

        function fetchJobsByID(id: any) {
            Toast.loading({
                duration: 0,
                forbidClick: true,
                loadingType: 'spinner',
                message: 'Please wait',
            });
            axios.get(import.meta.env.VITE_API_URL + "/jobs/" + id).then((res) => {
                Toast.clear()
                if (res.status == 200) {
                    let data = res.data;
                    state.jobId = data.id;
                    state.jobTitle = data.title;
                    state.description = data.description;
                    state.salary = data.salary;
                    state.location = data.location;
                } else {
                    Notify({ type: 'warning', message: res.status + "Something went wrong!" });

                }
            }).catch((err) => {
                Notify({ type: 'warning', message: err.message });
            })
        }

        function onClickLeft() {
            router.push("/");
        }
        function submitJob() {

            if (state.title != "" && state.salary != "" && state.location != "") {


                Toast.loading({
                    duration: 0,
                    forbidClick: true,
                    loadingType: 'spinner',
                    message: 'Please wait',
                });

                const data = {
                    "id": route.params.action == 'add' ? Math.floor(Math.random() * 1000000000).toString()
                        : state.jobId,
                    "title": state.jobTitle,
                    "description": state.description,
                    "salary": state.salary,
                    "location": state.location
                }

                if (route.params.action == 'add') {
                    axios.post(import.meta.env.VITE_API_URL + "/jobs", data).then((res) => {
                        Toast.clear()
                        if (res.status == 201) {
                            Notify({ type: 'success', message: "Added new job successfully." });
                            router.push("/");
                        } else {
                            Notify({ type: 'warning', message: res.status + "Something went wrong!" });

                        }
                    }).catch((err) => {
                        Notify({ type: 'warning', message: err.message });
                    })
                } else {
                    axios.put(import.meta.env.VITE_API_URL + "/jobs/" + state.jobId, data).then((res) => {
                        Toast.clear()
                        if (res.status == 200) {
                            Notify({ type: 'success', message: "Updated job successfully." });
                            router.push("/");
                        } else {
                            Notify({ type: 'warning', message: res.status + "Something went wrong!" });

                        }
                    }).catch((err) => {
                        Notify({ type: 'warning', message: err.message });
                    })
                }

            } else {
                Notify({ type: 'warning', message: "Please fill all required fields." });
            }

        }
        return {
            ...toRefs(state),
            onClickLeft,
            submitJob,
            fetchJobsByID
        }
    },
})
</script>

<style>
.form-content {
    margin-top: 20px;
}
</style>