import { createRouter, createWebHistory } from 'vue-router'
// import Page404 from '@/views/common/Page404'
// Home
import Home from '@/views/home/Home'


const routes = [
	// Home
    // { path: '/:pathMatch(.*)', name:'Page404', component: Page404, 
    //     meta: { 
    //         title: '404 - Page Not Found | Merkle Tree Converter', 
    //         description: 'Oops! Looks like you\'ve reached a page that doesn\'t exist.'
    //     } 
    // },
    { path: '/', name: 'Home', component: Home, 
        meta: { 
            title: 'Merkle Tree Converter', 
            description: 'Merkle Tree Converter', 
            keepAlive: true 
        } 
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const HOME_PAGE_NAME = 'Home'

// 判断登录权限
router.beforeEach((to, from, next) => {
    // 路由时关闭所有 v-menu 组件
    const menus = document.querySelectorAll('.v-menu')
    menus.forEach(menu => {
        menu.style.display = 'none'
    })
    next();
})

router.afterEach(to => {
    window.scrollTo(0, 0)

    document.title = to.meta.title;
    
    document.querySelector('link[rel="canonical"]').href = location.href;

    document.querySelector('meta[name="title"]').content = to.meta.title;
    document.querySelector('meta[name="description"]').content = to.meta.description;

    document.querySelector('meta[property="og:title"]').content = to.meta.title;
    document.querySelector('meta[property="og:description"]').content = to.meta.description;
    document.querySelector('meta[property="og:url"]').content = location.href;

    document.querySelector('meta[property="twitter:title"]').content = to.meta.title;
    document.querySelector('meta[property="twitter:description"]').content = to.meta.description;
    document.querySelector('meta[property="twitter:url"]').content = location.href;

})

export default router
