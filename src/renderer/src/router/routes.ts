import { RouteRecordRaw } from 'vue-route'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    children: [
      {
        path: '/login/QRcodeLogin',
        name: 'QRcodeLogin',
        component: () => import('../views/Login/children/QRcodeLogin.vue')
      },
      {
        path: '/login/phoneLogin',
        name: 'PhoneLogin',
        component: () => import('../views/Login/children/PhoneLogin.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/SongList/:id',
        name: 'SongList',
        component: () => import('../views/DiscoverMusic/SongList.vue')
      },
      {
        path: '/DiscoverMusic',
        name: 'DiscoverMusic',
        component: () => import('../views/DiscoverMusic/index.vue'),
        meta: {
          title: '发现音乐'
        },
        children: [
          {
            path: '/DiscoverMusic/customization',
            name: 'customization',
            component: () => import('../views/DiscoverMusic/children/customization.vue')
          },
          {
            path: '/newestSongs',
            name: 'newestSongs',
            component: () => import('../views/DiscoverMusic/children/newestSongs.vue')
          },
          {
            path: '/rankList',
            name: 'rankList',
            component: () => import('../views/DiscoverMusic/children/rankList.vue')
          },
          {
            path: '/DiscoverMusic/recommend',
            name: 'recommend',
            component: () => import('../views/DiscoverMusic/children/recommend.vue')
          },
          {
            path: '/singer',
            name: 'singer',
            component: () => import('../views/DiscoverMusic/children/singer.vue')
          }
        ]
      },
      {
        path: '/Podcast',
        name: 'Podcast',
        component: () => import('../views/Podcast/index.vue'),
        meta: {
          title: '播客'
        }
      },
      {
        path: '/Attention',
        name: 'Attention',
        component: () => import('../views/Attention/index.vue'),
        meta: {
          title: '关注'
        }
      },
      {
        path: '/LiveStreaming',
        name: 'LiveStreaming',
        component: () => import('../views/LiveStreaming/index.vue'),
        meta: {
          title: '直播'
        }
      },
      {
        path: '/MusicVideo',
        name: 'MusicVideo',
        component: () => import('../views/MusicVideo/index.vue'),
        meta: {
          title: '视频'
        }
      }
    ]
  },
  //重定向
  {
    path: '/',
    redirect: '/DiscoverMusic/recommend'
  },
  {
    path: '/login',
    redirect: '/login/QRcodeLogin'
  }
]
