const nestedTertiary = [{
    path: 'menu1-2-1',
    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    name: 'Menu1-2-1',
    meta: {
      title: 'Menu1-2-1'
    }
  },
  {
    path: 'menu1-2-2',
    component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    name: 'Menu1-2-2',
    meta: {
      title: 'Menu1-2-2'
    }
  }
]

export default nestedTertiary
