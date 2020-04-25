import nestedTertiary from '../tertiaryRouter/nested'
const nestedSecond = [{
    path: 'menu1-1',
    component: () => import('@/views/nested/menu1/menu1-1'),
    name: 'Menu1-1',
    meta: {
      title: 'Menu1-1'
    }
  },
  {
    path: 'menu1-2',
    component: () => import('@/views/nested/menu1/menu1-2'),
    name: 'Menu1-2',
    meta: {
      title: 'Menu1-2'
    },
    children: nestedTertiary
  },
  {
    path: 'menu1-3',
    component: () => import('@/views/nested/menu1/menu1-3'),
    name: 'Menu1-3',
    meta: {
      title: 'Menu1-3'
    }
  }
]

export default nestedSecond
