const satelliteConfigurationFirst =
  /**
   *基础信息配置  应用识别过程  卫星分系统配置  遥测参数配置  直接指令配置
   */
  [{
    path: 'scInfo',
    name: 'scInfo',
    component: () => import('@/views/SatelliteConfiguration/scInfo/index'),
    meta: {
      title: '基础信息配置',
      icon: 'scInfo'
    }
  },
  {
    path: 'scApTnfo',
    name: 'scApTnfo',
    component: () => import('@/views/SatelliteConfiguration/scApTnfo/index'),
    meta: {
      title: '应用识别过程',
      icon: 'scApTnfo'
    }
  },
  {
    path: 'scSubsytem',
    name: 'scSubsytem',
    component: () => import('@/views/SatelliteConfiguration/scSubsytem/index'),
    meta: {
      title: '卫星分系统配置',
      icon: 'scSubsytem'
    }
  },
  {
    path: 'scParaInfo',
    name: 'scParaInfo',
    component: () => import('@/views/SatelliteConfiguration/scParaInfo/index'),
    meta: {
      title: '遥测参数配置',
      icon: 'scParaInfo'
    }
  },
  {
    path: 'scTelecommand',
    name: 'scTelecommand',
    component: () => import('@/views/SatelliteConfiguration/scTelecommand/index'),
    meta: {
      title: '直接指令配置',
      icon: 'scTelecommand'
    }
  }]

export default satelliteConfigurationFirst
