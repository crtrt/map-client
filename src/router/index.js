import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/pages/Index'
import Map from '@/pages/Map/MapIndex'
import Home from '@/pages/Home'

// import Setting from '@/pages/Setting'
// import AdminList from '@/pages/AdminList'
// import Staff from '@/pages/Staff/Staff'
// import Volunteer from '@/pages/Volunteer/Volunteer'
// import OldInfoDetail from '@/pages/OldPeople/InfoDetail'
// import OldInfoEdit from '@/pages/OldPeople/InfoEdit'
// import StaffInfoEdit from '@/pages/Staff/InfoEdit'
// import VolunteerInfoEdit from '@/pages/Volunteer/InfoEdit'
// import Camera from '@/pages/Camera'
// import DataInfo from '@/pages/DataInfo'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      // eslint-disable-next-line no-undef
      component: resolve => require(['../pages/404.vue'], resolve)
    },
    {
      path: '/login',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
        title:"Home"
      }
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map,
      meta: {
        keepAlive: true,
        title:"Map"
      }
    },



    //
    //
    // {
    //   path: '/OldManage',
    //   name: 'OldManage',
    //   component: OldManage,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: '/Setting',
    //   name: 'Setting',
    //   component: Setting,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: '/AdminList',
    //   name: 'AdminList',
    //   component: AdminList,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    //
    // {
    //   path: '/Staff',
    //   name: 'Staff',
    //   component: Staff,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: '/Volunteer',
    //   name: 'Volunteer',
    //   component: Volunteer,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: '/OldPeople/InfoDetail/:id',
    //   name: 'OldInfoDetail',
    //   component: OldInfoDetail,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: '/OldPeople/InfoEdit/:id',
    //   name: 'OldInfoEdit',
    //   component: OldInfoEdit,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    //
    // {
    //   path: '/Staff/InfoEdit/:id',
    //   name: 'StaffInfoEdit',
    //   component: StaffInfoEdit,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    //
    //
    // {
    //   path: '/Volunteer/InfoEdit/:id',
    //   name: 'VolunteerInfoEdit',
    //   component: VolunteerInfoEdit,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    //
    //   {
    //       path: '/Camera',
    //       name: 'Camera',
    //       component: Camera,
    //       meta: {
    //           keepAlive: true
    //       }
    //   },
    //
    // {
    //   path: '/DataInfo',
    //   name: 'DataInfo',
    //   component: DataInfo,
    //   meta: {
    //     keepAlive: true
    //   }
    // },


  ],

})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
