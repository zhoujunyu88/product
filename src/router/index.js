import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout/Layout.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '',
        component: Layout,
        children: [{
                path: '/Vues',
                name: 'Vues',
                component: () =>
                    import ('../views/ha/Vues.vue'),
                meta: {
                    title: '首页',
                    parentpath: '/Vues'
                }
            }, {
                path: '/Table',
                name: 'Table',
                component: () =>
                    import ('../views/Table/Table.vue'),
            },

            {
                path: '/Publisharticles',
                name: 'Publisharticles',
                component: () =>
                    import ('../views/publisharticles/Publisharticles.vue'),
                meta: {
                    title: '发表文章',
                    parentpath: '/Publisharticles'
                }
            },
            {
                path: '/Exportimages',
                name: 'Exportimages',
                component: () =>
                    import ('../views/Exportimages/Exportimages.vue'),
                meta: {
                    title: '图片',
                    parentpath: '/Exportimages'
                }
            },
            {
                path: '/Excle',
                name: 'Excle',
                component: () =>
                    import ('../views/excle/Excle.vue'),
                meta: {
                    title: '导出表格',
                    parentpath: '/Excle'
                }
            },
            {
                path: '/Publisheds',
                name: 'Publisheds',
                component: () =>
                    import ('../views/published/Publisheds.vue'),
                children: [{
                        path: '/Published',
                        name: 'Published',
                        component: () =>
                            import ('../views/published/Published.vue'),
                        meta: { parentpath: '/Published' }
                    },
                    {

                        path: '/See',
                        name: 'See',
                        component: () =>
                            import ('../views/published/See.vue'),
                        meta: { parentpath: '/Published' }
                    },
                    {
                        path: '/Edu',
                        name: 'Edu',
                        component: () =>
                            import ('../views/published/Edu'),
                        meta: { parentpath: '/Published' }
                    },


                ]
            },
            {
                path: '/Exit',
                name: 'Exit',
                component: () =>
                    import ('../views/Exit/Exit.vue'),
                meta: {
                    title: '退出登录',
                    parentpath: '/Exit'
                }
            },
            {
                path: '/Images',
                name: 'Images',
                component: () =>
                    import ('../views/Img/Images.vue'),
                meta: {
                    title: '图片',
                    parentpath: '/Images'
                }
            },
            {
                path: '/Total',
                name: 'Total',
                component: () =>
                    import ('../views/Total/Total.vue'),
                meta: {
                    title: '统计',
                    parentpath: '/Total'
                }
            },

        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: () =>
            import ('../views/Login/Login.vue'),
    }, {
        path: '/registered',
        name: 'Registered',
        component: () =>
            import ('../views/registered/Registered.vue'),
    },


    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let user111 = localStorage.getItem('user111', JSON.stringify(user111))
        // console.log(user111, 'gfd')
    if (to.path === '/Login' || to.path === '/registered') next()
    else user111 ? next() : next('/Login')
})
export default router