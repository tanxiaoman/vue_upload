import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/components/Upload'
import Success from '@/components/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Upload',
      component: Upload
    },
    {
      path:'/success',
      name:'Success',
      component:Success
    }
  ]
})
