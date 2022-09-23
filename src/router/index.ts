import { createRouter, createWebHistory } from 'vue-router'
import JobList from '../views/JobList.vue';
import About from '../views/About.vue';
import JobForm from '../views/JobForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: JobList,
      // children: [
      //   {
      //     path: "/addjob",
      //     name: 'addjob',
      //     component: AddJob
      //   }
      // ]
    },
    {
      path: "/jobform/:action/:id",
      name: 'jobform',
      component: JobForm,
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },


  ]
})

export default router
