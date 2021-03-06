
/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: '操作向导', icon: 'guide', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/weapon',
    component: Layout,
    redirect: '/weapon/icon',
    alwaysShow: true, // will always show the root menu
    name: 'Weapon',
    meta: {
      title: '开发辅助',
      icon: 'education',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'icon',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      },
      {
        path: 'clipboard',
        component: () => import('@/views/clipboard/index'),
        name: 'Clipboard',
        meta: { title: '剪切板', icon: 'clipboard' }
      }
    ]
  }, {
    path: '/tmall',
    component: Layout,
    redirect: '/tmall/shop',
    alwaysShow: true, // will always show the root menu
    name: 'Tmall',
    meta: {
      title: '天猫数据',
      icon: 'tmall'
    },
    children: [
      {
        path: 'shop',
        component: () => import('@/views/tmall/shop'),
        name: 'TmallShop',
        meta: { title: '竞品店铺', icon: 'shop', noCache: true }
      },
      {
        path: 'comment/index',
        component: () => import('@/views/tmall/comment'),
        name: 'CommentGoods',
        meta: { title: '评论分析', icon: 'comment', noCache: true }
      },
      {
        path: 'goods/:shopId(\\d+)',
        component: () => import('@/views/tmall/goods'),
        name: 'TmallGoods',
        meta: { title: '店铺宝贝', noCache: true, activeMenu: '/tmall/shop' },
        hidden: true
      },
      {
        path: 'comment/:goodsId(\\d+)',
        component: () => import('@/views/tmall/comment/CommentDetail'),
        name: 'CommentDetail',
        meta: { title: '评论列表', noCache: true, activeMenu: '/tmall/comment/index' },
        hidden: true
      },
      {
        path: 'comment/words/:goodsId(\\d+)',
        component: () => import('@/views/tmall/comment/CommentWords'),
        name: 'CommentWords',
        meta: { title: '分词统计', noCache: true, activeMenu: '/tmall/comment/index' },
        hidden: true
      }
    ]
  }, {
    path: '/system',
    component: Layout,
    redirect: '/system/usermgt',
    alwaysShow: true, // will always show the root menu
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'system_mgt',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'usermgt',
        component: () => import('@/views/system/user'),
        name: 'UserMgt',
        meta: { title: '用户管理', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    name: 'Theme',
    meta: {
      title: '个性设置',
      icon: 'settings',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'ThemeIndex',
        meta: { title: '换肤', icon: 'theme' }
      }
    ]
  },
  {
    path: 'https://purcotton.tmall.com/shop/view_shop.htm',
    meta: { title: '全棉天猫旗舰店', icon: 'link' }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/error/404', hidden: true }
]
