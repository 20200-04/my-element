const dataMonitoringFirst =
  /**
   * 数据监视  单星数据总览  遥测源码   遥测参数 遥测参数警告
   */
  [{

      path: 'scSum',
      name: 'scSum',
      component: () => import('@/views/DataMonitoring/scSum/index'),
      meta: {
        title: '数据监视',
        icon: 'scSum'
      }
    },
    {
      path: 'scDataOverview',
      name: 'scDataOverview',
      component: () => import('@/views/DataMonitoring/scDataOverview'),
      meta: {
        title: '单星数据总览',
        icon: 'scDataOverview'
      }
    },
    {
      path: 'scTelemeteringCode',
      name: 'scTelemeteringCode',
      component: () => import('@/views/DataMonitoring/scTelemeteringCode/index'),
      meta: {
        title: '遥测源码',
        icon: 'scTelemeteringCode'
      }
    },
    {
      path: 'scTelemeteringPara',
      name: 'scTelemeteringPara',
      component: () => import('@/views/DataMonitoring/scTelemeteringPara/index.vue'),
      meta: {
        title: '遥测参数',
        icon: 'scTelemeteringPara'
      },

    },
    {
      path: 'scTelemeteringAlarm',
      name: 'scTelemeteringAlarm',
      component: () => import('@/views/DataMonitoring/scTelemeteringAlarm/index'),
      meta: {
        title: '遥测参数警告',
        icon: 'scTelemeteringAlarm'
      },

    }
  ]
export default dataMonitoringFirst
