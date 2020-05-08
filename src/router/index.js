import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * Layout 包含若干Layout布局
 */
import Layout from '@/layout/layout'
import LayoutMain from '@/layout/layoutMain'

/**
 * @路由拆分 一级二级三级  三级后不在拆分
 */
import satelliteConfigurationFirst from './modules/firstRouter/satelliteConfiguration'
// import nestedFirst from './modules/firstRouter/nested'
// import dashboardFirst from './modules/firstRouter/dashboard'
import basicConfigurationFirst from './modules/firstRouter/basicConfiguration'
import dataMonitoringFirst from './modules/firstRouter/dataMonitoringFirst'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  /**
   * @LayoutMain 路由
   */
  {
    path: '/btns',
    component: LayoutMain,
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },



  /**
   * @Layout 路由
   */
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: dashboardFirst
  // },
  {
    path: '/dataMonitoring',
    component: Layout,
    // redirect: '/dataMonitoring/scSum',
    meta: {
      title: '数据监视',
      icon: 'dataMonitoring'
    },
    children: dataMonitoringFirst
  },
  {
    path: '/satelliteConfiguration',
    component: Layout,
    redirect: '/satelliteConfiguration/scInfo',
    name: 'satelliteConfiguration',
    meta: {
      title: '卫星配置',
      icon: 'satelliteConfiguration'
    },
    children: satelliteConfigurationFirst
  },
  {
    path: '/basicConfiguration',
    component: Layout,
    redirect: '/basicConfiguration/scType',
    meta: {
      title: '基础配置',
      icon: 'basicConfiguration'
    },
    children: basicConfigurationFirst
  },


  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: nestedFirst
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [{
  //     path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //     meta: {
  //       title: 'External Link',
  //       icon: 'link'
  //     }
  //   }]
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
