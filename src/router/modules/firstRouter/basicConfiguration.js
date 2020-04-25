const basicConfigurationFirst =
  /**
   * 卫星类型  分系统配置  卫星轨道配置   处理方法配置
   */
  [{

      path: 'scType',
      name: 'scType',
      component: () => import('@/views/BasicConfiguration/scType/index'),
      meta: {
        title: '卫星类型',
        icon: 'scType'
      }
    },
    {
      path: 'scSubsytemType',
      name: 'scSubsytemType',
      component: () => import('@/views/BasicConfiguration/scSubsytemType/index'),
      meta: {
        title: '分系统配置',
        icon: 'scSubsytemType'
      }
    },
    {
      path: 'scOribitType',
      name: 'scOribitType',
      component: () => import('@/views/BasicConfiguration/scOribitType/index'),
      meta: {
        title: '卫星轨道配置',
        icon: 'scOribitType'
      }
    },
    {
      path: 'scParaFunc',
      name: 'scParaFunc',
      component: () => import('@/views/BasicConfiguration/scParaFunc/index'),
      meta: {
        title: '处理方法配置',
        icon: 'scParaFunc'
      }
    }
  ]

export default basicConfigurationFirst
