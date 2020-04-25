import nestedSecond from '../secondRouter/nested'
const nestedFirst = [{
    path: 'menu1',
    component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: 'Menu1'
    },
    children: nestedSecond
  },
  {
    path: 'menu2',
    component: () => import('@/views/nested/menu2/index'),
    meta: {
      title: 'menu2'
    }
  }
]

export default nestedFirst
